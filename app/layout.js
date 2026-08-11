import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Best Builders SARLU — Bureau d'études & BTP à Conakry, Guinée",
  description: "Conception, structure, chiffrage, gestion et suivi de vos projets de bâtiment. Bureau d'études BTP à Conakry, Kipé, Guinée.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        {/*
         * Google Fonts chargées via <link> standard pour éviter la dépendance
         * réseau de Turbopack (next/font/google) lors du build.
         */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:ital,wght@0,300..800;1,300..800&family=JetBrains+Mono:ital,wght@0,400..700;1,400..700&family=Montserrat:ital,wght@0,400..900;1,400..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="w-full min-h-screen flex flex-col justify-between bg-[#F7F9FF] text-[#0A2540] font-sans selection:bg-[#00C2FF] selection:text-[#0A2540]">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
