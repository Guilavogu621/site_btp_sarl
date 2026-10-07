import { NextResponse } from "next/server";
import { sanitizeText, validateEmail } from "@/lib/security";
import { supabase } from "@/lib/supabase";

/**
 * API Route d'authentification Administrateur EXCLUSIVEMENT via Supabase Auth Native.
 * Aucune méthode de secours ni stockage de mot de passe secondaire.
 */
export async function POST(req) {
  try {
    const body = await req.json();
    const email = sanitizeText(body?.email || "").toLowerCase();
    const password = body?.password || "";

    if (!email || !password) {
      return NextResponse.json(
        { error: "Veuillez fournir un email et un mot de passe.", code: "MISSING_CREDENTIALS", status: 400 },
        { status: 400 }
      );
    }

    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: "Format d'adresse email invalide.", code: "INVALID_EMAIL", status: 400 },
        { status: 400 }
      );
    }

    if (!supabase) {
      return NextResponse.json(
        { error: "Le service d'authentification Supabase n'est pas configuré sur le serveur.", code: "AUTH_SERVICE_UNAVAILABLE", status: 503 },
        { status: 503 }
      );
    }

    // Authentification EXCLUSIVE via Supabase Auth (Native)
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data?.user) {
      return NextResponse.json(
        { error: "Identifiants invalides ou compte inexistant sur Supabase.", code: "INVALID_CREDENTIALS", status: 401 },
        { status: 401 }
      );
    }

    const role = data.user.user_metadata?.role || "admin";
    const full_name = data.user.user_metadata?.full_name || "Administrateur";

    return NextResponse.json(
      {
        success: true,
        session: data.session,
        user: {
          id: data.user.id,
          email: data.user.email,
          role,
          full_name,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur interne lors de l'authentification :", error);
    return NextResponse.json(
      { error: "Une erreur interne s'est produite lors de l'authentification.", code: "INTERNAL_AUTH_ERROR", status: 500 },
      { status: 500 }
    );
  }
}


