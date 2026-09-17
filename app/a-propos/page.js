"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, ShieldCheck, Target, Award, ArrowRight, Users, Sparkles, Building2, Layers } from "lucide-react";
import { initialSiteSettings, initialTeamMembers } from "@/lib/data";
import PageHeader from "@/components/PageHeader";
import TeamMemberModal from "@/components/TeamMemberModal";
import { getInitials } from "@/lib/utils";

export default function AboutPage() {
  const [selectedMember, setSelectedMember] = useState(null);
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

        {/* Section Mot du Président — Style Guicopress */}
        <div id="mot-du-president" className="mb-20 scroll-mt-32 section-divider pt-8">
          <div className="relative bg-white border border-[#CBD5E1] p-8 md:p-12 rounded-xs shadow-md blueprint-grid overflow-hidden">

            {/* Grand filigrane 01 */}
            <div className="absolute -top-6 left-4 sm:left-8 font-display font-black text-[120px] sm:text-[180px] text-[#0A2540]/[0.05] pointer-events-none select-none leading-none">
              01
            </div>

            <div className="grid md:grid-cols-12 gap-10 md:gap-14 items-center relative z-10">

              {/* Photo du Président */}
              <div className="md:col-span-5 lg:col-span-4 flex justify-center">
                <div className="bg-white p-3 border border-[#CBD5E1] shadow-[0_20px_40px_rgba(10,37,64,0.12)] rounded-xs w-full max-w-[280px]">
                  <div className="h-80 sm:h-96 w-full overflow-hidden bg-[#0A2540] relative">
                    <img
                      src={initialTeamMembers[0].photo}
                      alt={initialTeamMembers[0].name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </div>
              </div>

              {/* Texte du message du Président */}
              <div className="md:col-span-7 lg:col-span-8 flex flex-col items-start">
                <div className="mb-6">
                  <h2 className="font-display font-extrabold text-[28px] sm:text-[36px] text-[#0A2540] uppercase tracking-tight leading-none">
                    MOT DU PRÉSIDENT
                  </h2>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#E8952E]" />
                    <div className="h-0.5 w-16 bg-[#0A2540]/20" />
                  </div>
                </div>

                <p className="font-mono text-[13px] font-bold text-[#295EA8] uppercase tracking-wider mb-4">
                  {initialTeamMembers[0].name} — {initialTeamMembers[0].title || "Ingénieur BTP & Fondateur"}
                </p>

                <div className="prose prose-slate max-w-none text-[15px] sm:text-[16px] text-[#334155] leading-relaxed space-y-4 font-sans">
                  <p className="font-semibold text-[#0A2540] text-[17px]">
                    &ldquo;Le pari que nous avons fait en créant le Groupe Best Builders SARLU est de devenir la référence absolue de l'ingénierie et de la construction durable en Guinée.&rdquo;
                  </p>
                  <p>
                    Face aux défis d'infrastructures et d'urbanisation de notre pays, nous avons fait le choix de la rigueur scientifique : un bureau d'études intégré, des calculs de structures certifiés selon les normes internationales (BAEL & Eurocodes), et un contrôle continu sur le terrain.
                  </p>
                  <p>
                    De la conception architecturale à la remise des clés, nos ingénieurs et techniciens s'engagent chaque jour pour garantir la sécurité absolue de vos ouvrages, le respect strict des budgets et la pérennité de votre patrimoine.
                  </p>
                </div>
              </div>

            </div>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {initialTeamMembers.map((member) => {
              const isGerant = member.id === 1 || member.role.includes("Gérant");
              return (
                <div
                  key={member.id}
                  onClick={() => setSelectedMember(member)}
                  className={`card-stitch text-center p-6 flex flex-col justify-between group transition-all cursor-pointer shadow-sm hover:shadow-md ${isGerant
                      ? "border-2 border-[#0A2540] shadow-xl bg-white sm:col-span-2 lg:col-span-1"
                      : "hover:border-[#0A2540]"
                    }`}
                >
                  <div>
                    <div className="relative mx-auto mb-5">
                      {member.photo ? (
                        <div className="w-full max-w-[240px] h-64 sm:h-72 mx-auto rounded-md overflow-hidden border-2 border-[#0A2540] shadow-xl relative group-hover:scale-[1.02] transition-transform bg-[#0A2540]">
                          <img
                            src={member.photo}
                            alt={member.name}
                            className={`w-full h-full object-cover ${member.id === 4 || member.id === 6 ? "object-center" : "object-top"}`}
                          />
                        </div>
                      ) : (
                        <div
                          className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center text-[24px] font-bold transition-all shadow-md ${isGerant
                              ? "bg-[#0A2540] text-[#00C2FF] border-2 border-[#00C2FF]"
                              : "bg-gradient-to-br from-[#F1F4F7] to-[#E8ECF1] text-[#0A2540] border border-[#C4C6CE] group-hover:bg-[#0A2540] group-hover:text-[#00C2FF]"
                            }`}
                        >
                          {getInitials(member.name)}
                        </div>
                      )}
                      {isGerant && (
                        <span className="inline-block mt-3 bg-[#0A2540] text-[#00C2FF] font-mono text-[9px] font-extrabold px-3 py-1 border border-[#00C2FF]/30 uppercase rounded-xs shadow-sm">
                          ★ FONDATEUR &amp; GÉRANT
                        </span>
                      )}
                      {member.id === 4 && (
                        <span className="inline-block mt-3 bg-[#0A2540] text-[#00C2FF] font-mono text-[9px] font-extrabold px-3 py-1 border border-[#00C2FF]/30 uppercase rounded-xs shadow-sm">
                          ⚖️ DIRECTION JURIDIQUE &amp; CONTRATS
                        </span>
                      )}
                    </div>

                    <h3 className="font-display font-bold text-[17px] text-[#0A2540] leading-snug group-hover:text-[#295EA8] transition-colors mt-2">
                      {member.name}
                    </h3>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#C4C6CE]/50 flex flex-col justify-between h-full">
                    <div>
                      <span className="font-mono text-[11px] text-[#295EA8] font-bold uppercase tracking-wider block mb-1">
                        {member.role}
                      </span>
                      {member.bio && (
                        <p className="font-sans text-[13px] text-[#334155] leading-relaxed line-clamp-3">
                          {member.bio}
                        </p>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedMember(member);
                      }}
                      className="w-full mt-4 py-2.5 px-3 bg-[#F1F4F7] group-hover:bg-[#0A2540] text-[#0A2540] group-hover:text-[#00C2FF] font-mono font-bold text-[11px] uppercase tracking-wider rounded-xs border border-[#C4C6CE] group-hover:border-[#0A2540] transition-all flex items-center justify-center gap-1.5"
                    >
                      <span>VOIR LE PROFIL DÉTAILLÉ</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
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

      {/* Modale de fiche membre */}
      <TeamMemberModal
        member={selectedMember}
        onClose={() => setSelectedMember(null)}
      />
    </div>
  );
}
