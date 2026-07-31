import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import { initialArticles } from "@/lib/data";

export const metadata = {
  title: "Actualités & Presse — Best Builders SARLU",
  description: "Suivez l'actualité du Groupe Best Builders, nos innovations techniques et nos nouveaux chantiers en Guinée.",
};

export default function BlogPage() {
  return (
    <div className="bg-[#f5f5f5] py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Banner */}
        <div className="mb-16">
          <span className="font-mono text-[12px] tracking-widest uppercase text-navy-light font-bold">
            Espace Presse
          </span>
          <h1 className="font-display font-bold text-[36px] md:text-[52px] text-navy mt-2 leading-tight">
            Actualités & Articles Techniques
          </h1>
          <p className="mt-4 text-[18px] text-[#5B6B7A] max-w-3xl leading-relaxed">
            Retrouvez les dernières informations sur nos chantiers, nos conseils d'ingénierie et la vie du Groupe.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid sm:grid-cols-2 gap-8">
          {initialArticles.map((article) => (
            <div
              key={article.id}
              className="bg-white border border-[#e0e0e0] overflow-hidden flex flex-col h-full hover:shadow-xl transition-all duration-300 group rounded-md"
            >
              <div className="h-52 bg-navy flex items-center justify-center p-6 relative">
                <img
                  src={article.image}
                  alt={article.title}
                  className="max-h-36 w-auto object-contain opacity-90 group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center gap-2 text-[12px] font-mono text-navy-light uppercase font-bold mb-3">
                  <Calendar className="w-4 h-4" />
                  <span>{article.published_at}</span>
                </div>
                <h2 className="font-display font-bold text-[22px] text-navy leading-snug mb-4 group-hover:text-navy-light transition-colors">
                  {article.title}
                </h2>
                <p className="text-[15px] text-[#5B6B7A] leading-relaxed mb-6 flex-1">
                  {article.content}
                </p>
                <div className="mt-auto pt-4 border-t border-[#e0e0e0]">
                  <span className="inline-flex items-center text-[13px] font-bold uppercase tracking-wider text-navy group-hover:text-navy-light transition-colors">
                    Lire l'article complet <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
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
