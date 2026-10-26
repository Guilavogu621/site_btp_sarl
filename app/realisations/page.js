import RealisationsClient from "./RealisationsClient";
import { getProjects } from "@/lib/data";

// Page préparée sur le serveur avec les données Supabase, puis mise en cache.
// Rafraîchie au plus toutes les 60 s, et immédiatement après une publication
// depuis le dashboard (voir /api/revalidate).
export const revalidate = 60;

export default async function Page() {
  const projects = await getProjects();
  return <RealisationsClient initialData={projects} />;
}
