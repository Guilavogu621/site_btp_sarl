"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ArrowRight, Ruler, Calculator, HardHat, Building2,
  ShieldCheck, Target, Award, Users, ChevronRight, CheckCircle2, ArrowUpRight,
  Camera, Maximize2, X
} from "lucide-react";
import StatsCounter from "@/components/StatsCounter";
import ContactForm from "@/components/ContactForm";
import ContactInfo from "@/components/ContactInfo";
import { initialServices, initialProjects, initialStats, initialProcessSteps, initialSiteSettings, initialTeamMembers } from "@/lib/data";
import { getInitials } from "@/lib/utils";

export default function HomePage() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const [selectedGalleryCategory, setSelectedGalleryCategory] = useState("all");
  const [activeLightboxImage, setActiveLightboxImage] = useState(null);

  const heroSlides = [
    {
      image: "/img/showcase/ingenieure-chantier.png",
      title: "Supervision & Contrôle Chantier",
      tag: "SUPERVISION TECHNIQUE • CONAKRY"
    },
    {
      image: "/img/showcase/tour-grue-ciel.png",
      title: "Ouvrages en Hauteur R+12",
      tag: "GROS ŒUVRE BÉTON • GUINÉE"
    },
    {
      image: "/img/showcase/architecte-bureau.png",
      title: "Modélisation BIM & Études CAD",
      tag: "BUREAU D'ÉTUDES • EXPERTISE"
    },
    {
      image: "/img/showcase/immeuble-bois-survation.png",
      title: "Surélévation & Structure Bois",
      tag: "INGÉNIERIE SPÉCIALE • KIPÉ"
    },
    {
      image: "/img/showcase/architecture-africaine.jpg",
      title: "Architecture Bioclimatique",
      tag: "PATRIMOINE & MATÉRIAUX LOCAUX"
    }
  ];

  // Galerie de photos showcase enrichie
  const galleryItems = [
    {
      id: 1,
      title: "Supervision de Chantier à Conakry",
      category: "supervision",
      categoryName: "Supervision & Suivi",
      image: "/img/showcase/ingenieure-chantier.png",
      desc: "Ingénieure de chantier coordonnant les opérations avec radio de liaison."
    },
    {
      id: 2,
      title: "Immeuble R+12 & Grue à Tour",
      category: "gros-oeuvre",
      categoryName: "Gros Œuvre & Hauteur",
      image: "/img/showcase/tour-grue-ciel.png",
      desc: "Coulage de voiles béton et coffrage sous grue à tour."
    },
    {
      id: 3,
      title: "Surélévation Ossature Bois",
      category: "renovation",
      categoryName: "Surélévation & Bois",
      image: "/img/showcase/immeuble-bois-survation.png",
      desc: "Extension de 2 étages en bois massif avec assemblage haute précision."
    },
    {
      id: 4,
      title: "Conception & Modélisation CAD",
      category: "etudes",
      categoryName: "Bureau d'Études",
      image: "/img/showcase/architecte-bureau.png",
      desc: "Modélisation numérique des structures et vérification des descentes de charges."
    },
    {
      id: 5,
      title: "Architecture Bioclimatique Local",
      category: "architecture",
      categoryName: "Architecture & Patrimoine",
      image: "/img/showcase/architecture-africaine.jpg",
      desc: "Intégration de motifs traditionnels géométriques et ventilation naturelle."
    },
    {
      id: 6,
      title: "Immeuble Résidentiel & Tertiaire",
      category: "gros-oeuvre",
      categoryName: "Gros Œuvre & Hauteur",
      image: "/img/showcase/complexes-modernes.png",
      desc: "Complexe moderne R+8 mixte avec parkings et façades vitrées."
    }
  ];

  const filteredGallery = selectedGalleryCategory === "all"
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedGalleryCategory);

  // Auto-slide Hero Background every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  // Barre de progression au défilement
  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (height > 0) {
        setScrollProgress((winScroll / height) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer pour les animations `.fade-in-up`
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(".fade-in-up");
    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const serviceBadges = [
    "01 • INGÉNIERIE",
    "02 • ÉCONOMIE",
    "03 • SUPERVISION",
    "04 • RÉNOVATION"
  ];

  return (
    <div className="bg-[#F7F9FF] text-[#0A2540] font-sans antialiased selection:bg-[#00C2FF] selection:text-[#000F22] relative min-h-screen">
      {/* Barre de Progression de Lecture au Scroll */}
      <div 
        id="progress-bar"
        className="fixed top-0 left-0 h-1 bg-[#00C2FF] z-[60] transition-all duration-150 ease-out shadow-[0_0_12px_#00C2FF]"
        style={{ width: `${scrollProgress}%` }}
      />

      <main className="pt-20">
        {/* ===================== HERO SECTION AVEC BACKGROUND ANIMÉ ===================== */}
        <section className="relative min-h-[88vh] flex items-center border-b border-[#C4C6CE] overflow-hidden text-white bg-[#0A2540]">
          
          {/* SLIDESHOW D'ARRIÈRE-PLAN ANIMÉ */}
          <div className="absolute inset-0 z-0">
            {heroSlides.map((slide, idx) => (
              <div
                key={idx}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  idx === currentHeroSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"
                } transition-transform duration-[6000ms]`}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            ))}

            {/* MASQUE DE COULEUR ET DÉGRADÉ STITCH */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A2540] via-[#0A2540]/90 to-[#0A2540]/65 z-10" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#00C2FF]/15 via-transparent to-transparent z-10" />
            <div className="absolute inset-0 blueprint-grid-dark opacity-30 z-10" />
          </div>

          <div className="max-w-6xl mx-auto px-6 w-full relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-20">
            {/* Colonne Gauche: Contenu texte */}
            <div className="lg:col-span-7 flex flex-col gap-8">
              <div className="flex items-center gap-4 fade-in-up">
                <div className="w-12 h-px bg-[#00C2FF]" />
                <span className="technical-badge technical-badge-vibrant">
                  PRÉSENTATION INGÉNIERIE
                </span>
              </div>

              <h1 className="font-display font-extrabold text-[38px] sm:text-[48px] md:text-[54px] leading-[1.08] text-white tracking-tight fade-in-up delay-100">
                De l&apos;esquisse à la remise des clés, <span className="text-[#00C2FF] underline decoration-[#00C2FF] decoration-4 underline-offset-8">un seul interlocuteur.</span>
              </h1>

              <p className="font-sans text-[16px] md:text-[18px] text-slate-100 font-medium max-w-xl leading-relaxed fade-in-up delay-200 drop-shadow-sm">
                Conception, structure, chiffrage, gestion et suivi : nous accompagnons vos projets de bâtiment à chaque étape, avec la rigueur d&apos;un bureau d&apos;études et l&apos;œil d&apos;un chantier.
              </p>

              <div className="flex flex-wrap gap-4 pt-2 fade-in-up delay-300">
                <Link
                  href="#contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-[#00C2FF] text-[#000F22] font-display font-bold text-[14px] uppercase tracking-wider transition-all duration-300 hover:bg-white hover:-translate-y-1 hover:shadow-xl active:scale-95 group rounded-xs border border-[#00C2FF]"
                >
                  Demander un devis
                  <ArrowRight className="ml-2 w-4 h-4 text-[#000F22] group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/realisations"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white font-display font-bold text-[14px] uppercase tracking-wider transition-all duration-300 hover:bg-white hover:text-[#0A2540] hover:-translate-y-1 active:scale-95 rounded-xs shadow-xs"
                >
                  Voir nos réalisations
                </Link>
              </div>
            </div>

            {/* Colonne Droite: Télémesure Technique & Image Animée */}
            <div className="lg:col-span-5 hidden lg:block relative h-full min-h-[440px] fade-in-up delay-400">
              <div className="card-stitch p-4 flex flex-col justify-between h-full shadow-2xl bg-[#0A2540]/90 backdrop-blur-md border-[#00C2FF]/30">
                <div className="flex justify-between items-start text-[#00C2FF] font-mono text-[12px] font-semibold">
                  <span>X: 45.209</span>
                  <span>Y: -12.983</span>
                </div>

                <div className="w-full h-72 relative my-3 overflow-hidden border border-[#00C2FF]/30 bg-[#0A2540] rounded-xs">
                  {heroSlides.map((slide, idx) => (
                    <img
                      key={idx}
                      src={slide.image}
                      alt={slide.title}
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                        idx === currentHeroSlide ? "opacity-100 scale-105" : "opacity-0 scale-100"
                      } transition-transform duration-700`}
                    />
                  ))}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/90 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-3 left-3 bg-[#0A2540]/95 backdrop-blur-md border border-[#00C2FF]/50 px-3 py-1 rounded-xs text-[11px] font-mono text-[#00C2FF] font-semibold">
                    {heroSlides[currentHeroSlide].tag}
                  </div>
                </div>

                <div className="flex justify-between items-end text-slate-300 font-mono text-[12px]">
                  <span className="flex items-center gap-1.5 text-[#00C2FF] font-semibold">
                    <span className="w-2 h-2 rounded-full bg-[#00C2FF] animate-pulse" />
                    SYS. OK • DIAPORAMA
                  </span>
                  <span className="font-semibold">{currentHeroSlide + 1} / {heroSlides.length}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats Bar en Bleu Marine */}
          <div className="absolute bottom-0 left-0 w-full bg-[#0A2540] border-t border-[#295EA8]/30 z-20 text-white">
            <div className="max-w-6xl mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="flex flex-col gap-1 fade-in-up">
                <span className="font-display font-extrabold text-[28px] md:text-[34px] text-[#00C2FF]">15+</span>
                <span className="font-mono text-[11px] text-slate-300 uppercase tracking-wider">Années d&apos;expérience</span>
              </div>
              <div className="flex flex-col gap-1 fade-in-up delay-100">
                <span className="font-display font-extrabold text-[28px] md:text-[34px] text-[#00C2FF]">120+</span>
                <span className="font-mono text-[11px] text-slate-300 uppercase tracking-wider">Projets réalisés</span>
              </div>
              <div className="flex flex-col gap-1 fade-in-up delay-200">
                <span className="font-display font-extrabold text-[28px] md:text-[34px] text-[#00C2FF]">45+</span>
                <span className="font-mono text-[11px] text-slate-300 uppercase tracking-wider">Collaborateurs qualifiés</span>
              </div>
              <div className="flex flex-col gap-1 fade-in-up delay-300">
                <span className="font-display font-extrabold text-[28px] md:text-[34px] text-[#00C2FF]">100%</span>
                <span className="font-mono text-[11px] text-slate-300 uppercase tracking-wider">Rigueur &amp; Sécurité</span>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== SERVICES SECTION ===================== */}
        <section id="services" className="py-24 bg-[#F7F9FF] blueprint-grid relative z-10 border-b border-[#C4C6CE]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="mb-16 fade-in-up">
              <span className="technical-badge mb-3">
                NOS DOMAINES D&apos;INTERVENTION
              </span>
              <h2 className="font-display font-bold text-[34px] md:text-[44px] text-[#0A2540] mt-2">
                Une expertise <span className="text-[#295EA8]">globale.</span>
              </h2>
              <p className="font-sans text-[16px] text-[#5B6B7A] mt-3 max-w-xl">
                De l&apos;étude de faisabilité technique à la livraison clé en main, nous assurons chaque métier avec précision et lisibilité.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {initialServices.map((service, index) => {
                const delayClasses = ["", "delay-100", "delay-200", "delay-300"];

                return (
                  <div 
                    key={service.id} 
                    className={`fade-in-up ${delayClasses[index]} card-stitch flex flex-col justify-between group h-full overflow-hidden`}
                  >
                    <div>
                      {/* Image Réelle du Métier BTP */}
                      <div className="relative w-full h-44 overflow-hidden bg-[#0A2540] border-b border-[#C4C6CE]">
                        <img 
                          src={service.image} 
                          alt={service.title}
                          className="w-full h-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/80 via-transparent to-transparent opacity-60" />
                        
                        <span className="absolute top-3 right-3 font-mono text-[10px] font-semibold text-[#00C2FF] bg-[#0A2540]/90 backdrop-blur-md px-2.5 py-1 border border-[#00C2FF]/30 rounded-xs shadow-md">
                          {serviceBadges[index]}
                        </span>
                      </div>

                      <div className="p-6">
                        <h3 className="font-display text-[19px] leading-snug font-bold text-[#0A2540] mb-3 group-hover:text-[#295EA8] transition-colors">
                          {service.title}
                        </h3>

                        <p className="font-sans text-[14px] text-[#5B6B7A] leading-relaxed mb-4">
                          {service.short_description}
                        </p>
                      </div>
                    </div>

                    <div className="px-6 pb-6 pt-0 mt-auto">
                      <div className="pt-4 border-t border-[#C4C6CE]/60">
                        <Link 
                          className="inline-flex items-center text-[#0A2540] font-mono text-[11px] font-semibold uppercase tracking-wider group/link transition-colors hover:text-[#295EA8]" 
                          href={`/services#${service.slug}`}
                        >
                          <span>En savoir plus</span>
                          <ChevronRight className="ml-1 w-4 h-4 text-[#00C2FF] group-hover/link:translate-x-1.5 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ===================== NOUVELLE SECTION GALERIE PHOTO / CHANTIERS ===================== */}
        <section id="galerie" className="py-24 bg-white border-b border-[#C4C6CE] relative">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 fade-in-up">
              <div>
                <span className="technical-badge mb-3">
                  GALERIE PHOTOS &amp; RÉALISATIONS
                </span>
                <h2 className="font-display font-bold text-[34px] md:text-[44px] text-[#0A2540] mt-2">
                  Nos chantiers en <span className="text-[#295EA8]">images.</span>
                </h2>
                <p className="font-sans text-[16px] text-[#5B6B7A] mt-3 max-w-xl">
                  Découvrez l&apos;exécution technique de nos projets : du terrassement au coffrage, jusqu&apos;à la finition des ouvrages.
                </p>
              </div>

              {/* Filtres de la Galerie */}
              <div className="flex flex-wrap gap-2 mt-6 md:mt-0">
                {[
                  { id: "all", label: "Toutes les photos" },
                  { id: "supervision", label: "Supervision" },
                  { id: "gros-oeuvre", label: "Gros Œuvre" },
                  { id: "renovation", label: "Surélévation & Bois" },
                  { id: "etudes", label: "Bureau d'Études" }
                ].map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedGalleryCategory(cat.id)}
                    className={`px-3.5 py-2 font-mono text-[11px] uppercase tracking-wider transition-all rounded-xs border ${
                      selectedGalleryCategory === cat.id
                        ? "bg-[#0A2540] text-[#00C2FF] border-[#0A2540] shadow-sm font-semibold"
                        : "bg-[#F1F4F7] text-[#5B6B7A] border-[#C4C6CE] hover:border-[#0A2540] hover:text-[#0A2540]"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Grille de la Galerie Photo Stitch */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGallery.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setActiveLightboxImage(item)}
                  className="fade-in-up card-stitch group cursor-pointer overflow-hidden flex flex-col justify-between"
                >
                  <div className="relative h-64 overflow-hidden bg-[#0A2540]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-95"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540] via-transparent to-transparent opacity-75 group-hover:opacity-60 transition-opacity" />
                    
                    <span className="absolute top-3 left-3 bg-[#0A2540]/90 backdrop-blur-md text-[#00C2FF] border border-[#00C2FF]/30 font-mono text-[10px] font-semibold px-2.5 py-1 rounded-xs">
                      {item.categoryName}
                    </span>

                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#0A2540]/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity border border-[#00C2FF]/50 shadow-md">
                      <Maximize2 className="w-4 h-4 text-[#00C2FF]" />
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="font-display font-bold text-[18px] leading-snug drop-shadow-md group-hover:text-[#00C2FF] transition-colors">
                        {item.title}
                      </h3>
                      <p className="font-sans text-[13px] text-slate-200 line-clamp-2 mt-1 drop-shadow-sm opacity-90">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/realisations"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#0A2540] text-white hover:bg-[#295EA8] font-display font-semibold text-[13px] uppercase tracking-wider rounded-xs transition-all shadow-md"
              >
                <span>Explorer tous nos chantiers en détail</span>
                <ArrowRight className="w-4 h-4 text-[#00C2FF]" />
              </Link>
            </div>
          </div>
        </section>

        {/* ===================== GROUPE ABOUT SECTION AMÉLIORÉE ===================== */}
        <section id="groupe" className="py-24 bg-[#F7F9FF] blueprint-grid border-b border-[#C4C6CE] relative">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
              <div className="fade-in-up">
                <span className="technical-badge mb-3">
                  À PROPOS DU GROUPE
                </span>
                <h2 className="font-display font-bold text-[34px] md:text-[44px] text-[#0A2540] leading-tight mt-2">
                  Le Groupe <span className="text-[#295EA8]">Best Builders</span>
                </h2>
                <p className="font-sans text-[16px] text-[#5B6B7A] mt-4 leading-relaxed">
                  {initialSiteSettings.about_text}
                </p>
                <p className="font-sans text-[16px] text-[#5B6B7A] mt-3 leading-relaxed">
                  Grâce à notre bureau d&apos;études intégré et notre expérience du terrain en Guinée, nous garantissons la stabilité des ouvrages, le respect des budgets et la sécurité sur tous nos chantiers.
                </p>

                {/* Cartes de valeurs & piliers d'ingénierie */}
                <div className="grid grid-cols-3 gap-4 mt-8">
                  <div className="card-stitch p-4 text-center">
                    <ShieldCheck className="w-5 h-5 text-[#295EA8] mx-auto mb-2" />
                    <span className="font-mono text-[11px] font-bold text-[#0A2540] uppercase block">Sécurité</span>
                    <span className="font-sans text-[10px] text-[#5B6B7A]">Normes BAEL</span>
                  </div>
                  <div className="card-stitch p-4 text-center">
                    <Target className="w-5 h-5 text-[#295EA8] mx-auto mb-2" />
                    <span className="font-mono text-[11px] font-bold text-[#0A2540] uppercase block">Précision</span>
                    <span className="font-sans text-[10px] text-[#5B6B7A]">Métré exact</span>
                  </div>
                  <div className="card-stitch p-4 text-center">
                    <Award className="w-5 h-5 text-[#295EA8] mx-auto mb-2" />
                    <span className="font-mono text-[11px] font-bold text-[#0A2540] uppercase block">Qualité</span>
                    <span className="font-sans text-[10px] text-[#5B6B7A]">Matériaux certifiés</span>
                  </div>
                </div>

                <div className="mt-8">
                  <Link
                    href="/a-propos"
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#0A2540] text-white hover:bg-[#295EA8] font-display font-semibold text-[13px] uppercase tracking-wider rounded-xs transition-all shadow-md"
                  >
                    <span>Découvrir notre histoire &amp; vision</span>
                    <ArrowRight className="w-4 h-4 text-[#00C2FF]" />
                  </Link>
                </div>
              </div>

              <div className="fade-in-up delay-200 relative">
                <div className="bg-[#0A2540] border border-[#295EA8]/40 p-8 rounded-sm relative overflow-hidden shadow-2xl blueprint-grid-dark text-white">
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-[11px] text-[#00C2FF]">FICHE TECHNIQUE • GROUPE</span>
                    <span className="w-2 h-2 rounded-full bg-[#00C2FF] animate-pulse" />
                  </div>
                  
                  <div className="relative h-64 w-full rounded-xs overflow-hidden border border-[#295EA8]/40 mb-6">
                    <img
                      src="/img/showcase/architecte-bureau.png"
                      alt="Bureau d'études Best Builders"
                      className="w-full h-full object-cover grayscale contrast-125"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540] via-transparent to-transparent opacity-80" />
                    <span className="absolute bottom-3 left-3 font-mono text-[10px] text-[#00C2FF] font-semibold bg-[#0A2540]/90 px-2 py-1 rounded-xs border border-[#00C2FF]/30">
                      INGÉNIERIE &amp; CALCULS DE STRUCTURES
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-display font-bold text-white text-[16px]">Bureau d&apos;Études &amp; Construction BTP</span>
                    <Link href="/a-propos" className="text-[#00C2FF] hover:text-white inline-flex items-center text-xs font-mono uppercase tracking-wider font-semibold">
                      Histoire <ArrowUpRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== NOUVELLE SECTION ÉQUIPE & EXPERTS ===================== */}
        <section id="equipe" className="py-24 bg-white border-b border-[#C4C6CE] relative">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16 fade-in-up">
              <div className="inline-flex items-center gap-2 mb-3">
                <Users className="w-5 h-5 text-[#295EA8]" />
                <span className="technical-badge">
                  DIRECTION &amp; DIRECTION TECHNIQUE
                </span>
              </div>
              <h2 className="font-display font-bold text-[34px] md:text-[44px] text-[#0A2540] mt-2">
                Des experts engagés sur le <span className="text-[#295EA8]">terrain.</span>
              </h2>
              <p className="font-sans text-[16px] text-[#5B6B7A] max-w-2xl mx-auto mt-3 leading-relaxed">
                Ingénieurs de calculs, juristes, économistes et techniciens de chantier : une équipe pluridisciplinaire au service de la réussite de vos ouvrages.
              </p>
            </div>

            {/* Grille des membres d'équipe */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {initialTeamMembers.slice(0, 4).map((member) => {
                const isGerant = member.role === "Gérant";
                return (
                  <div
                    key={member.id}
                    className={`card-stitch text-center p-6 flex flex-col justify-between group fade-in-up ${
                      isGerant ? "border-2 border-[#0A2540] shadow-lg" : ""
                    }`}
                  >
                    <div>
                      <div className="relative mx-auto mb-5">
                        <div
                          className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center text-[22px] font-bold transition-all shadow-md ${
                            isGerant
                              ? "bg-[#0A2540] text-[#00C2FF] border-2 border-[#00C2FF]"
                              : "bg-[#F1F4F7] text-[#0A2540] border border-[#C4C6CE] group-hover:bg-[#0A2540] group-hover:text-[#00C2FF]"
                          }`}
                        >
                          {getInitials(member.name)}
                        </div>
                        {isGerant && (
                          <span className="absolute -top-2 -right-1 bg-[#0A2540] text-[#00C2FF] font-mono text-[9px] font-semibold px-2 py-0.5 border border-[#00C2FF]/30 uppercase rounded-xs">
                            Fondateur
                          </span>
                        )}
                      </div>

                      <h3 className="font-display font-bold text-[16px] text-[#0A2540] leading-snug group-hover:text-[#295EA8] transition-colors">
                        {member.name}
                      </h3>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#C4C6CE]/60">
                      <span className="font-mono text-[11px] text-[#295EA8] font-semibold uppercase tracking-wider block">
                        {member.role}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/a-propos#equipe"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white border border-[#C4C6CE] text-[#0A2540] hover:bg-[#F1F4F7] hover:border-[#0A2540] font-display font-bold text-[13px] uppercase tracking-wider rounded-xs transition-all shadow-xs"
              >
                <span>Voir l&apos;organigramme complet du groupe</span>
                <ChevronRight className="w-4 h-4 text-[#00C2FF]" />
              </Link>
            </div>
          </div>
        </section>

        {/* ===================== CONTACT SECTION ===================== */}
        <section id="contact" className="py-24 bg-[#F7F9FF] border-t border-[#C4C6CE] relative">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div className="fade-in-up">
                <span className="technical-badge mb-3">
                  CONTACT &amp; DEVIS TECHNIQUE
                </span>
                <h2 className="font-display font-bold text-[34px] md:text-[44px] text-[#0A2540] mt-2">
                  Un projet en tête ?
                </h2>
                <p className="font-sans text-[16px] text-[#5B6B7A] mt-4 leading-relaxed">
                  Consultez notre équipe d&apos;ingénieurs pour une analyse structurelle, un métré ou une estimation complète sous 24h.
                </p>

                <div className="mt-8">
                  <ContactInfo />
                </div>
              </div>

              <div className="fade-in-up delay-200">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* MODAL LIGHTBOX PHOTO DE GALERIE */}
      {activeLightboxImage && (
        <div 
          className="fixed inset-0 z-50 bg-[#0A2540]/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActiveLightboxImage(null)}
        >
          <div 
            className="relative w-full max-w-4xl bg-[#0A2540] border border-[#00C2FF]/40 rounded-sm overflow-hidden shadow-2xl blueprint-grid-dark text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 bg-[#0A2540] border-b border-[#295EA8]/40 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00C2FF] animate-pulse" />
                <h4 className="font-display font-bold text-[16px] text-white">
                  {activeLightboxImage.title}
                </h4>
              </div>
              <button
                onClick={() => setActiveLightboxImage(null)}
                className="p-1.5 text-slate-300 hover:text-white hover:bg-[#295EA8] rounded-xs transition-all"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative max-h-[70vh] bg-black flex items-center justify-center overflow-hidden">
              <img
                src={activeLightboxImage.image}
                alt={activeLightboxImage.title}
                className="max-h-[70vh] w-auto object-contain"
              />
            </div>

            <div className="p-6 bg-[#0A2540] border-t border-[#295EA8]/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="font-mono text-[10px] text-[#00C2FF] uppercase tracking-wider block font-semibold mb-1">
                  {activeLightboxImage.categoryName}
                </span>
                <p className="font-sans text-[14px] text-slate-200">
                  {activeLightboxImage.desc}
                </p>
              </div>
              <button
                onClick={() => setActiveLightboxImage(null)}
                className="px-6 py-2.5 bg-[#00C2FF] text-[#000F22] font-display font-bold text-[12px] uppercase tracking-wider rounded-xs hover:bg-white transition-all shadow-md shrink-0"
              >
                Fermer l&apos;aperçu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
