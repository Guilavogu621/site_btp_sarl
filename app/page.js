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
    <div>
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden grid-bg border-b border-[#e0e0e0]">
        <div className="max-w-6xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 grid md:grid-cols-[1.1fr,0.9fr] gap-12 items-center">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-[11px] tracking-[0.2em] uppercase px-2.5 py-1 border border-[#cccccc] text-[#5B6B7A]">
                Planche 00 / Présentation
              </span>
            </div>
            <h1 className="font-display font-bold leading-[1.05] text-[36px] md:text-[48px] text-[#1d1d1d]">
              De l'esquisse à la remise des clés, un seul interlocuteur.
            </h1>
            <p className="mt-6 text-[17px] max-w-lg text-[#5B6B7A]">
              Conception, structure, chiffrage, gestion et suivi : nous accompagnons vos projets de bâtiment à chaque étape, avec la rigueur d'un bureau d'études et l'œil d'un chantier.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 font-bold text-[15px] bg-[#0A2540] text-white hover:bg-[#1E56A0] transition-colors shadow-md"
              >
                Demander un devis
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/realisations"
                className="inline-flex items-center gap-2 px-6 py-3.5 font-bold text-[15px] border border-[#CBD5E1] bg-white hover:bg-[#F1F5F9] text-[#0A2540] transition-colors"
              >
                Voir nos réalisations
              </Link>
            </div>
          </div>

          <div>
            <HeroVisual />
          </div>
        </div>
      </section>

      {/* 2. LE GROUPE BEST BUILDERS SECTION */}
      <section id="groupe" className="bg-white py-16 md:py-24 border-b border-[#e0e0e0]">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="relative h-80 md:h-[450px] bg-[#f5f5f5] p-8 border border-[#e0e0e0] flex items-center justify-center">
            <img
              src="/img/logo.png"
              alt="Le Groupe Best Builders"
              className="max-h-64 w-auto object-contain"
            />
            <div className="absolute -bottom-4 -right-4 w-28 h-28 bg-[#0A2540] hidden md:block -z-10"></div>
          </div>
          <div>
            <span className="font-mono text-[12px] tracking-widest uppercase text-[#0A2540] font-bold">
              À Propos de Nous
            </span>
            <h1 className="font-display font-bold text-[32px] md:text-[44px] mt-3 leading-tight text-[#0A2540]">
              Le Groupe Best Builders
            </h1>
            <p className="mt-6 text-[16px] text-[#5B6B7A] leading-relaxed">
              {initialSiteSettings.about_text}
            </p>
            <p className="mt-4 text-[16px] text-[#5B6B7A] leading-relaxed">
              Notre ambition est claire : participer activement au développement de la nation en proposant des solutions de construction innovantes, durables et adaptées aux réalités de notre environnement.
            </p>
            <div className="mt-8">
              <Link
                href="/a-propos"
                className="inline-flex items-center gap-2 px-6 py-3.5 font-bold text-[14px] uppercase tracking-wider bg-[#0A2540] text-white hover:bg-[#1E56A0] transition-colors shadow-sm"
              >
                Découvrir notre histoire
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. STATS BANNER */}
      <section className="bg-[#0A2540] text-white py-12 border-b border-[#0F3854]">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {initialStats.map((stat) => (
            <div key={stat.id} className="text-center md:text-left">
              <div className="font-display font-extrabold text-[36px] md:text-[44px] text-blue-300">
                {stat.value}
              </div>
              <div className="text-[14px] text-slate-200 font-medium mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. SERVICES SECTION */}
      <section id="services" className="py-20 md:py-28 bg-[#f5f5f5]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl mb-16">
            <span className="font-mono text-[12px] tracking-widest uppercase text-[#0A2540] font-bold">
              Nos Domaines d'Intervention
            </span>
            <h1 className="font-display font-bold text-[32px] md:text-[42px] mt-3 leading-tight text-[#0A2540]">
              Une expertise globale.
            </h1>
            <p className="mt-4 text-[16px] text-[#5B6B7A]">
              De l'étude de faisabilité technique à la livraison clé en main, nous assurons chaque métier avec précision.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-8">
            {initialServices.map((service) => {
              const IconComp = iconMap[service.icon] || Ruler;
              return (
                <div
                  key={service.id}
                  className="bg-white p-8 border border-[#e0e0e0] hover:border-[#0A2540] transition-all flex flex-col justify-between group shadow-sm hover:shadow-md"
                >
                  <div>
                    <div className="w-14 h-14 bg-[#F1F5F9] text-[#0A2540] group-hover:bg-[#0A2540] group-hover:text-white transition-colors flex items-center justify-center mb-6">
                      <IconComp className="w-7 h-7" />
                    </div>
                    <h3 className="font-display font-bold text-[22px] text-[#0A2540] mb-3">
                      {service.title}
                    </h3>
                    <p className="text-[15px] text-[#5B6B7A] leading-relaxed mb-6">
                      {service.short_description}
                    </p>
                  </div>
                  <Link
                    href={`/services#${service.slug}`}
                    className="inline-flex items-center text-[13px] font-bold uppercase tracking-wider text-[#0A2540] group-hover:text-[#1E56A0] transition-colors"
                  >
                    En savoir plus <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. PROCESS SECTION */}
      <section className="py-20 bg-white border-y border-[#e0e0e0]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="font-mono text-[12px] tracking-widest uppercase text-[#0A2540] font-bold">
              Méthodologie
            </span>
            <h1 className="font-display font-bold text-[32px] md:text-[42px] mt-2 text-[#0A2540]">
              La rigueur à chaque étape.
            </h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
            {initialProcessSteps.map((step) => (
              <div key={step.id} className="bg-[#f5f5f5] p-6 border border-[#e0e0e0]">
                <span className="font-mono text-[24px] font-bold text-[#0A2540]">
                  {step.order}
                </span>
                <h3 className="font-display font-bold text-[17px] text-[#0A2540] mt-2 mb-2">
                  {step.title}
                </h3>
                <p className="text-[13px] text-[#5B6B7A] leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PROJECTS SECTION */}
      <section id="realisations" className="py-20 md:py-28 bg-[#f5f5f5]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <span className="font-mono text-[12px] tracking-widest uppercase text-[#0A2540] font-bold">
                Portfolio
              </span>
              <h1 className="font-display font-bold text-[32px] md:text-[42px] mt-2 text-[#0A2540]">
                Des chantiers menés à terme.
              </h1>
            </div>
            <Link
              href="/realisations"
              className="mt-4 md:mt-0 inline-flex items-center gap-2 font-bold text-[14px] uppercase tracking-wider text-[#0A2540] hover:text-[#1E56A0] transition-colors"
            >
              Voir tous nos projets <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {initialProjects.slice(0, 3).map((project) => (
              <Link
                key={project.id}
                href={`/realisations#project-${project.id}`}
                className="group bg-white border border-[#e0e0e0] flex flex-col h-full overflow-hidden hover:shadow-lg transition-shadow"
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
                  <p className="text-[14px] text-[#5B6B7A] line-clamp-3 mb-6 flex-1">
                    {project.description}
                  </p>
                  <div className="mt-auto pt-4 border-t border-[#e0e0e0] flex items-center justify-between text-[13px] text-[#5B6B7A]">
                    <span>Surface : {project.surface}</span>
                    <span className="font-bold text-[#0A2540] group-hover:text-[#1E56A0]">
                      Fiche projet →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CONTACT SECTION */}
      <section id="contact" className="py-20 md:py-28 bg-white border-t border-[#e0e0e0]">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16">
          <div>
            <span className="font-mono text-[12px] tracking-widest uppercase text-[#0A2540] font-bold">
              Parlons de votre projet
            </span>
            <h1 className="font-display font-bold text-[36px] md:text-[48px] mt-2 text-[#0A2540]">
              Un projet en tête ?
            </h1>
            <p className="mt-4 text-[16px] text-[#5B6B7A] leading-relaxed">
              Vous avez un projet de construction, de rénovation ou besoin d'une étude de structure rigoureuse ? Remplissez ce formulaire et notre équipe technique vous recontactera sous 24h.
            </p>

            <div className="mt-10 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#F1F5F9] text-[#0A2540] flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-[16px] text-[#0A2540]">Adresse du bureau</h4>
                  <p className="text-[14px] text-[#5B6B7A] mt-1">{initialSiteSettings.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#F1F5F9] text-[#0A2540] flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-[16px] text-[#0A2540]">Téléphone</h4>
                  <p className="text-[14px] text-[#5B6B7A] mt-1">{initialSiteSettings.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#F1F5F9] text-[#0A2540] flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-[16px] text-[#0A2540]">Email</h4>
                  <p className="text-[14px] text-[#5B6B7A] mt-1">{initialSiteSettings.email}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#F8FAFC] p-8 border border-[#E2E8F0]">
            <h3 className="font-display font-bold text-[22px] text-[#0A2540] mb-6">
              Demande de Devis / Contact
            </h3>

            {errorMsg && (
              <div className="mb-6 bg-red-50 border border-red-300 text-red-700 p-4 text-[14px] flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-500 text-[#0A2540] p-6 text-center rounded-sm">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                <h4 className="font-bold text-[18px]">Message envoyé avec succès !</h4>
                <p className="text-[14px] text-[#5B6B7A] mt-2">
                  Merci {formData.name}. Nos ingénieurs étudient votre demande et vous répondront très rapidement.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-[13px] font-bold uppercase tracking-wider text-[#0A2540] mb-2">
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="ex: Mamadou Diallo"
                    className="w-full px-4 py-3 bg-white border border-[#cccccc] focus:border-[#0A2540] outline-none text-[15px]"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[13px] font-bold uppercase tracking-wider text-[#0A2540] mb-2">
                      Téléphone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+224 6XX XX XX XX"
                      className="w-full px-4 py-3 bg-white border border-[#cccccc] focus:border-[#0A2540] outline-none text-[15px]"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] font-bold uppercase tracking-wider text-[#0A2540] mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="nom@exemple.com"
                      className="w-full px-4 py-3 bg-white border border-[#cccccc] focus:border-[#0A2540] outline-none text-[15px]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[13px] font-bold uppercase tracking-wider text-[#0A2540] mb-2">
                    Service concerné
                  </label>
                  <select
                    value={formData.service_requested}
                    onChange={(e) => setFormData({ ...formData, service_requested: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-[#cccccc] focus:border-[#0A2540] outline-none text-[15px]"
                  >
                    {initialServices.map((s) => (
                      <option key={s.id} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[13px] font-bold uppercase tracking-wider text-[#0A2540] mb-2">
                    Votre message / Description du projet *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Précisez la nature de votre projet, la localisation et le délai souhaité..."
                    className="w-full px-4 py-3 bg-white border border-[#cccccc] focus:border-[#0A2540] outline-none text-[15px]"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#0A2540] hover:bg-[#1E56A0] text-white font-bold text-[15px] uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-md"
                >
                  Envoyer ma demande
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
