"use client";

import { useState, useEffect } from "react";
import {
  ArrowRight,
  Building2,
  MapPin,
  Clock,
  Maximize2,
  CheckCircle2,
  Sparkles,
  Layers,
  X,
  Eye,
  Filter
} from "lucide-react";
import { initialProjects, getProjects } from "@/lib/data";
import PageHeader from "@/components/PageHeader";

const categories = [
  "Tous les types",
  "Rénovation & Surélévation",
  "Bâtiment collectif R+12",
  "Gros Œuvre & Structure",
  "Mixte bureaux / commerces",
  "Équipement public & Culture",
  "Supervision & Contrôle OPC"
];

export default function PortfolioPage() {
  const [projects, setProjects] = useState(initialProjects);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all"); // 'all', 'ongoing', 'completed'
  const [activeCategory, setActiveCategory] = useState("Tous les types");
  const [imageToggleState, setImageToggleState] = useState({}); // { [projectId]: 'after' | 'before' }
  const [activeLightboxProject, setActiveLightboxProject] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Charger les projets en temps réel depuis Supabase
  useEffect(() => {
    async function fetchProjectsData() {
      try {
        const fetched = await getProjects();
        if (fetched && fetched.length > 0) {
          setProjects(fetched);
        }
      } catch (err) {
        console.error("Erreur de chargement des projets :", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProjectsData();
  }, []);

  // Filtrage combiné par Statut (En cours / Terminé) et par Catégorie
  const filteredProjects = projects.filter((project) => {
    // Filtre Statut
    if (statusFilter === "ongoing" && !project.is_ongoing) return false;
    if (statusFilter === "completed" && project.is_ongoing) return false;

    // Filtre Catégorie
    if (activeCategory !== "Tous les types" && project.category !== activeCategory) {
      return false;
    }

    return true;
  });

  const toggleImageMode = (projectId, mode) => {
    setImageToggleState((prev) => ({
      ...prev,
      [projectId]: mode
    }));
  };

  return (
    <div className="bg-[#F7F9FF] blueprint-grid pb-24 md:pb-32 min-h-screen">
      {/* Header Banner */}
      <PageHeader
        badge="PORTFOLIO & CHANTIERS BTP"
        title="Nos Ouvrages &amp; Suivi de Chantier"
        description="Découvrez nos chantiers en cours d'exécution et nos projets de construction livrés à Conakry et en Guinée."
      />

      <div className="max-w-6xl mx-auto px-6">
        {/* ================= BARRE DE FILTRES D'AVANCEMENT & CATÉGORIES ================= */}
        <div className="bg-white border border-[#C4C6CE] p-6 rounded-sm shadow-md mb-12 space-y-6">
          {/* BARRE DE FILTRE 1 : STATUT CHANTIER (EN COURS / TERMINÉ) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#C4C6CE] pb-5">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#295EA8]" />
              <span className="font-mono text-[11px] font-bold text-[#0A2540] uppercase tracking-wider">
                État d&apos;avancement du chantier :
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setStatusFilter("all")}
                className={`px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-wider rounded-xs transition-all border ${
                  statusFilter === "all"
                    ? "bg-[#0A2540] text-[#00C2FF] border-[#0A2540] shadow-sm"
                    : "bg-[#F1F4F7] text-[#5B6B7A] border-[#C4C6CE] hover:border-[#0A2540] hover:text-[#0A2540]"
                }`}
              >
                Tous les chantiers ({projects.length})
              </button>

              <button
                onClick={() => setStatusFilter("ongoing")}
                className={`px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-wider rounded-xs transition-all flex items-center gap-1.5 border ${
                  statusFilter === "ongoing"
                    ? "bg-[#0A2540] text-[#00C2FF] border-[#0A2540] shadow-sm"
                    : "bg-[#F1F4F7] text-[#5B6B7A] border-[#C4C6CE] hover:border-[#0A2540] hover:text-[#0A2540]"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-[#00C2FF] animate-ping" />
                ⚡ Chantiers En Cours ({projects.filter((p) => p.is_ongoing).length})
              </button>

              <button
                onClick={() => setStatusFilter("completed")}
                className={`px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-wider rounded-xs transition-all flex items-center gap-1.5 border ${
                  statusFilter === "completed"
                    ? "bg-[#0A2540] text-emerald-400 border-[#0A2540] shadow-sm"
                    : "bg-[#F1F4F7] text-[#5B6B7A] border-[#C4C6CE] hover:border-[#0A2540] hover:text-[#0A2540]"
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                ✓ Ouvrages Livrés ({projects.filter((p) => !p.is_ongoing).length})
              </button>
            </div>
          </div>

          {/* BARRE DE FILTRE 2 : CATÉGORIES TECHNIQUE */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 text-[11px] font-display font-semibold uppercase tracking-wider transition-all rounded-xs border ${
                  activeCategory === cat
                    ? "bg-[#1E56A0] text-white border-[#1E56A0] shadow-xs"
                    : "bg-white text-[#5B6B7A] border-[#C4C6CE] hover:border-[#1E56A0] hover:text-[#0A2540]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ================= GRILLE DES PROJETS DU PORTFOLIO ================= */}
        {filteredProjects.length === 0 ? (
          <div className="bg-white p-12 text-center border border-[#C4C6CE] text-[#5B6B7A] rounded-sm shadow-sm space-y-3">
            <h3 className="font-display font-bold text-[20px] text-[#0A2540]">
              Aucun ouvrage publié pour le moment
            </h3>
            <p className="font-sans text-[14px] text-[#5B6B7A] max-w-lg mx-auto">
              Nos réalisations et fiches chantiers seront publiées très prochainement par notre équipe technique depuis le Dashboard.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => {
              const currentImageMode = imageToggleState[project.id] || (project.photo_after ? "after" : "before");
              const displayedImage = currentImageMode === "before" ? (project.photo_before || project.photo_after) : (project.photo_after || project.photo_before);

              return (
                <div
                  key={project.id}
                  id={`project-${project.id}`}
                  className="card-stitch flex flex-col h-full group border border-[#C4C6CE] shadow-md hover:shadow-xl transition-all duration-300 bg-white"
                >
                  {/* PHOTO DU CHANTIER AVEC PASTILLES & COMMUTATEUR AVANT/APRÈS */}
                  <div className="h-64 relative bg-[#0A2540] overflow-hidden border-b border-[#C4C6CE]">
                    <img
                      src={displayedImage}
                      alt={project.title}
                      className="w-full h-full object-cover opacity-95 group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/85 via-transparent to-transparent opacity-70" />

                    {/* BADGE STATUT EN COURS OU TERMINÉ */}
                    {project.is_ongoing ? (
                      <div className="absolute top-3 left-3 bg-[#00C2FF] text-[#000F22] text-[10px] font-mono px-2.5 py-1 uppercase font-bold tracking-wider rounded-xs shadow-md flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#000F22] animate-ping" />
                        Chantier En Cours
                      </div>
                    ) : (
                      <div className="absolute top-3 left-3 bg-[#0A2540] text-emerald-300 text-[10px] font-mono px-2.5 py-1 uppercase font-bold tracking-wider rounded-xs border border-emerald-400/40 shadow-md flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        Ouvrage Livré
                      </div>
                    )}

                    {/* LOCALISATION */}
                    <div className="absolute top-3 right-3 bg-[#0A2540]/90 backdrop-blur-md text-[#00C2FF] text-[10px] font-mono px-2.5 py-1 uppercase font-semibold border border-[#00C2FF]/30 rounded-xs">
                      {project.location}
                    </div>

                    {/* COMMUTATEUR BASCULE AVANT / APRÈS (SEULEMENT SI DEUX PHOTOS EXISTENT) */}
                    {project.photo_before && project.photo_after && (
                      <div className="absolute bottom-3 left-3 flex gap-1 bg-[#0A2540]/95 backdrop-blur-md p-1 border border-[#00C2FF]/40 rounded-xs z-10">
                        <button
                          onClick={() => toggleImageMode(project.id, "before")}
                          className={`px-2.5 py-1 text-[9px] font-mono uppercase font-bold rounded-xs transition-all ${
                            currentImageMode === "before"
                              ? "bg-[#00C2FF] text-[#000F22] shadow-xs"
                              : "text-slate-300 hover:text-white"
                          }`}
                        >
                          Début / Avant
                        </button>
                        <button
                          onClick={() => toggleImageMode(project.id, "after")}
                          className={`px-2.5 py-1 text-[9px] font-mono uppercase font-bold rounded-xs transition-all ${
                            currentImageMode === "after"
                              ? "bg-[#00C2FF] text-[#000F22] shadow-xs"
                              : "text-slate-300 hover:text-white"
                          }`}
                        >
                          Fin / Après
                        </button>
                      </div>
                    )}

                    {/* BOUTON LIGHTBOX POUR AGRANDIR */}
                    <button
                      onClick={() => setActiveLightboxProject(project)}
                      className="absolute bottom-3 right-3 p-2 bg-[#0A2540]/80 hover:bg-[#00C2FF] text-[#00C2FF] hover:text-[#000F22] rounded-xs border border-[#00C2FF]/40 transition-all shadow-md"
                      title="Agrandir la photo"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* DESCRIPTION & CARACTÉRISTIQUES DU PROJET */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="font-mono text-[11px] uppercase tracking-wider text-[#295EA8] mb-2 block font-semibold">
                        {project.category}
                      </span>
                      <h3 className="font-display font-bold text-[20px] text-[#0A2540] mb-3 group-hover:text-[#295EA8] transition-colors leading-snug">
                        {project.title}
                      </h3>
                      <p className="font-sans text-[14px] text-[#334155] leading-relaxed line-clamp-3 mb-6">
                        {project.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#C4C6CE] space-y-2 text-[12px]">
                      <div className="flex justify-between items-center font-mono">
                        <span className="text-[#5B6B7A]">Surface couverte :</span>
                        <span className="font-bold text-[#0A2540]">{project.surface}</span>
                      </div>
                      <div className="flex justify-between items-center font-mono">
                        <span className="text-[#5B6B7A]">Durée d&apos;exécution :</span>
                        <span className="font-bold text-[#0A2540]">{project.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ================= MODAL LIGHTBOX GALERIE MULTI-PHOTOS ================= */}
      {activeLightboxProject && (() => {
        const projectPhotos = (activeLightboxProject.photos && activeLightboxProject.photos.length > 0)
          ? activeLightboxProject.photos
          : [activeLightboxProject.photo_before, activeLightboxProject.photo_after].filter(Boolean);
        
        const safePhotos = projectPhotos.length > 0 ? projectPhotos : ["/img/logo.png"];
        const currentPhoto = safePhotos[activeImageIndex] || safePhotos[0];

        return (
          <div
            className="fixed inset-0 z-50 bg-[#0A2540]/95 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => { setActiveLightboxProject(null); setActiveImageIndex(0); }}
          >
            <div
              className="relative w-full max-w-5xl bg-[#0A2540] border border-[#00C2FF]/40 rounded-sm overflow-hidden shadow-2xl blueprint-grid-dark text-white my-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 bg-[#0A2540] border-b border-[#295EA8]/40 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00C2FF] animate-pulse" />
                  <h4 className="font-display font-bold text-[18px] text-white">
                    {activeLightboxProject.title}
                  </h4>
                </div>
                <button
                  onClick={() => { setActiveLightboxProject(null); setActiveImageIndex(0); }}
                  className="p-1.5 text-slate-300 hover:text-white hover:bg-[#295EA8] rounded-xs transition-all"
                  aria-label="Fermer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* AFFICHAGE GRANDE PHOTO */}
              <div className="p-6 bg-slate-950 flex flex-col items-center">
                <div className="relative w-full h-80 sm:h-[420px] rounded-xs overflow-hidden border border-slate-800 bg-black flex items-center justify-center">
                  <img
                    src={currentPhoto}
                    alt={`${activeLightboxProject.title} - Photo ${activeImageIndex + 1}`}
                    className="w-full h-full object-contain"
                  />

                  {/* Boutons Suivant / Précédent si plusieurs photos */}
                  {safePhotos.length > 1 && (
                    <>
                      <button
                        onClick={() => setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : safePhotos.length - 1))}
                        className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 bg-[#0A2540]/80 hover:bg-[#00C2FF] text-[#00C2FF] hover:text-[#000F22] rounded-full border border-[#00C2FF]/40 transition-all shadow-lg"
                        title="Photo précédente"
                      >
                        ◀
                      </button>
                      <button
                        onClick={() => setActiveImageIndex((prev) => (prev < safePhotos.length - 1 ? prev + 1 : 0))}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 bg-[#0A2540]/80 hover:bg-[#00C2FF] text-[#00C2FF] hover:text-[#000F22] rounded-full border border-[#00C2FF]/40 transition-all shadow-lg"
                        title="Photo suivante"
                      >
                        ▶
                      </button>
                    </>
                  )}

                  <div className="absolute top-3 left-3 bg-[#0A2540]/90 backdrop-blur-md text-[#00C2FF] text-[11px] font-mono px-3 py-1 font-bold rounded-xs border border-[#00C2FF]/30">
                    Photo {activeImageIndex + 1} / {safePhotos.length}
                  </div>
                </div>

                {/* MINIATURES DE LA GALERIE */}
                {safePhotos.length > 1 && (
                  <div className="mt-4 flex items-center justify-center gap-3 flex-wrap max-w-full overflow-x-auto pb-2">
                    {safePhotos.map((imgUrl, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImageIndex(i)}
                        className={`h-16 w-24 rounded-xs overflow-hidden border-2 transition-all ${
                          activeImageIndex === i
                            ? "border-[#00C2FF] scale-105 shadow-md ring-2 ring-[#00C2FF]/50"
                            : "border-slate-700 opacity-60 hover:opacity-100"
                        }`}
                      >
                        <img src={imgUrl} alt={`Miniature ${i + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="p-6 bg-[#0A2540] border-t border-[#295EA8]/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 font-mono text-[12px] text-[#00C2FF] mb-1">
                    <span>Localisation : {activeLightboxProject.location}</span>
                    <span>•</span>
                    <span>Surface : {activeLightboxProject.surface}</span>
                  </div>
                  <p className="font-sans text-[14px] text-slate-200">
                    {activeLightboxProject.description}
                  </p>
                </div>

                <button
                  onClick={() => { setActiveLightboxProject(null); setActiveImageIndex(0); }}
                  className="px-6 py-2.5 bg-[#00C2FF] text-[#000F22] font-display font-bold text-[12px] uppercase tracking-wider rounded-xs hover:bg-white transition-all shadow-md shrink-0"
                >
                  Fermer la galerie
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
