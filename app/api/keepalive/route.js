import { createClient } from "@supabase/supabase-js";

/**
 * GET /api/keepalive
 *
 * Route de "keep-alive" pour empêcher Supabase (plan gratuit) de mettre
 * le projet en pause après 1 semaine d'inactivité.
 *
 * Appelée automatiquement chaque jour à 08h00 UTC via le Vercel Cron Job
 * configuré dans vercel.json.
 *
 * Sécurisée par le header CRON_SECRET pour éviter les appels non autorisés.
 */
export async function GET(request) {
  // Vérification du secret Cron (Vercel l'envoie automatiquement)
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return Response.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return Response.json(
      { status: "error", message: "Variables Supabase manquantes." },
      { status: 500 }
    );
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Requête légère : juste compter les articles pour "réveiller" la DB
    const { count, error } = await supabase
      .from("articles")
      .select("*", { count: "exact", head: true });

    if (error) {
      throw new Error(error.message);
    }

    const timestamp = new Date().toISOString();
    console.log(`[keepalive] Supabase actif — ${timestamp} — ${count} articles`);

    return Response.json({
      status: "alive",
      timestamp,
      articles_count: count ?? 0,
      message: "Supabase Best Builders est actif."
    });
  } catch (err) {
    console.error("[keepalive] Erreur Supabase :", err.message);
    return Response.json(
      { status: "error", message: "Impossible de joindre Supabase." },
      { status: 503 }
    );
  }
}
