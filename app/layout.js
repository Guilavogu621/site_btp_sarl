import "./globals.css";
import { Montserrat, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-hanken",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://bestbuilderssarlu.com"),
  title: "Best Builders SARLU — Bureau d'études & BTP à Conakry, Guinée",
  description: "Conception, structure, chiffrage, gestion et suivi de vos projets de bâtiment. Bureau d'études BTP à Conakry, Kipé, Guinée.",
  icons: {
    icon: [{ url: "/icon.png", type: "image/png" }],
    apple: [{ url: "/apple-icon.png" }]
  }
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="fr"
      className={`scroll-smooth ${montserrat.variable} ${hanken.variable} ${jetbrains.variable}`}
    >
      <head>
        <link rel="icon" href="/icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
      </head>
      <body className="w-full min-h-screen flex flex-col justify-between bg-[#F7F9FF] text-[#0A2540] font-sans selection:bg-[#00C2FF] selection:text-[#0A2540] antialiased">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
