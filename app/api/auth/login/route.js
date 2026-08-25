import { NextResponse } from "next/server";
import { sanitizeText, validateEmail } from "@/lib/security";
import { supabase } from "@/lib/supabase";

/**
 * API Route d'authentification Administrateur via Supabase Auth & Table `admin_users`.
 * 1. Tente l'authentification native via Supabase Auth (auth.users).
 * 2. Tente l'authentification dans la table Supabase `admin_users`.
 * 3. Vérifie les variables d'environnement (ADMIN_EMAIL / ADMIN_PASSWORD) en secours.
 */
export async function POST(req) {
  try {
    const body = await req.json();
    const email = sanitizeText(body?.email || "").toLowerCase();
    const password = body?.password || "";

    if (!email || !password) {
      return NextResponse.json(
        { error: "Veuillez fournir un identifiant et un mot de passe." },
        { status: 400 }
      );
    }

    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: "Format d'adresse email invalide." },
        { status: 400 }
      );
    }

    if (supabase) {
      // 1. Authentification via Supabase Auth (Native)
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (!error && data?.user) {
          return NextResponse.json(
            { success: true, email: data.user.email },
            { status: 200 }
          );
        }
      } catch (e) {
        // Continue vers l'étape suivante si Auth natif n'est pas activé
      }

      // 2. Authentification via la table Supabase `admin_users`
      try {
        const { data, error } = await supabase
          .from("admin_users")
          .select("*")
          .eq("email", email)
          .single();

        if (!error && data) {
          // Si un mot de passe est enregistré en base pour cet utilisateur
          if (data.password === password) {
            return NextResponse.json(
              { success: true, email: data.email },
              { status: 200 }
            );
          }
        }
      } catch (e) {
        // Table admin_users non créée encore sur Supabase
      }
    }

    // 3. Vérification via les variables d'environnement ADMIN_EMAIL / ADMIN_PASSWORD
    const configuredEmail = (process.env.ADMIN_EMAIL || "").toLowerCase();
    const configuredPassword = process.env.ADMIN_PASSWORD || "";

    if (configuredEmail && configuredPassword) {
      if (email === configuredEmail && password === configuredPassword) {
        return NextResponse.json(
          { success: true, email: configuredEmail },
          { status: 200 }
        );
      }
    }

    return NextResponse.json(
      { error: "Identifiants invalides (email ou mot de passe incorrect)." },
      { status: 401 }
    );
  } catch (error) {
    console.error("Erreur serveur lors de la connexion :", error);
    return NextResponse.json(
      { error: "Une erreur interne s'est produite lors de l'authentification." },
      { status: 500 }
    );
  }
}
