-- ========================================================
-- MIGRATION BEST BUILDERS SARLU : SUPPORT MULTI-PHOTOS & RLS
-- À exécuter dans l'éditeur SQL de votre Dashboard Supabase
-- ========================================================

-- 1. Table `projects` (Réalisations de chantiers)
-- Ajout de la colonne `photos` sous forme de tableau de textes (URLs ou chemins d'images)
ALTER TABLE public.projects 
ADD COLUMN IF NOT EXISTS photos TEXT[] DEFAULT '{}';

-- 2. Table `articles` (Actualités & Suivi technique de chantiers)
-- Ajout de la colonne `photos` pour intégrer des galeries de preuves photographiques
ALTER TABLE public.articles 
ADD COLUMN IF NOT EXISTS photos TEXT[] DEFAULT '{}';

-- Vérification / Ajout de `video_url` au cas où la table ne la posséderait pas encore
ALTER TABLE public.articles 
ADD COLUMN IF NOT EXISTS video_url TEXT DEFAULT '';

-- 3. Mise à jour des permissions et RLS pour la soumission des formulaires de contact
-- Permet aux visiteurs publics (rôle 'anon') d'insérer des messages sans être bloqués par PostgreSQL
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT INSERT, SELECT ON TABLE public.contact_messages TO anon, authenticated;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

DROP POLICY IF EXISTS "Public Insert Messages" ON public.contact_messages;
CREATE POLICY "Public Insert Messages" 
  ON public.contact_messages 
  FOR INSERT 
  TO anon, authenticated 
  WITH CHECK (true);

-- 4. Lecture publique des articles publiés et des projets
DROP POLICY IF EXISTS "Public Read Published Articles" ON public.articles;
CREATE POLICY "Public Read Published Articles" 
  ON public.articles 
  FOR SELECT 
  TO anon, authenticated 
  USING (is_published = true);

DROP POLICY IF EXISTS "Public Read Projects" ON public.projects;
CREATE POLICY "Public Read Projects" 
  ON public.projects 
  FOR SELECT 
  TO anon, authenticated 
  USING (true);

-- 5. Forcer le rechargement immédiat du cache du schéma de l'API PostgREST
NOTIFY pgrst, 'reload schema';
