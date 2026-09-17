"use client";

import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const pathname = usePathname();

  // Hide on dashboard
  if (pathname === "/dashboard") return null;

  const whatsappUrl = "https://wa.me/224614606079?text=Bonjour%20Best%20Builders%2C%20je%20souhaite%20obtenir%20des%20informations%20pour%20un%20projet%20BTP%20%2F%20demande%20de%20devis.";

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contacter Best Builders sur WhatsApp"
      className="fixed bottom-6 right-6 z-50 group flex items-center gap-2.5 px-4 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-white/30"
    >
      <div className="relative">
        <MessageCircle className="w-6 h-6 fill-white text-[#25D366]" />
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white rounded-full animate-ping" />
      </div>
      <span className="font-display font-bold text-[13px] tracking-wide hidden sm:inline-block">
        WhatsApp Direct
      </span>
    </a>
  );
}
