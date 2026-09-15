"use client";

import { useState } from "react";
import { Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowRight, Sparkles, Building2, KeyRound } from "lucide-react";
import { supabase } from "@/lib/supabase";

/**
 * Premium Executive Login Screen for Best Builders SARLU Dashboard.
 * Authentification 100% sécurisée via Supabase Auth Native.
 */
export default function LoginScreen({ onLogin }) {
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");

    if (!loginForm.email.trim() || !loginForm.password.trim()) {
      setLoginError("Veuillez renseigner votre identifiant et votre mot de passe.");
      return;
    }

    setIsLoading(true);
    try {
      if (supabase) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: loginForm.email.trim().toLowerCase(),
          password: loginForm.password,
        });

        if (error) {
          setLoginError("Identifiants incorrects ou compte inexistant sur Supabase.");
          return;
        }

        if (data?.session && data?.user) {
          onLogin({
            email: data.user.email,
            role: data.user.user_metadata?.role || "admin",
            full_name: data.user.user_metadata?.full_name || "Administrateur",
          });
          return;
        }
      }

      // Route API de secours passant par Supabase Auth
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: loginForm.email,
          password: loginForm.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setLoginError(data.error || "Identifiants incorrects sur Supabase.");
        return;
      }

      if (data.session && supabase) {
        await supabase.auth.setSession(data.session);
      }

      onLogin(data.user);
    } catch (err) {
      setLoginError("Connexion impossible au serveur. Veuillez vérifier votre réseau.");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="relative w-full min-h-[90vh] flex items-center justify-center py-10 px-4 overflow-hidden selection:bg-[#00C2FF] selection:text-[#000F22]">
      {/* Animated Blueprint Background Layer */}
      <div className="absolute inset-0 z-0 bg-[#0A2540]">
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0, 194, 255, 0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 194, 255, 0.2) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0A2540] via-[#0D3054] to-[#0A2540]" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#00C2FF]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#1E56A0]/20 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Login Card Container */}
      <div className="relative z-10 w-full max-w-[460px] transform transition-all duration-500">
        {/* Outer Glow & Glass Frame */}
        <div className="relative bg-[#0F3854]/90 backdrop-blur-xl border border-[#00C2FF]/30 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.5)] overflow-hidden">
          
          {/* Top Decorative Engineering Bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-[#00C2FF] via-[#1E56A0] to-[#00C2FF]" />
          <div className="px-6 py-2.5 bg-[#0A2540]/80 border-b border-[#00C2FF]/20 flex items-center justify-between font-mono text-[11px] text-[#00C2FF]">
            <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#00C2FF] animate-pulse" />
              PORTAIL EXÉCUTIF
            </span>
            <span className="text-slate-300">BEST BUILDERS SARLU</span>
          </div>

          <div className="p-8 sm:p-10">
            {/* Header Brand Section */}
            <div className="text-center mb-8">
              <div className="inline-flex p-3 bg-[#0A2540] border border-[#00C2FF]/40 rounded-xl mb-4 shadow-lg shadow-[#00C2FF]/10 group hover:border-[#00C2FF] transition-all">
                <img
                  src="/img/logo.png"
                  alt="Best Builders SARLU"
                  className="w-14 h-14 object-contain transition-transform group-hover:scale-105"
                />
              </div>
              
              <h1 className="font-display font-extrabold text-[24px] sm:text-[26px] text-white tracking-tight leading-snug">
                Espace d&apos;Administration
              </h1>
              <p className="text-slate-300 text-[13px] mt-1.5 font-sans font-medium">
                Bureau d&apos;études &amp; Gestion de chantiers BTP
              </p>
            </div>

            {/* Security SSL Badge */}
            <div className="flex items-center justify-center gap-2 mb-6 py-2.5 px-4 bg-[#0A2540]/70 border border-[#00C2FF]/30 rounded-lg text-[11px] font-mono text-slate-200">
              <ShieldCheck className="w-4 h-4 text-[#00C2FF] shrink-0" />
              <span className="uppercase font-semibold tracking-wider text-[#00C2FF]">
                Authentification Sécurisée SSL 256-bit
              </span>
            </div>

            {/* Error Notification Alert */}
            {loginError && (
              <div className="mb-6 bg-red-500/15 border border-red-500/50 text-red-200 p-4 rounded-xl text-[13px] font-medium flex items-start gap-3 animate-shake">
                <Lock className="w-4 h-4 mt-0.5 text-red-400 shrink-0" />
                <span className="leading-snug">{loginError}</span>
              </div>
            )}

            {/* Main Form */}
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-200 mb-2">
                  Identifiant (Adresse Email)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#00C2FF]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    autoComplete="email"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                    placeholder="bestbuilderssarlu@gmail.com"
                    className="w-full pl-10 pr-4 py-3.5 bg-[#0A2540]/80 border border-[#295EA8]/50 rounded-xl text-white placeholder-slate-400 text-[14px] outline-none focus:border-[#00C2FF] focus:ring-2 focus:ring-[#00C2FF]/30 transition-all font-sans"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-200 mb-2">
                  Mot de passe
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#00C2FF]">
                    <KeyRound className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="current-password"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-12 py-3.5 bg-[#0A2540]/80 border border-[#295EA8]/50 rounded-xl text-white placeholder-slate-400 text-[14px] outline-none focus:border-[#00C2FF] focus:ring-2 focus:ring-[#00C2FF]/30 transition-all font-sans"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#00C2FF] transition-colors p-1"
                    tabIndex={-1}
                    aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 px-6 bg-[#00C2FF] hover:bg-white text-[#000F22] font-display font-extrabold text-[14px] uppercase tracking-wider rounded-xl transition-all duration-300 shadow-lg shadow-[#00C2FF]/20 hover:shadow-xl active:scale-[0.98] flex items-center justify-center gap-3 mt-4 disabled:opacity-60"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin w-5 h-5 text-[#000F22]" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="31.4" strokeLinecap="round" />
                    </svg>
                    <span>Vérification en cours...</span>
                  </>
                ) : (
                  <>
                    <span>Accéder au Tableau de Bord</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Footer Warning */}
            <div className="mt-8 pt-5 border-t border-[#00C2FF]/20 text-center">
              <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
                Accès réservé exclusivement au personnel habilité.<br />
                Groupe Best Builders SARLU — Conakry, Guinée.
              </p>
            </div>
          </div>

          {/* Bottom Executive Status */}
          <div className="py-3 px-6 bg-[#0A2540] border-t border-[#00C2FF]/20 text-center">
            <span className="font-mono text-[10px] uppercase text-[#00C2FF] font-bold tracking-widest flex items-center justify-center gap-2">
              <Building2 className="w-3.5 h-3.5" />
              Ingénierie &amp; Maîtrise d&apos;Ouvrage
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
