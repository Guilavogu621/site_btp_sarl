"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X, ChevronDown } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  if (pathname === "/dashboard") {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 bg-[#0F172A]/95 backdrop-blur-md border-b border-[#334155] text-white shadow-xl">
      {/* Top Gold Gradient Bar */}
      <div className="h-1 w-full bg-gradient-to-r from-[#E8952E] via-[#F59E0B] to-[#1E40AF]"></div>

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="bg-white p-2 rounded-md shadow-md group-hover:scale-105 transition-transform">
            <img
              src="/img/logo.png"
              alt="Best Builders SARLU"
              className="h-12 md:h-14 w-auto object-contain"
            />
          </div>
          <div className="hidden lg:block text-left">
            <span className="font-display font-extrabold text-[16px] text-white tracking-wide block leading-none">
              BEST BUILDERS
            </span>
            <span className="text-[10px] font-mono text-[#E8952E] uppercase tracking-widest block mt-1 font-bold">
              BTP & Ingénierie
            </span>
          </div>
        </Link>

        {/* NAV desktop */}
        <nav className="hidden md:flex items-center gap-8 font-medium text-[14px]">
          <Link href="/" className="font-bold uppercase tracking-wider text-[13px] text-slate-200 hover:text-[#E8952E] transition-colors">
            Accueil
          </Link>

          {/* Menu Déroulant "Le Groupe" */}
          <div
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <Link
              href="/a-propos"
              className={`flex items-center gap-1.5 py-2 px-3 transition-colors rounded-sm font-bold uppercase tracking-wider text-[13px] ${
                dropdownOpen
                  ? "bg-[#1E293B] text-[#E8952E]"
                  : "text-slate-200 hover:text-[#E8952E]"
              }`}
            >
              <span>Le Groupe</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  dropdownOpen ? "rotate-180 text-[#E8952E]" : "text-slate-400"
                }`}
              />
            </Link>

            {/* Menu Pop-up Déroulant */}
            {dropdownOpen && (
              <div className="absolute left-0 top-full pt-2 w-64 z-50">
                <div className="bg-[#0F172A] border border-[#334155] shadow-2xl p-3 rounded-lg space-y-2 relative backdrop-blur-xl">
                  {/* Flèche indicatrice */}
                  <div className="absolute -top-2 left-6 w-4 h-4 bg-[#0F172A] border-t border-l border-[#334155] rotate-45"></div>

                  <Link
                    href="/a-propos#qui-sommes-nous"
                    onClick={() => setDropdownOpen(false)}
                    className="block w-full text-center px-4 py-3 bg-[#1E293B] hover:bg-[#E8952E] text-slate-100 hover:text-[#0F172A] font-bold text-[12px] uppercase tracking-wider rounded-md transition-all shadow-sm"
                  >
                    QUI SOMMES NOUS
                  </Link>

                  <Link
                    href="/a-propos#historique"
                    onClick={() => setDropdownOpen(false)}
                    className="block w-full text-center px-4 py-3 bg-[#1E293B] hover:bg-[#E8952E] text-slate-100 hover:text-[#0F172A] font-bold text-[12px] uppercase tracking-wider rounded-md transition-all shadow-sm"
                  >
                    HISTORIQUE
                  </Link>

                  <Link
                    href="/a-propos#nos-valeurs"
                    onClick={() => setDropdownOpen(false)}
                    className="block w-full text-center px-4 py-3 bg-[#1E293B] hover:bg-[#E8952E] text-slate-100 hover:text-[#0F172A] font-bold text-[12px] uppercase tracking-wider rounded-md transition-all shadow-sm"
                  >
                    NOS VALEURS
                  </Link>

                  <Link
                    href="/realisations"
                    onClick={() => setDropdownOpen(false)}
                    className="block w-full text-center px-4 py-3 bg-[#1E293B] hover:bg-[#E8952E] text-slate-100 hover:text-[#0F172A] font-bold text-[12px] uppercase tracking-wider rounded-md transition-all shadow-sm"
                  >
                    RÉFÉRENCES
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link href="/services" className="font-bold uppercase tracking-wider text-[13px] text-slate-200 hover:text-[#E8952E] transition-colors">
            Nos Métiers
          </Link>
          <Link href="/realisations" className="font-bold uppercase tracking-wider text-[13px] text-slate-200 hover:text-[#E8952E] transition-colors">
            Réalisations
          </Link>
          <Link href="/actualites" className="font-bold uppercase tracking-wider text-[13px] text-slate-200 hover:text-[#E8952E] transition-colors">
            Actualités
          </Link>
          <Link href="/contact" className="font-bold uppercase tracking-wider text-[13px] text-slate-200 hover:text-[#E8952E] transition-colors">
            Contact
          </Link>
        </nav>

        {/* CTA desktop */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-2.5 font-extrabold text-[13px] uppercase tracking-wider bg-gradient-to-r from-[#E8952E] to-[#D97706] text-[#0F172A] hover:from-[#D97706] hover:to-[#B45309] hover:text-white transition-all shadow-lg rounded-sm"
          >
            Demander un devis
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Burger mobile */}
        <button
          className="md:hidden p-2 text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          {menuOpen ? <X className="w-7 h-7 text-[#E8952E]" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-6 pt-4 flex flex-col gap-3 font-medium text-[15px] border-t border-[#334155] bg-[#0F172A] text-white">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="font-bold text-[#E8952E] uppercase tracking-wider text-sm"
          >
            Accueil
          </Link>
          <div className="border-b border-[#334155] pb-3">
            <span className="font-bold text-slate-300 block mb-2 uppercase text-xs tracking-wider">Le Groupe</span>
            <div className="pl-3 space-y-2">
              <Link
                href="/a-propos#qui-sommes-nous"
                onClick={() => setMenuOpen(false)}
                className="block text-sm text-slate-300 hover:text-[#E8952E]"
              >
                — Qui sommes-nous
              </Link>
              <Link
                href="/a-propos#historique"
                onClick={() => setMenuOpen(false)}
                className="block text-sm text-slate-300 hover:text-[#E8952E]"
              >
                — Historique
              </Link>
              <Link
                href="/a-propos#nos-valeurs"
                onClick={() => setMenuOpen(false)}
                className="block text-sm text-slate-300 hover:text-[#E8952E]"
              >
                — Nos valeurs
              </Link>
              <Link
                href="/realisations"
                onClick={() => setMenuOpen(false)}
                className="block text-sm text-slate-300 hover:text-[#E8952E]"
              >
                — Références
              </Link>
            </div>
          </div>
          <Link
            href="/services"
            onClick={() => setMenuOpen(false)}
            className="hover:text-[#E8952E] transition-colors uppercase text-sm font-semibold"
          >
            Nos Métiers
          </Link>
          <Link
            href="/realisations"
            onClick={() => setMenuOpen(false)}
            className="hover:text-[#E8952E] transition-colors uppercase text-sm font-semibold"
          >
            Réalisations
          </Link>
          <Link
            href="/actualites"
            onClick={() => setMenuOpen(false)}
            className="hover:text-[#E8952E] transition-colors uppercase text-sm font-semibold"
          >
            Actualités
          </Link>
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="hover:text-[#E8952E] transition-colors uppercase text-sm font-semibold"
          >
            Contact
          </Link>
        </div>
      )}
    </header>
  );
}
