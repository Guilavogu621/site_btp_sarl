-- ========================================================
-- STOCKAGE DES PHOTOS & VIDÉOS - BEST BUILDERS SARLU (26/10/2026)
-- À exécuter UNE FOIS dans Supabase > SQL Editor (idempotent).
-- Nécessite le script 20261026b_securite_admin.sql (fonction is_admin).
--
-- Les photos et vidéos du dashboard sont enregistrées comme de vrais
-- fichiers dans l'espace "media" au lieu d'être stockées en texte
-- (base64) dans les tables, ce qui alourdissait fortement les pages.
-- ========================================================

-- 1. Espace de stockage public (lecture libre, 50 Mo max par fichier)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('media', 'media', true, 52428800, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'video/mp4', 'video/webm', 'video/quicktime'])
ON CONFLICT (id) DO UPDATE
SET public = true,
    file_size_limit = EXCLUDED.file_size_limit,
    allowed_mime_types = EXCLUDED.allowed_mime_types;

-- 2. Seuls les admins (table admin_users) peuvent ajouter, remplacer ou supprimer
DROP POLICY IF EXISTS "Media Admin Insert" ON storage.objects;
DROP POLICY IF EXISTS "Media Admin Update" ON storage.objects;
DROP POLICY IF EXISTS "Media Admin Delete" ON storage.objects;

CREATE POLICY "Media Admin Insert" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'media' AND public.is_admin());
CREATE POLICY "Media Admin Update" ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'media' AND public.is_admin()) WITH CHECK (bucket_id = 'media' AND public.is_admin());
CREATE POLICY "Media Admin Delete" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'media' AND public.is_admin());

-- Vérification
SELECT id, public, file_size_limit FROM storage.buckets WHERE id = 'media';
