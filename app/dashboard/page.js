"use client";

import { useState, useEffect } from "react";
import {
  FolderKanban,
  FileText,
  MessageSquare,
  Settings,
  Plus,
  Trash2,
  CheckCircle2,
  LogOut,
  UserPlus,
  Users,
  Shield,
  Search,
  Mail,
  Phone,
  TrendingUp,
  X,
  ExternalLink,
  Copy,
  Database,
  Sparkles,
  RefreshCw,
  Building2
} from "lucide-react";
import LoginScreen from "@/components/LoginScreen";
import {
  initialProjects,
  initialArticles,
  initialContactMessages,
  initialServices,
  initialSiteSettings,
  getProjects,
  createProject,
  deleteProject,
  getArticles,
  createArticle,
  deleteArticle,
  getContactMessages
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

  // Navigation & UI State
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedText, setCopiedText] = useState(null);

  // Content State
  const [messages, setMessages] = useState(initialContactMessages);
  const [projects, setProjects] = useState(initialProjects);
  const [articles, setArticles] = useState(initialArticles);
  const [services] = useState(initialServices);
  const [settings] = useState(initialSiteSettings);
  const [isLoadingData, setIsLoadingData] = useState(false);

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
  const [successMessage, setSuccessMessage] = useState("Modifications enregistrées avec succès !");

  // Synchroniser la session et charger les données Supabase
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

    refreshData();
  }, []);

  const refreshData = async () => {
    setIsLoadingData(true);
    try {
      const [fetchedArticles, fetchedProjects, fetchedMessages] = await Promise.all([
        getArticles(),
        getProjects(),
        getContactMessages()
      ]);
      if (fetchedArticles && fetchedArticles.length > 0) setArticles(fetchedArticles);
      if (fetchedProjects && fetchedProjects.length > 0) setProjects(fetchedProjects);
      if (fetchedMessages && fetchedMessages.length > 0) setMessages(fetchedMessages);
    } catch (err) {
      console.error("Erreur de chargement des données Supabase :", err);
    } finally {
      setIsLoadingData(false);
    }
  };

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
    triggerSuccess("Nouvel utilisateur créé avec succès !");
  };

  const handleDeleteUser = (id) => {
    if (users.length <= 1) {
      alert("Impossible de supprimer le dernier administrateur !");
      return;
    }
    if (confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) {
      setUsers(users.filter((u) => u.id !== id));
      triggerSuccess("Utilisateur supprimé.");
    }
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    const projectPayload = {
      title: sanitizeText(newProject.title),
      category: newProject.category,
      description: sanitizeText(newProject.description),
      location: sanitizeText(newProject.location),
      surface: sanitizeText(newProject.surface),
      duration: sanitizeText(newProject.duration),
      photo_before: newProject.photo_before || "/img/logo.png",
      slug: newProject.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")
    };

    const created = await createProject(projectPayload);
    setProjects((prev) => [created, ...prev.filter((p) => p.id !== created.id)]);
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
    triggerSuccess("Projet publié sur la base de données Supabase !");
  };

  const handleDeleteProject = async (id) => {
    if (confirm("Voulez-vous supprimer ce projet du portfolio ?")) {
      await deleteProject(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
      triggerSuccess("Projet supprimé.");
    }
  };

  const handleAddArticle = async (e) => {
    e.preventDefault();
    const articlePayload = {
      title: sanitizeText(newArticle.title),
      content: sanitizeText(newArticle.content),
      image: newArticle.image || "/img/logo.png",
      published_at: newArticle.published_at || new Date().toISOString().split("T")[0],
      slug: newArticle.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")
    };

    const created = await createArticle(articlePayload);
    setArticles((prev) => [created, ...prev.filter((a) => a.id !== created.id)]);
    setShowAddArticle(false);
    setNewArticle({
      title: "",
      content: "",
      image: "/img/logo.png",
      published_at: new Date().toISOString().split("T")[0]
    });
    triggerSuccess("Article d'actualité publié avec succès !");
  };

  const handleDeleteArticle = async (id) => {
    if (confirm("Voulez-vous supprimer cet article d'actualité ?")) {
      await deleteArticle(id);
      setArticles((prev) => prev.filter((a) => a.id !== id));
      triggerSuccess("Article supprimé.");
    }
  };

  const triggerSuccess = (msg = "Modifications enregistrées avec succès !") => {
    setSuccessMessage(msg);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3500);
  };

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Filtering lists based on search input
  const filteredMessages = messages.filter((m) =>
    (m.name + m.email + m.phone + m.service_requested + m.message)
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const filteredProjects = projects.filter((p) =>
    (p.title + p.category + p.location + p.description)
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const filteredArticles = articles.filter((a) =>
    (a.title + a.content)
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  // IF CHECKING AUTHENTICATION SESSION -> SHOW LOADER
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-[#0A2540] flex items-center justify-center text-white font-sans blueprint-grid-dark">
        <div className="flex flex-col items-center gap-4 p-8 bg-[#0F3854]/80 border border-[#00C2FF]/30 rounded-lg shadow-2xl backdrop-blur-md">
          <svg className="animate-spin w-10 h-10 text-[#00C2FF]" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="31.4" strokeLinecap="round" />
          </svg>
          <span className="font-mono text-[12px] uppercase text-[#00C2FF] font-semibold tracking-widest animate-pulse">
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

  return (
    <div className="min-h-screen bg-[#F1F5F9] text-[#0A2540] flex flex-col font-sans selection:bg-[#00C2FF]/20">
      {/* EXECUTIVE STITCH TOP HEADER */}
      <header className="h-20 bg-[#0A2540] border-b border-[#1E56A0]/40 px-6 flex items-center justify-between sticky top-0 z-40 shadow-xl backdrop-blur-md bg-opacity-95">
        <div className="flex items-center gap-4">
          <div className="bg-white p-2 rounded-lg flex items-center justify-center shadow-md border border-white/20">
            <img src="/img/logo.png" alt="Best Builders SARLU" className="h-9 w-auto object-contain" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display font-bold text-[18px] text-white tracking-wide">
                Best Builders SARLU
              </h1>
              <span className="bg-[#00C2FF]/15 border border-[#00C2FF]/40 text-[#00C2FF] text-[10px] font-mono font-bold px-2.5 py-0.5 uppercase tracking-widest rounded-xs flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#00C2FF] animate-ping" />
                Console Executive
              </span>
            </div>
            <p className="text-[12px] text-slate-300 flex items-center gap-2 mt-0.5">
              <span className="flex items-center gap-1 text-emerald-400 font-mono font-semibold text-[11px]">
                <Database className="w-3 h-3 text-emerald-400" /> Supabase Actif
              </span>
              <span>•</span>
              <span>Gestion BTP &amp; Vitrine</span>
            </p>
          </div>
        </div>

        {/* TOPBAR ACTIONS */}
        <div className="flex items-center gap-4 sm:gap-6">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 px-3.5 py-2 bg-[#0F3854] hover:bg-[#1E56A0] text-slate-200 hover:text-white border border-[#1E56A0]/60 rounded-md text-[12px] font-semibold transition-all shadow-xs"
            title="Voir le site public dans un nouvel onglet"
          >
            <span>Voir le site</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#00C2FF]" />
          </a>

          <button
            onClick={refreshData}
            disabled={isLoadingData}
            className="p-2 bg-[#0F3854] hover:bg-[#1E56A0] text-slate-200 rounded-md transition-colors border border-[#1E56A0]/50"
            title="Rafraîchir les données Supabase"
          >
            <RefreshCw className={`w-4 h-4 text-[#00C2FF] ${isLoadingData ? "animate-spin" : ""}`} />
          </button>

          {/* USER PROFILE & LOGOUT */}
          <div className="flex items-center gap-3 border-l border-[#0F3854] pl-4 sm:pl-6">
            <div className="w-10 h-10 bg-gradient-to-br from-[#1E56A0] to-[#00C2FF] text-white flex items-center justify-center font-bold text-[15px] rounded-full shadow-lg border border-white/20">
              {currentUserEmail.charAt(0).toUpperCase()}
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-[13px] font-bold text-white leading-tight">Admin Connecté</p>
              <p className="text-[11px] text-slate-300 font-mono">{currentUserEmail}</p>
            </div>
            <button
              onClick={handleLogout}
              className="ml-1 p-2 text-slate-300 hover:text-red-400 hover:bg-red-500/10 rounded-md transition-colors"
              title="Se déconnecter"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* TOAST SUCCESS NOTIFICATION */}
      {savedSuccess && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 bg-[#0A2540] border border-[#00C2FF] text-white text-[13px] font-medium rounded-lg shadow-2xl animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-[#00C2FF]" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* DASHBOARD BODY */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* NAVY SIDEBAR NAVIGATION */}
        <aside className="w-full md:w-64 bg-[#0A2540] border-r border-[#0F3854] p-5 shrink-0 shadow-lg text-white flex flex-col justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-[#00C2FF] font-bold mb-4 px-3 flex items-center gap-2">
              <Sparkles className="w-3 h-3 text-[#00C2FF]" />
              Navigation Admin
            </p>

            <nav className="space-y-1.5">
              <button
                onClick={() => setActiveTab("overview")}
                className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-lg font-medium text-[13px] transition-all text-left ${
                  activeTab === "overview"
                    ? "bg-[#1E56A0] text-white font-bold shadow-lg border border-[#00C2FF]/30"
                    : "text-slate-300 hover:bg-[#0F3854] hover:text-white"
                }`}
              >
                <TrendingUp className={`w-4 h-4 ${activeTab === "overview" ? "text-[#00C2FF]" : "text-slate-400"}`} />
                <span>Tableau de bord</span>
              </button>

              <button
                onClick={() => setActiveTab("messages")}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-lg font-medium text-[13px] transition-all text-left ${
                  activeTab === "messages"
                    ? "bg-[#1E56A0] text-white font-bold shadow-lg border border-[#00C2FF]/30"
                    : "text-slate-300 hover:bg-[#0F3854] hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <MessageSquare className={`w-4 h-4 ${activeTab === "messages" ? "text-[#00C2FF]" : "text-slate-400"}`} />
                  <span>Demandes / Contact</span>
                </div>
                {messages.length > 0 && (
                  <span className="bg-[#00C2FF] text-[#0A2540] text-[11px] font-mono font-bold px-2 py-0.5 rounded-full shadow-xs">
                    {messages.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab("projects")}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-lg font-medium text-[13px] transition-all text-left ${
                  activeTab === "projects"
                    ? "bg-[#1E56A0] text-white font-bold shadow-lg border border-[#00C2FF]/30"
                    : "text-slate-300 hover:bg-[#0F3854] hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <FolderKanban className={`w-4 h-4 ${activeTab === "projects" ? "text-[#00C2FF]" : "text-slate-400"}`} />
                  <span>Portfolio Projets</span>
                </div>
                <span className="text-[11px] font-mono text-slate-400">{projects.length}</span>
              </button>

              <button
                onClick={() => setActiveTab("articles")}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-lg font-medium text-[13px] transition-all text-left ${
                  activeTab === "articles"
                    ? "bg-[#1E56A0] text-white font-bold shadow-lg border border-[#00C2FF]/30"
                    : "text-slate-300 hover:bg-[#0F3854] hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <FileText className={`w-4 h-4 ${activeTab === "articles" ? "text-[#00C2FF]" : "text-slate-400"}`} />
                  <span>Actualités</span>
                </div>
                <span className="text-[11px] font-mono text-slate-400">{articles.length}</span>
              </button>

              <button
                onClick={() => setActiveTab("users")}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-lg font-medium text-[13px] transition-all text-left ${
                  activeTab === "users"
                    ? "bg-[#1E56A0] text-white font-bold shadow-lg border border-[#00C2FF]/30"
                    : "text-slate-300 hover:bg-[#0F3854] hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Users className={`w-4 h-4 ${activeTab === "users" ? "text-[#00C2FF]" : "text-slate-400"}`} />
                  <span>Utilisateurs Admins</span>
                </div>
                <span className="text-[11px] font-mono text-slate-400">{users.length}</span>
              </button>

              <button
                onClick={() => setActiveTab("settings")}
                className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-lg font-medium text-[13px] transition-all text-left ${
                  activeTab === "settings"
                    ? "bg-[#1E56A0] text-white font-bold shadow-lg border border-[#00C2FF]/30"
                    : "text-slate-300 hover:bg-[#0F3854] hover:text-white"
                }`}
              >
                <Settings className={`w-4 h-4 ${activeTab === "settings" ? "text-[#00C2FF]" : "text-slate-400"}`} />
                <span>Paramètres Site</span>
              </button>
            </nav>
          </div>

          <div className="mt-8 p-4 bg-[#0F3854]/70 border border-[#1E56A0]/40 rounded-lg text-left">
            <div className="flex items-center gap-2 text-white font-bold text-[12px] uppercase tracking-wider">
              <Shield className="w-4 h-4 text-[#00C2FF]" />
              <span>Base Supabase</span>
            </div>
            <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
              Synchronisation directe des formulaires et chantiers avec le Cloud.
            </p>
          </div>
        </aside>

        {/* MAIN EXECUTIVE DASHBOARD CONTENT */}
        <main className="flex-1 bg-[#F8FAFC] p-6 md:p-10 overflow-y-auto">
          {/* SEARCH BAR & HEADER TOOLS */}
          <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Rechercher par mot-clé dans les messages, projets ou articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-[13px] text-[#0A2540] outline-none focus:border-[#1E56A0] focus:ring-2 focus:ring-[#1E56A0]/20 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[12px] text-slate-500 font-mono">
                {searchQuery ? "Résultats filtrés" : "Données à jour"}
              </span>
            </div>
          </div>

          {/* TAB: OVERVIEW / KPI SUMMARY */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              <div>
                <h2 className="font-display font-bold text-[26px] text-[#0A2540]">
                  Tableau de Bord Exécutif
                </h2>
                <p className="text-[14px] text-slate-600 mt-1">
                  Aperçu en temps réel des activités et des contenus du site Best Builders SARLU.
                </p>
              </div>

              {/* KPI Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-xs relative overflow-hidden group hover:border-[#1E56A0] transition-all">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[11px] font-mono uppercase text-slate-500 font-semibold tracking-wider">Demandes / Contact</p>
                      <h3 className="text-[32px] font-bold text-[#0A2540] mt-1">{messages.length}</h3>
                    </div>
                    <div className="w-12 h-12 bg-[#0A2540]/5 border border-[#1E56A0]/20 text-[#1E56A0] flex items-center justify-center rounded-xl group-hover:scale-110 transition-transform">
                      <MessageSquare className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[12px]">
                    <span className="text-emerald-600 font-medium">Reçus via le site</span>
                    <button onClick={() => setActiveTab("messages")} className="text-[#1E56A0] font-semibold hover:underline">Voir →</button>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-xs relative overflow-hidden group hover:border-[#1E56A0] transition-all">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[11px] font-mono uppercase text-slate-500 font-semibold tracking-wider">Projets Portfolio</p>
                      <h3 className="text-[32px] font-bold text-[#0A2540] mt-1">{projects.length}</h3>
                    </div>
                    <div className="w-12 h-12 bg-[#0A2540]/5 border border-[#1E56A0]/20 text-[#1E56A0] flex items-center justify-center rounded-xl group-hover:scale-110 transition-transform">
                      <FolderKanban className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[12px]">
                    <span className="text-slate-600 font-medium">Chantiers vitrine</span>
                    <button onClick={() => setActiveTab("projects")} className="text-[#1E56A0] font-semibold hover:underline">Gérer →</button>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-xs relative overflow-hidden group hover:border-[#1E56A0] transition-all">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[11px] font-mono uppercase text-slate-500 font-semibold tracking-wider">Articles Actualités</p>
                      <h3 className="text-[32px] font-bold text-[#0A2540] mt-1">{articles.length}</h3>
                    </div>
                    <div className="w-12 h-12 bg-[#0A2540]/5 border border-[#1E56A0]/20 text-[#1E56A0] flex items-center justify-center rounded-xl group-hover:scale-110 transition-transform">
                      <FileText className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[12px]">
                    <span className="text-slate-600 font-medium">Publications presse</span>
                    <button onClick={() => setActiveTab("articles")} className="text-[#1E56A0] font-semibold hover:underline">Gérer →</button>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-xs relative overflow-hidden group hover:border-[#1E56A0] transition-all">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[11px] font-mono uppercase text-slate-500 font-semibold tracking-wider">Utilisateurs Admins</p>
                      <h3 className="text-[32px] font-bold text-[#0A2540] mt-1">{users.length}</h3>
                    </div>
                    <div className="w-12 h-12 bg-[#0A2540]/5 border border-[#1E56A0]/20 text-[#1E56A0] flex items-center justify-center rounded-xl group-hover:scale-110 transition-transform">
                      <Users className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[12px]">
                    <span className="text-emerald-600 font-medium">Accès autorisés</span>
                    <button onClick={() => setActiveTab("users")} className="text-[#1E56A0] font-semibold hover:underline">Accès →</button>
                  </div>
                </div>
              </div>

              {/* QUICK ACTIONS ROW */}
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => { setActiveTab("projects"); setShowAddProject(true); }}
                  className="px-5 py-3 bg-[#0A2540] hover:bg-[#1E56A0] text-white font-bold text-[13px] uppercase tracking-wider flex items-center gap-2.5 rounded-lg transition-all shadow-md hover:shadow-lg"
                >
                  <Plus className="w-4 h-4 text-[#00C2FF]" />
                  <span>Publier un nouveau projet</span>
                </button>

                <button
                  onClick={() => { setActiveTab("articles"); setShowAddArticle(true); }}
                  className="px-5 py-3 bg-white hover:bg-slate-100 text-[#0A2540] border border-slate-300 font-bold text-[13px] uppercase tracking-wider flex items-center gap-2.5 rounded-lg transition-all shadow-xs"
                >
                  <FileText className="w-4 h-4 text-[#1E56A0]" />
                  <span>Rédiger un article</span>
                </button>
              </div>

              {/* Recent Messages Section */}
              <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-xs">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-display font-bold text-[18px] text-[#0A2540] flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-[#1E56A0]" />
                    <span>Dernières Demandes Reçues</span>
                  </h3>
                  <button
                    onClick={() => setActiveTab("messages")}
                    className="text-[12px] font-mono uppercase text-[#1E56A0] font-bold hover:underline"
                  >
                    Voir tout ({messages.length}) →
                  </button>
                </div>

                <div className="space-y-4">
                  {messages.slice(0, 4).map((msg) => (
                    <div key={msg.id} className="p-4 bg-slate-50 border border-slate-200 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#1E56A0] transition-colors">
                      <div>
                        <div className="flex items-center gap-3">
                          <h4 className="font-bold text-[15px] text-[#0A2540]">{msg.name}</h4>
                          <span className="text-[11px] font-mono bg-[#0A2540]/10 text-[#0A2540] px-2.5 py-0.5 font-bold uppercase rounded-xs">
                            {msg.service_requested}
                          </span>
                        </div>
                        <p className="text-[13px] text-slate-700 mt-1 line-clamp-1">"{msg.message}"</p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-[11px] text-slate-400 block font-mono">{msg.created_at || "Récemment"}</span>
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
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
                <div>
                  <h2 className="font-display font-bold text-[24px] text-[#0A2540]">Demandes de Contact ({filteredMessages.length})</h2>
                  <p className="text-[14px] text-slate-600 mt-1">Messages et demandes de devis transmis directement via le site web.</p>
                </div>
              </div>

              {filteredMessages.length === 0 ? (
                <div className="bg-white p-12 text-center border border-slate-200 text-slate-500 rounded-xl shadow-xs">
                  Aucun message ne correspond à votre recherche.
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredMessages.map((msg) => (
                    <div key={msg.id} className="bg-white border border-slate-200 p-6 rounded-xl shadow-xs hover:border-[#1E56A0] transition-all">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 mb-4 gap-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-[#0A2540] to-[#1E56A0] text-white flex items-center justify-center font-bold text-[16px] rounded-full shadow-md">
                            {msg.name.charAt(0)}
                          </div>
                          <div>
                            <h3 className="font-bold text-[17px] text-[#0A2540]">{msg.name}</h3>
                            <span className="text-[12px] font-mono text-[#1E56A0] font-semibold">
                              Service demandé : {msg.service_requested}
                            </span>
                          </div>
                        </div>
                        <span className="text-[12px] text-slate-500 font-mono">{msg.created_at || "Récemment"}</span>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4 text-[13px] text-[#0A2540] mb-4 bg-slate-50 p-3.5 rounded-lg border border-slate-200">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-[#1E56A0]" />
                            <span className="font-semibold">{msg.phone}</span>
                          </div>
                          <button
                            onClick={() => copyToClipboard(msg.phone, `phone-${msg.id}`)}
                            className="p-1 text-slate-400 hover:text-[#1E56A0] transition-colors"
                            title="Copier le téléphone"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-[#1E56A0]" />
                            <span className="font-semibold">{msg.email}</span>
                          </div>
                          <button
                            onClick={() => copyToClipboard(msg.email, `email-${msg.id}`)}
                            className="p-1 text-slate-400 hover:text-[#1E56A0] transition-colors"
                            title="Copier l'email"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        {copiedText && copiedText.endsWith(String(msg.id)) && (
                          <div className="col-span-2 text-right">
                            <span className="text-[11px] text-emerald-600 font-semibold animate-pulse">Copié dans le presse-papier !</span>
                          </div>
                        )}
                      </div>

                      <div className="bg-white p-4 border border-slate-200 text-[14px] text-slate-700 leading-relaxed rounded-lg">
                        "{msg.message}"
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB: PROJECTS */}
          {activeTab === "projects" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
                <div>
                  <h2 className="font-display font-bold text-[24px] text-[#0A2540]">Portfolio Réalisations ({filteredProjects.length})</h2>
                  <p className="text-[14px] text-slate-600 mt-1">Gérez les ouvrages de construction publiés sur la vitrine du site web.</p>
                </div>
                <button
                  onClick={() => setShowAddProject(!showAddProject)}
                  className="px-5 py-2.5 bg-[#0A2540] hover:bg-[#1E56A0] text-white font-bold text-[13px] uppercase tracking-wider flex items-center gap-2 rounded-lg transition-all shadow-md shrink-0"
                >
                  {showAddProject ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4 text-[#00C2FF]" />}
                  <span>{showAddProject ? "Fermer" : "Nouveau Projet"}</span>
                </button>
              </div>

              {showAddProject && (
                <form onSubmit={handleAddProject} className="bg-white border border-[#1E56A0]/30 p-6 rounded-xl shadow-lg space-y-4 animate-fadeIn">
                  <h3 className="font-bold text-[16px] text-[#0A2540] flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-[#1E56A0]" /> Nouveau Projet de Construction
                  </h3>
                  <input
                    type="text"
                    required
                    placeholder="Titre du projet (ex: Immeuble Kipé R+5)"
                    value={newProject.title}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-300 text-[#0A2540] outline-none focus:border-[#1E56A0] rounded-lg"
                  />
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Localisation (ex: Conakry)"
                      value={newProject.location}
                      onChange={(e) => setNewProject({ ...newProject, location: e.target.value })}
                      className="w-full p-3 bg-slate-50 border border-slate-300 text-[#0A2540] outline-none focus:border-[#1E56A0] rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder="Surface (ex: 1 200 m²)"
                      value={newProject.surface}
                      onChange={(e) => setNewProject({ ...newProject, surface: e.target.value })}
                      className="w-full p-3 bg-slate-50 border border-slate-300 text-[#0A2540] outline-none focus:border-[#1E56A0] rounded-lg"
                    />
                  </div>
                  <textarea
                    required
                    rows={3}
                    placeholder="Description détaillée de l'ouvrage..."
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-300 text-[#0A2540] outline-none focus:border-[#1E56A0] rounded-lg"
                  ></textarea>
                  <button type="submit" className="px-6 py-3 bg-[#0A2540] text-white font-bold text-[13px] uppercase tracking-wider rounded-lg hover:bg-[#1E56A0] transition-colors shadow-md">
                    Publier le projet sur Supabase
                  </button>
                </form>
              )}

              <div className="grid sm:grid-cols-2 gap-6">
                {filteredProjects.map((p) => (
                  <div key={p.id} className="bg-white border border-slate-200 p-5 rounded-xl shadow-xs flex flex-col justify-between hover:border-[#1E56A0] transition-all group">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[11px] font-mono bg-[#0A2540]/10 text-[#0A2540] px-2.5 py-0.5 font-bold uppercase rounded-xs">
                          {p.category}
                        </span>
                        <span className="text-[12px] text-slate-500 font-semibold">{p.location}</span>
                      </div>
                      <h4 className="font-bold text-[18px] text-[#0A2540] mb-2 group-hover:text-[#1E56A0] transition-colors">{p.title}</h4>
                      <p className="text-[13px] text-slate-600 line-clamp-3 mb-4">{p.description}</p>
                    </div>
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[12px] text-slate-500">
                      <span className="font-medium">Surface : {p.surface}</span>
                      <button
                        onClick={() => handleDeleteProject(p.id)}
                        className="text-red-600 hover:text-red-800 font-bold uppercase text-[11px] flex items-center gap-1 hover:underline"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Supprimer</span>
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
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
                <div>
                  <h2 className="font-display font-bold text-[24px] text-[#0A2540]">Articles &amp; Publications ({filteredArticles.length})</h2>
                  <p className="text-[14px] text-slate-600 mt-1">Gérez les actualités techniques diffusées sur la plateforme.</p>
                </div>
                <button
                  onClick={() => setShowAddArticle(!showAddArticle)}
                  className="px-5 py-2.5 bg-[#0A2540] hover:bg-[#1E56A0] text-white font-bold text-[13px] uppercase tracking-wider flex items-center gap-2 rounded-lg transition-all shadow-md shrink-0"
                >
                  {showAddArticle ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4 text-[#00C2FF]" />}
                  <span>{showAddArticle ? "Fermer" : "Nouvel Article"}</span>
                </button>
              </div>

              {showAddArticle && (
                <form onSubmit={handleAddArticle} className="bg-white border border-[#1E56A0]/30 p-6 rounded-xl shadow-lg space-y-4 animate-fadeIn">
                  <h3 className="font-bold text-[16px] text-[#0A2540] flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[#1E56A0]" /> Rédiger un nouvel article
                  </h3>
                  <input
                    type="text"
                    required
                    placeholder="Titre de l'article"
                    value={newArticle.title}
                    onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-300 text-[#0A2540] outline-none focus:border-[#1E56A0] rounded-lg"
                  />
                  <textarea
                    required
                    rows={5}
                    placeholder="Contenu complet de la publication..."
                    value={newArticle.content}
                    onChange={(e) => setNewArticle({ ...newArticle, content: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-300 text-[#0A2540] outline-none focus:border-[#1E56A0] rounded-lg"
                  ></textarea>
                  <button type="submit" className="px-6 py-3 bg-[#0A2540] text-white font-bold text-[13px] uppercase tracking-wider rounded-lg hover:bg-[#1E56A0] transition-colors shadow-md">
                    Publier sur le site web
                  </button>
                </form>
              )}

              <div className="space-y-4">
                {filteredArticles.map((a) => (
                  <div key={a.id} className="bg-white border border-slate-200 p-6 rounded-xl shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#1E56A0] transition-all">
                    <div>
                      <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400 mb-1">
                        <span>Publié le : {a.published_at}</span>
                      </div>
                      <h4 className="font-bold text-[18px] text-[#0A2540] mb-2">{a.title}</h4>
                      <p className="text-[13px] text-slate-600 line-clamp-2">{a.content}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteArticle(a.id)}
                      className="text-red-600 hover:text-red-800 font-bold uppercase text-[11px] shrink-0 self-start sm:self-center flex items-center gap-1 hover:underline"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Supprimer</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: USERS MANAGEMENT */}
          {activeTab === "users" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
                <div>
                  <h2 className="font-display font-bold text-[24px] text-[#0A2540]">Gestion des Utilisateurs ({users.length})</h2>
                  <p className="text-[14px] text-slate-600 mt-1">Comptes administrateurs ayant accès à cette console d'administration.</p>
                </div>
                <button
                  onClick={() => setShowAddUser(!showAddUser)}
                  className="px-5 py-2.5 bg-[#0A2540] hover:bg-[#1E56A0] text-white font-bold text-[13px] uppercase tracking-wider flex items-center gap-2 rounded-lg transition-all shadow-md shrink-0"
                >
                  {showAddUser ? <X className="w-4 h-4" /> : <UserPlus className="w-4 h-4 text-[#00C2FF]" />}
                  <span>{showAddUser ? "Fermer" : "Créer un Utilisateur"}</span>
                </button>
              </div>

              {showAddUser && (
                <form onSubmit={handleAddUser} className="bg-white border border-slate-200 p-6 rounded-xl shadow-lg space-y-4">
                  <h3 className="font-bold text-[16px] text-[#0A2540] flex items-center gap-2">
                    <UserPlus className="w-5 h-5 text-[#1E56A0]" /> Nouveau Compte Administrateur
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      required
                      placeholder="Nom complet (ex: Paul Camara)"
                      value={newUser.name}
                      onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                      className="w-full p-3 bg-slate-50 border border-slate-300 text-[#0A2540] outline-none focus:border-[#1E56A0] rounded-lg"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Email (ex: paul.camara@bestbuilders.gn)"
                      value={newUser.email}
                      onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                      className="w-full p-3 bg-slate-50 border border-slate-300 text-[#0A2540] outline-none focus:border-[#1E56A0] rounded-lg"
                    />
                  </div>
                  <button type="submit" className="px-6 py-3 bg-[#0A2540] text-white font-bold text-[13px] uppercase tracking-wider rounded-lg hover:bg-[#1E56A0] transition-colors shadow-md">
                    Ajouter l'utilisateur
                  </button>
                </form>
              )}

              <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
                <table className="w-full text-left text-[14px]">
                  <thead className="bg-slate-50 border-b border-slate-200 text-[11px] font-mono uppercase text-slate-500">
                    <tr>
                      <th className="py-4 px-6">Utilisateur</th>
                      <th className="py-4 px-6">Rôle</th>
                      <th className="py-4 px-6">Statut</th>
                      <th className="py-4 px-6 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {users.map((u) => (
                      <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 bg-gradient-to-br from-[#0A2540] to-[#1E56A0] text-white flex items-center justify-center font-bold rounded-full shadow-xs">
                              {u.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-bold text-[#0A2540]">{u.name}</p>
                              <p className="text-[12px] text-slate-500 font-mono">{u.email}</p>
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
                            className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
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

          {/* TAB: SETTINGS */}
          {activeTab === "settings" && (
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-6">
                <h2 className="font-display font-bold text-[24px] text-[#0A2540]">Paramètres Généraux du Site</h2>
                <p className="text-[14px] text-slate-600 mt-1">Coordonnées et informations institutionnelles de Best Builders SARLU.</p>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); triggerSuccess("Paramètres du site enregistrés."); }} className="bg-white border border-slate-200 p-8 rounded-xl shadow-xs space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-[#0A2540] font-bold mb-2">Nom de la Société</label>
                    <input
                      type="text"
                      defaultValue={settings.company_name}
                      className="w-full p-3.5 bg-slate-50 border border-slate-300 text-[#0A2540] font-medium outline-none focus:border-[#1E56A0] rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-[#0A2540] font-bold mb-2">Téléphone Principal</label>
                    <input
                      type="text"
                      defaultValue={settings.phone}
                      className="w-full p-3.5 bg-slate-50 border border-slate-300 text-[#0A2540] font-medium outline-none focus:border-[#1E56A0] rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-[#0A2540] font-bold mb-2">Adresse Email Officielle</label>
                    <input
                      type="email"
                      defaultValue={settings.email}
                      className="w-full p-3.5 bg-slate-50 border border-slate-300 text-[#0A2540] font-medium outline-none focus:border-[#1E56A0] rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-[#0A2540] font-bold mb-2">Localisation du Siège</label>
                    <input
                      type="text"
                      defaultValue={settings.address}
                      className="w-full p-3.5 bg-slate-50 border border-slate-300 text-[#0A2540] font-medium outline-none focus:border-[#1E56A0] rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-[#0A2540] font-bold mb-2">Présentation Institutionnelle</label>
                  <textarea
                    rows={4}
                    defaultValue={settings.about_text}
                    className="w-full p-3.5 bg-slate-50 border border-slate-300 text-[#0A2540] font-medium outline-none focus:border-[#1E56A0] rounded-lg"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="px-8 py-3.5 bg-[#0A2540] text-white font-bold text-[13px] uppercase tracking-wider rounded-lg hover:bg-[#1E56A0] transition-colors shadow-md"
                >
                  Enregistrer les modifications
                </button>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
