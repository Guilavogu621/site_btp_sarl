-- ========================================================
-- SCHÉMA DE BASE DE DONNÉES ET SÉCURITÉ (RLS) - BEST BUILDERS
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
-- ACTIVATION ET POLITIQUES DE SÉCURITÉ PAR LIGNE (RLS)
-- ========================================================

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Politiques de lecture publique (Anonyme & Authentifié)
CREATE POLICY "Public Read Settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Public Read Services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Public Read Projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Public Read Published Articles" ON public.articles FOR SELECT USING (is_published = true);

-- Politique de soumission publique de messages de contact
CREATE POLICY "Public Insert Messages" ON public.contact_messages FOR INSERT WITH CHECK (true);

-- Politiques de modification restreintes (Authentifié Admin uniquement)
CREATE POLICY "Admin Full Access Settings" ON public.site_settings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Services" ON public.services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Projects" ON public.projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Articles" ON public.articles FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Full Access Messages" ON public.contact_messages FOR SELECT USING (auth.role() = 'authenticated');
