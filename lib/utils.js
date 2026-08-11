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
