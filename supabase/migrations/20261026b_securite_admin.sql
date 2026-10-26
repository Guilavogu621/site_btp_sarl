-- ========================================================
-- SÉCURITÉ - BEST BUILDERS SARLU (26/10/2026)
-- À exécuter UNE FOIS dans Supabase > SQL Editor (idempotent).
--
-- Corrige :
--  * la table admin_users lisible et modifiable par n'importe quel visiteur
--    (elle contenait en plus un mot de passe en clair) ;
--  * l'écriture sur le contenu autorisée à TOUT compte connecté
--    (les inscriptions publiques étant ouvertes, n'importe qui pouvait
--    créer un compte et modifier le site) ;
--  * les messages de contact qui ne pouvaient pas être supprimés.
--
-- Désormais seuls les comptes listés dans admin_users (statut "active")
-- peuvent modifier le contenu et lire les messages.
-- ========================================================

-- 1. Supprimer le mot de passe stocké en clair
ALTER TABLE public.admin_users DROP COLUMN IF EXISTS password;

-- 2. Enregistrer comme admins les comptes de connexion déjà existants
--    (pour que personne ne perde l'accès au dashboard)
INSERT INTO public.admin_users (user_id, email, full_name, role, status, created_by)
SELECT u.id,
       lower(u.email),
       COALESCE(u.raw_user_meta_data->>'full_name', split_part(u.email, '@', 1)),
       CASE WHEN u.raw_user_meta_data->>'role' IN ('super_admin', 'admin', 'editor')
            THEN u.raw_user_meta_data->>'role' ELSE 'admin' END,
       'active',
       'migration-securite'
FROM auth.users u
WHERE u.email IS NOT NULL
  AND u.email_confirmed_at IS NOT NULL
ON CONFLICT (email) DO NOTHING;

-- Relier les lignes existantes à leur compte de connexion
UPDATE public.admin_users a
SET user_id = u.id
FROM auth.users u
WHERE a.user_id IS NULL AND lower(a.email) = lower(u.email);

-- 3. Fonctions de contrôle des droits (lisent admin_users sans passer par la RLS)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE lower(email) = lower(auth.jwt() ->> 'email') AND status = 'active'
  );
$$;

CREATE OR REPLACE FUNCTION public.is_super_admin()
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE lower(email) = lower(auth.jwt() ->> 'email') AND status = 'active' AND role = 'super_admin'
  );
$$;

REVOKE ALL ON FUNCTION public.is_admin(), public.is_super_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_admin(), public.is_super_admin() TO anon, authenticated;

-- 4. admin_users : plus aucun accès anonyme
REVOKE ALL ON public.admin_users FROM anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.admin_users TO authenticated;
DROP POLICY IF EXISTS "Admin Users Access Policy" ON public.admin_users;
DROP POLICY IF EXISTS "Admins Read Admin Users"   ON public.admin_users;
DROP POLICY IF EXISTS "Super Admin Manage Users"  ON public.admin_users;
CREATE POLICY "Admins Read Admin Users"  ON public.admin_users FOR SELECT TO authenticated USING (public.is_admin());
CREATE POLICY "Super Admin Manage Users" ON public.admin_users FOR ALL    TO authenticated
  USING (public.is_super_admin()) WITH CHECK (public.is_super_admin());

-- 5. Contenu du site : écriture réservée aux admins
DROP POLICY IF EXISTS "Admin Full Access Articles"   ON public.articles;
DROP POLICY IF EXISTS "Admin Full Access Projects"   ON public.projects;
DROP POLICY IF EXISTS "Admin Full Access Equipments" ON public.equipments;
DROP POLICY IF EXISTS "Admin Full Access Settings"   ON public.site_settings;
DROP POLICY IF EXISTS "Admin Full Access Services"   ON public.services;

CREATE POLICY "Admin Full Access Articles"   ON public.articles      FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin Full Access Projects"   ON public.projects      FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin Full Access Equipments" ON public.equipments    FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin Full Access Settings"   ON public.site_settings FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin Full Access Services"   ON public.services      FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- 6. Messages de contact : envoi public, lecture et suppression par les admins
REVOKE SELECT, UPDATE, DELETE ON public.contact_messages FROM anon;
GRANT INSERT ON public.contact_messages TO anon;
GRANT SELECT, INSERT, DELETE ON public.contact_messages TO authenticated;
DROP POLICY IF EXISTS "Admin Full Access Messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Admin Delete Messages"      ON public.contact_messages;
CREATE POLICY "Admin Full Access Messages" ON public.contact_messages FOR SELECT TO authenticated USING (public.is_admin());
CREATE POLICY "Admin Delete Messages"      ON public.contact_messages FOR DELETE TO authenticated USING (public.is_admin());

-- 7. Recharger le cache du schéma de l'API
NOTIFY pgrst, 'reload schema';

-- 8. Vérification : la liste des comptes qui ont accès au dashboard
SELECT email, role, status FROM public.admin_users ORDER BY role, email;
