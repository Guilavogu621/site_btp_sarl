"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X, ChevronDown, HardHat } from "lucide-react";

const NAV_ITEMS = [
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Nos Métiers" },
  { href: "/realisations", label: "Réalisations" },
  { href: "/actualites", label: "Actualités" },
  { href: "/contact", label: "Contact" },
];

const ABOUT_SUBNAV = [
  { href: "/a-propos#qui-sommes-nous", label: "Qui sommes-nous" },
  { href: "/a-propos#historique", label: "Historique" },
  { href: "/a-propos#nos-valeurs", label: "Nos valeurs" },
  { href: "/realisations", label: "Références" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [mobileGroupeOpen, setMobileGroupeOpen] = useState(false);

  if (pathname === "/dashboard") {
    return null;
  }

  return (
    <header className="bg-[#0A2540]/95 backdrop-blur-md fixed top-0 w-full z-50 border-b border-[#295EA8]/30 shadow-md">
      <div className="flex justify-between items-center h-20 px-6 max-w-6xl mx-auto">
        {/* LOGO ORIGINAL */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="bg-white p-1.5 rounded-xs border border-[#C4C6CE]/40 shadow-sm flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
            <img
              src="/img/logo.png"
              alt="Best Builders Logo"
              className="h-10 w-auto object-contain"
            />
          </div>
          <div className="hidden sm:block">
            <div className="font-display font-bold text-[17px] text-white tracking-tight group-hover:text-[#00C2FF] transition-colors flex items-center gap-2">
              <span>Best Builders</span>
              <span className="font-mono text-[9px] px-1.5 py-0.5 bg-[#00C2FF]/10 text-[#00C2FF] border border-[#00C2FF]/30 rounded-xs font-semibold">BTP</span>
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-slate-300 font-medium">
              Bureau d&apos;Études &amp; Ingénierie
            </div>
          </div>
        </Link>

        {/* NAV desktop */}
        <nav className="hidden md:flex items-center gap-7">
          <Link
            href="/"
            className={`font-display text-[13px] font-semibold uppercase tracking-wider transition-colors ${
              pathname === "/" ? "text-[#00C2FF]" : "text-slate-200 hover:text-[#00C2FF]"
            }`}
          >
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
              className={`flex items-center gap-1.5 font-display text-[13px] font-semibold uppercase tracking-wider transition-colors py-2 ${
                dropdownOpen ? "text-[#00C2FF]" : "text-slate-200 hover:text-[#00C2FF]"
              }`}
            >
              <span>Le Groupe</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-300 ${
                  dropdownOpen ? "rotate-180 text-[#00C2FF]" : ""
                }`}
              />
            </Link>

            {/* Menu Pop-up Déroulant */}
            <div
              className={`absolute left-0 top-full pt-2 w-60 z-50 transition-all duration-200 ${
                dropdownOpen
                  ? "opacity-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 -translate-y-2 pointer-events-none"
              }`}
            >
              <div className="bg-[#0A2540] border border-[#295EA8]/40 shadow-2xl p-3 rounded-sm space-y-1 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#0A2540] via-[#00C2FF] to-[#0A2540]"></div>
                {ABOUT_SUBNAV.map((subItem, index) => (
                  <Link
                    key={index}
                    href={subItem.href}
                    onClick={() => setDropdownOpen(false)}
                    className="block w-full px-4 py-2.5 bg-[#000F22] hover:bg-[#00C2FF] text-slate-200 hover:text-[#000F22] font-mono text-[11px] uppercase tracking-wider rounded-xs transition-all duration-200 font-semibold"
                  >
                    {subItem.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {NAV_ITEMS.slice(1).filter((item) => item.href !== "/contact").map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`font-display text-[13px] font-semibold uppercase tracking-wider transition-colors whitespace-nowrap ${
                pathname === item.href ? "text-[#00C2FF]" : "text-slate-200 hover:text-[#00C2FF]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA desktop */}
        <div className="hidden md:block shrink-0">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-5 py-2.5 bg-[#00C2FF] text-[#000F22] font-display font-bold text-[12px] md:text-[13px] uppercase tracking-wider transition-all duration-200 hover:bg-[#007AFF] hover:text-white shadow-md active:scale-95 group rounded-xs whitespace-nowrap"
          >
            Demander un devis
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Burger mobile */}
        <button
          className="md:hidden text-[#00C2FF] p-2 focus:outline-none transition-transform hover:scale-110"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Menu mobile - Plein écran & Déroulant sans coupure */}
      <div
        className={`md:hidden overflow-y-auto transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-[calc(100vh-5rem)] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="px-6 pb-8 pt-3 flex flex-col gap-3 bg-[#0A2540] border-t border-[#295EA8]/30 shadow-2xl">
          
          {/* CTA Demander un devis en HAUT du menu mobile */}
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="w-full text-center py-3.5 bg-[#00C2FF] text-[#000F22] font-display text-[13px] font-extrabold uppercase tracking-wider rounded-xs hover:bg-white transition-all shadow-lg flex items-center justify-center gap-2"
          >
            <span>Demander un devis gratuit</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <div className="h-px bg-[#295EA8]/30 my-1" />

          {/* Navigation liens principaux */}
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className={`py-2.5 font-display font-semibold text-[14px] px-3 rounded-xs transition-all ${
              pathname === "/" ? "text-[#00C2FF] bg-[#000F22]" : "text-white hover:text-[#00C2FF]"
            }`}
          >
            Accueil
          </Link>

          {/* Accordéon Le Groupe */}
          <div className="border-y border-[#295EA8]/30 py-2">
            <button
              onClick={() => setMobileGroupeOpen(!mobileGroupeOpen)}
              className="w-full flex items-center justify-between py-2 px-3 font-display font-semibold text-[14px] text-white hover:text-[#00C2FF]"
            >
              <span className="flex items-center gap-2">
                <HardHat className="w-4 h-4 text-[#00C2FF]" />
                Le Groupe
              </span>
              <ChevronDown className={`w-4 h-4 text-[#00C2FF] transition-transform duration-200 ${mobileGroupeOpen ? "rotate-180" : ""}`} />
            </button>

            <div className={`pl-4 space-y-1.5 overflow-hidden transition-all duration-200 ${mobileGroupeOpen ? "pt-2 max-h-60" : "max-h-0"}`}>
              {ABOUT_SUBNAV.map((subItem, index) => (
                <Link
                  key={index}
                  href={subItem.href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-2 px-3 font-mono text-[12px] uppercase text-slate-300 hover:bg-[#000F22] hover:text-[#00C2FF] rounded-xs transition-all"
                >
                  — {subItem.label}
                </Link>
              ))}
            </div>
          </div>

          {NAV_ITEMS.slice(1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className={`py-2.5 font-display font-semibold text-[14px] px-3 rounded-xs transition-all ${
                pathname === item.href ? "text-[#00C2FF] bg-[#000F22]" : "text-white hover:text-[#00C2FF]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
