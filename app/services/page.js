import Link from "next/link";
import { Ruler, Calculator, HardHat, Hammer, ArrowRight } from "lucide-react";
import { initialServices } from "@/lib/data";

const iconMap = {
  Ruler: Ruler,
  Calculator: Calculator,
  HardHat: HardHat,
  Hammer: Hammer,
};

export const metadata = {
  title: "Nos Métiers & Services — Best Builders SARLU",
  description: "Découvrez nos métiers : Conception & calcul de structure, chiffrage & économie, gestion & suivi de chantier, rénovation.",
};

export default function ServicesPage() {
  return (
    <div className="bg-[#f5f5f5] py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Banner */}
        <div className="mb-16">
          <span className="font-mono text-[12px] tracking-widest uppercase text-[#0A2540] font-bold">
            Nos Métiers
          </span>
          <h1 className="font-display font-bold text-[36px] md:text-[52px] text-[#0A2540] mt-2 leading-tight">
            Catalogue de Services & Métiers BTP
          </h1>
          <p className="mt-4 text-[18px] text-[#5B6B7A] max-w-3xl leading-relaxed">
            Bureau d'études et contractant général, nous intervenons à toutes les phases de votre projet de construction.
          </p>
        </div>

        {/* Services Detail List */}
        <div className="space-y-12">
          {initialServices.map((service, index) => {
            const IconComp = iconMap[service.icon] || Ruler;
            return (
              <div
                key={service.id}
                id={service.slug}
                className="bg-white p-8 md:p-12 border border-[#e0e0e0] grid md:grid-cols-[100px,1fr] gap-8 items-start scroll-mt-28 shadow-sm hover:border-[#0A2540] transition-colors"
              >
                <div className="w-20 h-20 bg-[#F1F5F9] text-[#0A2540] flex items-center justify-center shrink-0 border border-[#CBD5E1]">
                  <IconComp className="w-10 h-10" />
                </div>

                <div>
                  <span className="font-mono text-[11px] text-[#0A2540] uppercase tracking-wider font-bold">
                    Métier 0{index + 1}
                  </span>
                  <h2 className="font-display font-bold text-[26px] md:text-[32px] text-[#0A2540] mt-1 mb-4">
                    {service.title}
                  </h2>
                  <p className="text-[16px] text-[#5B6B7A] leading-relaxed mb-6 font-medium">
                    {service.short_description}
                  </p>
                  <div className="bg-[#F8FAFC] p-6 border border-[#E2E8F0] mb-6">
                    <p className="text-[15px] text-[#0A2540] leading-relaxed">
                      {service.detailed_content}
                    </p>
                  </div>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0A2540] text-white font-bold text-[13px] uppercase tracking-wider hover:bg-[#1E56A0] transition-colors shadow-sm"
                  >
                    Demander une étude pour ce service
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
