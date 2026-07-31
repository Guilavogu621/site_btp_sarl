import Link from "next/link";
import { CheckCircle2, ShieldCheck, Target, Award, ArrowRight, Users } from "lucide-react";
import { initialSiteSettings, initialTeamMembers } from "@/lib/data";

export const metadata = {
  title: "Le Groupe Best Builders — À Propos & Présentation",
  description: "Découvrez l'histoire, la vision, les valeurs et l'équipe dirigeante du Groupe Best Builders SARLU en Guinée.",
};

/**
 * Génère les initiales d'un nom complet (max 2 lettres).
 * Ex: "Ing. Koivogui Jeannot Délé" → "KJ"
 * @param {string} fullName - Le nom complet du membre
 * @returns {string} Les initiales en majuscules
 */
function getInitials(fullName) {
  const cleaned = fullName
    .replace(/^(Ing\.|Me\.|Dr\.|Prof\.)\s*/i, "")
    .trim();
  const words = cleaned.split(/\s+/).filter(Boolean);
  if (words.length === 0) return "?";
  if (words.length === 1) return words[0].charAt(0).toUpperCase();
  return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
}

export default function AboutPage() {
  return (
    <div className="bg-[#f5f5f5] py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Banner */}
        <div id="qui-sommes-nous" className="mb-16 scroll-mt-32">
          <span className="font-mono text-[12px] tracking-widest uppercase text-[#0A2540] font-bold">
            Qui sommes-nous ?
          </span>
          <h1 className="font-display font-bold text-[36px] md:text-[52px] text-[#0A2540] mt-2 leading-tight">
            À Propos du Groupe Best Builders
          </h1>
          <p className="mt-4 text-[18px] text-[#5B6B7A] max-w-3xl leading-relaxed">
            Un acteur de référence dans l'ingénierie et la construction BTP en République de Guinée, alliant savoir-faire technique et rigueur d'exécution.
          </p>
        </div>

        {/* Story Section */}
        <div id="historique" className="grid md:grid-cols-2 gap-12 items-center bg-white p-8 md:p-12 border border-[#e0e0e0] mb-16 scroll-mt-32">
          <div>
            <h2 className="font-display font-bold text-[28px] text-[#0A2540] mb-6">
              Notre Mission & Vision
            </h2>
            <p className="text-[16px] text-[#5B6B7A] leading-relaxed mb-4">
              {initialSiteSettings.about_text}
            </p>
            <p className="text-[16px] text-[#5B6B7A] leading-relaxed mb-6">
              Depuis notre création, nous veillons à maintenir un niveau d'exigence maximal dans la conception des structures et la conduite des travaux sur le terrain. Notre bureau d'études intégré nous permet de contrôler l'ensemble de la chaîne de valeur du bâtiment.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-[15px] font-bold text-[#0A2540]">
                <CheckCircle2 className="w-5 h-5 text-[#0A2540]" />
                <span>Études de structures conformes aux normes internationales</span>
              </div>
              <div className="flex items-center gap-3 text-[15px] font-bold text-[#0A2540]">
                <CheckCircle2 className="w-5 h-5 text-[#0A2540]" />
                <span>Maîtrise totale des délais et des coûts de chantier</span>
              </div>
              <div className="flex items-center gap-3 text-[15px] font-bold text-[#0A2540]">
                <CheckCircle2 className="w-5 h-5 text-[#0A2540]" />
                <span>Supervision continue par des ingénieurs certifiés</span>
              </div>
            </div>
          </div>

          <div className="bg-[#F8FAFC] p-8 border border-[#E2E8F0] flex items-center justify-center min-h-[350px]">
            <img src="/img/logo.png" alt="Logo Best Builders" className="max-h-56 w-auto object-contain" />
          </div>
        </div>

        {/* Values Grid */}
        <div id="nos-valeurs" className="mb-16 scroll-mt-32">
          <h2 className="font-display font-bold text-[28px] text-[#0A2540] mb-8 text-center">
            Nos Piliers & Valeurs
          </h2>
          <div className="grid sm:grid-cols-3 gap-8">
            <div className="bg-white p-8 border border-[#e0e0e0]">
              <div className="w-12 h-12 bg-[#F1F5F9] text-[#0A2540] flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-[20px] text-[#0A2540] mb-3">
                Sécurité & Fiabilité
              </h3>
              <p className="text-[14px] text-[#5B6B7A] leading-relaxed">
                La sécurité des structures et des personnes est notre priorité absolue. Nous calculons chaque ouvrage avec un coefficient de sécurité optimal.
              </p>
            </div>

            <div className="bg-white p-8 border border-[#e0e0e0]">
              <div className="w-12 h-12 bg-[#F1F5F9] text-[#0A2540] flex items-center justify-center mb-6">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-[20px] text-[#0A2540] mb-3">
                Précision Technique
              </h3>
              <p className="text-[14px] text-[#5B6B7A] leading-relaxed">
                Notre bureau d'études utilise les outils de modélisation les plus avancés pour garantir une exécution fidèle aux plans.
              </p>
            </div>

            <div className="bg-white p-8 border border-[#e0e0e0]">
              <div className="w-12 h-12 bg-[#F1F5F9] text-[#0A2540] flex items-center justify-center mb-6">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-[20px] text-[#0A2540] mb-3">
                Engagement Qualité
              </h3>
              <p className="text-[14px] text-[#5B6B7A] leading-relaxed">
                De la sélection des matériaux à la remise des clés, nous appliquons un suivi qualité rigoureux à chaque étape.
              </p>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════ */}
        {/* SECTION : ÉQUIPE DIRIGEANTE                           */}
        {/* ═══════════════════════════════════════════════════════ */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-3">
              <Users className="w-5 h-5 text-[#0A2540]" />
              <span className="font-mono text-[12px] tracking-widest uppercase text-[#0A2540] font-bold">
                L'Équipe Dirigeante
              </span>
            </div>
            <h2 className="font-display font-bold text-[28px] md:text-[36px] text-[#0A2540]">
              Des femmes et des hommes engagés
            </h2>
            <p className="mt-3 text-[16px] text-[#5B6B7A] max-w-2xl mx-auto leading-relaxed">
              Ingénieurs, juristes, gestionnaires et techniciens : notre équipe pluridisciplinaire est le pilier de chaque projet mené par Best Builders SARLU.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {initialTeamMembers.map((member) => {
              const isGerant = member.role === "Gérant";
              return (
                <div
                  key={member.id}
                  className={`bg-white border text-center p-6 transition-all hover:shadow-lg hover:-translate-y-1 group ${
                    isGerant
                      ? "border-[#0A2540] shadow-md col-span-2 sm:col-span-1 border-2"
                      : "border-[#e0e0e0]"
                  }`}
                >
                  {/* Avatar ou Photo */}
                  <div className="relative mx-auto mb-5">
                    {member.photo ? (
                      <img
                        src={member.photo}
                        alt={member.name}
                        className={`w-24 h-24 object-cover mx-auto ${
                          isGerant ? "border-4 border-[#0A2540]" : "border-2 border-[#e0e0e0]"
                        }`}
                      />
                    ) : (
                      <div
                        className={`w-24 h-24 mx-auto flex items-center justify-center text-[28px] font-bold transition-colors ${
                          isGerant
                            ? "bg-[#0A2540] text-white border-4 border-[#1E56A0]"
                            : "bg-[#F1F5F9] text-[#0A2540] border-2 border-[#E2E8F0] group-hover:bg-[#0A2540] group-hover:text-white"
                        }`}
                      >
                        {getInitials(member.name)}
                      </div>
                    )}
                    {/* Indicateur Gérant */}
                    {isGerant && (
                      <div className="absolute -top-2 -right-2 bg-[#0A2540] text-white text-[9px] font-mono font-bold px-2 py-0.5 uppercase tracking-wider">
                        Fondateur
                      </div>
                    )}
                  </div>

                  {/* Nom & Poste */}
                  <h3 className="font-display font-bold text-[16px] text-[#0A2540] leading-snug">
                    {member.name}
                  </h3>
                  <p className={`font-mono text-[11px] uppercase tracking-wider mt-2 font-semibold ${
                    isGerant ? "text-[#1E56A0]" : "text-[#5B6B7A]"
                  }`}>
                    {member.role}
                  </p>
                </div>
              );
            })}
          </div>

          <p className="text-center text-[13px] text-[#5B6B7A] mt-8 italic">
            Les photos de l'équipe seront publiées prochainement.
          </p>
        </div>

        {/* CTA */}
        <div className="bg-[#0A2540] text-white p-10 md:p-14 text-center rounded-sm shadow-xl">
          <h2 className="font-display font-bold text-[28px] md:text-[36px] mb-4">
            Envie de collaborer avec nous ?
          </h2>
          <p className="text-[16px] text-slate-200 max-w-xl mx-auto mb-8">
            Faites confiance à l'expertise de Best Builders SARLU pour la réalisation de vos ouvrages.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#1E56A0] hover:bg-white hover:text-[#0A2540] text-white font-bold text-[15px] uppercase tracking-wider transition-colors shadow-md"
          >
            Contactez notre équipe <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
