"use client";

import PageHeader from "@/components/PageHeader";
import { ShieldCheck, Scale, Building2, FileText } from "lucide-react";

export default function MentionsLegalesPage() {
  return (
    <div className="bg-[#F7F9FF] blueprint-grid pb-20 md:pb-28 min-h-screen">
      <PageHeader
        badge="Informations Réglementaires"
        title="Mentions Légales & Identification"
        description="Informations juridiques, identification de la société Best Builders SARLU et conditions d'utilisation."
      />

      <div className="max-w-4xl mx-auto px-6 mt-12 space-y-8">
        <div className="card-stitch p-8 bg-white border border-[#C4C6CE] shadow-lg rounded-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
            <Building2 className="w-6 h-6 text-[#00C2FF]" />
            <h2 className="font-display font-bold text-[20px] text-[#0A2540]">
              1. Éditeur du Site &amp; Identification Sociale
            </h2>
          </div>
          <div className="space-y-3 font-sans text-[15px] text-[#334155] leading-relaxed">
            <p>
              Le présent site web, accessible à l&apos;adresse <strong className="text-[#0A2540]">https://bestbuilders224.com</strong>, est édité par la société :
            </p>
            <ul className="list-disc pl-6 space-y-2 bg-[#F1F4F7] p-4 rounded-xs border border-[#C4C6CE]/60 font-mono text-[13px]">
              <li><strong>Dénomination Sociale :</strong> Best Builders SARLU</li>
              <li><strong>Forme Juridique :</strong> Société à Responsabilité Limitée Unipersonnelle (SARLU)</li>
              <li><strong>Siège Social :</strong> Quartier Ratoma / Kipé, Conakry, République de Guinée</li>
              <li><strong>Téléphone :</strong> +224 614 60 60 79 / +224 621 37 51 85</li>
              <li><strong>Email :</strong> contact@bestbuilders224.com</li>
              <li><strong>N° RCCM (Entreprise) :</strong> GN.TCC.2024.B.12454</li>
              <li><strong>N° Formalité RCCM :</strong> GN.TCC.2024.13958</li>
              <li><strong>N° Identification Fiscale (NIF) :</strong> 802569368</li>
              <li><strong>Date d&apos;immatriculation :</strong> 20 Septembre 2024</li>
              <li><strong>Juridiction / Greffe :</strong> Tribunal de Commerce de Conakry (Cour d&apos;Appel de Conakry)</li>
              <li><strong>Gérant / PDG :</strong> M. Jeannot Koivogui</li>
            </ul>
          </div>
        </div>

        <div className="card-stitch p-8 bg-white border border-[#C4C6CE] shadow-lg rounded-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
            <Scale className="w-6 h-6 text-[#00C2FF]" />
            <h2 className="font-display font-bold text-[20px] text-[#0A2540]">
              2. Activité &amp; Objet Social
            </h2>
          </div>
          <p className="font-sans text-[15px] text-[#334155] leading-relaxed">
            Best Builders SARLU est un bureau d&apos;études techniques et une entreprise générale de bâtiment et travaux publics (BTP) exerçant en République de Guinée. Les prestations incluent le calcul de structures en béton armé et charpente métallique, la réalisation d&apos;études géotechniques et de métrés, ainsi que la maîtrise d&apos;œuvre déléguée et le suivi de chantier.
          </p>
        </div>

        <div className="card-stitch p-8 bg-white border border-[#C4C6CE] shadow-lg rounded-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
            <FileText className="w-6 h-6 text-[#00C2FF]" />
            <h2 className="font-display font-bold text-[20px] text-[#0A2540]">
              3. Propriété Intellectuelle &amp; Protection des Données
            </h2>
          </div>
          <p className="font-sans text-[15px] text-[#334155] leading-relaxed">
            L&apos;ensemble des contenus (textes, visuels, plans, éléments de calculs, logos et photographies de chantiers) présents sur le site <strong className="text-[#0A2540]">bestbuilders224.com</strong> sont la propriété exclusive de Best Builders SARLU. Toute reproduction, représentation ou diffusion non autorisée constitue une contrefaçon sanctionnée par la loi.
          </p>
          <p className="font-sans text-[15px] text-[#334155] leading-relaxed">
            Les données personnelles transmises via nos formulaires de contact font l&apos;objet d&apos;un traitement strictement confidentiel aux seules fins de réponse à vos demandes d&apos;études ou de devis.
          </p>
        </div>
      </div>
    </div>
  );
}
