"use client";

import { useState, useEffect } from "react";
import { Calendar, ArrowRight } from "lucide-react";
import { initialArticles, getStoredArticles } from "@/lib/data";
import PageHeader from "@/components/PageHeader";

export default function BlogPage() {
  const [articles, setArticles] = useState(initialArticles);

  useEffect(() => {
    // Charger les articles dynamiques sauvegardés en local ou via Supabase
    setArticles(getStoredArticles());

    const handleUpdate = () => {
      setArticles(getStoredArticles());
    };

    window.addEventListener("articles_updated", handleUpdate);
    return () => window.removeEventListener("articles_updated", handleUpdate);
  }, []);

  return (
    <div className="bg-[#F7F9FF] blueprint-grid pb-20 md:pb-28 min-h-screen">
      {/* Header Banner */}
      <PageHeader
        badge="Espace Presse &amp; Technique"
        title="Actualités &amp; Publications BTP"
        description="Retrouvez les dernières informations sur nos chantiers, nos conseils d&apos;ingénierie et la vie du Groupe."
      />

      <div className="max-w-6xl mx-auto px-6">
        {/* Articles Grid */}
        <div className="grid sm:grid-cols-2 gap-8">
          {articles.map((article) => (
            <div
              key={article.id}
              className="card-stitch flex flex-col h-full group"
            >
              <div className="h-52 bg-[#0A2540] flex items-center justify-center p-6 relative border-b border-[#C4C6CE] blueprint-grid-dark">
                <img
                  src={article.image || "/img/logo.png"}
                  alt={article.title}
                  className="max-h-36 w-auto object-contain opacity-95 group-hover:scale-105 transition-transform duration-500 bg-white/95 p-3 rounded-xs shadow-md border border-[#00C2FF]/30"
                />
              </div>
              <div className="p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 font-mono text-[11px] text-[#295EA8] font-semibold uppercase mb-3 bg-[#F1F4F7] px-2.5 py-1 border border-[#C4C6CE] rounded-xs inline-flex">
                    <Calendar className="w-3.5 h-3.5 text-[#00C2FF]" />
                    <span>{article.published_at}</span>
                  </div>

                  <h2 className="font-display font-bold text-[22px] text-[#0A2540] leading-snug mb-4 group-hover:text-[#295EA8] transition-colors">
                    {article.title}
                  </h2>

                  <p className="font-sans text-[15px] text-[#334155] leading-relaxed mb-6">
                    {article.content}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#C4C6CE] mt-auto">
                  <span className="inline-flex items-center font-display font-semibold text-[13px] uppercase tracking-wider text-[#0A2540] group-hover:text-[#295EA8] transition-colors">
                    <span>Lire l&apos;article complet</span>
                    <ArrowRight className="w-4 h-4 ml-2 text-[#00C2FF] transition-transform group-hover:translate-x-1.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
