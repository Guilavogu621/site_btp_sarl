import { NextResponse } from "next/server";
import { sanitizeText, validateEmail } from "@/lib/security";
import { supabase } from "@/lib/supabase";
import { supabaseAdmin } from "@/lib/supabase-admin";

/**
 * API Route : /api/admin/users
 * Permet au Super Admin de :
 * - GET: Lister tous les utilisateurs enregistrés dans Supabase (Auth + Table)
 * - POST: Créer un nouvel utilisateur dans Supabase Auth
 * - DELETE: Supprimer un utilisateur de Supabase
 */

// GET : Liste des utilisateurs réels depuis Supabase Auth
export async function GET() {
  try {
    // 1. Tenter la récupération via Supabase Auth Admin API (Priorité Native)
    if (supabaseAdmin) {
      try {
        const { data: authData, error: authError } = await supabaseAdmin.auth.admin.listUsers();
        if (!authError && authData?.users && authData.users.length > 0) {
          const users = authData.users.map((u) => ({
            id: u.id,
            email: u.email,
            full_name: u.user_metadata?.full_name || u.user_metadata?.name || u.email.split("@")[0],
            role: u.user_metadata?.role || "admin",
            status: u.banned_until ? "inactive" : "active",
            created_at: u.created_at,
          }));
          return NextResponse.json({ users });
        }
      } catch (authErr) {
        // Fallback vers table admin_users si admin API indisponible
      }
    }

    // 2. Récupération via la table Supabase `admin_users`
    if (supabase) {
      const { data, error } = await supabase
        .from("admin_users")
        .select("id, email, full_name, role, status, created_at, created_by")
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
        return NextResponse.json({ users: data });
      }
    }

    return NextResponse.json({ users: [] });
  } catch (error) {
    return NextResponse.json(
      { error: "Impossible de récupérer la liste des utilisateurs." },
      { status: 500 }
    );
  }
}

// POST : Créer un utilisateur dans Supabase Auth (Super Admin uniquement)
export async function POST(req) {
  try {
    const body = await req.json();
    const email = sanitizeText(body?.email || "").toLowerCase();
    const password = body?.password || "";
    const full_name = sanitizeText(body?.full_name || body?.name || "");
    const role = ["super_admin", "admin", "editor"].includes(body?.role) ? body.role : "admin";
    const creatorEmail = sanitizeText(body?.creatorEmail || "");

    if (!email || !password || !full_name) {
      return NextResponse.json(
        { error: "Tous les champs (Nom, Email, Mot de passe) sont requis." },
        { status: 400 }
      );
    }

    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: "Format d'adresse email invalide." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Le mot de passe doit contenir au moins 6 caractères." },
        { status: 400 }
      );
    }

    let createdUser = null;

    // 1. Création directe dans Supabase Auth via Admin API
    if (supabaseAdmin) {
      const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: { full_name, role },
      });

      if (authError) {
        return NextResponse.json(
          { error: `Erreur Supabase Auth : ${authError.message}` },
          { status: 400 }
        );
      }

      if (authData?.user) {
        createdUser = {
          id: authData.user.id,
          email: authData.user.email,
          full_name,
          role,
          status: "active",
        };
      }
    }

    // 2. Synchroniser dans la table Supabase `admin_users` si existante
    if (supabase) {
      await supabase
        .from("admin_users")
        .insert([
          {
            user_id: createdUser?.id || null,
            email,
            full_name,
            role,
            status: "active",
            created_by: creatorEmail || "super_admin",
          },
        ])
        .select();
    }

    return NextResponse.json(
      {
        success: true,
        message: `Utilisateur ${email} créé avec succès !`,
        user: createdUser || { email, full_name, role, status: "active" },
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la création de l'utilisateur." },
      { status: 500 }
    );
  }
}

// DELETE : Supprimer un utilisateur de Supabase Auth
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("id");
    const userEmail = searchParams.get("email");

    if (!userId && !userEmail) {
      return NextResponse.json(
        { error: "ID ou email d'utilisateur requis." },
        { status: 400 }
      );
    }

    // 1. Supprimer de Supabase Auth
    if (supabaseAdmin && userId) {
      await supabaseAdmin.auth.admin.deleteUser(userId);
    }

    // 2. Supprimer de la table `admin_users`
    if (supabase) {
      const query = userId
        ? supabase.from("admin_users").delete().eq("id", userId)
        : supabase.from("admin_users").delete().eq("email", userEmail);

      await query;
    }

    return NextResponse.json({
      success: true,
      message: "Utilisateur supprimé de Supabase avec succès.",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la suppression." },
      { status: 500 }
    );
  }
}

