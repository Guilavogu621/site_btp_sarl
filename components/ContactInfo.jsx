import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { initialSiteSettings } from "@/lib/data";

/**
 * Composant réutilisable pour afficher les coordonnées de l'entreprise avec le design de carte expert Stitch.
 */
export default function ContactInfo({ showHours = false, variant = "default" }) {
  const items = [
    {
      icon: MapPin,
      title: "Adresse & Siège",
      value: `${initialSiteSettings.address}, République de Guinée`,
      badge: "CONAKRY - KIPÉ"
    },
    {
      icon: Phone,
      title: "Téléphone Direct",
      value: initialSiteSettings.phone,
      badge: "LIGNE DIRECTE"
    },
    {
      icon: Mail,
      title: "Adresse Email",
      value: initialSiteSettings.email,
      badge: "COURRIEL PRO"
    },
    ...(showHours
      ? [
          {
            icon: Clock,
            title: "Horaires d'Ouverture",
            value: "Lundi — Samedi : 08h00 – 18h00",
            badge: "DISPONIBILITÉ"
          }
        ]
      : [])
  ];

  if (variant === "card") {
    return (
      <div className="grid sm:grid-cols-2 gap-4">
        {items.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="card-stitch p-6 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <div className="icon-box-stitch">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="font-mono text-[10px] text-[#295EA8] font-semibold bg-[#F1F4F7] px-2 py-0.5 border border-[#C4C6CE] rounded-xs">
                  {item.badge}
                </span>
              </div>
              <div>
                <h4 className="font-display font-bold text-[16px] text-[#0A2540] mb-1">{item.title}</h4>
                <p className="font-sans text-[14px] text-[#5B6B7A] leading-relaxed">{item.value}</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const Icon = item.icon;
        return (
          <div key={index} className="card-stitch p-5 flex items-start gap-4 group">
            <div className="icon-box-stitch shrink-0">
              <Icon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-1">
                <h4 className="font-display font-bold text-[15px] text-[#0A2540] group-hover:text-[#295EA8] transition-colors">
                  {item.title}
                </h4>
                <span className="font-mono text-[9px] text-[#295EA8] font-semibold bg-[#F1F4F7] px-2 py-0.5 border border-[#C4C6CE] rounded-xs shrink-0">
                  {item.badge}
                </span>
              </div>
              <p className="font-sans text-[14px] text-[#5B6B7A] truncate">{item.value}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
