"use client";

import { useState, useEffect } from "react";
import { Play, ChevronLeft, ChevronRight, X, ShieldCheck, HardHat, Building2, Sparkles } from "lucide-react";

const slides = [
  {
    id: 1,
    title: "Chantiers & Supervision Technique",
    subtitle: "Suivi rigoureux par nos ingénieurs certifiés",
    image: "/img/hero-showcase.jpg",
    badge: "En cours d'exécution"
  },
  {
    id: 2,
    title: "Ouvrages Livrés & Modernes",
    subtitle: "Bâtiments commerciaux et complexes de standing",
    image: "/img/hero-building.jpg",
    badge: "Livraison clé en main"
  }
];

export default function HeroVisual() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isHovered) {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }
    }, 5000);
    return () => clearInterval(timer);
  }, [isHovered]);

  return (
    <div className="relative group" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      {/* MAIN CAROUSEL FRAME */}
      <div className="relative h-[380px] sm:h-[450px] md:h-[480px] w-full bg-[#0A2540] overflow-hidden rounded-sm border border-[#295EA8]/40 shadow-2xl">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide
                ? "opacity-100 z-10 scale-100"
                : "opacity-0 z-0 scale-95"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover transition-transform duration-[2000ms] scale-105 group-hover:scale-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540] via-[#0A2540]/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A2540]/40 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 z-20">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0A2540]/90 text-[#00C2FF] text-[11px] font-mono font-semibold uppercase tracking-widest mb-3 border border-[#00C2FF]/30 backdrop-blur-sm rounded-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#00C2FF]" />
                <span>{slide.badge}</span>
              </div>
              <h3 className="font-display font-bold text-[24px] sm:text-[28px] text-white leading-tight drop-shadow-lg">
                {slide.title}
              </h3>
              <p className="text-[14px] text-slate-200 mt-1 drop-shadow-md font-sans max-w-sm">
                {slide.subtitle}
              </p>
            </div>

            <div className="absolute top-4 left-4 z-20">
              <span className="font-mono text-[44px] font-bold text-[#00C2FF]/20 select-none tracking-widest">
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>
          </div>
        ))}

        {/* PLAY VIDEO BUTTON */}
        <button
          onClick={() => setIsVideoOpen(true)}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex items-center gap-3 px-6 py-3.5 bg-[#0A2540]/90 hover:bg-[#295EA8] border border-[#00C2FF]/50 text-white rounded-sm shadow-2xl transition-all duration-300 hover:scale-105 group/btn backdrop-blur-md"
        >
          <div className="w-10 h-10 rounded-full bg-[#00C2FF] group-hover/btn:bg-white text-[#000F22] group-hover/btn:text-[#0A2540] flex items-center justify-center transition-all duration-300 shadow-md">
            <Play className="w-5 h-5 fill-current ml-0.5" />
          </div>
          <span className="font-display font-semibold text-[13px] uppercase tracking-wider pr-1">Découvrir en vidéo</span>
        </button>

        {/* CAROUSEL CONTROLS */}
        <div className="absolute top-4 right-4 z-30 flex items-center gap-2">
          <button
            onClick={() => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
            className="w-10 h-10 bg-[#0A2540]/80 hover:bg-[#295EA8] text-white flex items-center justify-center border border-[#295EA8]/40 transition-all duration-200"
            aria-label="Précédent"
          >
            <ChevronLeft className="w-5 h-5 text-[#00C2FF]" />
          </button>
          <div className="flex items-center gap-1.5 bg-[#0A2540]/80 px-3 py-2 border border-[#295EA8]/40">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-1.5 transition-all duration-300 ${
                  idx === currentSlide ? "bg-[#00C2FF] w-6" : "bg-white/40 w-2 hover:bg-white/70"
                }`}
                aria-label={`Aller au slide ${idx + 1}`}
              />
            ))}
          </div>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
            className="w-10 h-10 bg-[#0A2540]/80 hover:bg-[#295EA8] text-white flex items-center justify-center border border-[#295EA8]/40 transition-all duration-200"
            aria-label="Suivant"
          >
            <ChevronRight className="w-5 h-5 text-[#00C2FF]" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#0A2540] z-20">
          <div
            key={currentSlide}
            className="h-full bg-[#00C2FF] animate-progress"
          />
        </div>
      </div>

      {/* BADGES */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-[12px]">
        <div className="flex items-center gap-2 font-mono uppercase font-semibold text-[#0A2540] bg-white px-3 py-1.5 border border-[#C4C6CE] shadow-xs rounded-xs">
          <HardHat className="w-4 h-4 text-[#295EA8]" />
          <span>Maîtrise d&apos;Œuvre BTP</span>
        </div>
        <div className="flex items-center gap-2 font-mono uppercase text-[#5B6B7A] font-medium">
          <Building2 className="w-4 h-4 text-[#295EA8]" />
          <span>Conakry &amp; Régions</span>
        </div>
      </div>

      {/* VIDEO MODAL */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-50 bg-[#0A2540]/95 flex items-center justify-center p-4 backdrop-blur-md">
          <div className="relative w-full max-w-4xl bg-[#0A2540] border border-[#1E56A0] shadow-2xl rounded-sm overflow-hidden">
            <div className="p-5 bg-[#0F3854] border-b border-[#1E56A0] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-blue-400 animate-pulse" />
                <h4 className="font-display font-bold text-[16px] text-white">Film Présentation — Best Builders SARLU</h4>
              </div>
              <button
                onClick={() => setIsVideoOpen(false)}
                className="p-2 text-gray-300 hover:text-white hover:bg-[#1E56A0] rounded-xs transition-all duration-200 hover:scale-110"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
              <img src={slides[currentSlide].image} alt="Présentation vidéo" className="w-full h-full object-cover opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/80 via-transparent to-[#0A2540]/30" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-24 h-24 rounded-full bg-[#1E56A0]/90 text-white flex items-center justify-center mb-6 shadow-2xl border-2 border-white/50 cursor-pointer hover:scale-110 transition-transform"
                  onClick={() => alert('Vidéo à intégrer')}>
                  <Play className="w-10 h-10 fill-current ml-1.5" />
                </div>
                <h3 className="font-display font-bold text-[26px] text-white drop-shadow-lg">Rigueur & Ingénierie sur le Terrain</h3>
                <p className="text-[15px] text-slate-200 max-w-md mt-2 drop-shadow-md">Découvrez l'ensemble de nos équipes et chantiers de construction en Guinée.</p>
              </div>
            </div>

            <div className="p-4 bg-[#0F3854] border-t border-[#1E56A0] flex items-center justify-between text-[13px] text-slate-300">
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                Bureau d&apos;Études &amp; Contractant Général BTP
              </span>
              <button
                onClick={() => setIsVideoOpen(false)}
                className="px-5 py-2 bg-[#1E56A0] hover:bg-[#0A2540] text-white font-bold uppercase text-[11px] transition-all duration-200"
              >Fermer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
