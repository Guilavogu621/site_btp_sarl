import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

function jsonError(error, code, status) {
  return NextResponse.json({ error, code, status }, { status });
}

/**
 * Vérifie le jeton Supabase envoyé par le dashboard (en-tête Authorization)
 * et renvoie l'utilisateur, son rôle (lu dans admin_users, jamais dans les
 * métadonnées modifiables par l'utilisateur) et un client Supabase qui agit
 * avec ses droits (la RLS s'applique).
 *
 * Renvoie { response } si l'accès est refusé.
 */
export async function requireAdmin(req, { superAdmin = false } = {}) {
  if (!supabaseUrl || !supabaseAnonKey) {
    return { response: jsonError("Supabase n'est pas configuré sur le serveur.", "AUTH_SERVICE_UNAVAILABLE", 503) };
  }

  const header = req.headers.get("authorization") || "";
  const token = header.startsWith("Bearer ") ? header.slice(7).trim() : "";
  if (!token) {
    return { response: jsonError("Authentification requise.", "UNAUTHENTICATED", 401) };
  }

  const client = createClient(supabaseUrl, supabaseAnonKey, {
    auth: { autoRefreshToken: false, persistSession: false },
    global: { headers: { Authorization: `Bearer ${token}` } },
  });

  const { data: userData, error: userError } = await client.auth.getUser(token);
  const user = userData?.user;
  if (userError || !user?.email) {
    return { response: jsonError("Session invalide ou expirée. Reconnectez-vous.", "INVALID_SESSION", 401) };
  }

  const { data: row } = await client
    .from("admin_users")
    .select("role, status, full_name")
    .eq("email", user.email.toLowerCase())
    .maybeSingle();

  if (!row || row.status !== "active") {
    return { response: jsonError("Accès refusé : ce compte n'est pas administrateur.", "FORBIDDEN", 403) };
  }
  if (superAdmin && row.role !== "super_admin") {
    return { response: jsonError("Action réservée au Super Admin.", "FORBIDDEN", 403) };
  }

  return { user, role: row.role, fullName: row.full_name, client };
}
