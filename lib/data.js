// Centralized Data Store for Best Builders SARLU Next.js Web Application

export const initialSiteSettings = {
  company_name: "Best Builders SARLU",
  slogan: "Bureau d'études & BTP à Conakry, Guinée",
  phone: "+224 614 60 60 79",
  email: "contact@bestbuilders224.com",
  address: "Conakry, Kipé, République de Guinée",
  about_text: "Acteur majeur du BTP en Guinée, le Groupe Best Builders s'engage à bâtir l'avenir avec rigueur et passion. Forts de notre expertise technique et de notre bureau d'études intégré, nous concevons et réalisons des infrastructures d'envergure répondant aux normes internationales."
};

export const initialStats = [
  { id: 1, value: "8+", label: "Années d'expertise BTP" },
  { id: 2, value: "15+", label: "Chantiers & Études de référence" },
  { id: 3, value: "15+", label: "Ingénieurs & Techniciens qualifiés" },
  { id: 4, value: "100%", label: "Conformité aux normes BAEL / Eurocodes" }
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
    tagline: "Rigueur technique & sécurité renforcée sur site",
    short_description: "Études de structures en béton armé et charpente métallique certifiées conformes aux normes Eurocodes et BAEL. Nous garantissons la stabilité de vos bâtiments tout en optimisant le tonnage d'acier et le volume de béton.",
    detailed_content: "Notre bureau d'études spécialisé modélise l'intégralité de votre structure sous logiciel 3D (BIM/Robots). Nous effectuons le calcul précis des descentes de charges, le dimensionnement des fondations (semelles, pieux) et la vérification sismique pour prévenir toute fissure ou affaissement futur.",
    highlights: [
      "Calculs conformes BAEL & Eurocodes 8 (Normes anti-sismiques)",
      "Modélisation 3D BIM & vérification des descentes de charges",
      "Optimisation des métrés et du ferraillage dès la phase de conception"
    ],
    guarantee: "Retour technique sous 72 h ouvrées"
  },
  {
    id: "chiffrage-economie",
    slug: "chiffrage-economie",
    title: "Chiffrage & Économie de la Construction",
    icon: "Calculator",
    image: "/img/services/chiffrage-economie.webp",
    tagline: "Maîtrise budgétaire : alerte formelle dès 3 % d'écart",
    short_description: "Estimations budgétaires rigoureuses, avant-métrés exhaustifs et élaboration du CCTP. Nous vous évitons les surcoûts imprévus et vous aidons à négocier les meilleurs prix auprès des fournisseurs.",
    detailed_content: "L'économie de la construction est au cœur de la rentabilité de votre projet. Nous quantifions au mètre près chaque matériau (ciment, fer, agrégats, tuyauterie) et fournissons un bordereau des prix unitaires (BPU) incontestable pour sécuriser votre budget.",
    highlights: [
      "Métrés exacts au m² et au kilo de fer pour zéro gaspillage",
      "Optimisation des métrés et du ferraillage dès la conception",
      "Rédaction du CCTP et dossier de consultation des entreprises"
    ],
    guarantee: "Suivi Budgétaire Transparent"
  },
  {
    id: "gestion-suivi-chantier",
    slug: "gestion-suivi-chantier",
    title: "Gestion & Suivi de Chantier (OPC)",
    icon: "HardHat",
    image: "/img/services/suivi-chantier.webp",
    tagline: "Supervision rigoureuse & présence sur le terrain",
    short_description: "Maîtrise d'œuvre déléguée, coordination de tous les corps d'état et contrôle qualité rigoureux. Nos ingénieurs surveillent l'exécution au jour le jour pour garantir une livraison conforme.",
    detailed_content: "Nos ingénieurs de chantier diplômés appliquent des protocoles d'inspection stricts à chaque étape : écrasement d'éprouvettes béton, vérification du ferraillage avant coulage, sécurité des ouvriers et comptes-rendus hebdomadaires illustrés envoyés directement au maître d'ouvrage.",
    highlights: [
      "Ingénieur dédié sur site avec rapports hebdomadaires photos/vidéos",
      "Contrôle qualité strict des matériaux livrés sur le chantier",
      "Suivi rigoureux du planning contractuel d'exécution"
    ],
    guarantee: "Livraison & Suivi Conforme au Planning"
  },
  {
    id: "renovation-rehabilitation",
    slug: "renovation-rehabilitation",
    title: "Rénovation, Surélévation & Réhabilitation",
    icon: "Hammer",
    image: "/img/services/renovation-batiment.webp",
    tagline: "Valorisation & renforcement durable des bâtiments existants",
    short_description: "Diagnostic de solidité des structures anciennes, reprise en sous-œuvre et modernisation esthétique. Nous transformons vos bâtiments existants en ouvrages modernes et sécurisés.",
    detailed_content: "Vous souhaitez ajouter des étages (surélévation) ou rénover un bâtiment dégradé à Conakry ? Nous réalisons un audit carottage/scléromètre préalable pour tester la résistance du béton existant, puis nous concevons des renforcements en béton armé ou ossature bois haute précision.",
    highlights: [
      "Audit géotechnique & diagnostic de résistance du béton existant",
      "Surélévation légère (Structure Bois/Métal) sans surcharger les fondations",
      "Modernisation architecturale haut standing & reprise de fissures"
    ],
    guarantee: "Expertise & Conformité aux Normes"
  }
];

export const initialProjects = [
  {
    id: 1,
    title: "Immeuble R+7 Résidentiel & Haut Standing — Minière",
    slug: "immeuble-r7-residentiel-miniere",
    category: "Bâtiment collectif R+7",
    categorySlug: "gros-oeuvre",
    description: "Conception, calculs de structure et réalisation intégrale d'un immeuble résidentiel haut standing R+7 à Minière.",
    location: "Minière, Conakry, Guinée",
    surface: "3 400 m²",
    duration: "18 mois",
    photo_before: "/img/showcase/immeuble-r7-miniere.jpg",
    photo_after: "/img/showcase/immeuble-r7-miniere.jpg",
    is_ongoing: false,
    created_at: "2024-04-01"
  },
  {
    id: 2,
    title: "Surélévation & Extension Ossature Bois — Kipé",
    slug: "surelevation-structure-bois-kipe",
    category: "Rénovation & Surélévation",
    categorySlug: "renovation-surelevation",
    description: "Conception, calculs de charges et extension en ossature bois sur immeuble existant avec grue de levage à Conakry.",
    location: "Kipé, Conakry, Guinée",
    surface: "1 850 m²",
    duration: "Chantier actif",
    photo_before: "/img/showcase/chantier-coffrage.webp",
    photo_after: "/img/showcase/immeuble-bois-survation.webp",
    is_ongoing: true,
    created_at: "2024-06-01"
  },
  {
    id: 3,
    title: "Supervision Technique & Contrôle Qualité OPC — Nongo",
    slug: "supervision-technique-nongo",
    category: "Supervision & Contrôle OPC",
    categorySlug: "supervision-opc",
    description: "Suivi quotidien par nos ingénieures et ingénieurs de chantier, contrôle qualité des matériaux et respect des normes.",
    location: "Nongo, Conakry, Guinée",
    surface: "3 600 m²",
    duration: "12 mois",
    photo_before: "/img/showcase/ingenieure-chantier.webp",
    photo_after: "/img/showcase/ingenieure-chantier.webp",
    is_ongoing: false,
    created_at: "2024-05-01"
  },
  {
    id: 4,
    title: "Chantier Gros Œuvre & Hauteur (Almamya)",
    slug: "chantier-gros-oeuvre-almamya",
    category: "Gros Œuvre & Structure",
    categorySlug: "gros-oeuvre-structure",
    description: "Coulage de dalles béton armé, ferraillage spécial et coordination OPC d'un chantier de structure en centre-ville.",
    location: "Almamya, Conakry, Guinée",
    surface: "4 100 m²",
    duration: "16 mois",
    photo_before: "/img/showcase/chantier-hauteur.webp",
    photo_after: "/img/showcase/tour-grue-ciel.webp",
    is_ongoing: false,
    created_at: "2024-03-01"
  }
  /* TODO CLIENT: Fournir des photos réelles uniques pour réactiver les projets complémentaires ci-dessous :
  - Tour Dixinn
  - Complexe Kaloum
  - Résidence Lambanyi
  */
];

export const initialArticles = [
  {
    id: 1,
    title: "Coulage des dalles & Suivi du Chantier R+7 à Minière",
    slug: "coulage-dalles-suivi-chantier-r7-miniere",
    published_at: "2026-02-15",
    image: "/img/showcase/immeuble-r7-miniere.jpg",
    /* TODO CLIENT: Fournir l'URL de la vraie vidéo YouTube du chantier Minière */
    video_url: "",
    content: "Retrouvez les étapes clés du coulage de dalles en béton armé et le montage de la structure de l'immeuble R+7 réalisé par le Groupe Best Builders à la Minière."
  },
  {
    id: 2,
    title: "L'importance des études de sol dans le BTP en Guinée",
    slug: "importance-etudes-de-sol-btp-guinee",
    published_at: "2026-01-20",
    image: "/img/logo.png",
    video_url: "",
    content: "Dans les projets de construction en Afrique de l'Ouest, l'étude géotechnique du sol est une étape cruciale pour prévenir les affaissements et garantir la pérennité des fondations. Notre bureau d'études vous explique les étapes d'un diagnostic réussi."
  },
  {
    id: 3,
    title: "Comment optimiser le coût de votre chantier sans sacrifier la qualité",
    slug: "optimiser-cout-chantier-qualite",
    published_at: "2026-01-05",
    image: "/img/logo.png",
    video_url: "",
    content: "Grâce à une planification rigoureuse du CCTP et à l'optimisation des métrés dès la phase de conception, il est possible de réduire les coûts globaux de construction de manière significative."
  }
];

export const initialContactMessages = [
  {
    id: 1,
    name: "Mamadou Diallo",
    email: "contact@bestbuilders224.com",
    phone: "+224 620 11 22 33",
    service_requested: "Conception & Calcul de Structure",
    message: "Bonjour, j'aimerais obtenir un devis pour l'étude de structure d'un immeuble R+4 à Lambanyi.",
    created_at: "2026-02-20 14:30"
  }
];

export const initialTeamMembers = [
  {
    id: 1,
    name: "Ing. Koivogui Jeannot Selé",
    role: "Gérant / PDG",
    title: "Ingénieur BTP & Fondateur",
    photo: "/img/team/pdg-jeannot-koivogui.jpg?v=2",
    quote: "Notre ambition fondamentale est de bâtir des ouvrages d'excellence en Guinée, en associant la rigueur scientifique d'un bureau d'études de pointe et la maîtrise parfaite des réalités de nos chantiers.",
    bio: "Fondateur et Gérant du Groupe Best Builders. Expert en ingénierie de structures et direction de chantiers complexes en Guinée.",
    skills: ["Direction Générale", "Calcul de Structure", "Management de Projet", "Stratégie BTP"]
  },
  {
    id: 2,
    name: "Jean Baptiste Sovogui",
    role: "Directeur Technique",
    title: "Directeur Technique & Ingénieur Structure",
    photo: "/img/team/jean-baptiste-sovogui.jpg?v=2",
    quote: "La rigueur dans les calculs de structure est la garantie première de la sécurité de nos ouvrages.",
    bio: "Supervision globale des études techniques, calculs de structure BAEL/Eurocodes et pilotage des équipes d'ingénierie.",
    skills: ["Ingénierie de Structure", "Eurocodes & BAEL", "Modélisation 3D BIM", "Calcul Béton Armé"]
  },
  {
    id: 3,
    name: "Mohamed Camara",
    role: "Ingénieur Suivi de Chantier",
    title: "Ingénieur Génie Civil — OPC",
    photo: "/img/team/mohamed-camara.jpg?v=2",
    quote: "Un suivi de chantier rigoureux au quotidien est la clé pour respecter les délais et les normes de sécurité.",
    bio: "Gestion opérationnelle sur le terrain, suivi du planning d'exécution et contrôle qualité des matériaux livrés.",
    skills: ["Conduite de Chantier", "Supervision OPC", "Contrôle Qualité Béton", "Sécurité HSE"]
  },
  {
    id: 4,
    name: "Aïssatou Bah",
    role: "Ingénieure Calcul de Structure",
    title: "Ingénieure d'Études BIM",
    photo: "/img/team/aissatou-bah.jpg?v=2",
    quote: "L'optimisation des structures permet de concilier sécurité absolue et économie intelligente des matériaux.",
    bio: "Spécialiste de la descente de charges, de la modélisation 3D des structures et du dimensionnement des armatures.",
    skills: ["Calcul de Structure", "Modélisation Robot 3D", "Économie des Matériaux", "BIM Autocad"]
  },
  {
    id: 5,
    name: "Kewoulobe Selé",
    role: "Responsable Informatique & SI",
    title: "Ingénieur Réseaux & SI",
    photo: "/img/team/kewoulobe-sele.jpg?v=2",
    quote: "La numérisation des processus et la sécurité de nos données garantissent une réactivité optimale avec nos partenaires.",
    bio: "Gestion des systèmes d'information, des outils logiciels de calcul BTP et de l'infrastructure numérique du Groupe.",
    skills: ["Systèmes d'Information", "Sécurité Numérique", "Gestion des Outils BTP", "Infrastructure IT"]
  },
  {
    id: 6,
    name: "Mariam Sylla",
    role: "Assistante de Direction",
    title: "Secrétaire Générale & Administration",
    photo: "/img/team/mariam-sylla.jpg?v=2",
    quote: "Un accueil chaleureux et une gestion attentive pour un suivi fluide de toutes nos correspondances.",
    bio: "En charge de la gestion du secrétariat général, de la réception et de l'archivage documentaire du Groupe.",
    skills: ["Secrétariat Général", "Accueil & Standard", "Archivage Numérique", "Gestion du Courrier"]
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
    if (saved !== null) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) return parsed;
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
  } catch (err) {
    console.warn("Erreur de sauvegarde localStorage (Quota mémoire dépassé) :", err);
    try {
      const sanitized = articles.map(a => ({
        ...a,
        video_url: (a.video_url && a.video_url.startsWith("data:")) ? "" : a.video_url
      }));
      localStorage.setItem("best_builders_articles", JSON.stringify(sanitized));
      window.dispatchEvent(new Event("articles_updated"));
    } catch {
      // Ignorer l'erreur secondaire
    }
  }
}

/**
 * Récupère les projets dynamiquement depuis le stockage local.
 */
export function getStoredProjects() {
  if (typeof window === "undefined") return initialProjects;
  try {
    const saved = localStorage.getItem("best_builders_projects");
    if (saved !== null) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) return parsed;
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
  const localData = getStoredProjects();
  if (!supabase) return localData;
  try {
    const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
    if (error || !data) return localData;
    return data;
  } catch {
    return localData;
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
  const localData = getStoredArticles();
  if (!supabase) return localData;
  try {
    const { data, error } = await supabase.from('articles').select('*').order('published_at', { ascending: false });
    if (error || !data) return localData;
    return data;
  } catch {
    return localData;
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

/**
 * Récupère les messages de contact dynamiquement depuis le stockage local.
 */
export function getStoredContactMessages() {
  if (typeof window === "undefined") return initialContactMessages;
  try {
    const saved = localStorage.getItem("best_builders_contact_messages");
    if (saved !== null) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // Handling local storage error gracefully
  }
  return initialContactMessages;
}

/**
 * Sauvegarde les messages de contact.
 */
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
  const localData = getStoredContactMessages();
  if (!supabase) return localData;
  try {
    const { data, error } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false });
    if (error || !data) return localData;
    return data;
  } catch {
    return localData;
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
    created_at: new Date().toLocaleString("fr-FR", { dateStyle: "short", timeStyle: "short" })
  };

  if (supabase) {
    try {
      await supabase.from('contact_messages').insert([newMessage]);
    } catch (err) {
      console.error("Erreur d'envoi message Supabase :", err);
    }
  }

  // Stockage local
  const current = getStoredContactMessages();
  saveStoredContactMessages([newMessage, ...current]);

  // Notification Email automatique via /api/notify
  try {
    await fetch("/api/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
  } catch (err) {
    console.warn("Échec de l'appel API notify (l'email sera envoyé dès configuration SMTP) :", err);
  }

  return { success: true, message: newMessage };
}

export async function deleteContactMessage(id) {
  if (supabase) {
    try {
      await supabase.from('contact_messages').delete().eq('id', id);
    } catch (err) {
      console.error("Erreur de suppression message Supabase :", err);
    }
  }
  const current = getStoredContactMessages();
  const updated = current.filter((m) => m.id !== id);
  saveStoredContactMessages(updated);
  return true;
}

// -------------------------------------------------------------
// ÉQUIPEMENTS & OUTILLAGE STATIQUES
// -------------------------------------------------------------
export const initialEquipments = [
  {
    id: 1,
    slug: "vibrateur-beton-haute-frequence",
    title: "Vibrateur à Béton Haute Fréquence",
    category: "Malaxage & Béton",
    type: "both",
    price_sale: "Sur devis",
    price_rent: "250 000 GNF / jour",
    condition: "Neuf / Excellent état",
    brand: "Enar / Wacker Neuson",
    model: "AVM 38",
    specs: "Aiguille vibrante Ø38mm, moteur thermique essence 5.5 CV. Idéal pour le serrage des dalles, voiles et poteaux en béton armé.",
    image: "/img/equipments/vibrateur-beton.jpg",
    is_available: true
  },
  {
    id: 2,
    slug: "betonniere-chantier-350l",
    title: "Bétonnière de Chantier 350 Litres",
    category: "Malaxage & Béton",
    type: "both",
    price_sale: "Sur devis",
    price_rent: "400 000 GNF / jour",
    condition: "Bon état",
    brand: "Imer",
    model: "Syntesi 350",
    specs: "Capacité de cuve 350L (rendement de malaxage 280L). Moteur diesel Yanmar démarrage électrique, tractable sur chantier.",
    image: "/img/equipments/betonniere-chantier.jpg",
    is_available: true
  },
  {
    id: 3,
    slug: "echafaudage-metallique-tubulaire",
    title: "Échafaudage Métallique Tubulaire (Lot de 100m²)",
    category: "Échafaudage & Sécurité",
    type: "both",
    price_sale: "Sur devis",
    price_rent: "1 500 000 GNF / mois (par 100m²)",
    condition: "Certifié conforme",
    brand: "Comabi",
    model: "R200 Progress",
    specs: "Cadres en acier galvanisé, planchers alu/bois avec trappes, garde-corps de sécurité et vérins de réglage de niveau.",
    image: "/img/equipments/echafaudage-metallique.jpg",
    is_available: true
  },
  {
    id: 4,
    slug: "etais-metalliques-telescopiques",
    title: "Étais Métalliques Téléscopiques 3.50m (Le lot)",
    category: "Coffrage & Soutènement",
    type: "both",
    price_sale: "Sur devis",
    price_rent: "15 000 GNF / pièce / mois",
    condition: "Très bon état",
    brand: "Doka / Peri",
    model: "Eco 350",
    specs: "Hauteur réglable de 2.00m à 3.50m. Capacité de charge jusqu'à 2.5 tonnes par étai. Indispensable pour le coulage de dalles.",
    image: "/img/equipments/etais-metalliques.jpg",
    is_available: true
  }
];

export function getStoredEquipments() {
  if (typeof window === "undefined") return initialEquipments;
  try {
    const saved = localStorage.getItem("best_builders_equipments");
    if (saved !== null) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // Handling local storage error gracefully
  }
  return initialEquipments;
}

export function saveStoredEquipments(equipments) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("best_builders_equipments", JSON.stringify(equipments));
    window.dispatchEvent(new Event("equipments_updated"));
  } catch {
    // Handling local storage write error gracefully
  }
}

export async function getEquipments() {
  const localData = getStoredEquipments();
  if (!supabase) return localData;
  try {
    const { data, error } = await supabase.from('equipments').select('*').order('created_at', { ascending: false });
    if (error || !data || data.length === 0) return localData;
    return data;
  } catch {
    return localData;
  }
}

export async function createEquipment(equipmentData) {
  if (supabase) {
    try {
      const { data, error } = await supabase.from('equipments').insert([equipmentData]).select();
      if (!error && data && data.length > 0) {
        return data[0];
      }
    } catch (err) {
      console.error("Erreur d'insertion équipement Supabase :", err);
    }
  }
  const current = getStoredEquipments();
  const created = { id: Date.now(), ...equipmentData };
  const updated = [created, ...current];
  saveStoredEquipments(updated);
  return created;
}

export async function updateEquipment(id, equipmentData) {
  if (supabase) {
    try {
      await supabase.from('equipments').update(equipmentData).eq('id', id);
    } catch (err) {
      console.error("Erreur de mise à jour équipement Supabase :", err);
    }
  }
  const current = getStoredEquipments();
  const updated = current.map((e) => (e.id === id ? { ...e, ...equipmentData } : e));
  saveStoredEquipments(updated);
  return { id, ...equipmentData };
}

export async function deleteEquipment(id) {
  if (supabase) {
    try {
      await supabase.from('equipments').delete().eq('id', id);
    } catch (err) {
      console.error("Erreur de suppression équipement Supabase :", err);
    }
  }
  const current = getStoredEquipments();
  const updated = current.filter((e) => e.id !== id);
  saveStoredEquipments(updated);
  return true;
}
