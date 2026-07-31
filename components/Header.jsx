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
    <header className="sticky top-0 z-50 border-b border-[#e0e0e0] bg-white/95 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3">
          <img
            src="/img/logo.png"
            alt="Best Builders SARLU"
            className="h-20 md:h-24 w-auto object-contain"
          />
        </Link>

        {/* NAV desktop */}
        <nav className="hidden md:flex items-center gap-8 font-medium text-[14px]">
          <Link href="/" className="nav-link font-bold uppercase tracking-wider text-[13px]">
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
                  ? "bg-[#0A2540] text-white"
                  : "text-[#0A2540] hover:text-[#1E56A0]"
              }`}
            >
              <span>Le Groupe</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  dropdownOpen ? "rotate-180 text-white" : "text-[#0A2540]"
                }`}
              />
            </Link>

            {/* Menu Pop-up Déroulant */}
            {dropdownOpen && (
              <div className="absolute left-0 top-full pt-2 w-64 z-50">
                <div className="bg-white border border-[#e0e0e0] shadow-2xl p-3 rounded-lg space-y-2 relative">
                  {/* Flèche indicatrice */}
                  <div className="absolute -top-2 left-6 w-4 h-4 bg-white border-t border-l border-[#e0e0e0] rotate-45"></div>

                  <Link
                    href="/a-propos#qui-sommes-nous"
                    onClick={() => setDropdownOpen(false)}
                    className="block w-full text-center px-4 py-3 bg-[#E2E8F0] hover:bg-[#0A2540] text-[#0A2540] hover:text-white font-bold text-[13px] uppercase tracking-wider rounded-md transition-all shadow-sm"
                  >
                    QUI SOMMES NOUS
                  </Link>

                  <Link
                    href="/a-propos#historique"
                    onClick={() => setDropdownOpen(false)}
                    className="block w-full text-center px-4 py-3 bg-[#E2E8F0] hover:bg-[#0A2540] text-[#0A2540] hover:text-white font-bold text-[13px] uppercase tracking-wider rounded-md transition-all shadow-sm"
                  >
                    HISTORIQUE
                  </Link>

                  <Link
                    href="/a-propos#nos-valeurs"
                    onClick={() => setDropdownOpen(false)}
                    className="block w-full text-center px-4 py-3 bg-[#E2E8F0] hover:bg-[#0A2540] text-[#0A2540] hover:text-white font-bold text-[13px] uppercase tracking-wider rounded-md transition-all shadow-sm"
                  >
                    NOS VALEURS
                  </Link>

                  <Link
                    href="/realisations"
                    onClick={() => setDropdownOpen(false)}
                    className="block w-full text-center px-4 py-3 bg-[#E2E8F0] hover:bg-[#0A2540] text-[#0A2540] hover:text-white font-bold text-[13px] uppercase tracking-wider rounded-md transition-all shadow-sm"
                  >
                    REFERENCES
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link href="/services" className="nav-link font-bold uppercase tracking-wider text-[13px]">
            Nos Métiers
          </Link>
          <Link href="/realisations" className="nav-link font-bold uppercase tracking-wider text-[13px]">
            Réalisations
          </Link>
          <Link href="/actualites" className="nav-link font-bold uppercase tracking-wider text-[13px]">
            Actualités
          </Link>
          <Link href="/contact" className="nav-link font-bold uppercase tracking-wider text-[13px]">
            Contact
          </Link>
        </nav>

        {/* CTA desktop */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-5.5 py-2.5 font-bold text-[14px] bg-[#0A2540] text-white hover:bg-[#1E56A0] transition-colors shadow-sm"
          >
            Demander un devis
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Burger mobile */}
        <button
          className="md:hidden p-2 text-[#0A2540]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          {menuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-6 pt-2 flex flex-col gap-3 font-medium text-[15px] border-t border-[#e0e0e0] bg-white">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="pt-2 font-bold text-[#0A2540] hover:text-[#1E56A0] transition-colors"
          >
            Accueil
          </Link>
          <div className="border-b border-gray-100 pb-2">
            <span className="font-bold text-[#0A2540] block mb-2 uppercase text-xs tracking-wider">Le Groupe</span>
            <div className="pl-3 space-y-2">
              <Link
                href="/a-propos#qui-sommes-nous"
                onClick={() => setMenuOpen(false)}
                className="block text-sm text-gray-700 hover:text-[#0A2540]"
              >
                — Qui sommes-nous
              </Link>
              <Link
                href="/a-propos#historique"
                onClick={() => setMenuOpen(false)}
                className="block text-sm text-gray-700 hover:text-[#0A2540]"
              >
                — Historique
              </Link>
              <Link
                href="/a-propos#nos-valeurs"
                onClick={() => setMenuOpen(false)}
                className="block text-sm text-gray-700 hover:text-[#0A2540]"
              >
                — Nos valeurs
              </Link>
              <Link
                href="/realisations"
                onClick={() => setMenuOpen(false)}
                className="block text-sm text-gray-700 hover:text-[#0A2540]"
              >
                — Références
              </Link>
            </div>
          </div>
          <Link
            href="/services"
            onClick={() => setMenuOpen(false)}
            className="hover:text-[#0A2540] transition-colors"
          >
            Nos Métiers
          </Link>
          <Link
            href="/realisations"
            onClick={() => setMenuOpen(false)}
            className="hover:text-[#0A2540] transition-colors"
          >
            Réalisations
          </Link>
          <Link
            href="/actualites"
            onClick={() => setMenuOpen(false)}
            className="hover:text-[#0A2540] transition-colors"
          >
            Actualités
          </Link>
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="hover:text-[#0A2540] transition-colors"
          >
            Contact
          </Link>
        </div>
      )}
    </header>
  );
}
