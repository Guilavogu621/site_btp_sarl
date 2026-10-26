-- ========================================================
-- CORRECTIF PUBLICATION DASHBOARD - BEST BUILDERS SARLU
-- À exécuter UNE FOIS dans Supabase > SQL Editor (idempotent).
-- ========================================================

-- 1. Colonnes manquantes (constatées en production le 26/10/2026)
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS photos    TEXT[] DEFAULT '{}';
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS video_url TEXT   DEFAULT '';
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS photos    TEXT[] DEFAULT '{}';
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS video_url TEXT   DEFAULT '';

-- 2. Droits d'écriture explicites pour les admins connectés
GRANT SELECT, INSERT, UPDATE, DELETE ON public.articles, public.projects, public.equipments TO authenticated;
GRANT SELECT ON public.articles, public.projects, public.equipments TO anon;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO authenticated;

DROP POLICY IF EXISTS "Admin Full Access Articles"   ON public.articles;
DROP POLICY IF EXISTS "Admin Full Access Projects"   ON public.projects;
DROP POLICY IF EXISTS "Admin Full Access Equipments" ON public.equipments;

CREATE POLICY "Admin Full Access Articles"   ON public.articles   FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Access Projects"   ON public.projects   FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Access Equipments" ON public.equipments FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 3. Recharger le cache du schéma de l'API
NOTIFY pgrst, 'reload schema';
