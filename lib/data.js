// Centralized Data Store for Best Builders SARLU Next.js Web Application

export const initialSiteSettings = {
  company_name: "Best Builders SARLU",
  slogan: "Bureau d'études & BTP à Conakry, Guinée",
  phone: "+224 614 00 00 00",
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
    short_description: "Études de structures en béton armé et charpente métallique conformes aux normes Eurocodes/BAEL.",
    detailed_content: "Notre bureau d'études réalise l'intégralité de la conception structurelle de vos ouvrages. Nous calculons les armatures, modélisons les contraintes et garantissons la stabilité globale de vos bâtiments résidentiels, tertiaires et industriels."
  },
  {
    id: "chiffrage-economie",
    slug: "chiffrage-economie",
    title: "Chiffrage & Économie de la Construction",
    icon: "Calculator",
    short_description: "Estimations budgétaires rigoureuses, avant-métrés détaillés et optimisation des coûts de vos projets.",
    detailed_content: "L'économie de la construction est au cœur de notre démarche. Nous élaborons le CCTP, quantifions exactement les besoins en matériaux et prévenons tout dépassement budgétaire en cours de chantier."
  },
  {
    id: "gestion-suivi-chantier",
    slug: "gestion-suivi-chantier",
    title: "Gestion & Suivi de Chantier",
    icon: "HardHat",
    short_description: "Maîtrise d'œuvre, ordonnancement, pilotage et coordination (OPC) des travaux jusqu'à la réception.",
    detailed_content: "Nos ingénieurs de chantier assurent une présence constante sur le terrain. Nous coordonnons les différents corps d'état, contrôlons la qualité des matériaux livrés et veillons au respect strict du calendrier d'exécution."
  },
  {
    id: "renovation-rehabilitation",
    slug: "renovation-rehabilitation",
    title: "Rénovation & Réhabilitation",
    icon: "Hammer",
    short_description: "Audit technique des structures existantes, renforcement et modernisation de bâtiments.",
    detailed_content: "Nous intervenons sur les bâtiments anciens ou dégradés pour leur redonner une seconde vie. Diagnostic structurel approfondi, reprise en sous-œuvre et rénovation architecturale clés en main."
  }
];

export const initialProjects = [
  {
    id: 1,
    title: "Chantier de Fondations Spéciales & Coffrage",
    slug: "fondations-speciales-coffrage",
    category: "Bâtiment industriel",
    categorySlug: "batiment-industriel",
    description: "Terrassement, ferraillage haute densité et coffrage pour complexe immobilier R+6 à Conakry.",
    location: "Conakry, Guinée",
    surface: "3 500 m²",
    duration: "En cours (Chantier actif)",
    photo_before: "/img/projects/fondations-chantiers-real.jpg",
    photo_after: "/img/projects/fondations-chantiers-hd.jpg",
    is_ongoing: true,
    created_at: "2024-06-01"
  },
  {
    id: 2,
    title: "École Dixinn",
    slug: "ecole-dixinn",
    category: "Équipement public",
    categorySlug: "equipement-public",
    description: "Construction d'un établissement scolaire moderne de 12 classes à Dixinn, Conakry.",
    location: "Conakry",
    surface: "1 200 m²",
    duration: "18 mois",
    photo_before: "/img/projects/fondations-chantiers-hd.jpg",
    photo_after: "/img/projects/fondations-chantiers-hd.jpg",
    is_ongoing: false,
    created_at: "2024-01-01"
  },
  {
    id: 3,
    title: "Entrepôt Manéah",
    slug: "entrepot-maneah",
    category: "Bâtiment industriel",
    categorySlug: "batiment-industriel",
    description: "Conception et suivi de la construction d'un entrepôt logistique haute performance à Manéah.",
    location: "Manéah",
    surface: "2 500 m²",
    duration: "12 mois",
    photo_before: "/img/logo.png",
    photo_after: "/img/logo.png",
    is_ongoing: false,
    created_at: "2024-02-01"
  },
  {
    id: 4,
    title: "Immeuble Almamya",
    slug: "immeuble-almamya",
    category: "Mixte bureaux / commerces",
    categorySlug: "mixte-bureaux-commerces",
    description: "Immeuble R+5 mixte bureaux et espaces commerciaux en plein cœur du quartier d'affaires d'Almamya.",
    location: "Conakry",
    surface: "3 800 m²",
    duration: "24 mois",
    photo_before: "/img/logo.png",
    photo_after: "/img/logo.png",
    is_ongoing: false,
    created_at: "2024-03-01"
  },
  {
    id: 5,
    title: "Résidence Kaporo",
    slug: "residence-kaporo",
    category: "Logement collectif",
    categorySlug: "logement-collectif",
    description: "Résidence de haut standing comprenant 40 appartements avec parking souterrain à Kaporo.",
    location: "Conakry",
    surface: "4 200 m²",
    duration: "30 mois",
    photo_before: "/img/logo.png",
    photo_after: "/img/logo.png",
    is_ongoing: false,
    created_at: "2024-04-01"
  },
  {
    id: 6,
    title: "Siège Socoprim",
    slug: "siege-socoprim",
    category: "Bâtiment tertiaire",
    categorySlug: "batiment-tertiaire",
    description: "Immeuble de bureaux pour le siège social régional de Socoprim à Kindia.",
    location: "Kindia",
    surface: "1 800 m²",
    duration: "14 mois",
    photo_before: "/img/logo.png",
    photo_after: "/img/logo.png",
    is_ongoing: false,
    created_at: "2024-05-01"
  },
  {
    id: 7,
    title: "Villa Nongo",
    slug: "villa-nongo",
    category: "Habitat individuel",
    categorySlug: "habitat-individuel",
    description: "Conception bioclimatique et suivi de chantier pour une villa individuelle d'architecte à Nongo.",
    location: "Conakry",
    surface: "650 m²",
    duration: "10 mois",
    photo_before: "/img/logo.png",
    photo_after: "/img/logo.png",
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
    title: "Comment optimiser le coût de votre chantier sans sacrifier la qualité",
    slug: "optimiser-cout-chantier-qualite",
    id: 2,
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

/**
 * Équipe dirigeante de Best Builders SARLU.
 * Les photos seront ajoutées ultérieurement par l'administration.
 * Pour mettre à jour une photo : remplacer le champ `photo` par le chemin de l'image (ex: "/img/equipe/nom.jpg").
 */
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
    name: "Jean S. le Sorogui",
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
 * Charge les projets depuis Supabase ou renvoie les données statiques si non configuré.
 */
export async function getProjects() {
  if (!supabase) return initialProjects;
  try {
    const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
    if (error || !data || data.length === 0) return initialProjects;
    return data;
  } catch {
    return initialProjects;
  }
}

/**
 * Charge les articles depuis Supabase ou renvoie les données statiques.
 */
export async function getArticles() {
  if (!supabase) return initialArticles;
  try {
    const { data, error } = await supabase.from('articles').select('*').order('published_at', { ascending: false });
    if (error || !data || data.length === 0) return initialArticles;
    return data;
  } catch {
    return initialArticles;
  }
}

/**
 * Soumet un message de contact dans Supabase de manière sécurisée.
 */
export async function sendContactMessage(payload) {
  if (!supabase) {
    console.log("Supabase non connecté, message simulé :", payload);
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
    console.error("Erreur d'envoi Supabase :", err);
    return { success: false, error: err.message };
  }
}

