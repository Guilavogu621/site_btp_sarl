import { NextResponse } from "next/server";
import { sanitizeText, validateEmail } from "@/lib/security";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { requireAdmin } from "@/lib/server-auth";

/**
 * API Route : /api/admin/users
 * - GET    : liste des utilisateurs du dashboard (admins connectés)
 * - POST   : création d'un utilisateur (Super Admin uniquement)
 * - DELETE : suppression d'un utilisateur (Super Admin uniquement)
 *
 * Chaque appel exige le jeton de session Supabase (Authorization: Bearer ...).
 * Le rôle est lu dans la table admin_users, protégée par la RLS.
 */

const ROLES = ["super_admin", "admin", "editor"];
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function GET(req) {
  const auth = await requireAdmin(req);
  if (auth.response) return auth.response;

  const { data, error } = await auth.client
    .from("admin_users")
    .select("id, user_id, email, full_name, role, status, created_at, created_by")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Erreur lecture admin_users :", error);
    return NextResponse.json(
      { error: "Impossible de récupérer la liste des utilisateurs.", code: "FETCH_USERS_ERROR", status: 500 },
      { status: 500 }
    );
  }

  return NextResponse.json({
    users: data || [],
    me: { email: auth.user.email, role: auth.role, full_name: auth.fullName },
  });
}

export async function POST(req) {
  const auth = await requireAdmin(req, { superAdmin: true });
  if (auth.response) return auth.response;

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide.", code: "INVALID_BODY", status: 400 }, { status: 400 });
  }

  const email = sanitizeText(body?.email || "").toLowerCase();
  const password = typeof body?.password === "string" ? body.password : "";
  const full_name = sanitizeText(body?.full_name || body?.name || "").slice(0, 120);
  const role = ROLES.includes(body?.role) ? body.role : "admin";

  if (!email || !password || !full_name) {
    return NextResponse.json(
      { error: "Tous les champs (Nom, Email, Mot de passe) sont requis.", code: "MISSING_FIELDS", status: 400 },
      { status: 400 }
    );
  }
  if (!validateEmail(email)) {
    return NextResponse.json({ error: "Format d'adresse email invalide.", code: "INVALID_EMAIL", status: 400 }, { status: 400 });
  }
  if (password.length < 8) {
    return NextResponse.json(
      { error: "Le mot de passe doit contenir au moins 8 caractères.", code: "PASSWORD_TOO_SHORT", status: 400 },
      { status: 400 }
    );
  }
  if (!supabaseAdmin) {
    return NextResponse.json(
      {
        error: "Création de compte impossible : la variable SUPABASE_SERVICE_ROLE_KEY n'est pas configurée sur le serveur.",
        code: "SERVICE_KEY_MISSING",
        status: 503,
      },
      { status: 503 }
    );
  }

  const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { full_name },
    app_metadata: { role },
  });
  if (authError || !authData?.user) {
    return NextResponse.json(
      { error: `Erreur Supabase Auth : ${authError?.message || "compte non créé"}`, code: "SUPABASE_AUTH_ERROR", status: 400 },
      { status: 400 }
    );
  }

  const { error: insertError } = await auth.client.from("admin_users").upsert(
    [{ user_id: authData.user.id, email, full_name, role, status: "active", created_by: auth.user.email }],
    { onConflict: "email" }
  );
  if (insertError) {
    // Ne pas laisser un compte de connexion sans droits enregistrés
    await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
    console.error("Erreur insertion admin_users :", insertError);
    return NextResponse.json(
      { error: "Le compte n'a pas pu être enregistré dans admin_users.", code: "CREATE_USER_ERROR", status: 500 },
      { status: 500 }
    );
  }

  return NextResponse.json(
    {
      success: true,
      message: `Utilisateur ${email} créé avec succès !`,
      user: { id: authData.user.id, email, full_name, role, status: "active" },
    },
    { status: 201 }
  );
}

export async function DELETE(req) {
  const auth = await requireAdmin(req, { superAdmin: true });
  if (auth.response) return auth.response;

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id || !UUID_RE.test(id)) {
    return NextResponse.json({ error: "ID d'utilisateur invalide.", code: "MISSING_IDENTIFIER", status: 400 }, { status: 400 });
  }

  const { data: target } = await auth.client
    .from("admin_users")
    .select("id, user_id, email")
    .or(`id.eq.${id},user_id.eq.${id}`)
    .maybeSingle();

  if (!target) {
    return NextResponse.json({ error: "Utilisateur introuvable.", code: "NOT_FOUND", status: 404 }, { status: 404 });
  }
  if (target.email.toLowerCase() === auth.user.email.toLowerCase()) {
    return NextResponse.json(
      { error: "Vous ne pouvez pas supprimer votre propre compte.", code: "SELF_DELETE", status: 400 },
      { status: 400 }
    );
  }

  const { error: deleteError } = await auth.client.from("admin_users").delete().eq("id", target.id);
  if (deleteError) {
    console.error("Erreur suppression admin_users :", deleteError);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la suppression.", code: "DELETE_USER_ERROR", status: 500 },
      { status: 500 }
    );
  }

  // Supprimer aussi le compte de connexion si la clé serveur est disponible.
  // Sans elle, le compte existe encore mais n'a plus aucun droit (RLS).
  const authUserId = target.user_id;
  if (supabaseAdmin && authUserId) {
    const { error } = await supabaseAdmin.auth.admin.deleteUser(authUserId);
    if (error) console.warn("Compte Auth non supprimé :", error.message);
  }

  return NextResponse.json({ success: true, message: "Utilisateur supprimé." });
}
