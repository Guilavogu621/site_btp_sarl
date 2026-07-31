"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Send, CheckCircle2, Clock } from "lucide-react";
import { initialServices, initialSiteSettings } from "@/lib/data";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service_requested: "Conception & Calcul de Structure",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
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
    }, 4000);
  };

  return (
    <div className="bg-[#f5f5f5] py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Banner */}
        <div className="mb-16">
          <span className="font-mono text-[12px] tracking-widest uppercase text-[#1E56A0] font-bold">
            Formulaire de Contact & Devis
          </span>
          <h1 className="font-display font-bold text-[36px] md:text-[52px] text-[#0A2540] mt-2 leading-tight">
            Contactez le Bureau d'Études
          </h1>
          <p className="mt-4 text-[18px] text-[#5B6B7A] max-w-3xl leading-relaxed">
            Notre équipe technique et commerciale est à votre disposition pour analyser vos besoins et chiffrer vos projets.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Info Column */}
          <div className="bg-white p-8 md:p-12 border border-[#e0e0e0] flex flex-col justify-between shadow-sm">
            <div>
              <h2 className="font-display font-bold text-[26px] text-[#0A2540] mb-6">
                Coordonnées Officielles
              </h2>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#0A2540]/5 text-[#1E56A0] flex items-center justify-center shrink-0 border border-[#1E56A0]/20 rounded-md">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[16px] text-[#0A2540]">Siège Social</h4>
                    <p className="text-[15px] text-[#5B6B7A] mt-1">{initialSiteSettings.address}, République de Guinée</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#0A2540]/5 text-[#1E56A0] flex items-center justify-center shrink-0 border border-[#1E56A0]/20 rounded-md">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[16px] text-[#0A2540]">Téléphone Direct</h4>
                    <p className="text-[15px] text-[#5B6B7A] mt-1">{initialSiteSettings.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#0A2540]/5 text-[#1E56A0] flex items-center justify-center shrink-0 border border-[#1E56A0]/20 rounded-md">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[16px] text-[#0A2540]">Adresse Courriel</h4>
                    <p className="text-[15px] text-[#5B6B7A] mt-1">{initialSiteSettings.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#0A2540]/5 text-[#1E56A0] flex items-center justify-center shrink-0 border border-[#1E56A0]/20 rounded-md">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[16px] text-[#0A2540]">Horaires d'Ouverture</h4>
                    <p className="text-[15px] text-[#5B6B7A] mt-1">Lundi — Samedi : 08h00 – 18h00</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-[#e0e0e0]">
              <p className="font-mono text-[12px] text-[#1E56A0] uppercase font-bold tracking-wider">
                Accompagnement rapide sous 24h
              </p>
            </div>
          </div>

          {/* Form Column */}
          <div className="bg-white p-8 md:p-12 border border-[#e0e0e0] shadow-sm">
            <h2 className="font-display font-bold text-[26px] text-[#0A2540] mb-6">
              Envoyer un Message
            </h2>

            {submitted ? (
              <div className="bg-[#0A2540]/5 border border-[#1E56A0] text-[#0A2540] p-8 text-center rounded-md">
                <CheckCircle2 className="w-12 h-12 text-[#1E56A0] mx-auto mb-3" />
                <h3 className="font-bold text-[20px]">Message transmis !</h3>
                <p className="text-[15px] text-[#5B6B7A] mt-2">
                  Merci {formData.name}, nous avons bien reçu votre demande concernant "{formData.service_requested}". Notre équipe vous recontactera sous 24 heures.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-[13px] font-bold uppercase tracking-wider text-[#0A2540] mb-2">
                    Nom et Prénom *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Mamadou Diallo"
                    className="w-full px-4 py-3 bg-[#f5f5f5] border border-[#cccccc] focus:border-[#1E56A0] focus:ring-1 focus:ring-[#1E56A0] outline-none text-[15px] rounded-sm transition-all"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[13px] font-bold uppercase tracking-wider text-[#0A2540] mb-2">
                      Numéro de Téléphone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+224 6XX XX XX XX"
                      className="w-full px-4 py-3 bg-[#f5f5f5] border border-[#cccccc] focus:border-[#1E56A0] focus:ring-1 focus:ring-[#1E56A0] outline-none text-[15px] rounded-sm transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] font-bold uppercase tracking-wider text-[#0A2540] mb-2">
                      Adresse Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="nom@domaine.com"
                      className="w-full px-4 py-3 bg-[#f5f5f5] border border-[#cccccc] focus:border-[#1E56A0] focus:ring-1 focus:ring-[#1E56A0] outline-none text-[15px] rounded-sm transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[13px] font-bold uppercase tracking-wider text-[#0A2540] mb-2">
                    Service Souhaité
                  </label>
                  <select
                    value={formData.service_requested}
                    onChange={(e) => setFormData({ ...formData, service_requested: e.target.value })}
                    className="w-full px-4 py-3 bg-[#f5f5f5] border border-[#cccccc] focus:border-[#1E56A0] outline-none text-[15px] rounded-sm transition-all text-[#0A2540]"
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
                    Détail du projet *
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Décrivez votre projet, la superficie, l'emplacement exact et le délai estimé..."
                    className="w-full px-4 py-3 bg-[#f5f5f5] border border-[#cccccc] focus:border-[#1E56A0] focus:ring-1 focus:ring-[#1E56A0] outline-none text-[15px] rounded-sm transition-all"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#0A2540] hover:bg-[#1E56A0] text-white font-bold text-[15px] uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  Transmettre la demande
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
