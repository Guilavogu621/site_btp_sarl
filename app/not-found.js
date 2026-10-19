"use client";

import Link from "next/link";
import { ArrowRight, HardHat, Home, ArrowLeft, Phone } from "lucide-react";

/**
 * Page 404 personnalisée — Best Builders SARLU
 * Affiche un message thématique BTP avec navigation de récupération.
 */
export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0A2540] blueprint-grid-dark flex items-center justify-center px-6 py-20 relative overflow-hidden">
      {/* Décorations d'arrière-plan */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#00C2FF]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#295EA8]/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-2xl w-full text-center relative z-10">
        {/* Icône casque de chantier */}
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 bg-[#00C2FF]/10 border border-[#00C2FF]/30 rounded-full flex items-center justify-center">
            <HardHat className="w-12 h-12 text-[#00C2FF]" />
          </div>
        </div>

        {/* Code d'erreur stylisé */}
        <div className="relative mb-6">
          <span
            className="font-display font-extrabold text-[120px] md:text-[160px] leading-none text-white/5 select-none absolute inset-0 flex items-center justify-center"
            aria-hidden="true"
          >
            404
          </span>
          <div className="relative z-10 pt-6">
            <span className="inline-block font-mono text-[11px] text-[#00C2FF] font-semibold uppercase tracking-[0.2em] bg-[#00C2FF]/10 border border-[#00C2FF]/30 px-3 py-1.5 rounded-xs mb-4">
              Erreur 404 — Page Introuvable
            </span>
          </div>
        </div>

        <h1 className="font-display font-bold text-[30px] md:text-[40px] text-white leading-tight mb-4 mt-2">
          Ce chantier n&apos;existe pas encore.
        </h1>
        <p className="font-sans text-[16px] text-slate-300 leading-relaxed mb-10 max-w-lg mx-auto">
          La page que vous cherchez a été déplacée, supprimée ou n&apos;a jamais été construite.
          Retournez à l&apos;accueil pour naviguer sur notre site.
        </p>

        {/* Boutons de navigation */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#00C2FF] text-[#000F22] font-display font-bold text-[13px] uppercase tracking-wider rounded-xs hover:bg-white transition-all shadow-lg"
          >
            <Home className="w-4 h-4" />
            <span>Retour à l&apos;accueil</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/realisations"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border border-[#295EA8] text-slate-200 font-display font-semibold text-[13px] uppercase tracking-wider rounded-xs hover:border-[#00C2FF] hover:text-[#00C2FF] transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Nos Réalisations</span>
          </Link>
        </div>

        {/* Contact rapide */}
        <div className="mt-14 pt-8 border-t border-[#295EA8]/30">
          <p className="font-mono text-[12px] text-slate-400 uppercase tracking-wider mb-3">
            Besoin d&apos;aide ? Contactez-nous directement
          </p>
          <a
            href="tel:+224614606079"
            className="inline-flex items-center gap-2 font-mono text-[#00C2FF] text-[14px] font-semibold hover:underline"
          >
            <Phone className="w-4 h-4" />
            +224 614 60 60 79
          </a>
        </div>
      </div>
    </div>
  );
}
