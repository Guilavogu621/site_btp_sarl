// Security utility for input sanitization and validation

export function sanitizeText(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
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
