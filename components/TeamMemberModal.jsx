"use client";

import { useEffect } from "react";
import { X, Award, Briefcase, Quote, Mail, UserCheck, ArrowRight, CheckCircle2 } from "lucide-react";

/**
 * TeamMemberModal component for displaying detailed profile information of a team member.
 *
 * @param {Object} props
 * @param {Object|null} props.member - The team member data object
 * @param {Function} props.onClose - Callback function to close the modal
 */
export default function TeamMemberModal({ member, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (member) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [member, onClose]);

  if (!member) return null;

  const initials = member.name
    ? member.name
        .replace(/^(Ing\.|M\.|Mme|Dr\.)\s+/, "")
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "BB";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0A2540]/80 backdrop-blur-md animate-fade-in overflow-y-auto"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="relative w-full max-w-2xl bg-white border-2 border-[#0A2540] shadow-2xl rounded-xs overflow-hidden my-8 blueprint-grid"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="bg-[#0A2540] text-white px-6 py-4 flex items-center justify-between border-b border-[#295EA8]/40">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00C2FF]" />
            <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#00C2FF]">
              FICHE MEMBRE • BEST BUILDERS
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-xs transition-colors"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8">
          <div className="grid sm:grid-cols-12 gap-6 sm:gap-8 items-start">
            
            {/* Left Photo/Avatar Column */}
            <div className="sm:col-span-5 flex flex-col items-center text-center">
              <div className="relative w-full max-w-[220px] aspect-[4/5] rounded-xs overflow-hidden border-2 border-[#0A2540] shadow-lg bg-[#0A2540] mb-4">
                {member.photo ? (
                  <img
                    src={member.photo}
                    alt={member.name}
                    className={`w-full h-full object-cover ${
                      member.id === 4 || member.id === 6 ? "object-center" : "object-top"
                    }`}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[36px] font-bold text-[#00C2FF] bg-[#0A2540]">
                    {initials}
                  </div>
                )}
              </div>

              <span className="inline-block px-3 py-1 bg-[#295EA8]/10 text-[#295EA8] font-mono text-[10px] font-bold uppercase tracking-wider rounded-xs border border-[#295EA8]/20">
                {member.role}
              </span>
            </div>

            {/* Right Information Column */}
            <div className="sm:col-span-7 flex flex-col justify-between h-full">
              <div>
                <h3 className="font-display font-extrabold text-[22px] sm:text-[26px] text-[#0A2540] leading-tight mb-1">
                  {member.name}
                </h3>
                {member.title && (
                  <p className="font-mono text-[12px] font-semibold text-[#295EA8] uppercase tracking-wider mb-4">
                    {member.title}
                  </p>
                )}

                {/* Biography */}
                {member.bio && (
                  <div className="mb-5">
                    <h4 className="font-mono text-[10px] font-bold text-[#5B6B7A] uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-[#295EA8]" />
                      PARCOURS &amp; EXPRÉTIENCE
                    </h4>
                    <p className="font-sans text-[14px] text-[#334155] leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                )}

                {/* Key Skills */}
                {member.skills && member.skills.length > 0 && (
                  <div className="mb-5">
                    <h4 className="font-mono text-[10px] font-bold text-[#5B6B7A] uppercase tracking-widest mb-2 flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-[#00C2FF]" />
                      DOMAINES D&apos;EXPERTISE
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {member.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1 text-[11px] font-medium bg-[#F1F4F7] text-[#0A2540] px-2.5 py-1 rounded-xs border border-[#C4C6CE]"
                        >
                          <CheckCircle2 className="w-3 h-3 text-[#295EA8]" />
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quote */}
                {member.quote && (
                  <div className="mb-6 bg-[#F8FAFC] p-3.5 rounded-xs border-l-3 border-[#295EA8] border-y border-r border-[#CBD5E1]">
                    <p className="font-sans text-[13px] text-[#334155] italic leading-snug flex items-start gap-2">
                      <Quote className="w-4 h-4 text-[#295EA8] shrink-0 mt-0.5" />
                      <span>&ldquo;{member.quote}&rdquo;</span>
                    </p>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="pt-2 border-t border-[#E2E8F0] flex items-center justify-between">
                <a
                  href="/contact"
                  onClick={onClose}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0A2540] text-white font-display font-bold text-[12px] uppercase tracking-wider hover:bg-[#295EA8] transition-colors rounded-xs"
                >
                  <Mail className="w-3.5 h-3.5 text-[#00C2FF]" />
                  <span>Contacter le bureau</span>
                </a>
                <button
                  onClick={onClose}
                  className="text-[12px] font-mono font-semibold text-[#5B6B7A] hover:text-[#0A2540] uppercase tracking-wider"
                >
                  Fermer
                </button>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
