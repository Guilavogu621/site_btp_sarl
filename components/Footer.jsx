"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();

  if (pathname === "/dashboard") {
    return null;
  }
  return (
    <footer className="bg-[#0A2540] text-white border-t border-[#0F3854] pt-16 pb-12">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        {/* Col 1: Brand */}
        <div>
          <div className="flex items-center gap-3 mb-6 bg-white p-3 inline-block rounded-sm shadow-md">
            <img src="/img/logo.png" alt="Best Builders SARLU" className="h-14 w-auto object-contain" />
          </div>
          <p className="text-[14px] text-slate-300 leading-relaxed mb-6">
            Bureau d'études et de construction BTP à Conakry. Conception, structure, chiffrage et gestion globale de vos chantiers.
          </p>
          <p className="font-mono text-[11px] text-blue-300 uppercase tracking-wider font-semibold">
            Rigueur — Technique — Exécution
          </p>
        </div>

        {/* Col 2: Navigation */}
        <div>
          <h3 className="font-display font-bold text-[16px] text-white uppercase tracking-wider mb-6">
            Navigation
          </h3>
          <ul className="space-y-3 text-[14px] text-slate-300">
            <li>
              <Link href="/a-propos" className="hover:text-blue-300 transition-colors">
                Le Groupe
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-blue-300 transition-colors">
                Nos Métiers & Services
              </Link>
            </li>
            <li>
              <Link href="/realisations" className="hover:text-blue-300 transition-colors">
                Nos Réalisations
              </Link>
            </li>
            <li>
              <Link href="/actualites" className="hover:text-blue-300 transition-colors">
                Actualités & Presse
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-blue-300 transition-colors">
                Nous contacter
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Contact Info */}
        <div>
          <h3 className="font-display font-bold text-[16px] text-white uppercase tracking-wider mb-6">
            Contact
          </h3>
          <ul className="space-y-4 text-[14px] text-slate-300">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
              <span>Conakry, Kipé, République de Guinée</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-blue-400 shrink-0" />
              <span>+224 614 60 60 79</span>
            </li>n
            <li className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-blue-400 shrink-0" />
              <span>bestbuilderssarlu@gmail.com</span>
            </li>
          </ul>
        </div>

        {/* Col 4: Horaires & Certifications */}
        <div>
          <h3 className="font-display font-bold text-[16px] text-white uppercase tracking-wider mb-6">
            Horaires & Service
          </h3>
          <p className="text-[14px] text-slate-300 leading-relaxed mb-4">
            Du Lundi au Vendredi : <br />
            <strong className="text-white">08h00 — 18h00</strong>
          </p>
          <p className="text-[14px] text-slate-300 leading-relaxed mb-4">
            Samedi : <br />
            <strong className="text-white">08h30 — 13h00</strong>
          </p>
          <p className="font-mono text-[11px] text-blue-300 uppercase tracking-wider font-semibold">
            Bureau d'études agréé
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 border-t border-[#0F3854] pt-8 flex flex-col md:flex-row items-center justify-between text-[13px] text-slate-400">
        <p>© {new Date().getFullYear()} Best Builders SARLU. Tous droits réservés.</p>
        <p className="mt-2 md:mt-0 font-mono text-[11px] text-slate-400">
          Conçu pour le BTP & l'Ingénierie
        </p>
      </div>
    </footer>
  );
}
