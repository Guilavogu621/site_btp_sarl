"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import LoginScreen from "@/components/LoginScreen";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function checkSession() {
      try {
        if (supabase) {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user && mounted) {
            router.replace("/dashboard");
            return;
          }
        }
      } catch (e) {
        // Ignorer l'erreur de session
      } finally {
        if (mounted) setIsCheckingAuth(false);
      }
    }

    checkSession();

    if (supabase) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user && mounted) {
          router.replace("/dashboard");
        }
      });

      return () => {
        mounted = false;
        subscription.unsubscribe();
      };
    }

    return () => {
      mounted = false;
    };
  }, [router]);

  const handleLoginSuccess = () => {
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
            Vérification de la session Supabase...
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

