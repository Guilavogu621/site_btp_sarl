import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { initialServices } from "@/lib/data";
import PageHeader from "@/components/PageHeader";

export const metadata = {
  title: "Nos Métiers & Services — Best Builders SARLU",
  description: "Découvrez nos métiers : Conception & calcul de structure, chiffrage & économie, gestion & suivi de chantier, rénovation.",
};

const serviceBadges = [
  "01 • INGÉNIERIE",
  "02 • ÉCONOMIE",
  "03 • SUPERVISION",
  "04 • RÉNOVATION"
];

export default function ServicesPage() {
  return (
    <div className="bg-[#F7F9FF] blueprint-grid pb-20 md:pb-28 min-h-screen">
      {/* Header Banner */}
      <PageHeader
        badge="Catalogue Métiers"
        title="Ingénierie & Métiers de la Construction"
        description="Bureau d'études et contractant général, nous intervenons à toutes les étapes avec une rigueur absolue."
      />

      <div className="max-w-6xl mx-auto px-6">
        {/* Services Detail List */}
        <div className="space-y-12">
          {initialServices.map((service, index) => {
            const isReversed = index % 2 !== 0;
            return (
              <div
                key={service.id}
                id={service.slug}
                className="card-stitch p-0 scroll-mt-28 grid md:grid-cols-12 items-stretch group overflow-hidden"
              >
                {/* Image du service */}
                <div className={`${isReversed ? "md:col-start-9 md:col-span-4" : "md:col-span-4"} relative min-h-[260px] overflow-hidden bg-[#0A2540] ${isReversed ? "md:order-2" : ""}`}>
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="image-overlay-gradient" />

                  {/* Numéro de service en grand */}
                  <span className="absolute top-4 left-4 font-display font-extrabold text-[48px] text-white/10 leading-none select-none">
                    0{index + 1}
                  </span>

                  <span className="absolute bottom-4 left-4 font-mono text-[10px] text-[#00C2FF] font-semibold bg-[#0A2540]/90 backdrop-blur-sm px-3 py-1.5 border border-[#00C2FF]/30 rounded-sm shadow-md">
                    {serviceBadges[index] || `0${index + 1} • SERVICE`}
                  </span>
                </div>

                {/* Contenu texte */}
                <div className={`${isReversed ? "md:col-start-1 md:col-span-8 md:order-1" : "md:col-span-8"} flex flex-col justify-between p-8 md:p-10`}>
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-3">
                      <span className="technical-badge">
                        {serviceBadges[index] || `0${index + 1} • SERVICE`}
                      </span>
                      <span className="font-mono text-[10px] text-[#5B6B7A] uppercase font-semibold tracking-wider">
                        CONAKRY &amp; RÉGIONS
                      </span>
                    </div>

                    <h2 className="font-display font-bold text-[24px] md:text-[30px] text-[#0A2540] mb-4 group-hover:text-[#295EA8] transition-colors leading-tight">
                      {service.title}
                    </h2>

                    <p className="font-sans text-[15px] text-[#334155] leading-relaxed mb-6">
                      {service.short_description}
                    </p>

                    <div className="bg-[#F7F9FF] p-6 border border-[#C4C6CE]/70 rounded-md mb-6 relative overflow-hidden">
                      {/* Subtle top accent */}
                      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#295EA8]/30 via-[#00C2FF]/30 to-transparent" />

                      <h4 className="font-mono text-[11px] font-semibold uppercase text-[#0A2540] mb-3 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#00C2FF]" />
                        Détails de l&apos;intervention technique :
                      </h4>
                      <p className="font-sans text-[14px] text-[#334155] leading-relaxed">
                        {service.detailed_content}
                      </p>
                    </div>
                  </div>

                  <div>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#0A2540] text-white font-display font-semibold text-[13px] uppercase tracking-wider hover:bg-[#295EA8] transition-all shadow-md rounded-sm group/btn hover:-translate-y-0.5"
                    >
                      <span>Demander une étude pour ce service</span>
                      <ArrowRight className="w-4 h-4 text-[#00C2FF] group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
