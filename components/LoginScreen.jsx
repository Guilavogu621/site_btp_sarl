"use client";

import { useState } from "react";
import { Lock, Key, Eye, EyeOff, ShieldCheck } from "lucide-react";

/**
 * Premium Login Screen for Best Builders SARLU Dashboard.
 * Features: animated Navy Blue blueprint background, floating card, password toggle, branding.
 */
export default function LoginScreen({ onLogin }) {
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");

    if (loginForm.email.trim() === "" || loginForm.password.trim() === "") {
      setLoginError("Veuillez remplir tous les champs.");
      return;
    }

    if (loginForm.password.length < 6) {
      setLoginError("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    setIsLoading(true);
    // Simulate network authentication delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsLoading(false);

    onLogin(loginForm.email);
  };

  return (
    <div className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Animated Blueprint Grid Background - Navy Theme */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundColor: "#0A2540",
          backgroundImage:
            "linear-gradient(to right, rgba(30, 86, 160, 0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(30, 86, 160, 0.15) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Decorative SVG Blueprint Lines - Navy Blue */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        preserveAspectRatio="none"
        viewBox="0 0 800 600"
      >
        <path
          d="M0 300 Q200 280 400 300 T800 300"
          stroke="#1E56A0"
          strokeWidth="0.8"
          fill="none"
          opacity="0.3"
        />
        <path
          d="M0 350 Q200 330 400 350 T800 350"
          stroke="#1E56A0"
          strokeWidth="0.5"
          fill="none"
          opacity="0.2"
        />
        <line x1="400" y1="0" x2="400" y2="600" stroke="#1E56A0" strokeWidth="0.5" opacity="0.15" />
        <line x1="0" y1="300" x2="800" y2="300" stroke="#1E56A0" strokeWidth="0.5" opacity="0.15" />
        {/* Corner brackets */}
        <path d="M50 50 L50 100 M50 50 L100 50" stroke="#1E56A0" strokeWidth="1.5" opacity="0.3" fill="none" />
        <path d="M750 50 L750 100 M750 50 L700 50" stroke="#1E56A0" strokeWidth="1.5" opacity="0.3" fill="none" />
        <path d="M50 550 L50 500 M50 550 L100 550" stroke="#1E56A0" strokeWidth="1.5" opacity="0.3" fill="none" />
        <path d="M750 550 L750 500 M750 550 L700 550" stroke="#1E56A0" strokeWidth="1.5" opacity="0.3" fill="none" />
      </svg>

      {/* Gradient Overlay - Navy Blue */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A2540] via-[#0F3854] to-[#0A2540]" />

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-[440px] mx-4">
        {/* Top Accent Bar */}
        <div className="h-2 bg-gradient-to-r from-[#0A2540] via-[#1E56A0] to-[#0A2540]" />

        <div className="bg-white p-8 md:p-10 shadow-2xl">
          {/* Logo & Branding */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center p-3 border-2 border-[#e0e0e0] bg-white mb-5 shadow-sm">
              <img
                src="/img/logo.png"
                alt="Best Builders"
                className="w-16 h-16 object-contain"
              />
            </div>
            <h1 className="font-display font-bold text-[22px] text-[#0A2540] leading-tight">
              Espace d'Administration
            </h1>
            <p className="text-[13px] text-[#4A607A] mt-1.5 font-medium">
              Best Builders SARLU — Connexion Sécurisée
            </p>
          </div>

          {/* Security Badge */}
          <div className="flex items-center justify-center gap-2 mb-6 py-2.5 px-4 bg-[#F1F5F9] border border-[#E2E8F0] text-[11px] font-mono uppercase tracking-wider text-[#0A2540] font-bold">
            <ShieldCheck className="w-4 h-4 text-[#1E56A0]" />
            <span>Connexion chiffrée HTTPS — SSL 256 bits</span>
          </div>

          {/* Error Message */}
          {loginError && (
            <div className="mb-5 bg-red-50 border-l-4 border-red-500 text-red-700 p-3.5 text-[13px] font-medium flex items-start gap-2">
              <Lock className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[0.15em] text-[#0A2540] mb-2">
                Identifiant (Adresse Email)
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  placeholder="bestbuilderssarlu@gmail.com"
                  className="w-full pl-4 pr-4 py-3.5 bg-[#F8FAFC] border border-[#CBD5E1] focus:border-[#0A2540] focus:bg-white outline-none text-[14px] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-[0.15em] text-[#0A2540] mb-2">
                Mot de Passe
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  placeholder="••••••••••"
                  className="w-full pl-4 pr-12 py-3.5 bg-[#F8FAFC] border border-[#CBD5E1] focus:border-[#0A2540] focus:bg-white outline-none text-[14px] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4A607A] hover:text-[#0A2540] transition-colors"
                  tabIndex={-1}
                  aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-[#0A2540] hover:bg-[#1E56A0] disabled:bg-[#94A3B8] text-white font-bold text-[14px] uppercase tracking-wider flex items-center justify-center gap-2.5 transition-colors duration-300 mt-2 shadow-md"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="31.4" strokeLinecap="round" />
                  </svg>
                  <span>Vérification en cours...</span>
                </>
              ) : (
                <>
                  <span>Se Connecter</span>
                  <Key className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer Notice */}
          <div className="mt-8 pt-5 border-t border-[#E2E8F0] text-center">
            <p className="text-[11px] text-[#4A607A] leading-relaxed">
              Accès strictement réservé au personnel autorisé.<br />
              Toute tentative d'accès non autorisée sera journalisée.
            </p>
          </div>
        </div>

        {/* Bottom Branding */}
        <div className="bg-[#0A2540] border-t border-[#0F3854] py-3 px-6 text-center">
          <p className="font-mono text-[10px] tracking-widest uppercase text-blue-300 font-bold">
            Best Builders SARLU — Bureau d'Études & BTP
          </p>
        </div>
      </div>
    </div>
  );
}
