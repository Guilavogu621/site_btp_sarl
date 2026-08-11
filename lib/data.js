// Centralized Data Store for Best Builders SARLU Next.js Web Application

export const initialSiteSettings = {
  company_name: "Best Builders SARLU",
  slogan: "Bureau d'études & BTP à Conakry, Guinée",
  phone: "+224 614 60 60 79",
  email: "bestbuilderssarlu@gmail.com",
  address: "Conakry, Kipé",
  about_text: "Acteur majeur du BTP en Guinée, le Groupe Best Builders s'engage à bâtir l'avenir avec rigueur et passion. Forts de notre expertise technique et de notre bureau d'études intégré, nous concevons et réalisons des infrastructures d'envergure répondant aux normes internationales."
};

export const initialStats = [
  { id: 1, value: "15+", label: "Années d'expérience" },
  { id: 2, value: "120+", label: "Projets réalisés" },
  { id: 3, value: "45", label: "Collaborateurs qualifiés" },
  { id: 4, value: "99%", label: "Satisfaction clients" }
];

export const initialProcessSteps = [
  { id: 1, order: "01", title: "Étude & Diagnostic", description: "Analyse approfondie des besoins, étude de faisabilité et diagnostic technique du terrain." },
  { id: 2, order: "02", title: "Conception & Plans", description: "Élaboration des plans architecturaux, modélisation 3D et calculs de structures rigoureux." },
  { id: 3, order: "03", title: "Chiffrage & Plannification", description: "Chiffrage précis des matériaux, budget optimisé et calendrier d'exécution détaillé." },
  { id: 4, order: "04", title: "Exécution & Suivi", description: "Supervision rigoureuse du chantier, contrôle de la qualité et respect des normes de sécurité." },
  { id: 5, order: "05", title: "Livraison & Réception", description: "Remise des clés, vérification de la conformité et accompagnement post-livraison." }
];

export const initialServices = [
  {
    id: "conception-structure",
    slug: "conception-structure",
    title: "Conception & Calcul de Structure",
    icon: "Ruler",
    image: "/img/services/conception-structure.png",
    short_description: "Études de structures en béton armé et charpente métallique conformes aux normes Eurocodes/BAEL.",
    detailed_content: "Notre bureau d'études réalise l'intégralité de la conception structurelle de vos ouvrages. Nous calculons les armatures, modélisons les contraintes et garantissons la stabilité globale de vos bâtiments résidentiels, tertiaires et industriels."
  },
  {
    id: "chiffrage-economie",
    slug: "chiffrage-economie",
    title: "Chiffrage & Économie de la Construction",
    icon: "Calculator",
    image: "/img/services/chiffrage-economie.png",
    short_description: "Estimations budgétaires rigoureuses, avant-métrés détaillés et optimisation des coûts de vos projets.",
    detailed_content: "L'économie de la construction est au cœur de notre démarche. Nous élaborons le CCTP, quantifions exactement les besoins en matériaux et prévenons tout dépassement budgétaire en cours de chantier."
  },
  {
    id: "gestion-suivi-chantier",
    slug: "gestion-suivi-chantier",
    title: "Gestion & Suivi de Chantier",
    icon: "HardHat",
    image: "/img/services/suivi-chantier.png",
    short_description: "Maîtrise d'œuvre, ordonnancement, pilotage et coordination (OPC) des travaux jusqu'à la réception.",
    detailed_content: "Nos ingénieurs de chantier assurent une présence constante sur le terrain. Nous coordonnons les différents corps d'état, contrôlons la qualité des matériaux livrés et veillons au respect strict du calendrier d'exécution."
  },
  {
    id: "renovation-rehabilitation",
    slug: "renovation-rehabilitation",
    title: "Rénovation & Réhabilitation",
    icon: "Hammer",
    image: "/img/services/renovation-batiment.png",
    short_description: "Audit technique des structures existantes, renforcement et modernisation de bâtiments.",
    detailed_content: "Nous intervenons sur les bâtiments anciens ou dégradés pour leur redonner une seconde vie. Diagnostic structurel approfondi, reprise en sous-œuvre et rénovation architecturale clés en main."
  }
];

export const initialProjects = [
  {
    id: 1,
    title: "Surélévation & Structure Bois — Immeuble Kipé",
    slug: "surelevation-structure-bois-kipe",
    category: "Rénovation & Surélévation",
    categorySlug: "renovation-surelevation",
    description: "Conception, calculs de charges et extension en ossature bois sur immeuble existant avec grue de levage à Conakry.",
    location: "Conakry, Guinée",
    surface: "1 850 m²",
    duration: "En cours (Chantier actif)",
    photo_before: "/img/showcase/chantier-coffrage.png",
    photo_after: "/img/showcase/immeuble-bois-survation.png",
    is_ongoing: true,
    created_at: "2024-06-01"
  },
  {
    id: 2,
    title: "Tour Résidentielle & Commerciale Dixinn",
    slug: "tour-residentielle-dixinn",
    category: "Bâtiment collectif R+12",
    categorySlug: "batiment-collectif",
    description: "Supervision complète du gros œuvre, béton armé et montage par grue à tour pour complexe urbain.",
    location: "Dixinn, Conakry",
    surface: "6 400 m²",
    duration: "24 mois",
    photo_before: "/img/showcase/tour-grue-ciel.png",
    photo_after: "/img/showcase/complexes-modernes.png",
    is_ongoing: false,
    created_at: "2024-01-01"
  },
  {
    id: 3,
    title: "Complexe Immobilier & Bureaux Kaloum",
    slug: "complexe-immobilier-kaloum",
    category: "Mixte bureaux / commerces",
    categorySlug: "mixte-bureaux-commerces",
    description: "Modélisation BIM, étude de structure et maîtrise d'ouvrage déléguée pour siège d'affaires.",
    location: "Kaloum, Conakry",
    surface: "5 200 m²",
    duration: "18 mois",
    photo_before: "/img/showcase/architecte-bureau.png",
    photo_after: "/img/showcase/complexes-modernes.png",
    is_ongoing: false,
    created_at: "2024-02-01"
  },
  {
    id: 4,
    title: "Chantier de Gros Œuvre R+8 Almamya",
    slug: "chantier-gros-oeuvre-almamya",
    category: "Gros Œuvre & Structure",
    categorySlug: "gros-oeuvre-structure",
    description: "Coulage de dalles béton armé, ferraillage spécial et coordination OPC du chantier en plein centre-ville.",
    location: "Almamya, Conakry",
    surface: "4 100 m²",
    duration: "16 mois",
    photo_before: "/img/showcase/chantier-hauteur.png",
    photo_after: "/img/showcase/tour-grue-ciel.png",
    is_ongoing: false,
    created_at: "2024-03-01"
  },
  {
    id: 5,
    title: "Pavillon Culturel & Architecture Bioclimatique",
    slug: "pavillon-culturel-bioclimatique",
    category: "Équipement public & Culture",
    categorySlug: "equipement-public",
    description: "Conception architecturale intégrant matériaux locaux et reliefs géométriques traditionnels.",
    location: "Kindia, Guinée",
    surface: "2 200 m²",
    duration: "14 mois",
    photo_before: "/img/showcase/architecture-africaine.jpg",
    photo_after: "/img/showcase/architecture-africaine.jpg",
    is_ongoing: false,
    created_at: "2024-04-01"
  },
  {
    id: 6,
    title: "Supervision Technique & Sécurité Chantier Nongo",
    slug: "supervision-technique-nongo",
    category: "Supervision & Contrôle OPC",
    categorySlug: "supervision-opc",
    description: "Suivi quotidien par nos ingénieures et ingénieurs de chantier, contrôle qualité des matériaux et respect des normes.",
    location: "Nongo, Conakry",
    surface: "3 600 m²",
    duration: "12 mois",
    photo_before: "/img/showcase/ingenieure-chantier.png",
    photo_after: "/img/showcase/ingenieure-chantier.png",
    is_ongoing: false,
    created_at: "2024-05-01"
  },
  {
    id: 7,
    title: "Résidence de Haut Standing Lambanyi",
    slug: "residence-haut-standing-lambanyi",
    category: "Logement collectif",
    categorySlug: "logement-collectif",
    description: "Étude d'impact géotechnique, voiles en béton et finitions architecturales haute qualité.",
    location: "Lambanyi, Conakry",
    surface: "2 900 m²",
    duration: "15 mois",
    photo_before: "/img/showcase/chantier-coffrage.png",
    photo_after: "/img/showcase/complexes-modernes.png",
    is_ongoing: false,
    created_at: "2024-06-01"
  }
];

export const initialArticles = [
  {
    id: 1,
    title: "L'importance des études de sol dans le BTP en Guinée",
    slug: "importance-etudes-de-sol-btp-guinee",
    published_at: "2024-06-15",
    image: "/img/logo.png",
    content: "Dans les projets de construction en Afrique de l'Ouest, l'étude géotechnique du sol est une étape cruciale pour prévenir les affaissements et garantir la pérennité des fondations. Notre bureau d'études vous explique les étapes d'un diagnostic réussi."
  },
  {
    id: 2,
    title: "Comment optimiser le coût de votre chantier sans sacrifier la qualité",
    slug: "optimiser-cout-chantier-qualite",
    published_at: "2024-05-28",
    image: "/img/logo.png",
    content: "Grâce à une planification rigoureuse du CCTP et à l'optimisation des métrés dès la phase de conception, il est possible de réduire les coûts globaux de construction jusqu'à 15%."
  }
];

export const initialContactMessages = [
  {
    id: 1,
    name: "Mamadou Diallo",
    email: "mamadou.diallo@example.com",
    phone: "+224 620 11 22 33",
    service_requested: "Conception & Calcul de Structure",
    message: "Bonjour, j'aimerais obtenir un devis pour l'étude de structure d'un immeuble R+4 à Lambanyi.",
    created_at: "2024-07-20 14:30"
  }
];

export const initialTeamMembers = [
  {
    id: 1,
    name: "Ing. Koivogui Jeannot Délé",
    role: "Gérant",
    photo: null
  },
  {
    id: 2,
    name: "Angeline Omogu",
    role: "Assistante",
    photo: null
  },
  {
    id: 3,
    name: "Kimagna Camara",
    role: "Responsable Logistique & Services Informatiques",
    photo: null
  },
  {
    id: 4,
    name: "Me. Zina Koivogui",
    role: "Conseiller Juridique",
    photo: null
  },
  {
    id: 5,
    name: "Alpha Oumar Diallo",
    role: "Directeur Technique",
    photo: null
  },
  {
    id: 6,
    name: "Jean Sovogui",
    role: "Assistant Directeur Technique",
    photo: null
  },
  {
    id: 7,
    name: "Aminata Diallo",
    role: "Responsable Marketing & Service Client",
    photo: null
  },
  {
    id: 8,
    name: "Aminata Soumah Hassanabol",
    role: "Secrétaire",
    photo: null
  }
];

import { supabase } from "./supabase";

/**
 * Récupère les articles dynamiquement depuis le stockage local (ou Supabase).
 */
export function getStoredArticles() {
  if (typeof window === "undefined") return initialArticles;
  try {
    const saved = localStorage.getItem("best_builders_articles");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // Handling local storage error gracefully
  }
  return initialArticles;
}

/**
 * Sauvegarde les articles de manière dynamique.
 */
export function saveStoredArticles(articles) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("best_builders_articles", JSON.stringify(articles));
    window.dispatchEvent(new Event("articles_updated"));
  } catch {
    // Handling local storage write error gracefully
  }
}

/**
 * Récupère les projets dynamiquement depuis le stockage local.
 */
export function getStoredProjects() {
  if (typeof window === "undefined") return initialProjects;
  try {
    const saved = localStorage.getItem("best_builders_projects");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // Handling local storage error gracefully
  }
  return initialProjects;
}

/**
 * Sauvegarde les projets de manière dynamique.
 */
export function saveStoredProjects(projects) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("best_builders_projects", JSON.stringify(projects));
    window.dispatchEvent(new Event("projects_updated"));
  } catch {
    // Handling local storage write error gracefully
  }
}

export async function getProjects() {
  if (!supabase) return getStoredProjects();
  try {
    const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
    if (error || !data || data.length === 0) return getStoredProjects();
    return data;
  } catch {
    return getStoredProjects();
  }
}

export async function getArticles() {
  if (!supabase) return getStoredArticles();
  try {
    const { data, error } = await supabase.from('articles').select('*').order('published_at', { ascending: false });
    if (error || !data || data.length === 0) return getStoredArticles();
    return data;
  } catch {
    return getStoredArticles();
  }
}

export async function sendContactMessage(payload) {
  if (!supabase) {
    return { success: true };
  }
  try {
    const { error } = await supabase.from('contact_messages').insert([{
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      service_requested: payload.service_requested,
      message: payload.message
    }]);
    if (error) throw error;
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message || "Erreur lors de l'envoi" };
  }
}
