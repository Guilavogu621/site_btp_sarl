import { Ruler, Calculator, HardHat, Hammer } from "lucide-react";

/**
 * Mapping des icônes Lucide pour les services BTP.
 */
export const serviceIconMap = {
  Ruler: Ruler,
  Calculator: Calculator,
  HardHat: HardHat,
  Hammer: Hammer,
};

/**
 * Génère les initiales d'un nom complet (max 2 lettres).
 * Ex: "Ing. Koivogui Jeannot Délé" -> "KJ"
 * @param {string} fullName - Le nom complet
 * @returns {string} Les initiales en majuscules
 */
export function getInitials(fullName) {
  if (!fullName || typeof fullName !== "string") return "?";
  const cleaned = fullName
    .replace(/^(Ing\.|Me\.|Dr\.|Prof\.)\s*/i, "")
    .trim();
  const words = cleaned.split(/\s+/).filter(Boolean);
  if (words.length === 0) return "?";
  if (words.length === 1) return words[0].charAt(0).toUpperCase();
  return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
}

/**
 * Compresse et redimensionne une image en canvas pour éviter d'exploser le quota localStorage ou la mémoire navigateur.
 * @param {string} dataUrl - L'image au format data:image/...
 * @param {number} maxWidth - Largeur maximale (par défaut 1200px)
 * @param {number} maxHeight - Hauteur maximale (par défaut 1200px)
 * @param {number} quality - Qualité de compression JPEG (0.1 à 1.0)
 * @returns {Promise<string>} L'image compressée au format dataURL
 */
export function compressImage(dataUrl, maxWidth = 1200, maxHeight = 1200, quality = 0.75) {
  return new Promise((resolve) => {
    if (!dataUrl || typeof window === "undefined" || !dataUrl.startsWith("data:image")) {
      resolve(dataUrl);
      return;
    }
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = dataUrl;
    img.onload = () => {
      let width = img.width;
      let height = img.height;

      if (width > maxWidth || height > maxHeight) {
        if (width / height > maxWidth / maxHeight) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        } else {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL("image/jpeg", quality));
    };
    img.onerror = () => {
      resolve(dataUrl);
    };
  });
}
