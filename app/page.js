"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Ruler, Calculator, HardHat, Hammer, CheckCircle2, Phone, Mail, MapPin, Send, AlertTriangle } from "lucide-react";
import HeroVisual from "@/components/HeroVisual";
import { initialServices, initialProjects, initialStats, initialProcessSteps, initialSiteSettings } from "@/lib/data";
import { sanitizeContactForm, validateEmail, validatePhone } from "@/lib/security";

const iconMap = {
  Ruler: Ruler,
  Calculator: Calculator,
  HardHat: HardHat,
  Hammer: Hammer,
};

export default function HomePage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service_requested: "Conception & Calcul de Structure",
    message: ""
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");

    // Security & Validation check
    if (!validateEmail(formData.email)) {
      setErrorMsg("Veuillez saisir une adresse email valide.");
      return;
    }

    if (!validatePhone(formData.phone)) {
      setErrorMsg("Veuillez saisir un numéro de téléphone valide.");
      return;
    }

    // Sanitize input data
    const sanitized = sanitizeContactForm(formData);
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        phone: "",
        email: "",
        service_requested: "Conception & Calcul de Structure",
        message: ""
      });
    }, 5000);
  };

  return (
    <div className="bg-[#F8FAFC]">
      {/* 1. HERO SECTION - DARK ARCHITECTURAL BLUEPRINT & GOLD ACCENTS */}
      <section className="relative overflow-hidden grid-bg border-b border-[#334155] text-white py-20 md:py-32">
        {/* Glowing Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#E8952E]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-[#1E40AF]/20 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-[1.1fr,0.9fr] gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1E293B] border border-[#E8952E]/40 text-[#E8952E] font-mono text-[11px] font-bold uppercase tracking-widest mb-6 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-[#E8952E] animate-ping"></span>
              <span>Bureau d'Études & BTP de Référence — Guinée</span>
            </div>
            
            <h1 className="font-display font-extrabold leading-[1.08] text-[40px] sm:text-[52px] md:text-[60px] text-white mb-6">
              Concevoir <span className="gold-gradient-text">juste.</span><br />
              Bâtir <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">fort & durable.</span>
            </h1>

            <p className="text-[17px] md:text-[19px] max-w-xl text-slate-300 leading-relaxed mb-10 font-normal">
              De l'étude de structure complexe à la livraison clé en main, Best Builders SARLU s'engage sur la rigueur d'ingénierie, les délais maîtrisés et l'excellence sur le terrain.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="#contact"
                className="inline-flex items-center gap-3 px-8 py-4 font-extrabold text-[14px] uppercase tracking-wider bg-gradient-to-r from-[#E8952E] to-[#D97706] text-[#0F172A] hover:from-[#D97706] hover:to-[#B45309] hover:text-white transition-all shadow-xl hover:shadow-[#E8952E]/20 rounded-sm hover:-translate-y-0.5"
              >
                Demander une étude / Devis
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/realisations"
                className="inline-flex items-center gap-2 px-7 py-4 font-bold text-[14px] uppercase tracking-wider bg-[#1E293B] border border-[#334155] text-white hover:bg-[#334155] hover:border-slate-400 transition-all rounded-sm"
              >
                Découvrir nos chantiers
              </Link>
            </div>
          </div>

          <div className="relative">
            <HeroVisual />
          </div>
        </div>
      </section>

      {/* 2. LE GROUPE BEST BUILDERS SECTION - EXECUTIVE CORPORATE */}
      <section id="groupe" className="bg-[#0F172A] text-white py-24 border-b border-[#334155] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="relative z-10 bg-[#1E293B] p-8 md:p-12 border border-[#334155] shadow-2xl rounded-lg">
              <div className="w-16 h-1 bg-[#E8952E] mb-8"></div>
              <img
                src="/img/logo.png"
                alt="Le Groupe Best Builders"
                className="h-28 w-auto object-contain mb-8 bg-white p-4 rounded-md shadow-md"
              />
              <blockquote className="text-[17px] font-display italic text-slate-200 leading-relaxed border-l-2 border-[#E8952E] pl-4">
                "Notre vocation est d'apporter aux maîtres d'ouvrages publics et privés une expertise d'ingénierie sans concession sur la qualité et la durabilité."
              </blockquote>
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-[#E8952E]/10 rounded-full blur-2xl pointer-events-none"></div>
          </div>

          <div>
            <span className="font-mono text-[12px] tracking-widest uppercase text-[#E8952E] font-bold block mb-3">
              Acteur Majeur du BTP & Bureau d'Études Agréé
            </span>
            <h2 className="font-display font-extrabold text-[36px] md:text-[48px] leading-tight text-white mb-6">
              Le Groupe Best Builders SARLU.
            </h2>
            <p className="text-[16px] text-slate-300 leading-relaxed mb-4">
              {initialSiteSettings.about_text}
            </p>
            <p className="text-[16px] text-slate-300 leading-relaxed mb-8">
              Forts d'un bureau d'études intégré et d'équipes de chantier hautement qualifiées, nous assurons une maîtrise complète de la chaîne de valeur du bâtiment et des travaux publics en Guinée.
            </p>
            <div>
              <Link
                href="/a-propos"
                className="inline-flex items-center gap-3 px-7 py-3.5 font-extrabold text-[13px] uppercase tracking-wider bg-[#1E293B] border border-[#E8952E] text-[#E8952E] hover:bg-[#E8952E] hover:text-[#0F172A] transition-all rounded-sm shadow-md"
              >
                En savoir plus sur le groupe
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. STATS BANNER - GOLD ACCENTED STATS */}
      <section className="bg-[#0A0F1D] text-white py-16 border-b border-[#334155]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {initialStats.map((stat) => (
            <div key={stat.id} className="bg-[#1E293B]/60 border border-[#334155] p-6 rounded-md shadow-lg text-center hover:border-[#E8952E] transition-colors">
              <div className="font-display font-extrabold text-[40px] md:text-[48px] gold-gradient-text">
                {stat.value}
              </div>
              <div className="text-[13px] font-mono uppercase tracking-wider text-slate-300 font-semibold mt-2">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. SERVICES SECTION - PREMIUM CARDS WITH GOLD ACCENTS */}
      <section id="services" className="py-24 md:py-32 bg-[#F8FAFC] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-16">
            <span className="font-mono text-[12px] tracking-widest uppercase text-[#E8952E] font-bold block mb-2">
              Pôles d'Expertise Technique
            </span>
            <h2 className="font-display font-extrabold text-[36px] md:text-[46px] text-[#0F172A] leading-tight">
              Une ingénierie globale au service de vos chantiers.
            </h2>
            <p className="mt-4 text-[17px] text-[#475569] leading-relaxed">
              Nous couvrons l'ensemble des besoins de conception, de calcul et de maîtrise d'œuvre d'exécution.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-8">
            {initialServices.map((service) => {
              const IconComp = iconMap[service.icon] || Ruler;
              return (
                <div
                  key={service.id}
                  className="bg-white p-8 md:p-10 border border-slate-200 hover:border-[#0F172A] transition-all hover-lift rounded-lg flex flex-col justify-between group shadow-sm relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E8952E] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div>
                    <div className="w-16 h-16 bg-[#0F172A] text-[#E8952E] rounded-md flex items-center justify-center mb-8 shadow-md group-hover:scale-110 transition-transform">
                      <IconComp className="w-8 h-8" />
                    </div>
                    <h3 className="font-display font-bold text-[24px] text-[#0F172A] mb-4">
                      {service.title}
                    </h3>
                    <p className="text-[15px] text-[#475569] leading-relaxed mb-8">
                      {service.short_description}
                    </p>
                  </div>
                  <Link
                    href={`/services#${service.slug}`}
                    className="inline-flex items-center text-[13px] font-extrabold uppercase tracking-wider text-[#0F172A] group-hover:text-[#E8952E] transition-colors"
                  >
                    Découvrir le pôle <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. PROCESS SECTION - STEP-BY-STEP METHODOLOGY */}
      <section className="py-24 bg-[#0F172A] text-white border-b border-[#334155]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-mono text-[12px] tracking-widest uppercase text-[#E8952E] font-bold block mb-2">
              Méthodologie Certifiée
            </span>
            <h2 className="font-display font-extrabold text-[36px] md:text-[44px] text-white">
              La rigueur technique à chaque étape.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
            {initialProcessSteps.map((step) => (
              <div key={step.id} className="bg-[#1E293B] p-6 border border-[#334155] rounded-lg hover:border-[#E8952E] transition-colors flex flex-col justify-between">
                <div>
                  <span className="font-mono text-[28px] font-extrabold gold-gradient-text block mb-3">
                    {step.order}
                  </span>
                  <h3 className="font-display font-bold text-[18px] text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-[13px] text-slate-300 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PROJECTS SECTION - PORTFOLIO SHOWCASE */}
      <section id="realisations" className="py-24 md:py-32 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <span className="font-mono text-[12px] tracking-widest uppercase text-[#E8952E] font-bold block mb-2">
                Portfolio de Références
              </span>
              <h2 className="font-display font-extrabold text-[36px] md:text-[46px] text-[#0F172A]">
                Des ouvrages emblématiques.
              </h2>
            </div>
            <Link
              href="/realisations"
              className="mt-6 md:mt-0 inline-flex items-center gap-2 font-extrabold text-[13px] uppercase tracking-wider text-[#0F172A] hover:text-[#E8952E] transition-colors"
            >
              Voir l'intégralité du portfolio <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {initialProjects.slice(0, 3).map((project) => (
              <Link
                key={project.id}
                href={`/realisations#project-${project.id}`}
                className="group bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm hover:shadow-2xl transition-all hover-lift flex flex-col h-full"
              >
                <div className="h-64 relative bg-[#0F172A] overflow-hidden">
                  <img
                    src={project.photo_after || project.photo_before}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-[#0F172A]/90 backdrop-blur-md text-white text-[11px] font-mono px-3 py-1 uppercase font-bold border border-[#334155] shadow-md rounded-xs">
                    {project.location}
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[#E8952E] mb-2 font-bold block">
                    {project.category}
                  </span>
                  <h3 className="font-display font-bold text-[22px] text-[#0F172A] mb-3 leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-[14px] text-[#475569] line-clamp-3 mb-6 flex-1 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between text-[13px] text-[#64748B]">
                    <span className="font-medium">Surface : {project.surface}</span>
                    <span className="font-bold text-[#0F172A] group-hover:text-[#E8952E] transition-colors flex items-center gap-1">
                      Fiche projet <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CONTACT SECTION - EXECUTIVE FORM */}
      <section id="contact" className="py-24 md:py-32 bg-[#0F172A] text-white border-t border-[#334155]">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16">
          <div>
            <span className="font-mono text-[12px] tracking-widest uppercase text-[#E8952E] font-bold block mb-2">
              Assistance & Chiffrage de Projets
            </span>
            <h2 className="font-display font-extrabold text-[38px] md:text-[50px] text-white leading-tight mb-6">
              Transmettez-nous votre besoin.
            </h2>
            <p className="text-[17px] text-slate-300 leading-relaxed mb-10">
              Nos ingénieurs d'études et chefs de projet examinent votre dossier et reviennent vers vous sous 24 heures avec un chiffrage précis.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4 p-5 bg-[#1E293B] border border-[#334155] rounded-md">
                <div className="w-12 h-12 bg-[#0F172A] text-[#E8952E] flex items-center justify-center rounded-md shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-[16px] text-white">Siège Social & Bureau d'Études</h4>
                  <p className="text-[14px] text-slate-300 mt-1">{initialSiteSettings.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-[#1E293B] border border-[#334155] rounded-md">
                <div className="w-12 h-12 bg-[#0F172A] text-[#E8952E] flex items-center justify-center rounded-md shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-[16px] text-white">Ligne Directe Technique</h4>
                  <p className="text-[14px] text-slate-300 mt-1">{initialSiteSettings.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-[#1E293B] border border-[#334155] rounded-md">
                <div className="w-12 h-12 bg-[#0F172A] text-[#E8952E] flex items-center justify-center rounded-md shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-[16px] text-white">Courrier Électronique</h4>
                  <p className="text-[14px] text-slate-300 mt-1">{initialSiteSettings.email}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#1E293B] p-8 md:p-10 border border-[#334155] rounded-lg shadow-2xl">
            <h3 className="font-display font-extrabold text-[24px] text-white mb-6">
              Formulaire de Contact & Devis
            </h3>

            {errorMsg && (
              <div className="mb-6 bg-red-500/20 border border-red-500 text-red-200 p-4 text-[14px] flex items-center gap-2 rounded-sm">
                <AlertTriangle className="w-5 h-5 shrink-0 text-red-400" />
                <span>{errorMsg}</span>
              </div>
            )}

            {submitted ? (
              <div className="bg-emerald-500/20 border border-emerald-500 text-white p-8 text-center rounded-sm">
                <CheckCircle2 className="w-14 h-14 text-emerald-400 mx-auto mb-4" />
                <h4 className="font-bold text-[20px]">Votre demande a été transmise !</h4>
                <p className="text-[14px] text-slate-300 mt-2">
                  Merci {formData.name}. Nos ingénieurs prennent en charge votre demande.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-[12px] font-mono font-bold uppercase tracking-wider text-slate-300 mb-2">
                    Nom Complet *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="ex: Mamadou Diallo"
                    className="w-full px-4 py-3.5 bg-[#0F172A] border border-[#334155] text-white focus:border-[#E8952E] outline-none text-[15px] rounded-sm"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[12px] font-mono font-bold uppercase tracking-wider text-slate-300 mb-2">
                      Téléphone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+224 6XX XX XX XX"
                      className="w-full px-4 py-3.5 bg-[#0F172A] border border-[#334155] text-white focus:border-[#E8952E] outline-none text-[15px] rounded-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-mono font-bold uppercase tracking-wider text-slate-300 mb-2">
                      Adresse Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="nom@exemple.com"
                      className="w-full px-4 py-3.5 bg-[#0F172A] border border-[#334155] text-white focus:border-[#E8952E] outline-none text-[15px] rounded-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[12px] font-mono font-bold uppercase tracking-wider text-slate-300 mb-2">
                    Pôle d'Expertise Concerné
                  </label>
                  <select
                    value={formData.service_requested}
                    onChange={(e) => setFormData({ ...formData, service_requested: e.target.value })}
                    className="w-full px-4 py-3.5 bg-[#0F172A] border border-[#334155] text-white focus:border-[#E8952E] outline-none text-[15px] rounded-sm"
                  >
                    {initialServices.map((s) => (
                      <option key={s.id} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[12px] font-mono font-bold uppercase tracking-wider text-slate-300 mb-2">
                    Description & Détails de l'Ouvrage *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Précisez la nature de votre projet, la localisation et le délai souhaité..."
                    className="w-full px-4 py-3.5 bg-[#0F172A] border border-[#334155] text-white focus:border-[#E8952E] outline-none text-[15px] rounded-sm"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-[#E8952E] to-[#D97706] text-[#0F172A] hover:from-[#D97706] hover:to-[#B45309] hover:text-white font-extrabold text-[15px] uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-xl rounded-sm"
                >
                  Envoyer la Demande d'Étude
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );

}
