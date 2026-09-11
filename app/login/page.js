"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import LoginScreen from "@/components/LoginScreen";

export default function LoginPage() {
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    try {
      const savedSession = localStorage.getItem("best_builders_admin_session");
      if (savedSession) {
        const parsed = JSON.parse(savedSession);
        if (parsed && parsed.isAuthenticated) {
          router.replace("/dashboard");
          return;
        }
      }
    } catch (e) {
      console.error("Erreur de vérification session :", e);
    } finally {
      setIsCheckingAuth(false);
    }
  }, [router]);

  const handleLoginSuccess = (email) => {
    try {
      localStorage.setItem(
        "best_builders_admin_session",
        JSON.stringify({ isAuthenticated: true, email })
      );
    } catch (e) {
      console.error("Erreur de sauvegarde session :", e);
    }
    router.push("/dashboard");
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-[#0A2540] flex items-center justify-center text-white font-sans blueprint-grid-dark">
        <div className="flex flex-col items-center gap-4 p-8 bg-[#0F3854]/80 border border-[#00C2FF]/30 rounded-lg shadow-2xl backdrop-blur-md">
          <svg className="animate-spin w-10 h-10 text-[#00C2FF]" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="31.4" strokeLinecap="round" />
          </svg>
          <span className="font-mono text-[12px] uppercase text-[#00C2FF] font-semibold tracking-widest animate-pulse">
            Vérification de la session...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A2540] flex items-center justify-center p-4">
      <LoginScreen onLogin={handleLoginSuccess} />
    </div>
  );
}
