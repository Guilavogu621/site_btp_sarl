import Link from "next/link";
import { CheckCircle2, ShieldCheck, Target, Award, ArrowRight, Users, Sparkles, Building2, Layers } from "lucide-react";
import { initialSiteSettings, initialTeamMembers } from "@/lib/data";
import PageHeader from "@/components/PageHeader";
import { getInitials } from "@/lib/utils";

export const metadata = {
  title: "Le Groupe Best Builders — À Propos & Présentation",
  description: "Découvrez l'histoire, la vision, les valeurs et l'équipe dirigeante du Groupe Best Builders SARLU en Guinée.",
};

export default function AboutPage() {
  return (
    <div className="bg-[#F7F9FF] blueprint-grid pb-20 md:pb-28 min-h-screen">
      {/* Header Banner */}
      <PageHeader
        id="qui-sommes-nous"
        badge="À Propos du Groupe"
        title="Ingénierie & Construction BTP en Guinée"
        description="Un acteur de référence alliant savoir-faire technique, rigueur de calcul et excellence d'exécution sur le terrain."
      />

      <div className="max-w-6xl mx-auto px-6">
        {/* Story Section Card */}
        <div id="historique" className="card-stitch p-8 md:p-12 grid md:grid-cols-2 gap-12 items-center mb-20 scroll-mt-32 shadow-xl">
          <div>
            <span className="technical-badge mb-4">
              MISSION &amp; HISTORIQUE
            </span>
            <h2 className="font-display font-bold text-[28px] md:text-[36px] text-[#0A2540] mt-3 mb-6 leading-tight">
              Notre Mission &amp; Vision
            </h2>
            <p className="font-sans text-[16px] text-[#334155] leading-relaxed mb-4">
              {initialSiteSettings.about_text}
            </p>
            <p className="font-sans text-[16px] text-[#334155] leading-relaxed mb-8">
              Depuis notre création, nous veillons à maintenir un niveau d&apos;exigence maximal dans la conception des structures et la conduite des travaux. Notre bureau d&apos;études intégré nous permet de contrôler l&apos;ensemble de la chaîne de valeur.
            </p>
            <div className="space-y-4">
              {[
                "Études de structures conformes aux normes Eurocodes/BAEL",
                "Maîtrise totale des délais et du chiffrage budgétaire",
                "Supervision continue sur le terrain par des ingénieurs certifiés"
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 group">
                  <div className="w-7 h-7 rounded-md bg-[#F1F4F7] border border-[#C4C6CE] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#0A2540] group-hover:border-[#0A2540] transition-all">
                    <CheckCircle2 className="w-4 h-4 text-[#00C2FF]" />
                  </div>
                  <span className="font-display font-semibold text-[15px] text-[#0A2540] leading-snug">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#0A2540] p-8 rounded-md border border-[#295EA8]/40 flex flex-col items-center justify-center min-h-[380px] relative overflow-hidden blueprint-grid-dark text-white">
            {/* Decorative corner lines */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[#00C2FF]/30" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[#00C2FF]/30" />

            <div className="relative">
              <img
                src="/img/logo.png"
                alt="Logo Best Builders"
                className="max-h-44 w-auto object-contain bg-white/95 p-5 rounded-md border border-[#00C2FF]/20 mb-5 drop-shadow-2xl"
              />
              <div className="absolute -bottom-2 -right-2 w-5 h-5 bg-[#00C2FF] rounded-full animate-pulse shadow-[0_0_12px_rgba(0,194,255,0.5)]" />
            </div>

            <div className="technical-badge technical-badge-vibrant mt-2">
              BUREAU D&apos;ÉTUDES AGRÉÉ • GUINÉE
            </div>

            <div className="mt-6 flex items-center gap-6 text-[#00C2FF] font-mono text-[11px] font-semibold">
              <span>EST. 2009</span>
              <span className="w-px h-4 bg-[#295EA8]" />
              <span>CONAKRY</span>
              <span className="w-px h-4 bg-[#295EA8]" />
              <span>KIPÉ</span>
            </div>
          </div>
        </div>

        {/* Values Grid — Premium 3 Pillars */}
        <div id="nos-valeurs" className="mb-20 scroll-mt-32 section-divider pt-8">
          <div className="text-center mb-12">
            <span className="technical-badge mb-4">
              NOS PILIERS FONDAMENTAUX
            </span>
            <h2 className="font-display font-bold text-[30px] md:text-[38px] text-[#0A2540] mt-3">
              Engagement &amp; Rigueur <span className="text-[#295EA8]">Technique</span>
            </h2>
            <p className="font-sans text-[16px] text-[#5B6B7A] max-w-xl mx-auto mt-3">
              Trois principes fondateurs guident chaque décision technique et chaque étape de nos chantiers.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-8">
            {[
              {
                icon: <ShieldCheck className="w-7 h-7" />,
                title: "Sécurité & Fiabilité",
                accent: "#295EA8",
                desc: "La sécurité des structures et des personnes est notre priorité absolue. Chaque ouvrage est dimensionné avec un coefficient de sécurité optimal selon les normes BAEL et Eurocodes.",
                stat: "100%",
                statLabel: "Zéro accident"
              },
              {
                icon: <Target className="w-7 h-7" />,
                title: "Précision Technique",
                accent: "#00C2FF",
                desc: "Notre bureau d'études utilise les logiciels de modélisation et de calculs de structures les plus performants du secteur BTP. Chaque métré est vérifié deux fois.",
                stat: "±0.5%",
                statLabel: "Marge d'erreur"
              },
              {
                icon: <Award className="w-7 h-7" />,
                title: "Excellence d'Exécution",
                accent: "#295EA8",
                desc: "De la sélection des matériaux de chantier à la livraison finale, nos équipes appliquent un contrôle qualité strict à chaque étape des travaux.",
                stat: "120+",
                statLabel: "Projets livrés"
              }
            ].map((value, idx) => (
              <div key={idx} className="card-stitch p-8 flex flex-col group relative">
                {/* Stat badge en haut à droite */}
                <div className="absolute top-4 right-4 text-right">
                  <span className="font-display font-extrabold text-[28px] text-[#0A2540]/10 group-hover:text-[#00C2FF]/20 transition-colors leading-none block">
                    {value.stat}
                  </span>
                  <span className="font-mono text-[9px] text-[#5B6B7A]/60 uppercase tracking-wider">
                    {value.statLabel}
                  </span>
                </div>

                <div className="icon-box-stitch mb-6">
                  {value.icon}
                </div>
                <h3 className="font-display font-bold text-[20px] text-[#0A2540] mb-3 group-hover:text-[#295EA8] transition-colors leading-snug">
                  {value.title}
                </h3>
                <p className="font-sans text-[14px] text-[#334155] leading-relaxed flex-grow">
                  {value.desc}
                </p>

                {/* Progress bar visuel */}
                <div className="mt-6 pt-4 border-t border-[#C4C6CE]/50">
                  <div className="w-full h-1 bg-[#F1F4F7] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700 group-hover:w-full"
                      style={{
                        width: "0%",
                        background: `linear-gradient(to right, #0A2540, ${value.accent})`
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section Équipe Dirigeante */}
        <div id="equipe" className="mb-20 scroll-mt-32 section-divider pt-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-[#295EA8]" />
              <span className="technical-badge">
                ORGANIGRAMME &amp; ÉQUIPE
              </span>
            </div>
            <h2 className="font-display font-bold text-[30px] md:text-[38px] text-[#0A2540] mt-1">
              Des experts engagés sur le <span className="text-[#295EA8]">terrain</span>
            </h2>
            <p className="font-sans text-[16px] text-[#5B6B7A] max-w-2xl mx-auto mt-3 leading-relaxed">
              Ingénieurs, juristes, économistes et techniciens : une équipe pluridisciplinaire au service de vos projets.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {initialTeamMembers.map((member) => {
              const isGerant = member.role === "Gérant";
              return (
                <div
                  key={member.id}
                  className={`card-stitch text-center p-6 flex flex-col justify-between group ${
                    isGerant ? "border-2 border-[#0A2540] shadow-lg" : ""
                  }`}
                >
                  <div>
                    <div className="relative mx-auto mb-5">
                      {member.photo ? (
                        <img
                          src={member.photo}
                          alt={member.name}
                          className={`w-20 h-20 object-cover mx-auto rounded-full shadow-md transition-transform group-hover:scale-105 ${
                            isGerant ? "border-[3px] border-[#0A2540] ring-2 ring-[#00C2FF]/30" : "border-2 border-[#C4C6CE]"
                          }`}
                        />
                      ) : (
                        <div
                          className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center text-[22px] font-bold transition-all shadow-md ${
                            isGerant
                              ? "bg-[#0A2540] text-[#00C2FF] border-2 border-[#00C2FF] ring-2 ring-[#00C2FF]/20"
                              : "bg-gradient-to-br from-[#F1F4F7] to-[#E8ECF1] text-[#0A2540] border border-[#C4C6CE] group-hover:bg-[#0A2540] group-hover:from-[#0A2540] group-hover:to-[#0A2540] group-hover:text-[#00C2FF] group-hover:border-[#295EA8]"
                          }`}
                        >
                          {getInitials(member.name)}
                        </div>
                      )}
                      {isGerant && (
                        <span className="absolute -top-2 -right-2 bg-[#0A2540] text-[#00C2FF] font-mono text-[9px] font-semibold px-2.5 py-0.5 border border-[#00C2FF]/30 uppercase rounded-sm shadow-md">
                          Fondateur
                        </span>
                      )}
                    </div>

                    <h3 className="font-display font-bold text-[15px] text-[#0A2540] leading-snug group-hover:text-[#295EA8] transition-colors">
                      {member.name}
                    </h3>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#C4C6CE]/50">
                    <span className="font-mono text-[10px] text-[#295EA8] font-semibold uppercase tracking-wider block">
                      {member.role}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Banner CTA — Premium */}
        <div className="relative bg-[#0A2540] text-white p-12 md:p-16 text-center rounded-md shadow-2xl blueprint-grid-dark border border-[#295EA8]/30 overflow-hidden">
          {/* Decorative corners */}
          <div className="absolute top-5 left-5 w-10 h-10 border-t-2 border-l-2 border-[#00C2FF]/25" />
          <div className="absolute bottom-5 right-5 w-10 h-10 border-b-2 border-r-2 border-[#00C2FF]/25" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-px bg-gradient-to-r from-transparent via-[#00C2FF]/50 to-transparent" />

          <div className="relative z-10">
            <span className="technical-badge technical-badge-vibrant mb-6">
              EXPERTISE DISPONIBLE
            </span>
            <h2 className="font-display font-bold text-[28px] md:text-[38px] mb-5 mt-4 leading-tight">
              Confiez vos projets à nos ingénieurs
            </h2>
            <p className="font-sans text-[16px] text-slate-200 max-w-xl mx-auto mb-10 leading-relaxed">
              Profitez d&apos;une étude de faisabilité et d&apos;une évaluation personnalisée pour vos futurs chantiers BTP.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#00C2FF] text-[#000F22] font-display font-bold text-[14px] uppercase tracking-wider hover:bg-white transition-all shadow-lg rounded-sm hover:-translate-y-1 active:scale-95"
            >
              <span>Contactez notre bureau d&apos;études</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
