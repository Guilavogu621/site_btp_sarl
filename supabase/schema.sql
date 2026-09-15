-- ========================================================
-- SCHÉMA DE BASE DE DONNÉES ET SÉCURITÉ (RLS) - BEST BUILDERS
-- Script idempotent : peut être exécuté plusieurs fois sans erreur
-- ========================================================

-- 1. Table Paramètres du site (Singleton)
CREATE TABLE IF NOT EXISTS public.site_settings (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  company_name TEXT NOT NULL DEFAULT 'Best Builders SARLU',
  slogan TEXT,
  phone TEXT,
  email TEXT,
  address TEXT,
  about_text TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Table Services
CREATE TABLE IF NOT EXISTS public.services (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  icon TEXT DEFAULT 'Ruler',
  short_description TEXT NOT NULL,
  detailed_content TEXT,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Table Réalisations (Projects)
CREATE TABLE IF NOT EXISTS public.projects (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  location TEXT,
  surface TEXT,
  duration TEXT,
  photo_before TEXT,
  photo_after TEXT,
  is_ongoing BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Table Articles / Actualités
CREATE TABLE IF NOT EXISTS public.articles (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  image TEXT,
  published_at DATE DEFAULT CURRENT_DATE NOT NULL,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Table Messages de Contact
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  service_requested TEXT,
  message TEXT NOT NULL,
  attachment_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ========================================================
-- ACTIVATION RLS (idempotent via ALTER TABLE)
-- ========================================================

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- ========================================================
-- POLITIQUES RLS — Suppression préalable pour idempotence
-- ========================================================

DROP POLICY IF EXISTS "Public Read Settings" ON public.site_settings;
DROP POLICY IF EXISTS "Admin Full Access Settings" ON public.site_settings;

DROP POLICY IF EXISTS "Public Read Services" ON public.services;
DROP POLICY IF EXISTS "Admin Full Access Services" ON public.services;

DROP POLICY IF EXISTS "Public Read Projects" ON public.projects;
DROP POLICY IF EXISTS "Admin Full Access Projects" ON public.projects;

DROP POLICY IF EXISTS "Public Read Published Articles" ON public.articles;
DROP POLICY IF EXISTS "Admin Full Access Articles" ON public.articles;

DROP POLICY IF EXISTS "Public Insert Messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Admin Full Access Messages" ON public.contact_messages;

-- Lecture publique
CREATE POLICY "Public Read Settings"          ON public.site_settings     FOR SELECT USING (true);
CREATE POLICY "Public Read Services"           ON public.services          FOR SELECT USING (true);
CREATE POLICY "Public Read Projects"           ON public.projects          FOR SELECT USING (true);
CREATE POLICY "Public Read Published Articles" ON public.articles          FOR SELECT USING (is_published = true);

-- Soumission publique des formulaires de contact
CREATE POLICY "Public Insert Messages" ON public.contact_messages FOR INSERT WITH CHECK (true);

-- Accès complet Admin (authentifié)
CREATE POLICY "Admin Full Access Settings"  ON public.site_settings     FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Services"  ON public.services          FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Projects"  ON public.projects          FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Articles"  ON public.articles          FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Messages"  ON public.contact_messages  FOR SELECT  USING (auth.role() = 'authenticated');

-- ========================================================
-- 6. TABLE GESTION DES UTILISATEURS DU DASHBOARD
-- ========================================================

CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  email TEXT UNIQUE NOT NULL,
  password TEXT,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('super_admin', 'admin', 'editor')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  created_by TEXT
);

ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admin Users Access Policy" ON public.admin_users;
CREATE POLICY "Admin Users Access Policy" ON public.admin_users FOR ALL USING (true);

-- Super Admin par défaut (insère uniquement si absent)
INSERT INTO public.admin_users (email, password, full_name, role, status)
VALUES ('bestbuilders@gmail.com', 'BestBuilders2026!', 'Super Admin - Best Builders', 'super_admin', 'active')
ON CONFLICT (email) DO NOTHING;


-- ========================================================
-- 7. TABLE ÉQUIPEMENTS & ENGINS BTP (VENTE & LOCATION)
-- ========================================================

CREATE TABLE IF NOT EXISTS public.equipments (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'both' CHECK (type IN ('sale', 'rent', 'both')),
  price_sale TEXT,
  price_rent TEXT,
  condition TEXT DEFAULT 'Neuf',
  brand TEXT,
  model TEXT,
  specs TEXT NOT NULL,
  image TEXT,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.equipments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public Read Equipments" ON public.equipments;
DROP POLICY IF EXISTS "Admin Full Access Equipments" ON public.equipments;

CREATE POLICY "Public Read Equipments"      ON public.equipments FOR SELECT USING (true);
CREATE POLICY "Admin Full Access Equipments" ON public.equipments FOR ALL
  USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');
