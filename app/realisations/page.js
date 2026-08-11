"use client";

import { useState } from "react";
import { ArrowRight, Building2, MapPin } from "lucide-react";
import { initialProjects } from "@/lib/data";
import PageHeader from "@/components/PageHeader";

const categories = [
  "Tous",
  "Équipement public",
  "Bâtiment industriel",
  "Mixte bureaux / commerces",
  "Logement collectif",
  "Bâtiment tertiaire",
  "Habitat individuel"
];

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("Tous");

  const filteredProjects = activeCategory === "Tous"
    ? initialProjects
    : initialProjects.filter(p => p.category === activeCategory);

  return (
    <div className="bg-[#F7F9FF] blueprint-grid pb-20 md:pb-28 min-h-screen">
      {/* Header Banner */}
      <PageHeader
        badge="Portfolio BTP"
        title="Nos Chantiers &amp; Ouvrages Réalisés"
        description="Découvrez nos projets d&apos;ingénierie et de construction livrés à Conakry et en région."
      />

      <div className="max-w-6xl mx-auto px-6">
        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2.5 mb-12 border-b border-[#C4C6CE] pb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-[12px] font-display font-semibold uppercase tracking-wider transition-all rounded-xs ${
                activeCategory === cat
                  ? "bg-[#0A2540] text-[#00C2FF] shadow-sm border border-[#0A2540]"
                  : "bg-white text-[#334155] border border-[#C4C6CE] hover:border-[#0A2540] hover:text-[#0A2540]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              id={`project-${project.id}`}
              className="card-stitch flex flex-col h-full group"
            >
              <div className="h-56 relative bg-slate-900 overflow-hidden border-b border-[#C4C6CE]">
                <img
                  src={project.photo_after || project.photo_before}
                  alt={project.title}
                  className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                <div className="absolute top-3 right-3 bg-[#0A2540] text-[#00C2FF] text-[10px] font-mono px-2.5 py-1 uppercase font-semibold border border-[#00C2FF]/30">
                  {project.location}
                </div>
                {project.is_ongoing && (
                  <div className="absolute bottom-3 left-3 bg-[#00C2FF] text-[#000F22] text-[10px] font-mono px-2.5 py-0.5 uppercase font-bold tracking-wider">
                    En cours
                  </div>
                )}
              </div>

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
                    <span className="text-[#5B6B7A]">Surface :</span>
                    <span className="font-bold text-[#0A2540]">{project.surface}</span>
                  </div>
                  <div className="flex justify-between items-center font-mono">
                    <span className="text-[#5B6B7A]">Durée :</span>
                    <span className="font-bold text-[#0A2540]">{project.duration}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
