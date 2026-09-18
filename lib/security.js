// Security utility for input sanitization and validation

/**
 * Nettoie une chaîne de caractères avant stockage en base de données.
 *
 * IMPORTANT : on ne fait PAS d'encodage HTML ici (pas de &amp;, &#x27;, etc.)
 * car React échappe automatiquement le contenu à l'affichage.
 * Encoder avant stockage cause l'affichage de &#x27; au lieu de l'apostrophe.
 *
 * On retire uniquement les vraies balises HTML pour prévenir l'injection XSS.
 */
export function sanitizeText(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/<[^>]*>/g, '')  // Retire les balises HTML (<script>, <img>, etc.)
    .trim();
}

export function validateEmail(email) {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
}

export function validatePhone(phone) {
  // Accepts international format +224..., spaces, digits, dashes
  const re = /^[\+\d\s\-\(\)]{8,20}$/;
  return re.test(String(phone).trim());
}

export function sanitizeContactForm(data) {
  return {
    name: sanitizeText(data.name),
    phone: sanitizeText(data.phone),
    email: sanitizeText(data.email),
    service_requested: sanitizeText(data.service_requested),
    message: sanitizeText(data.message),
  };
}
