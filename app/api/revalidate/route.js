import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/server-auth";

// Pages publiques préparées côté serveur qui affichent le contenu du dashboard.
const PUBLIC_PATHS = ["/", "/actualites", "/realisations", "/equipements"];

/**
 * POST /api/revalidate
 * Appelée par le dashboard après une publication, modification ou suppression,
 * pour que le site public affiche le nouveau contenu sans attendre 60 s.
 * Réservée aux admins connectés.
 */
export async function POST(req) {
  const auth = await requireAdmin(req);
  if (auth.response) return auth.response;

  PUBLIC_PATHS.forEach((path) => revalidatePath(path));
  return NextResponse.json({ success: true, revalidated: PUBLIC_PATHS });
}
