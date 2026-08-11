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
    <footer className="bg-[#0A2540] text-white border-t border-[#295EA8]/30 pt-16 pb-12 relative overflow-hidden blueprint-grid-dark">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 relative z-10">
        {/* Col 1: Brand */}
        <div>
          <div className="flex items-center gap-3 mb-6 bg-white p-3 inline-block rounded-sm shadow-lg border-l-4 border-[#00C2FF]">
            <img src="/img/logo.png" alt="Best Builders SARLU" className="h-14 w-auto object-contain" />
          </div>
          <p className="text-[14px] text-slate-300 leading-relaxed mb-6 font-sans">
            Bureau d&apos;études et de construction BTP à Conakry. Conception, structure, chiffrage et gestion globale de vos chantiers.
          </p>
          <div className="technical-badge technical-badge-vibrant">
            INGÉNIERIE &amp; CONSTRUCTION BTP
          </div>
        </div>

        {/* Col 2: Navigation */}
        <div>
          <h3 className="font-display font-bold text-[15px] text-white uppercase tracking-wider mb-6 flex items-center gap-2">
            <span className="w-2 h-2 bg-[#00C2FF] rounded-full"></span>
            Navigation
          </h3>
          <ul className="space-y-3 text-[14px] text-slate-300 font-sans">
            <li>
              <Link href="/a-propos" className="hover:text-[#00C2FF] transition-colors">
                Le Groupe
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-[#00C2FF] transition-colors">
                Nos Métiers &amp; Services
              </Link>
            </li>
            <li>
              <Link href="/realisations" className="hover:text-[#00C2FF] transition-colors">
                Nos Réalisations
              </Link>
            </li>
            <li>
              <Link href="/actualites" className="hover:text-[#00C2FF] transition-colors">
                Actualités &amp; Presse
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-[#00C2FF] transition-colors">
                Nous contacter
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Contact Info */}
        <div>
          <h3 className="font-display font-bold text-[15px] text-white uppercase tracking-wider mb-6 flex items-center gap-2">
            <span className="w-2 h-2 bg-[#00C2FF] rounded-full"></span>
            Contact
          </h3>
          <ul className="space-y-4 text-[14px] text-slate-300">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#00C2FF] shrink-0 mt-0.5" />
              <span className="font-sans">Conakry, Kipé, République de Guinée</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-[#00C2FF] shrink-0" />
              <span className="font-mono text-[13px]">+224 614 60 60 79</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-[#00C2FF] shrink-0" />
              <span className="font-mono text-[13px]">bestbuilderssarlu@gmail.com</span>
            </li>
          </ul>
        </div>

        {/* Col 4: Horaires & Certifications */}
        <div>
          <h3 className="font-display font-bold text-[15px] text-white uppercase tracking-wider mb-6 flex items-center gap-2">
            <span className="w-2 h-2 bg-[#00C2FF] rounded-full"></span>
            Horaires &amp; Service
          </h3>
          <p className="text-[14px] text-slate-300 leading-relaxed mb-3 font-sans">
            Du Lundi au Vendredi : <br />
            <strong className="text-white font-mono text-[13px]">08h00 — 18h00</strong>
          </p>
          <p className="text-[14px] text-slate-300 leading-relaxed mb-4 font-sans">
            Samedi : <br />
            <strong className="text-white font-mono text-[13px]">08h30 — 13h00</strong>
          </p>
          <div className="inline-block px-2.5 py-1 bg-[#295EA8]/20 border border-[#295EA8]/40 rounded-xs font-mono text-[10px] text-[#00C2FF] uppercase tracking-wider font-semibold">
            Bureau d&apos;études agréé
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 border-t border-[#295EA8]/20 pt-8 flex flex-col md:flex-row items-center justify-between text-[13px] text-slate-400 relative z-10">
        <p className="font-sans">© {new Date().getFullYear()} Best Builders SARLU. Tous droits réservés.</p>
        <p className="mt-2 md:mt-0 font-mono text-[11px] text-[#00C2FF]/80 uppercase tracking-widest font-semibold">
          BEST BUILDERS SARLU • CONAKRY
        </p>
      </div>
    </footer>
  );
}
