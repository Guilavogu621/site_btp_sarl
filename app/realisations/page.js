"use client";

import { useState } from "react";
import { initialProjects } from "@/lib/data";

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
    <div className="bg-[#f5f5f5] py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Banner */}
        <div className="mb-12">
          <span className="font-mono text-[12px] tracking-widest uppercase text-[#0A2540] font-bold">
            Portfolio & Réalisations
          </span>
          <h1 className="font-display font-bold text-[36px] md:text-[52px] text-[#0A2540] mt-2 leading-tight">
            Nos Chantiers & Ouvrages Réalisés
          </h1>
          <p className="mt-4 text-[18px] text-[#5B6B7A] max-w-3xl leading-relaxed">
            Découvrez une sélection de nos projets de bâtiment et d'ingénierie livrés à Conakry et en région.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-3 mb-12 border-b border-[#e0e0e0] pb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-[13px] font-bold uppercase tracking-wider transition-colors ${
                activeCategory === cat
                  ? "bg-[#0A2540] text-white shadow-sm"
                  : "bg-white text-[#5B6B7A] border border-[#e0e0e0] hover:border-[#0A2540] hover:text-[#0A2540]"
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
              className="bg-white border border-[#e0e0e0] flex flex-col h-full overflow-hidden hover:shadow-lg transition-shadow group hover:border-[#0A2540]"
            >
              <div className="h-56 relative bg-slate-900 overflow-hidden">
                <img
                  src={project.photo_after || project.photo_before}
                  alt={project.title}
                  className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-[#0A2540] text-white text-[11px] font-mono px-2.5 py-1 uppercase font-bold shadow-md">
                  {project.location}
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#0A2540] mb-2 font-bold">
                  {project.category}
                </span>
                <h3 className="font-display font-bold text-[20px] text-[#0A2540] mb-3">
                  {project.title}
                </h3>
                <p className="text-[14px] text-[#5B6B7A] leading-relaxed mb-6 flex-1">
                  {project.description}
                </p>
                <div className="mt-auto pt-4 border-t border-[#e0e0e0] space-y-2 text-[13px] text-[#5B6B7A]">
                  <div className="flex justify-between">
                    <span>Surface :</span>
                    <span className="font-bold text-[#0A2540]">{project.surface}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Durée :</span>
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
