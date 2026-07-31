"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();

  if (pathname === "/dashboard") {
    return null;
  }

  return (
    <footer className="bg-[#0A0F1D] text-white border-t border-[#334155]">
      {/* Gold Gradient Top Bar */}
      <div className="h-1 w-full bg-gradient-to-r from-[#1E40AF] via-[#E8952E] to-[#1E40AF]"></div>

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Col 1: Brand */}
          <div className="md:col-span-1">
            <div className="inline-flex items-center gap-3 mb-6 bg-white p-3 rounded-md shadow-lg">
              <img src="/img/logo.png" alt="Best Builders SARLU" className="h-14 w-auto object-contain" />
            </div>
            <p className="text-[14px] text-slate-300 leading-relaxed mb-5">
              Bureau d'études et de construction BTP à Conakry. Conception, structure, chiffrage et gestion globale de vos chantiers.
            </p>
            <p className="font-mono text-[11px] text-[#E8952E] uppercase tracking-widest font-bold">
              Rigueur — Technique — Excellence
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h3 className="font-display font-extrabold text-[13px] text-white uppercase tracking-widest mb-6 border-b border-[#334155] pb-3">
              Navigation
            </h3>
            <ul className="space-y-3 text-[14px] text-slate-300">
              <li>
                <Link href="/a-propos" className="hover:text-[#E8952E] transition-colors flex items-center gap-1.5 group">
                  <ArrowRight className="w-3 h-3 text-[#334155] group-hover:text-[#E8952E] transition-colors" />
                  Le Groupe
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#E8952E] transition-colors flex items-center gap-1.5 group">
                  <ArrowRight className="w-3 h-3 text-[#334155] group-hover:text-[#E8952E] transition-colors" />
                  Nos Métiers & Services
                </Link>
              </li>
              <li>
                <Link href="/realisations" className="hover:text-[#E8952E] transition-colors flex items-center gap-1.5 group">
                  <ArrowRight className="w-3 h-3 text-[#334155] group-hover:text-[#E8952E] transition-colors" />
                  Nos Réalisations
                </Link>
              </li>
              <li>
                <Link href="/actualites" className="hover:text-[#E8952E] transition-colors flex items-center gap-1.5 group">
                  <ArrowRight className="w-3 h-3 text-[#334155] group-hover:text-[#E8952E] transition-colors" />
                  Actualités & Presse
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#E8952E] transition-colors flex items-center gap-1.5 group">
                  <ArrowRight className="w-3 h-3 text-[#334155] group-hover:text-[#E8952E] transition-colors" />
                  Nous contacter
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact Info */}
          <div>
            <h3 className="font-display font-extrabold text-[13px] text-white uppercase tracking-widest mb-6 border-b border-[#334155] pb-3">
              Contact
            </h3>
            <ul className="space-y-4 text-[14px] text-slate-300">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 bg-[#1E293B] border border-[#334155] rounded flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-[#E8952E]" />
                </div>
                <span>Conakry, Kipé, République de Guinée</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#1E293B] border border-[#334155] rounded flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-[#E8952E]" />
                </div>
                <span>+224 614 60 60 79</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#1E293B] border border-[#334155] rounded flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-[#E8952E]" />
                </div>
                <span>bestbuilderssarlu@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Horaires & Certifications */}
          <div>
            <h3 className="font-display font-extrabold text-[13px] text-white uppercase tracking-widest mb-6 border-b border-[#334155] pb-3">
              Horaires & Service
            </h3>
            <div className="space-y-4">
              <div className="bg-[#1E293B] border border-[#334155] p-4 rounded-md">
                <p className="text-[12px] font-mono text-[#E8952E] uppercase tracking-widest mb-1 font-bold">Lun — Ven</p>
                <p className="text-[18px] font-display font-extrabold text-white">08h00 — 18h00</p>
              </div>
              <div className="bg-[#1E293B] border border-[#334155] p-4 rounded-md">
                <p className="text-[12px] font-mono text-[#E8952E] uppercase tracking-widest mb-1 font-bold">Samedi</p>
                <p className="text-[18px] font-display font-extrabold text-white">08h30 — 13h00</p>
              </div>
              <p className="font-mono text-[11px] text-[#E8952E] uppercase tracking-widest font-bold">
                ✓ Bureau d'études agréé
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#334155] pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[13px] text-slate-400">
          <p>© {new Date().getFullYear()} <span className="text-white font-semibold">Best Builders SARLU</span>. Tous droits réservés.</p>
          <div className="flex items-center gap-6">
            <p className="font-mono text-[11px] text-slate-400 uppercase tracking-wider">
              BTP & Ingénierie • Conakry, Guinée
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#E8952E]/10 border border-[#E8952E]/30 text-[#E8952E] hover:bg-[#E8952E] hover:text-[#0F172A] transition-all font-bold text-[12px] uppercase tracking-wider rounded-sm"
            >
              Demander un devis
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
