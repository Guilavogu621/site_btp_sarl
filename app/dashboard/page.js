"use client";

import { useState } from "react";
import {
  FolderKanban,
  FileText,
  MessageSquare,
  Settings,
  Plus,
  Trash2,
  CheckCircle2,
  LogOut,
  UserCheck,
  UserPlus,
  Users,
  Save,
  Layers,
  Building,
  Shield,
  Search,
  Eye,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Sparkles,
  TrendingUp,
  X
} from "lucide-react";
import LoginScreen from "@/components/LoginScreen";
import { useEffect } from "react";
import {
  initialProjects,
  initialArticles,
  initialContactMessages,
  initialServices,
  initialSiteSettings,
  getStoredArticles,
  saveStoredArticles,
  getStoredProjects,
  saveStoredProjects
} from "@/lib/data";
import { sanitizeText } from "@/lib/security";

export default function DashboardPage() {
  // Authentication State with Persistence
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [currentUserEmail, setCurrentUserEmail] = useState("bestbuilderssarlu@gmail.com");

  // User Management State
  const [users, setUsers] = useState([
    { id: 1, name: "Admin Principal", email: "bestbuilderssarlu@gmail.com", role: "Administrateur", status: "Actif" },
    { id: 2, name: "Directeur Technique", email: "direction@bestbuilders.gn", role: "Éditeur", status: "Actif" }
  ]);
  const [showAddUser, setShowAddUser] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "Éditeur" });

  // Navigation State
  const [activeTab, setActiveTab] = useState("overview");

  // Content State
  const [messages, setMessages] = useState(initialContactMessages);
  const [projects, setProjects] = useState(initialProjects);
  const [articles, setArticles] = useState(initialArticles);
  const [services, setServices] = useState(initialServices);
  const [settings, setSettings] = useState(initialSiteSettings);

  // Synchroniser la session d'authentification et les contenus au chargement du dashboard
  useEffect(() => {
    try {
      const savedSession = localStorage.getItem("best_builders_admin_session");
      if (savedSession) {
        const parsed = JSON.parse(savedSession);
        if (parsed && parsed.isAuthenticated) {
          setIsAuthenticated(true);
          if (parsed.email) setCurrentUserEmail(parsed.email);
        }
      }
    } catch (e) {
      console.error("Erreur lors de la lecture de la session admin :", e);
    } finally {
      setIsCheckingAuth(false);
    }

    setArticles(getStoredArticles());
    setProjects(getStoredProjects());
  }, []);

  // Search filter state
  const [searchQuery, setSearchQuery] = useState("");

  // Forms states
  const [showAddProject, setShowAddProject] = useState(false);
  const [newProject, setNewProject] = useState({
    title: "",
    category: "Équipement public",
    description: "",
    location: "Conakry",
    surface: "1 000 m²",
    duration: "12 mois",
    photo_before: "/img/logo.png"
  });

  const [showAddArticle, setShowAddArticle] = useState(false);
  const [newArticle, setNewArticle] = useState({
    title: "",
    content: "",
    image: "/img/logo.png",
    published_at: new Date().toISOString().split("T")[0]
  });

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);

  // Authentication Handlers
  const handleLogin = (email) => {
    setCurrentUserEmail(email);
    setIsAuthenticated(true);
    try {
      localStorage.setItem(
        "best_builders_admin_session",
        JSON.stringify({ isAuthenticated: true, email })
      );
    } catch (e) {
      console.error("Erreur de sauvegarde de la session admin :", e);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    try {
      localStorage.removeItem("best_builders_admin_session");
    } catch (e) {
      console.error("Erreur de suppression de la session admin :", e);
    }
  };

  // User Management Handlers
  const handleAddUser = (e) => {
    e.preventDefault();
    if (!newUser.email || !newUser.name) return;

    const created = {
      id: Date.now(),
      name: sanitizeText(newUser.name),
      email: sanitizeText(newUser.email),
      role: newUser.role,
      status: "Actif"
    };

    setUsers([...users, created]);
    setShowAddUser(false);
    setNewUser({ name: "", email: "", role: "Éditeur" });
    triggerSuccess();
  };

  const handleDeleteUser = (id) => {
    if (users.length <= 1) {
      alert("Impossible de supprimer le dernier administrateur !");
      return;
    }
    if (confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) {
      setUsers(users.filter((u) => u.id !== id));
      triggerSuccess();
    }
  };

  // Content Handlers
  const handleAddProject = (e) => {
    e.preventDefault();
    const created = {
      id: Date.now(),
      ...newProject,
      slug: newProject.title.toLowerCase().replace(/ /g, "-")
    };
    const updated = [created, ...projects];
    setProjects(updated);
    saveStoredProjects(updated);
    setShowAddProject(false);
    setNewProject({
      title: "",
      category: "Équipement public",
      description: "",
      location: "Conakry",
      surface: "1 000 m²",
      duration: "12 mois",
      photo_before: "/img/logo.png"
    });
    triggerSuccess();
  };

  const handleDeleteProject = (id) => {
    if (confirm("Voulez-vous supprimer ce projet du portfolio ?")) {
      const updated = projects.filter((p) => p.id !== id);
      setProjects(updated);
      saveStoredProjects(updated);
      triggerSuccess();
    }
  };

  const handleAddArticle = (e) => {
    e.preventDefault();
    const created = {
      id: Date.now(),
      ...newArticle,
      slug: newArticle.title.toLowerCase().replace(/ /g, "-")
    };
    const updated = [created, ...articles];
    setArticles(updated);
    saveStoredArticles(updated);
    setShowAddArticle(false);
    setNewArticle({
      title: "",
      content: "",
      image: "/img/logo.png",
      published_at: new Date().toISOString().split("T")[0]
    });
    triggerSuccess();
  };

  const handleDeleteArticle = (id) => {
    if (confirm("Voulez-vous supprimer cet article d'actualité ?")) {
      const updated = articles.filter((a) => a.id !== id);
      setArticles(updated);
      saveStoredArticles(updated);
      triggerSuccess();
    }
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    triggerSuccess();
  };

  const triggerSuccess = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  // IF CHECKING AUTHENTICATION SESSION -> SHOW LOADER
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-[#0A2540] flex items-center justify-center text-white font-sans blueprint-grid-dark">
        <div className="flex flex-col items-center gap-4 p-8 bg-[#0F3854]/60 border border-[#1E56A0]/40 rounded-md">
          <svg className="animate-spin w-8 h-8 text-[#00C2FF]" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="31.4" strokeLinecap="round" />
          </svg>
          <span className="font-mono text-[12px] uppercase text-[#00C2FF] font-semibold tracking-wider">
            Vérification de la session admin...
          </span>
        </div>
      </div>
    );
  }

  // IF NOT AUTHENTICATED -> SHOW PREMIUM LOGIN SCREEN
  if (!isAuthenticated) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  // IF AUTHENTICATED -> SHOW FULL EXECUTIVE DASHBOARD
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0A2540] flex flex-col font-sans">
      {/* EXECUTIVE TOP HEADER */}
      <header className="h-20 bg-[#0A2540] border-b border-[#0F3854] px-6 flex items-center justify-between sticky top-0 z-40 shadow-md">
        <div className="flex items-center gap-4">
          <div className="bg-white p-2 rounded-md flex items-center justify-center shadow-sm">
            <img src="/img/logo.png" alt="Best Builders SARLU" className="h-10 w-auto object-contain" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display font-bold text-[18px] text-white tracking-wide">
                Best Builders SARLU
              </h1>
              <span className="bg-[#1E56A0] text-white text-[10px] font-mono font-bold px-2.5 py-0.5 uppercase tracking-widest rounded-sm">
                Console Admin
              </span>
            </div>
            <p className="text-[12px] text-slate-300">Système de Gestion Globale du Site Vitrine</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          {savedSuccess && (
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-emerald-500/20 border border-emerald-400 text-emerald-100 text-[13px] font-medium rounded-sm animate-pulse">
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              <span>Modifications enregistrées !</span>
            </div>
          )}

          <div className="flex items-center gap-3 border-l border-[#0F3854] pl-6">
            <div className="w-10 h-10 bg-[#1E56A0] border border-blue-400 text-white flex items-center justify-center font-bold text-[15px] rounded-full shadow-inner">
              {currentUserEmail.charAt(0).toUpperCase()}
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-[13px] font-bold text-white leading-tight">Admin Connecté</p>
              <p className="text-[11px] text-slate-300">{currentUserEmail}</p>
            </div>
            <button
              onClick={handleLogout}
              className="ml-2 p-2 text-slate-300 hover:text-red-300 hover:bg-[#0F3854] rounded-sm transition-colors"
              title="Se déconnecter"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* DASHBOARD BODY */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* NAVY BLUE SIDEBAR NAVIGATION */}
        <aside className="w-full md:w-64 bg-[#0A2540] border-r border-[#0F3854] p-5 shrink-0 shadow-lg text-white">
          <p className="font-mono text-[10px] uppercase tracking-widest text-slate-300 font-bold mb-4 px-3">
            Menu d&apos;Administration
          </p>

          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab("overview")}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-md font-medium text-[13px] transition-all text-left ${
                activeTab === "overview"
                  ? "bg-[#1E56A0] text-white font-bold shadow-md"
                  : "text-slate-200 hover:bg-[#0F3854] hover:text-white"
              }`}
            >
              <TrendingUp className="w-4 h-4 text-[#00C2FF]" />
              <span>Tableau de bord</span>
            </button>

            <button
              onClick={() => setActiveTab("messages")}
              className={`w-full flex items-center justify-between px-3 py-3 rounded-md font-medium text-[13px] transition-all text-left ${
                activeTab === "messages"
                  ? "bg-[#1E56A0] text-white font-bold shadow-md"
                  : "text-slate-200 hover:bg-[#0F3854] hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <MessageSquare className="w-4 h-4 text-[#00C2FF]" />
                <span>Demandes / Contact</span>
              </div>
              {messages.length > 0 && (
                <span className="bg-[#00C2FF] text-[#000F22] text-[11px] font-mono font-bold px-2 py-0.5 rounded-full">
                  {messages.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("projects")}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-md font-medium text-[13px] transition-all text-left ${
                activeTab === "projects"
                  ? "bg-[#1E56A0] text-white font-bold shadow-md"
                  : "text-slate-200 hover:bg-[#0F3854] hover:text-white"
              }`}
            >
              <FolderKanban className="w-4 h-4 text-[#00C2FF]" />
              <span>Portfolio Projets</span>
            </button>

            <button
              onClick={() => setActiveTab("articles")}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-md font-medium text-[13px] transition-all text-left ${
                activeTab === "articles"
                  ? "bg-[#1E56A0] text-white font-bold shadow-md"
                  : "text-slate-200 hover:bg-[#0F3854] hover:text-white"
              }`}
            >
              <FileText className="w-4 h-4 text-[#00C2FF]" />
              <span>Actualités &amp; Articles</span>
            </button>

            <button
              onClick={() => setActiveTab("users")}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-md font-medium text-[13px] transition-all text-left ${
                activeTab === "users"
                  ? "bg-[#1E56A0] text-white font-bold shadow-md"
                  : "text-slate-200 hover:bg-[#0F3854] hover:text-white"
              }`}
            >
              <Users className="w-4 h-4 text-[#00C2FF]" />
              <span>Utilisateurs &amp; Accès</span>
            </button>

            <button
              onClick={() => setActiveTab("settings")}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-md font-medium text-[13px] transition-all text-left ${
                activeTab === "settings"
                  ? "bg-[#1E56A0] text-white font-bold shadow-md"
                  : "text-slate-200 hover:bg-[#0F3854] hover:text-white"
              }`}
            >
              <Settings className="w-4 h-4 text-[#00C2FF]" />
              <span>Paramètres Site</span>
            </button>
          </nav>

          <div className="mt-12 p-4 bg-[#0F3854]/60 border border-[#1E56A0]/40 rounded-md text-left">
            <div className="flex items-center gap-2 text-white font-bold text-[12px] uppercase">
              <Shield className="w-4 h-4 text-blue-300" />
              <span>Système Sécurisé</span>
            </div>
            <p className="text-[11px] text-slate-300 mt-1">
              Chiffrement SSL 256 bits activé. Version 2.0 Next.js.
            </p>
          </div>
        </aside>

        {/* SOFT WHITE MAIN DASHBOARD PANEL CONTENT */}
        <main className="flex-1 bg-[#FAFAFA] p-6 md:p-10 overflow-y-auto">
          {/* TAB: OVERVIEW / KPI SUMMARY */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              <div>
                <h2 className="font-display font-bold text-[26px] text-[#0A2540]">
                  Tableau de Bord Exécutif
                </h2>
                <p className="text-[14px] text-slate-700 mt-1">
                  Aperçu en temps réel des activités et des contenus du site Best Builders SARLU.
                </p>
              </div>

              {/* KPI Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white border border-[#E2E8F0] p-6 rounded-md shadow-xs relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[12px] font-mono uppercase text-slate-700 font-semibold">Messages de Contact</p>
                      <h3 className="text-[32px] font-bold text-[#0A2540] mt-1">{messages.length}</h3>
                    </div>
                    <div className="w-12 h-12 bg-[#0A2540]/5 border border-[#1E56A0]/20 text-[#1E56A0] flex items-center justify-center rounded-md">
                      <MessageSquare className="w-6 h-6" />
                    </div>
                  </div>
                  <p className="text-[12px] text-emerald-600 mt-4 flex items-center gap-1 font-semibold">
                    <span>Directement depuis le site web</span>
                  </p>
                </div>

                <div className="bg-white border border-[#E2E8F0] p-6 rounded-md shadow-xs relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[12px] font-mono uppercase text-slate-700 font-semibold">Projets Portfolio</p>
                      <h3 className="text-[32px] font-bold text-[#0A2540] mt-1">{projects.length}</h3>
                    </div>
                    <div className="w-12 h-12 bg-[#0A2540]/5 border border-[#1E56A0]/20 text-[#1E56A0] flex items-center justify-center rounded-md">
                      <FolderKanban className="w-6 h-6" />
                    </div>
                  </div>
                  <p className="text-[12px] text-slate-700 mt-4 font-medium">
                    Chantiers en vitrine
                  </p>
                </div>

                <div className="bg-white border border-[#E2E8F0] p-6 rounded-md shadow-xs relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[12px] font-mono uppercase text-slate-700 font-semibold">Articles Actualités</p>
                      <h3 className="text-[32px] font-bold text-[#0A2540] mt-1">{articles.length}</h3>
                    </div>
                    <div className="w-12 h-12 bg-[#0A2540]/5 border border-[#1E56A0]/20 text-[#1E56A0] flex items-center justify-center rounded-md">
                      <FileText className="w-6 h-6" />
                    </div>
                  </div>
                  <p className="text-[12px] text-slate-700 mt-4 font-medium">
                    Publications presse
                  </p>
                </div>

                <div className="bg-white border border-[#E2E8F0] p-6 rounded-md shadow-xs relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[12px] font-mono uppercase text-slate-700 font-semibold">Utilisateurs Admins</p>
                      <h3 className="text-[32px] font-bold text-[#0A2540] mt-1">{users.length}</h3>
                    </div>
                    <div className="w-12 h-12 bg-[#0A2540]/5 border border-[#1E56A0]/20 text-[#1E56A0] flex items-center justify-center rounded-md">
                      <Users className="w-6 h-6" />
                    </div>
                  </div>
                  <p className="text-[12px] text-emerald-600 mt-4 font-semibold">
                    Comptes enregistrés
                  </p>
                </div>
              </div>

              {/* Recent Messages Section */}
              <div className="bg-white border border-[#E2E8F0] p-6 rounded-md shadow-xs">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-display font-bold text-[18px] text-[#0A2540]">Dernières Demandes Reçues</h3>
                  <button
                    onClick={() => setActiveTab("messages")}
                    className="text-[12px] font-mono uppercase text-[#1E56A0] font-bold hover:underline"
                  >
                    Voir tout ({messages.length}) →
                  </button>
                </div>

                <div className="space-y-4">
                  {messages.slice(0, 3).map((msg) => (
                    <div key={msg.id} className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-md flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#1E56A0] transition-colors">
                      <div>
                        <div className="flex items-center gap-3">
                          <h4 className="font-bold text-[15px] text-[#0A2540]">{msg.name}</h4>
                          <span className="text-[11px] font-mono bg-[#0A2540]/10 text-[#0A2540] px-2 py-0.5 font-bold uppercase rounded-xs">
                            {msg.service_requested}
                          </span>
                        </div>
                        <p className="text-[13px] text-slate-700 mt-1 line-clamp-1">"{msg.message}"</p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-[11px] text-slate-700 block">{msg.created_at}</span>
                        <span className="text-[12px] text-[#0A2540] font-mono font-semibold">{msg.phone}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB: MESSAGES */}
          {activeTab === "messages" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2E8F0] pb-6">
                <div>
                  <h2 className="font-display font-bold text-[24px] text-[#0A2540]">Demandes de Contact ({messages.length})</h2>
                  <p className="text-[14px] text-slate-700 mt-1">Messages transmis directement depuis le formulaire du site.</p>
                </div>
              </div>

              {messages.length === 0 ? (
                <div className="bg-white p-12 text-center border border-[#E2E8F0] text-slate-700 rounded-md shadow-xs">
                  Aucun message reçu pour le moment.
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div key={msg.id} className="bg-white border border-[#E2E8F0] p-6 rounded-md shadow-xs hover:border-[#1E56A0] transition-all">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E2E8F0] pb-4 mb-4 gap-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-[#0A2540] text-white flex items-center justify-center font-bold text-[16px] rounded-full shadow-xs">
                            {msg.name.charAt(0)}
                          </div>
                          <div>
                            <h3 className="font-bold text-[17px] text-[#0A2540]">{msg.name}</h3>
                            <span className="text-[12px] font-mono text-[#1E56A0] font-semibold">
                              Service : {msg.service_requested}
                            </span>
                          </div>
                        </div>
                        <span className="text-[12px] text-slate-700 font-mono">{msg.created_at}</span>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4 text-[13px] text-[#0A2540] mb-4 bg-[#F8FAFC] p-3 rounded-md border border-[#E2E8F0]">
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-[#1E56A0]" />
                          <span className="font-semibold">{msg.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-[#1E56A0]" />
                          <span className="font-semibold">{msg.email}</span>
                        </div>
                      </div>

                      <div className="bg-white p-4 border border-[#E2E8F0] text-[14px] text-slate-700 leading-relaxed rounded-md">
                        "{msg.message}"
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB: USERS MANAGEMENT */}
          {activeTab === "users" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2E8F0] pb-6">
                <div>
                  <h2 className="font-display font-bold text-[24px] text-[#0A2540]">Gestion des Utilisateurs ({users.length})</h2>
                  <p className="text-[14px] text-slate-700 mt-1">Gérez les comptes ayant accès à la console d'administration.</p>
                </div>
                <button
                  onClick={() => setShowAddUser(!showAddUser)}
                  className="px-5 py-2.5 bg-[#0A2540] hover:bg-[#1E56A0] text-white font-bold text-[13px] uppercase tracking-wider flex items-center gap-2 rounded-sm transition-all shadow-md shrink-0"
                >
                  {showAddUser ? <X className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
                  <span>{showAddUser ? "Fermer" : "Créer un Utilisateur"}</span>
                </button>
              </div>

              {showAddUser && (
                <form onSubmit={handleAddUser} className="bg-white border border-[#E2E8F0] p-6 rounded-md shadow-md space-y-4">
                  <h3 className="font-bold text-[16px] text-[#0A2540] flex items-center gap-2">
                    <UserPlus className="w-5 h-5 text-[#1E56A0]" /> Nouveau Compte Administrateur
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono uppercase text-[#0A2540] font-bold mb-1">Nom Complet</label>
                      <input
                        type="text"
                        required
                        placeholder="ex: Paul Camara"
                        value={newUser.name}
                        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                        className="w-full p-3 bg-[#f5f5f5] border border-[#cccccc] text-[#0A2540] outline-none focus:border-[#1E56A0] focus:ring-1 focus:ring-[#1E56A0] rounded-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono uppercase text-[#0A2540] font-bold mb-1">Adresse Email</label>
                      <input
                        type="email"
                        required
                        placeholder="paul.camara@bestbuilders.gn"
                        value={newUser.email}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        className="w-full p-3 bg-[#f5f5f5] border border-[#cccccc] text-[#0A2540] outline-none focus:border-[#1E56A0] focus:ring-1 focus:ring-[#1E56A0] rounded-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-[#0A2540] font-bold mb-1">Rôle d'accès</label>
                    <select
                      value={newUser.role}
                      onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                      className="w-full p-3 bg-[#f5f5f5] border border-[#cccccc] text-[#0A2540] outline-none focus:border-[#1E56A0] rounded-sm"
                    >
                      <option value="Administrateur">Administrateur (Accès Total)</option>
                      <option value="Éditeur">Éditeur (Gestion Contenus)</option>
                    </select>
                  </div>
                  <button type="submit" className="px-6 py-3 bg-[#0A2540] text-white font-bold text-[13px] uppercase tracking-wider rounded-sm hover:bg-[#1E56A0] transition-colors shadow-md">
                    Ajouter l'utilisateur
                  </button>
                </form>
              )}

              {/* Users Table */}
              <div className="bg-white border border-[#E2E8F0] rounded-md shadow-xs overflow-hidden">
                <table className="w-full text-left text-[14px]">
                  <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] font-mono uppercase text-slate-700">
                    <tr>
                      <th className="py-4 px-6">Utilisateur</th>
                      <th className="py-4 px-6">Rôle</th>
                      <th className="py-4 px-6">Statut</th>
                      <th className="py-4 px-6 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2E8F0]">
                    {users.map((u) => (
                      <tr key={u.id} className="hover:bg-[#F1F5F9] transition-colors">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 bg-[#0A2540] text-white flex items-center justify-center font-bold rounded-full shadow-xs">
                              {u.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-bold text-[#0A2540]">{u.name}</p>
                              <p className="text-[12px] text-slate-700">{u.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="inline-block px-3 py-1 bg-[#0A2540]/10 text-[#0A2540] font-mono text-[11px] font-bold uppercase rounded-xs">
                            {u.role}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <span className="inline-flex items-center gap-1.5 text-xs text-emerald-600 font-semibold">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Actif
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <button
                            onClick={() => handleDeleteUser(u.id)}
                            className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-xs transition-colors"
                            title="Supprimer l'utilisateur"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: PROJECTS */}
          {activeTab === "projects" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2E8F0] pb-6">
                <div>
                  <h2 className="font-display font-bold text-[24px] text-[#0A2540]">Portfolio Réalisations ({projects.length})</h2>
                  <p className="text-[14px] text-slate-700 mt-1">Gérez les projets de construction affichés sur la vitrine du site.</p>
                </div>
                <button
                  onClick={() => setShowAddProject(!showAddProject)}
                  className="px-5 py-2.5 bg-[#0A2540] hover:bg-[#1E56A0] text-white font-bold text-[13px] uppercase tracking-wider flex items-center gap-2 rounded-sm transition-all shadow-md shrink-0"
                >
                  {showAddProject ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  <span>{showAddProject ? "Fermer" : "Ajouter un Projet"}</span>
                </button>
              </div>

              {showAddProject && (
                <form onSubmit={handleAddProject} className="bg-white border border-[#E2E8F0] p-6 rounded-md shadow-md space-y-4">
                  <h3 className="font-bold text-[16px] text-[#0A2540]">Nouveau Projet de Construction</h3>
                  <input
                    type="text"
                    required
                    placeholder="Titre du projet (ex: Immeuble Kipé R+5)"
                    value={newProject.title}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                    className="w-full p-3 bg-[#f5f5f5] border border-[#cccccc] text-[#0A2540] outline-none focus:border-[#1E56A0] focus:ring-1 focus:ring-[#1E56A0] rounded-sm"
                  />
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Localisation (ex: Conakry)"
                      value={newProject.location}
                      onChange={(e) => setNewProject({ ...newProject, location: e.target.value })}
                      className="w-full p-3 bg-[#f5f5f5] border border-[#cccccc] text-[#0A2540] outline-none focus:border-[#1E56A0] focus:ring-1 focus:ring-[#1E56A0] rounded-sm"
                    />
                    <input
                      type="text"
                      placeholder="Surface (ex: 1 200 m²)"
                      value={newProject.surface}
                      onChange={(e) => setNewProject({ ...newProject, surface: e.target.value })}
                      className="w-full p-3 bg-[#f5f5f5] border border-[#cccccc] text-[#0A2540] outline-none focus:border-[#1E56A0] focus:ring-1 focus:ring-[#1E56A0] rounded-sm"
                    />
                  </div>
                  <textarea
                    required
                    rows={3}
                    placeholder="Description détaillée de l'ouvrage..."
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    className="w-full p-3 bg-[#f5f5f5] border border-[#cccccc] text-[#0A2540] outline-none focus:border-[#1E56A0] focus:ring-1 focus:ring-[#1E56A0] rounded-sm"
                  ></textarea>
                  <button type="submit" className="px-6 py-3 bg-[#0A2540] text-white font-bold text-[13px] uppercase tracking-wider rounded-sm hover:bg-[#1E56A0] transition-colors shadow-md">
                    Publier le projet
                  </button>
                </form>
              )}

              <div className="grid sm:grid-cols-2 gap-4">
                {projects.map((p) => (
                  <div key={p.id} className="bg-white border border-[#E2E8F0] p-5 rounded-md shadow-xs flex flex-col justify-between hover:border-[#1E56A0] transition-all">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-mono bg-[#0A2540]/10 text-[#0A2540] px-2.5 py-0.5 font-bold uppercase rounded-xs">
                          {p.category}
                        </span>
                        <span className="text-[12px] text-slate-700 font-semibold">{p.location}</span>
                      </div>
                      <h4 className="font-bold text-[18px] text-[#0A2540] mb-2">{p.title}</h4>
                      <p className="text-[13px] text-slate-700 line-clamp-2 mb-4">{p.description}</p>
                    </div>
                    <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between text-[12px] text-slate-700">
                      <span className="font-medium">Surface : {p.surface}</span>
                      <button
                        onClick={() => handleDeleteProject(p.id)}
                        className="text-red-600 hover:text-red-800 font-bold uppercase text-[11px]"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: ARTICLES */}
          {activeTab === "articles" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2E8F0] pb-6">
                <div>
                  <h2 className="font-display font-bold text-[24px] text-[#0A2540]">Articles & Publications ({articles.length})</h2>
                  <p className="text-[14px] text-slate-700 mt-1">Rédigez et diffusez les actualités techniques de l'entreprise.</p>
                </div>
                <button
                  onClick={() => setShowAddArticle(!showAddArticle)}
                  className="px-5 py-2.5 bg-[#0A2540] hover:bg-[#1E56A0] text-white font-bold text-[13px] uppercase tracking-wider flex items-center gap-2 rounded-sm transition-all shadow-md shrink-0"
                >
                  {showAddArticle ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  <span>{showAddArticle ? "Fermer" : "Nouvel Article"}</span>
                </button>
              </div>

              {showAddArticle && (
                <form onSubmit={handleAddArticle} className="bg-white border border-[#E2E8F0] p-6 rounded-md shadow-md space-y-4">
                  <h3 className="font-bold text-[16px] text-[#0A2540]">Rédiger un nouvel article</h3>
                  <input
                    type="text"
                    required
                    placeholder="Titre de l'article"
                    value={newArticle.title}
                    onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
                    className="w-full p-3 bg-[#f5f5f5] border border-[#cccccc] text-[#0A2540] outline-none focus:border-[#1E56A0] focus:ring-1 focus:ring-[#1E56A0] rounded-sm"
                  />
                  <textarea
                    required
                    rows={6}
                    placeholder="Contenu de l'article..."
                    value={newArticle.content}
                    onChange={(e) => setNewArticle({ ...newArticle, content: e.target.value })}
                    className="w-full p-3 bg-[#f5f5f5] border border-[#cccccc] text-[#0A2540] outline-none focus:border-[#1E56A0] focus:ring-1 focus:ring-[#1E56A0] rounded-sm"
                  ></textarea>
                  <button type="submit" className="px-6 py-3 bg-[#0A2540] text-white font-bold text-[13px] uppercase tracking-wider rounded-sm hover:bg-[#1E56A0] transition-colors shadow-md">
                    Publier l'article
                  </button>
                </form>
              )}

              <div className="space-y-4">
                {articles.map((a) => (
                  <div key={a.id} className="bg-white border border-[#E2E8F0] p-5 rounded-md shadow-xs flex items-center justify-between gap-4 hover:border-[#1E56A0] transition-all">
                    <div>
                      <span className="text-[11px] font-mono text-[#1E56A0] font-bold block mb-1">Date : {a.published_at}</span>
                      <h4 className="font-bold text-[17px] text-[#0A2540]">{a.title}</h4>
                      <p className="text-[13px] text-slate-700 line-clamp-1 mt-1">{a.content}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteArticle(a.id)}
                      className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-xs transition-colors shrink-0"
                      title="Supprimer"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: SETTINGS */}
          {activeTab === "settings" && (
            <div className="space-y-6">
              <div className="border-b border-[#E2E8F0] pb-6">
                <h2 className="font-display font-bold text-[24px] text-[#0A2540]">Paramètres de l'Entreprise</h2>
                <p className="text-[14px] text-slate-700 mt-1">Mettez à jour les coordonnées affichées sur tout le site.</p>
              </div>

              <form onSubmit={handleSaveSettings} className="bg-white border border-[#E2E8F0] p-8 rounded-md shadow-md space-y-5 max-w-3xl">
                <div>
                  <label className="block text-[12px] font-mono uppercase text-[#0A2540] font-bold mb-2">Nom de la Société</label>
                  <input
                    type="text"
                    value={settings.company_name}
                    onChange={(e) => setSettings({ ...settings, company_name: e.target.value })}
                    className="w-full p-3 bg-[#f5f5f5] border border-[#cccccc] text-[#0A2540] outline-none focus:border-[#1E56A0] focus:ring-1 focus:ring-[#1E56A0] rounded-sm"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[12px] font-mono uppercase text-[#0A2540] font-bold mb-2">Téléphone</label>
                    <input
                      type="text"
                      value={settings.phone}
                      onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                      className="w-full p-3 bg-[#f5f5f5] border border-[#cccccc] text-[#0A2540] outline-none focus:border-[#1E56A0] focus:ring-1 focus:ring-[#1E56A0] rounded-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-mono uppercase text-[#0A2540] font-bold mb-2">Email Officiel</label>
                    <input
                      type="email"
                      value={settings.email}
                      onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                      className="w-full p-3 bg-[#f5f5f5] border border-[#cccccc] text-[#0A2540] outline-none focus:border-[#1E56A0] focus:ring-1 focus:ring-[#1E56A0] rounded-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[12px] font-mono uppercase text-[#0A2540] font-bold mb-2">Adresse du Siège</label>
                  <input
                    type="text"
                    value={settings.address}
                    onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                    className="w-full p-3 bg-[#f5f5f5] border border-[#cccccc] text-[#0A2540] outline-none focus:border-[#1E56A0] focus:ring-1 focus:ring-[#1E56A0] rounded-sm"
                  />
                </div>

                <div>
                  <label className="block text-[12px] font-mono uppercase text-[#0A2540] font-bold mb-2">Texte Présentation "À Propos"</label>
                  <textarea
                    rows={5}
                    value={settings.about_text}
                    onChange={(e) => setSettings({ ...settings, about_text: e.target.value })}
                    className="w-full p-3 bg-[#f5f5f5] border border-[#cccccc] text-[#0A2540] outline-none focus:border-[#1E56A0] focus:ring-1 focus:ring-[#1E56A0] rounded-sm"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="px-6 py-3.5 bg-[#0A2540] hover:bg-[#1E56A0] text-white font-bold text-[14px] uppercase tracking-wider flex items-center gap-2 rounded-sm transition-all shadow-md"
                >
                  <Save className="w-4 h-4" /> Enregistrer les modifications
                </button>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
