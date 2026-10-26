// Centralized Data Store for Best Builders SARLU Next.js Web Application

export const initialSiteSettings = {
  company_name: "Best Builders SARLU",
  slogan: "Bureau d'études & BTP à Conakry, Guinée",
  phone: "+224 614 60 60 79",
  email: "bestbuilderssarlu@gmail.com",
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
    email: "bestbuilderssarlu@gmail.com",
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

// -------------------------------------------------------------
// ACCÈS SUPABASE (articles, projets, équipements)
// Toutes les écritures passent par Supabase. En cas d'échec, une
// erreur claire est levée : plus de sauvegarde silencieuse dans le
// navigateur (qui faisait croire à une publication réussie).
// -------------------------------------------------------------

/** Traduit une erreur Supabase en message compréhensible. */
function toFriendlyError(error, action) {
  const code = error?.code;
  let message = error?.message || "Erreur inconnue";
  if (code === "42501" || /row-level security/i.test(message)) {
    message = "Accès refusé : votre session administrateur a expiré. Déconnectez-vous puis reconnectez-vous.";
  } else if (code === "23505") {
    message = "Un élément avec le même identifiant (slug) existe déjà. Modifiez légèrement le titre.";
  } else if (/payload too large|413|request entity too large/i.test(message)) {
    message = "Le contenu est trop lourd (photos/vidéo). Réduisez les fichiers ou utilisez un lien YouTube pour la vidéo.";
  } else if (/Failed to fetch|NetworkError/i.test(message)) {
    message = "Connexion à Supabase impossible. Vérifiez votre connexion internet.";
  }
  const err = new Error(`${action} : ${message}`);
  err.code = code;
  return err;
}

/** Extrait le nom d'une colonne absente de la base (ex. migration non appliquée). */
function getMissingColumn(error) {
  if (!error) return null;
  const match = (error.message || "").match(/Could not find the '([^']+)' column/i)
    || (error.message || "").match(/column [\w.]*?\.?"?(\w+)"? does not exist/i);
  return match ? match[1] : null;
}

/** Vérifie qu'une session admin est active avant toute écriture. */
async function requireAdminSession(action) {
  if (!supabase) {
    throw new Error(`${action} : Supabase n'est pas configuré (variables d'environnement manquantes).`);
  }
  const { data } = await supabase.auth.getSession();
  if (!data?.session) {
    throw new Error(`${action} : vous n'êtes plus connecté. Reconnectez-vous au dashboard.`);
  }
}

/**
 * Exécute une écriture et réessaie sans les colonnes absentes de la base,
 * pour que la publication fonctionne même si une migration manque.
 */
async function writeWithColumnFallback(run, payload, action) {
  let current = { ...payload };
  for (let attempt = 0; attempt < 5; attempt++) {
    const { data, error } = await run(current);
    if (!error) return data;
    const missing = getMissingColumn(error);
    if (missing && missing in current) {
      console.warn(`Colonne "${missing}" absente en base : exécutez la migration Supabase. Enregistrement sans ce champ.`);
      const { [missing]: _removed, ...rest } = current;
      current = rest;
      continue;
    }
    throw toFriendlyError(error, action);
  }
  throw new Error(`${action} : trop de colonnes manquantes en base. Exécutez la migration Supabase.`);
}

async function listRows(table, orderBy) {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase.from(table).select("*").order(orderBy, { ascending: false });
    if (error) {
      console.error(`Erreur lecture ${table} Supabase :`, error);
      return null;
    }
    return data || [];
  } catch (err) {
    console.error(`Erreur de connexion Supabase ${table} :`, err);
    return null;
  }
}

async function insertRow(table, rowData, label) {
  const action = `Publication ${label} impossible`;
  await requireAdminSession(action);
  const { id: _id, ...payload } = rowData;
  const data = await writeWithColumnFallback(
    (p) => supabase.from(table).insert([p]).select(),
    payload,
    action
  );
  if (!data || data.length === 0) {
    throw new Error(`${action} : Supabase n'a rien enregistré (droits insuffisants).`);
  }
  return data[0];
}

async function updateRow(table, id, rowData, label) {
  const action = `Mise à jour ${label} impossible`;
  await requireAdminSession(action);
  const { id: _id, created_at: _c, ...payload } = rowData;
  const data = await writeWithColumnFallback(
    (p) => supabase.from(table).update(p).eq("id", id).select(),
    payload,
    action
  );
  // RLS bloque silencieusement : 0 ligne modifiée sans erreur.
  if (!data || data.length === 0) {
    throw new Error(`${action} : aucune ligne modifiée (élément introuvable ou session expirée).`);
  }
  return data[0];
}

async function deleteRow(table, id, label) {
  const action = `Suppression ${label} impossible`;
  await requireAdminSession(action);
  const { data, error } = await supabase.from(table).delete().eq("id", id).select("id");
  if (error) throw toFriendlyError(error, action);
  if (!data || data.length === 0) {
    throw new Error(`${action} : aucune ligne supprimée (élément introuvable ou session expirée).`);
  }
  return true;
}

/** Génère un slug unique (le slug est UNIQUE en base). */
export function makeSlug(title, fallback = "element") {
  const base = String(title || "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60) || fallback;
  return `${base}-${Date.now().toString(36)}`;
}

// --- Projets ---
export async function getProjects() {
  const data = await listRows("projects", "created_at");
  return data ?? initialProjects;
}
export const createProject = (data) => insertRow("projects", data, "du projet");
export const updateProject = (id, data) => updateRow("projects", id, data, "du projet");
export const deleteProject = (id) => deleteRow("projects", id, "du projet");

// --- Articles ---
export async function getArticles() {
  const data = await listRows("articles", "published_at");
  return data ?? initialArticles;
}
export const createArticle = (data) => insertRow("articles", data, "de l'article");
export const updateArticle = (id, data) => updateRow("articles", id, data, "de l'article");
export const deleteArticle = (id) => deleteRow("articles", id, "de l'article");

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
  } catch (readErr) {
    console.warn("Erreur de lecture localStorage messages :", readErr);
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
  } catch (writeErr) {
    console.error("Erreur d'écriture localStorage messages :", writeErr);
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
  } catch (err) {
    console.error("Erreur de connexion Supabase messages :", err);
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

/**
 * Équipements. Sur le site public, la liste de démonstration s'affiche
 * tant que la base est vide. Le dashboard passe { fallback: false } pour
 * ne voir que les vrais équipements enregistrés.
 */
export async function getEquipments({ fallback = true } = {}) {
  const data = await listRows("equipments", "created_at");
  if (!fallback) return data ?? [];
  return data && data.length > 0 ? data : initialEquipments;
}
export const createEquipment = (data) => insertRow("equipments", data, "de l'équipement");
export const updateEquipment = (id, data) => updateRow("equipments", id, data, "de l'équipement");
export const deleteEquipment = (id) => deleteRow("equipments", id, "de l'équipement");
