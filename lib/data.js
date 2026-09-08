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
  { id: 1, value: "8+", label: "Années d'expérience" },
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
    image: "/img/services/conception-structure.webp",
    tagline: "Sécurité maximale & conformité aux normes internationales",
    short_description: "Études de structures en béton armé et charpente métallique certifiées conformes aux normes Eurocodes et BAEL. Nous garantissons la stabilité inébranlable de vos bâtiments tout en optimisant le tonnage d'acier et le volume de béton.",
    detailed_content: "Notre bureau d'études spécialisé modélise l'intégralité de votre structure sous logiciel 3D (BIM/Robots). Nous effectuons le calcul précis des descentes de charges, le dimensionnement des fondations (semelles, pieux) et la vérification sismique pour prévenir toute fissure ou affaissement futur.",
    highlights: [
      "Calculs certifiés BAEL & Eurocodes 8 (Normes anti-sismiques)",
      "Modélisation 3D BIM & vérification des descentes de charges",
      "Économie d'acier et béton grâce à une optimisation fine"
    ],
    guarantee: "Dossier Technique Validé Sous 72h"
  },
  {
    id: "chiffrage-economie",
    slug: "chiffrage-economie",
    title: "Chiffrage & Économie de la Construction",
    icon: "Calculator",
    image: "/img/services/chiffrage-economie.webp",
    tagline: "Zéro dépassement budgétaire sur vos chantiers",
    short_description: "Estimations budgétaires ultra-précises, avant-métrés exhaustifs et élaboration du CCTP. Nous vous évitons les surcoûts imprévus et vous aidons à négocier les meilleurs prix auprès des fournisseurs.",
    detailed_content: "L'économie de la construction est au cœur de la rentabilité de votre projet. Nous quantifions au mètre près chaque matériau (ciment, fer, agrégats, tuyauterie) et fournissons un bordereau des prix unitaires (BPU) incontestable pour verrouiller votre budget avant le premier coup de pioche.",
    highlights: [
      "Métrés exacts au m² et au kilo de fer pour zéro gaspillage",
      "Réduction des coûts globaux de 10% à 15% sans baisse de qualité",
      "Rédaction du CCTP et dossier de consultation des entreprises"
    ],
    guarantee: "Garantie Budget Verrouillé"
  },
  {
    id: "gestion-suivi-chantier",
    slug: "gestion-suivi-chantier",
    title: "Gestion & Suivi de Chantier (OPC)",
    icon: "HardHat",
    image: "/img/services/suivi-chantier.webp",
    tagline: "Supervision rigoureuse & présence quotidienne sur le terrain",
    short_description: "Maîtrise d'œuvre déléguée, coordination de tous les corps d'état et contrôle qualité rigoureux. Nos ingénieurs surveillent l'exécution au jour le jour pour garantir une livraison dans les délais stricts.",
    detailed_content: "Nos ingénieurs de chantier diplômés appliquent des protocoles d'inspection stricts à chaque étape : écrasement d'éprouvettes béton, vérification du ferraillage avant coulage, sécurité des ouvriers et comptes-rendus hebdomadaires illustrés envoyés directement au maître d'ouvrage.",
    highlights: [
      "Ingénieur dédié sur site avec rapports hebdomadaires photos/vidéos",
      "Contrôle qualité strict des matériaux livrés sur le chantier",
      "Respect strict du calendrier d'exécution et pénalités de retard évitées"
    ],
    guarantee: "Livraison Clé en Main & Dans les Délais"
  },
  {
    id: "renovation-rehabilitation",
    slug: "renovation-rehabilitation",
    title: "Rénovation, Surélévation & Réhabilitation",
    icon: "Hammer",
    image: "/img/services/renovation-batiment.webp",
    tagline: "Valorisation & renforcement durable des bâtiments existants",
    short_description: "Diagnostic de solidité des structures anciennes, reprise en sous-œuvre et modernisation esthétique. Nous transformons vos bâtiments existants en ouvrages modernes, sécurisés et durables.",
    detailed_content: "Vous souhaitez ajouter des étages (surélévation) ou rénover un bâtiment dégradé à Conakry ? Nous réalisons un audit carottage/scléromètre préalable pour tester la résistance du béton existant, puis nous concevons des renforcements en béton armé ou ossature bois haute précision.",
    highlights: [
      "Audit géotechnique & diagnostic de résistance du béton existant",
      "Surélévation légère (Structure Bois/Métal) sans surcharger les fondations",
      "Modernisation architecturale haute standing & reprise de fissures"
    ],
    guarantee: "Garantie Décennale & Conformité"
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
    photo_before: "/img/showcase/chantier-coffrage.webp",
    photo_after: "/img/showcase/immeuble-bois-survation.webp",
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
    photo_before: "/img/showcase/tour-grue-ciel.webp",
    photo_after: "/img/showcase/complexes-modernes.webp",
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
    photo_before: "/img/showcase/architecte-bureau.webp",
    photo_after: "/img/showcase/complexes-modernes.webp",
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
    photo_before: "/img/showcase/chantier-hauteur.webp",
    photo_after: "/img/showcase/tour-grue-ciel.webp",
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
    photo_before: "/img/showcase/architecture-africaine.webp",
    photo_after: "/img/showcase/architecture-africaine.webp",
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
    photo_before: "/img/showcase/ingenieure-chantier.webp",
    photo_after: "/img/showcase/ingenieure-chantier.webp",
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
    photo_before: "/img/showcase/chantier-coffrage.webp",
    photo_after: "/img/showcase/complexes-modernes.webp",
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
    name: "Ing. Koivogui Jeannot Selé",
    role: "Gérant / PDG",
    title: "Ingénieur BTP & Fondateur",
    photo: "/img/team/pdg-jeannot-koivogui.jpg",
    quote: "Notre ambition fondamentale est de bâtir des ouvrages d'excellence en Guinée, en associant la rigueur scientifique d'un bureau d'études de pointe et la maîtrise parfaite des réalités de nos chantiers.",
    bio: "Fondateur et Gérant du Groupe Best Builders. Expert en ingénierie de structures et direction de chantiers complexes en Guinée."
  },
  {
    id: 2,
    name: "Jean Baptiste Sovogui",
    role: "Assistant Directeur Technique",
    photo: "/img/team/jean-baptiste-sovogui.jpg",
    quote: "La rigueur dans les calculs de structure est la garantie première de la sécurité de nos ouvrages.",
    bio: "Ingénieur adjoint à la direction technique, spécialisé dans l'inspection de chantier et le contrôle de conformité des plans."
  },
  {
    id: 3,
    name: "Kimagna Camara",
    role: "Responsable Logistique & IT",
    photo: null,
    quote: "Optimiser les flux de matériaux et nos outils technologiques pour assurer la réactivité de nos chantiers.",
    bio: "Supervise la logistique matérielle, les approvisionnements et l'infrastructure informatique du bureau d'études."
  },
  {
    id: 4,
    name: "M. Zina Koivogui",
    role: "Conseiller Juridique",
    photo: null,
    quote: "Sécuriser juridiquement l'ensemble des partenariats et veiller au strict respect des normes réglementaires.",
    bio: "Juriste d'entreprise veillant à la conformité des contrats, des appels d'offres et du cadre réglementaire du BTP."
  },
  {
    id: 5,
    name: "Angeline Onivogui",
    role: "Assistante de Direction",
    photo: "/img/team/angeline-onivogui.jpg",
    quote: "Une organisation administrative rigoureuse au service de la performance globale du Groupe.",
    bio: "Assure la coordination générale de la direction, l'accueil des partenaires et la gestion administrative interne."
  },
  {
    id: 6,
    name: "Aminata Diallo",
    role: "Responsable Marketing & Clientèle",
    photo: null,
    quote: "Construire des relations durables basées sur la transparence, l'écoute et la satisfaction client.",
    bio: "En charge de la communication institutionnelle, de la stratégie marketing et du suivi de la relation client."
  },
  {
    id: 7,
    name: "Aminata Soumah Hassanabol",
    role: "Secrétaire",
    photo: null,
    quote: "Un accueil chaleureux et une gestion attentive pour un suivi fluide de toutes nos correspondances.",
    bio: "En charge de la gestion du secrétariat général, de la réception et de l'archivage documentaire du Groupe."
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

export async function createProject(projectData) {
  if (supabase) {
    try {
      const { data, error } = await supabase.from('projects').insert([projectData]).select();
      if (!error && data && data.length > 0) {
        return data[0];
      }
    } catch (err) {
      console.error("Erreur d'insertion projet Supabase :", err);
    }
  }
  // Fallback local
  const current = getStoredProjects();
  const created = { id: Date.now(), ...projectData };
  const updated = [created, ...current];
  saveStoredProjects(updated);
  return created;
}

export async function updateProject(id, projectData) {
  if (supabase) {
    try {
      await supabase.from('projects').update(projectData).eq('id', id);
    } catch (err) {
      console.error("Erreur de mise à jour projet Supabase :", err);
    }
  }
  const current = getStoredProjects();
  const updated = current.map((p) => (p.id === id ? { ...p, ...projectData } : p));
  saveStoredProjects(updated);
  return { id, ...projectData };
}

export async function deleteProject(id) {
  if (supabase) {
    try {
      await supabase.from('projects').delete().eq('id', id);
    } catch (err) {
      console.error("Erreur de suppression projet Supabase :", err);
    }
  }
  const current = getStoredProjects();
  const updated = current.filter((p) => p.id !== id);
  saveStoredProjects(updated);
  return true;
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

export async function createArticle(articleData) {
  if (supabase) {
    try {
      const { data, error } = await supabase.from('articles').insert([articleData]).select();
      if (!error && data && data.length > 0) {
        return data[0];
      }
    } catch (err) {
      console.error("Erreur d'insertion article Supabase :", err);
    }
  }
  // Fallback local
  const current = getStoredArticles();
  const created = { id: Date.now(), ...articleData };
  const updated = [created, ...current];
  saveStoredArticles(updated);
  return created;
}

export async function updateArticle(id, articleData) {
  if (supabase) {
    try {
      await supabase.from('articles').update(articleData).eq('id', id);
    } catch (err) {
      console.error("Erreur de mise à jour article Supabase :", err);
    }
  }
  const current = getStoredArticles();
  const updated = current.map((a) => (a.id === id ? { ...a, ...articleData } : a));
  saveStoredArticles(updated);
  return { id, ...articleData };
}

export async function deleteArticle(id) {
  if (supabase) {
    try {
      await supabase.from('articles').delete().eq('id', id);
    } catch (err) {
      console.error("Erreur de suppression article Supabase :", err);
    }
  }
  const current = getStoredArticles();
  const updated = current.filter((a) => a.id !== id);
  saveStoredArticles(updated);
  return true;
}

export function getStoredContactMessages() {
  if (typeof window === "undefined") return initialContactMessages;
  try {
    const saved = localStorage.getItem("best_builders_contact_messages");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // Handling local storage error gracefully
  }
  return initialContactMessages;
}

export function saveStoredContactMessages(messages) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("best_builders_contact_messages", JSON.stringify(messages));
    window.dispatchEvent(new Event("messages_updated"));
  } catch {
    // Handling local storage write error gracefully
  }
}

export async function getContactMessages() {
  const localMessages = getStoredContactMessages();
  if (!supabase) return localMessages;
  try {
    const { data, error } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false });
    if (error || !data || data.length === 0) return localMessages;

    // Combine remote and local unique messages
    const remoteIds = new Set(data.map((m) => m.id));
    const uniqueLocal = localMessages.filter((m) => !remoteIds.has(m.id));
    return [...uniqueLocal, ...data];
  } catch {
    return localMessages;
  }
}

export async function sendContactMessage(payload) {
  const newMessage = {
    id: Date.now(),
    name: payload.name,
    email: payload.email,
    phone: payload.phone,
    service_requested: payload.service_requested,
    message: payload.message,
    created_at: new Date().toISOString().replace('T', ' ').substring(0, 16)
  };

  // Always save locally so dashboard displays the message immediately
  const current = getStoredContactMessages();
  const updated = [newMessage, ...current];
  saveStoredContactMessages(updated);

  if (supabase) {
    try {
      await supabase.from('contact_messages').insert([{
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        service_requested: payload.service_requested,
        message: payload.message
      }]);
    } catch (err) {
      console.error("Erreur d'envoi Supabase :", err);
    }
  }

  return { success: true };
}

export async function getAdminUsers() {
  const initialUsers = [
    { id: 1, name: "Admin Principal", email: process.env.ADMIN_EMAIL || "bestbuilderssarlu@gmail.com", role: "Administrateur", status: "Actif" }
  ];
  if (!supabase) return initialUsers;
  try {
    const { data, error } = await supabase.from('admin_users').select('*').order('created_at', { ascending: false });
    if (error || !data || data.length === 0) return initialUsers;
    return data;
  } catch {
    return initialUsers;
  }
}

export async function createAdminUser(userData) {
  if (supabase) {
    try {
      const { data, error } = await supabase.from('admin_users').insert([userData]).select();
      if (!error && data && data.length > 0) {
        return data[0];
      }
    } catch (err) {
      console.error("Erreur d'insertion utilisateur Supabase :", err);
    }
  }
  return { id: Date.now(), ...userData };
}

export async function deleteAdminUser(id) {
  if (supabase) {
    try {
      await supabase.from('admin_users').delete().eq('id', id);
    } catch (err) {
      console.error("Erreur de suppression utilisateur Supabase :", err);
    }
  }
  return true;
}



