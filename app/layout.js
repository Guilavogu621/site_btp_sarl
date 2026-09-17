import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata = {
  metadataBase: new URL("https://bestbuilders224.com"),
  title: "Best Builders SARLU — Bureau d'études & Ingénierie BTP à Conakry",
  description: "Bureau d'études et de construction BTP à Conakry, Guinée (Kipé). Conception, calcul de structure, chiffrage et maîtrise d'œuvre.",
  icons: {
    icon: [{ url: "/icon.png", type: "image/png" }],
    apple: [{ url: "/apple-icon.png" }]
  }
};

const jsonLdData = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  "name": "Best Builders SARLU",
  "url": "https://bestbuilders224.com",
  "logo": "https://bestbuilders224.com/img/logo.png",
  "email": "contact@bestbuilders224.com",
  "telephone": "+224614606079",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Kipé",
    "addressLocality": "Conakry",
    "addressCountry": "GN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 9.585,
    "longitude": -13.630
  },
  "areaServed": "République de Guinée",
  "openingHours": "Mo-Fr 08:00-18:00, Sa 08:30-13:00"
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <link rel="icon" href="/icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:ital,wght@0,300..800;1,300..800&family=JetBrains+Mono:ital,wght@0,400..700;1,400..700&family=Montserrat:ital,wght@0,400..900;1,400..900&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </head>
      <body className="w-full min-h-screen flex flex-col justify-between bg-[#F7F9FF] text-[#0A2540] font-sans selection:bg-[#00C2FF] selection:text-[#0A2540] antialiased">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
