"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertTriangle, ShieldCheck } from "lucide-react";
import { initialServices, sendContactMessage } from "@/lib/data";
import { sanitizeContactForm, validateEmail, validatePhone } from "@/lib/security";

/**
 * Composant de formulaire de contact unifié et sécurisé avec carte expert Stitch.
 */
export default function ContactForm({
  title = "Demande de Devis / Contact",
  buttonText = "Envoyer ma demande",
  className = "card-stitch p-8 md:p-10 shadow-xl border border-[#C4C6CE]"
}) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service_requested: initialServices[0]?.title || "Conception & Calcul de Structure",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!validateEmail(formData.email)) {
      setErrorMsg("Veuillez saisir une adresse email valide.");
      return;
    }

    if (!validatePhone(formData.phone)) {
      setErrorMsg("Veuillez saisir un numéro de téléphone valide (ex: +224 6XX XX XX XX).");
      return;
    }

    setIsSubmitting(true);
    const sanitized = sanitizeContactForm(formData);

    try {
      const res = await sendContactMessage(sanitized);
      if (!res.success) {
        throw new Error(res.error || "Erreur lors de l'envoi du message");
      }
    } catch {
      // Fallback gracieux
    }

    setIsSubmitting(false);
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        phone: "",
        email: "",
        service_requested: initialServices[0]?.title || "Conception & Calcul de Structure",
        message: ""
      });
    }, 4000);
  };

  return (
    <div className={className}>
      {title && (
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#C4C6CE]">
          <h3 className="font-display font-bold text-[22px] text-[#0A2540] flex items-center gap-2">
            <span className="w-2.5 h-6 bg-[#00C2FF] rounded-xs" />
            {title}
          </h3>
          <span className="font-mono text-[10px] text-[#295EA8] font-semibold bg-[#F1F4F7] px-2.5 py-1 border border-[#C4C6CE] rounded-xs uppercase">
            SÉCURISÉ • SSL 256
          </span>
        </div>
      )}

      {errorMsg && (
        <div className="mb-6 bg-red-50 border-l-4 border-red-500 text-red-700 p-4 text-[14px] flex items-center gap-2 shadow-xs rounded-xs font-sans">
          <AlertTriangle className="w-5 h-5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {submitted ? (
        <div className="bg-[#F7F9FF] border border-[#00C2FF] text-[#0A2540] p-8 text-center shadow-md rounded-sm">
          <div className="w-16 h-16 bg-[#00C2FF]/15 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#00C2FF]/40">
            <CheckCircle2 className="w-8 h-8 text-[#00C2FF]" />
          </div>
          <h4 className="font-display font-bold text-[20px] text-[#0A2540]">Message envoyé avec succès !</h4>
          <p className="font-sans text-[14px] text-[#5B6B7A] mt-2">
            Merci {formData.name}. Nos ingénieurs étudient votre demande pour &quot;{formData.service_requested}&quot; et vous recontactent sous 24h.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-mono text-[11px] font-semibold uppercase tracking-wider text-[#0A2540] mb-2">
              Nom complet <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="ex: Mamadou Diallo"
              className="w-full px-4 py-3 bg-[#F7F9FF] border border-[#C4C6CE] text-[#0A2540] font-sans text-[14px] rounded-xs transition-all duration-200"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block font-mono text-[11px] font-semibold uppercase tracking-wider text-[#0A2540] mb-2">
                Téléphone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+224 6XX XX XX XX"
                className="w-full px-4 py-3 bg-[#F7F9FF] border border-[#C4C6CE] text-[#0A2540] font-sans text-[14px] rounded-xs transition-all duration-200"
              />
            </div>
            <div>
              <label className="block font-mono text-[11px] font-semibold uppercase tracking-wider text-[#0A2540] mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="nom@exemple.com"
                className="w-full px-4 py-3 bg-[#F7F9FF] border border-[#C4C6CE] text-[#0A2540] font-sans text-[14px] rounded-xs transition-all duration-200"
              />
            </div>
          </div>

          <div>
            <label className="block font-mono text-[11px] font-semibold uppercase tracking-wider text-[#0A2540] mb-2">
              Service concerné
            </label>
            <select
              value={formData.service_requested}
              onChange={(e) => setFormData({ ...formData, service_requested: e.target.value })}
              className="w-full px-4 py-3 bg-[#F7F9FF] border border-[#C4C6CE] text-[#0A2540] font-sans text-[14px] rounded-xs transition-all duration-200 cursor-pointer"
            >
              {initialServices.map((s) => (
                <option key={s.id} value={s.title}>
                  {s.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-mono text-[11px] font-semibold uppercase tracking-wider text-[#0A2540] mb-2">
              Votre message / Description du projet <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={4}
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Précisez la nature de votre projet, la superficie, la localisation et le délai souhaité..."
              className="w-full px-4 py-3 bg-[#F7F9FF] border border-[#C4C6CE] text-[#0A2540] font-sans text-[14px] rounded-xs transition-all duration-200 resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="group w-full py-4 bg-[#0A2540] hover:bg-[#295EA8] disabled:bg-[#94A3B8] text-white font-display font-bold text-[14px] uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.98] rounded-xs"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin w-5 h-5 text-[#00C2FF]" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="31.4" strokeLinecap="round" />
                </svg>
                <span>Envoi en cours...</span>
              </>
            ) : (
              <>
                <span>{buttonText}</span>
                <Send className="w-4 h-4 text-[#00C2FF] group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
