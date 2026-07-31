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

  // Auto-slide every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative group">
      {/* MAIN CAROUSEL FRAME */}
      <div className="relative h-[380px] sm:h-[450px] md:h-[480px] w-full bg-[#0A2540] overflow-hidden border-2 border-[#0F3854] shadow-2xl rounded-sm">
        {/* Slides list */}
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {/* Slide Background Image */}
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover transform scale-105 group-hover:scale-100 transition-transform duration-1000"
            />
            {/* Gradient Overlay for Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540] via-[#0A2540]/40 to-transparent" />

            {/* Slide Info Content Overlay */}
            <div className="absolute bottom-6 left-6 right-6 z-20">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0A2540] text-white text-[11px] font-mono font-bold uppercase tracking-wider mb-2 border border-[#1E56A0]">
                <Sparkles className="w-3.5 h-3.5 text-blue-300" />
                <span>{slide.badge}</span>
              </div>
              <h3 className="font-display font-bold text-[20px] sm:text-[24px] text-white leading-tight drop-shadow-md">
                {slide.title}
              </h3>
              <p className="text-[13px] text-slate-200 mt-1 drop-shadow-sm font-medium">
                {slide.subtitle}
              </p>
            </div>
          </div>
        ))}

        {/* FLOATING PLAY VIDEO BUTTON (ACTION BADGE) */}
        <button
          onClick={() => setIsVideoOpen(true)}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex items-center gap-3 px-5 py-3.5 bg-[#0A2540]/90 hover:bg-[#1E56A0] border-2 border-[#1E56A0] text-white rounded-full shadow-2xl transition-all hover:scale-110 group/btn backdrop-blur-md"
        >
          <div className="w-8 h-8 rounded-full bg-[#1E56A0] group-hover/btn:bg-white text-white group-hover/btn:text-[#0A2540] flex items-center justify-center transition-colors">
            <Play className="w-4 h-4 fill-current ml-0.5" />
          </div>
          <span className="font-bold text-[13px] uppercase tracking-wider pr-1">
            Découvrir en vidéo
          </span>
        </button>

        {/* CAROUSEL CONTROLS */}
        <div className="absolute top-4 right-4 z-30 flex items-center gap-2">
          <button
            onClick={() => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
            className="w-9 h-9 bg-[#0A2540]/80 hover:bg-[#1E56A0] text-white flex items-center justify-center border border-[#1E56A0] transition-colors"
            aria-label="Précédent"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="font-mono text-[11px] text-white bg-[#0A2540]/80 px-2.5 py-2 border border-[#1E56A0]">
            0{currentSlide + 1} / 0{slides.length}
          </span>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
            className="w-9 h-9 bg-[#0A2540]/80 hover:bg-[#1E56A0] text-white flex items-center justify-center border border-[#1E56A0] transition-colors"
            aria-label="Suivant"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* DECORATIVE CORNER BADGE & SPECS */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-[12px] text-[#4A607A]">
        <div className="flex items-center gap-2 font-mono uppercase font-bold text-[#0A2540]">
          <HardHat className="w-4 h-4" />
          <span>Surveillance & Maîtrise d'Œuvre BTP</span>
        </div>
        <div className="flex items-center gap-2 font-mono uppercase">
          <Building2 className="w-4 h-4" />
          <span>Conakry & Régions</span>
        </div>
      </div>

      {/* VIDEO MODAL POPUP */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-50 bg-[#0A2540]/90 flex items-center justify-center p-4 backdrop-blur-md">
          <div className="relative w-full max-w-4xl bg-[#0A2540] border border-[#1E56A0] shadow-2xl rounded-sm overflow-hidden">
            {/* Modal Header */}
            <div className="p-4 bg-[#0F3854] border-b border-[#1E56A0] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-blue-400 animate-pulse" />
                <h4 className="font-display font-bold text-[15px] text-white">
                  Film Présentation — Best Builders SARLU
                </h4>
              </div>
              <button
                onClick={() => setIsVideoOpen(false)}
                className="p-1.5 text-gray-300 hover:text-white hover:bg-[#1E56A0] rounded-xs transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Video Showcase Player */}
            <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
              <img
                src={slides[currentSlide].image}
                alt="Présentation vidéo"
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/90 via-transparent to-[#0A2540]/40" />
              
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-20 h-20 rounded-full bg-[#1E56A0] text-white flex items-center justify-center mb-4 shadow-2xl animate-bounce border-2 border-white">
                  <Play className="w-8 h-8 fill-current ml-1" />
                </div>
                <h3 className="font-display font-bold text-[24px] text-white">
                  Rigueur & Ingénierie sur le Terrain
                </h3>
                <p className="text-[14px] text-slate-200 max-w-md mt-2">
                  Découvrez l'ensemble de nos équipes et chantiers de construction en Guinée.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-[#0F3854] border-t border-[#1E56A0] flex items-center justify-between text-[13px] text-slate-300">
              <span>Bureau d'Études & Contractant Général BTP</span>
              <button
                onClick={() => setIsVideoOpen(false)}
                className="px-4 py-1.5 bg-[#1E56A0] hover:bg-[#0A2540] text-white font-bold uppercase text-[11px]"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
