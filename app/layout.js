import { Montserrat, Open_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "Best Builders SARLU — Bureau d'études & BTP à Conakry, Guinée",
  description: "Conception, structure, chiffrage, gestion et suivi de vos projets de bâtiment. Bureau d'études BTP à Conakry, Kipé, Guinée.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${montserrat.variable} ${openSans.variable} scroll-smooth`}>
      <body className="w-full min-h-screen flex flex-col justify-between bg-[#F8FAFC] text-[#0F172A] antialiased">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
