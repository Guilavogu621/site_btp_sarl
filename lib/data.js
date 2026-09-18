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

export const initialProjects = [];

export const initialArticles = [];

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
    name: "Jeannot Koivogui",
    role: "FONDATEUR & PDG",
    title: "Président Directeur Général & Fondateur",
    photo: "/img/team/pdg-jeannot-koivogui.jpg",
    quote: "Notre ambition fondamentale est de bâtir des ouvrages d'excellence en Guinée, en associant la rigueur scientifique d'un bureau d'études de pointe et la maîtrise parfaite des réalités de nos chantiers.",
    bio: "Fondateur et Président Directeur Général du Groupe Best Builders SARLU. Vision stratégique, management général et pilotage du développement du groupe.",
    skills: ["Direction Générale", "Management Stratégique", "Développement BTP", "Supervision de Projets"]
  },
  {
    id: 2,
    name: "Jean Baptiste Sovogui",
    role: "DIRECTEUR TECHNIQUE",
    title: "Directeur Technique & Ingénieur Structure",
    photo: "/img/team/jean-baptiste-sovogui.jpg",
    quote: "La rigueur dans les calculs de structure est la garantie première de la sécurité de nos ouvrages.",
    bio: "Supervision globale des études techniques, calculs de structure BAEL/Eurocodes et pilotage des chantiers.",
    skills: ["Ingénierie de Structure", "Eurocodes & BAEL", "Modélisation 3D BIM", "Calcul Béton Armé"]
  },
  {
    id: 3,
    name: "Kimagna Camara",
    role: "RESPONSABLE LOGISTIQUE & IT",
    title: "Responsable Logistique & IT",
    photo: "/img/team/kimagna-camara.jpg",
    quote: "Optimiser les flux de matériaux et nos outils technologiques pour assurer la réactivité de nos interventions.",
    bio: "Supervision du parc matériel, logistique d'approvisionnement des chantiers et gestion des systèmes d'information.",
    skills: ["Logistique Chantier", "Gestion de Parc Matériel", "Informatique & SI", "Approvisionnement"]
  },
  {
    id: 4,
    name: "M. Zina Koivogui",
    role: "CONSEILLER JURIDIQUE",
    title: "Juriste & Conseiller Juridique",
    photo: "/img/team/zina-koivogui.jpg",
    quote: "Sécuriser juridiquement l'ensemble des partenariats et veiller au strict respect des normes réglementaires.",
    bio: "Rédaction des contrats de marchés BTP, veille juridique réglementaire et gestion du contentieux.",
    skills: ["Droit de la Construction", "Marchés Publics & Privés", "Rédaction Contractuelle", "Veille Réglementaire"]
  },
  {
    id: 5,
    name: "Angeline Onivogui",
    role: "ASSISTANTE DE DIRECTION",
    title: "Assistante Administrative & Gestion",
    photo: "/img/team/angeline-onivogui.jpg",
    quote: "Un suivi rigoureux et attentif pour garantir la réactivité de toutes nos opérations.",
    bio: "Gestion administrative, organisation du secrétariat général et coordination des dossiers clients.",
    skills: ["Gestion Administrative", "Secrétariat", "Suivi Dossiers Clients", "Coordination"]
  },
  {
    id: 6,
    name: "Ing. Aminata Diallo",
    role: "RESPONSABLE MARKETING & RELATION CLIENT",
    title: "Responsable Marketing & Relation Client",
    photo: "/img/team/aminata-diallo.jpg",
    quote: "Une écoute attentive des besoins clients pour proposer des solutions sur-mesure.",
    bio: "Relation client, communication institutionnelle et suivi de la satisfaction commerciale du Groupe.",
    skills: ["Relation Client", "Communication BTP", "Marketing", "Suivi Commercial"]
  },
  {
    id: 7,
    name: "Hasanatou Soumah",
    role: "SECRÉTAIRE GÉNÉRALE",
    title: "Secrétaire Générale & Administration",
    photo: "/img/team/hasanatou-soumah.jpg",
    quote: "Un accueil chaleureux et une gestion documentaire rigoureuse au service de l'entreprise.",
    bio: "Gestion du secrétariat, accueil des visiteurs et organisation documentaire du bureau d'études.",
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
      // Seul `id` est exclu car GENERATED ALWAYS AS IDENTITY côté Postgres.
      // Tous les autres champs (slug, title, content, image, video_url, published_at, is_published) sont présents en DB.
      const { id: _id, ...supabasePayload } = articleData;
      const { data, error } = await supabase.from('articles').insert([supabasePayload]).select();
      if (!error && data && data.length > 0) {
        return data[0];
      }
      if (error) {
        console.error("Erreur d'insertion article Supabase :", error.message, error.details);
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
      // On exclut `id` car on ne doit pas mettre à jour la clé primaire.
      const { id: _id, ...supabasePayload } = articleData;
      await supabase.from('articles').update(supabasePayload).eq('id', id);
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
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data) {
      if (error) console.error("Erreur lecture messages Supabase :", error);
      return localData;
    }

    // Fusionner les messages Supabase et locaux non synchronisés pour ne rien perdre
    const supabaseIds = new Set(data.map((m) => m.id));
    const unsyncedLocal = localData.filter((m) => !supabaseIds.has(m.id));
    return [...data, ...unsyncedLocal];
  } catch {
    return localData;
  }
}

export async function sendContactMessage(payload) {
  const dbPayload = {
    name: payload.name,
    email: payload.email,
    phone: payload.phone,
    service_requested: payload.service_requested,
    message: payload.message
  };

  let insertedMessage = null;

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .insert([dbPayload])
        .select();

      if (!error && data && data.length > 0) {
        insertedMessage = data[0];
      } else if (error) {
        console.error("Erreur d'insertion message Supabase :", error);
      }
    } catch (err) {
      console.error("Erreur d'envoi message Supabase :", err);
    }
  }

  const localMessage = insertedMessage || {
    id: Date.now(),
    name: payload.name,
    email: payload.email,
    phone: payload.phone,
    service_requested: payload.service_requested,
    message: payload.message,
    created_at: new Date().toLocaleString("fr-FR", { dateStyle: "short", timeStyle: "short" })
  };

  // Stockage local fallback
  const current = getStoredContactMessages();
  saveStoredContactMessages([localMessage, ...current]);

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

  return { success: true, message: localMessage };
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
