import PageHeader from "@/components/PageHeader";
import ContactInfo from "@/components/ContactInfo";
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact & Devis — Best Builders SARLU",
  description: "Contactez notre bureau d'études à Conakry pour vos projets de construction et demande de devis.",
};

export default function ContactPage() {
  return (
    <div className="bg-[#F7F9FF] blueprint-grid pb-20 md:pb-28 min-h-screen">
      {/* Header Banner */}
      <PageHeader
        badge="Contact &amp; Devis Technique"
        title="Contactez le Bureau d&apos;Études"
        description="Notre équipe d&apos;ingénieurs est à votre disposition pour analyser vos besoins et chiffrer vos projets."
      />

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Info Column */}
          <div className="space-y-6">
            <div className="card-stitch p-8 md:p-10">
              <span className="technical-badge mb-3">
                COORDONNÉES OFFICIELLES
              </span>
              <h2 className="font-display font-bold text-[26px] text-[#0A2540] mt-2 mb-6">
                Siège &amp; Bureau Technique
              </h2>

              <ContactInfo showHours={true} variant="card" />

              <div className="mt-8 pt-6 border-t border-[#C4C6CE] flex items-center justify-between font-mono text-[11px]">
                <span className="text-[#295EA8] font-semibold uppercase">Prise en charge rapide</span>
                <span className="text-[#5B6B7A]">RÉPONSE SOUS 24H</span>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <ContactForm
            title="Envoyer un Message"
            buttonText="Transmettre la demande"
            className="card-stitch p-8 md:p-10 shadow-xl"
          />
        </div>
      </div>
    </div>
  );
}
