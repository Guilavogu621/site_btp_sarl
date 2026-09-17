"use client";

import { useState } from "react";
import { Users, ArrowRight } from "lucide-react";
import { initialTeamMembers } from "@/lib/data";
import TeamMemberModal from "@/components/TeamMemberModal";
import { getInitials } from "@/lib/utils";

export default function TeamSection() {
  const [selectedMember, setSelectedMember] = useState(null);

  return (
    <>
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
          {initialTeamMembers.map((member) => (
            <div
              key={member.id}
              onClick={() => setSelectedMember(member)}
              className="card-stitch text-center p-6 flex flex-col justify-between group transition-all cursor-pointer shadow-sm hover:shadow-md hover:border-[#0A2540] bg-white"
            >
              <div>
                <div className="relative mx-auto mb-5">
                  {member.photo ? (
                    <div className="w-full max-w-[240px] h-64 sm:h-72 mx-auto rounded-md overflow-hidden border-2 border-[#0A2540] shadow-xl relative group-hover:scale-[1.02] transition-transform bg-[#0A2540]">
                      <img
                        src={member.photo}
                        alt={member.name}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  ) : (
                    <div className="w-24 h-24 mx-auto rounded-full flex items-center justify-center text-[24px] font-bold transition-all shadow-md bg-gradient-to-br from-[#F1F4F7] to-[#E8ECF1] text-[#0A2540] border border-[#C4C6CE]">
                      {getInitials(member.name)}
                    </div>
                  )}
                </div>

                <h3 className="font-display font-bold text-[19px] text-[#0A2540] mb-1 group-hover:text-[#295EA8] transition-colors">
                  {member.name}
                </h3>
                
                <p className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-[#295EA8] mb-3">
                  {member.role}
                </p>

                {member.quote && (
                  <p className="font-sans text-[13px] text-[#5B6B7A] italic leading-relaxed mb-4 line-clamp-3">
                    &ldquo;{member.quote}&rdquo;
                  </p>
                )}
              </div>

              <div className="pt-4 border-t border-[#C4C6CE]/60">
                <button className="w-full py-2 bg-[#F1F4F7] group-hover:bg-[#0A2540] text-[#0A2540] group-hover:text-white font-mono text-[11px] font-bold uppercase tracking-wider rounded-xs border border-[#C4C6CE] group-hover:border-[#0A2540] transition-all flex items-center justify-center gap-1.5">
                  <span>Voir la fiche</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#00C2FF]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <TeamMemberModal
        member={selectedMember}
        onClose={() => setSelectedMember(null)}
      />
    </>
  );
}
