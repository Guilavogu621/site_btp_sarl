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
  Building2,
  Upload,
  Image as ImageIcon,
  Pencil,
  Wrench
} from "lucide-react";
import LoginScreen from "@/components/LoginScreen";
import {
  initialProjects,
  initialArticles,
  initialContactMessages,
  initialServices,
  initialSiteSettings,
  initialEquipments,
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  getArticles,
  createArticle,
  updateArticle,
  deleteArticle,
  getContactMessages,
  getEquipments,
  createEquipment,
  updateEquipment,
  deleteEquipment
} from "@/lib/data";
import { sanitizeText } from "@/lib/security";
import { supabase } from "@/lib/supabase";

export default function DashboardPage() {

  // Authentication State with Persistence
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [currentUserEmail, setCurrentUserEmail] = useState("bestbuilders@gmail.com");

  const [currentUserRole, setCurrentUserRole] = useState("super_admin");
  const [currentFullName, setCurrentFullName] = useState("Super Admin");

  // User Management State
  const [users, setUsers] = useState([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "", role: "admin" });
  const [userError, setUserError] = useState("");
  const [isSubmittingUser, setIsSubmittingUser] = useState(false);

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

  // Edit states for projects
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [editingProject, setEditingProject] = useState(null);

  const [showAddArticle, setShowAddArticle] = useState(false);
  const [newArticle, setNewArticle] = useState({
    title: "",
    content: "",
    image: "/img/logo.png",
    published_at: new Date().toISOString().split("T")[0]
  });

  // Edit states for articles
  const [editingArticleId, setEditingArticleId] = useState(null);
  const [editingArticle, setEditingArticle] = useState(null);

  // Equipments state
  const [equipments, setEquipments] = useState(initialEquipments);
  const [showAddEquipment, setShowAddEquipment] = useState(false);
  const [newEquipment, setNewEquipment] = useState({
    title: "",
    category: "Engins lourds",
    type: "both",
    price_sale: "145 000 000 GNF",
    price_rent: "3 500 000 GNF / Jour",
    condition: "Neuf",
    brand: "Caterpillar",
    model: "CAT 320",
    specs: "",
    image: "/img/showcase/tour-grue-ciel.webp"
  });
  const [editingEquipmentId, setEditingEquipmentId] = useState(null);
  const [editingEquipment, setEditingEquipment] = useState(null);

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("Modifications enregistrées avec succès !");

  // Synchroniser la session et charger les données Supabase (100% Supabase Auth Native)
  useEffect(() => {
    let isMounted = true;

    async function checkSupabaseSession() {
      try {
        if (supabase) {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user && isMounted) {
            setIsAuthenticated(true);
            setCurrentUserEmail(session.user.email);
            const userRole = session.user.user_metadata?.role || "admin";
            setCurrentUserRole(userRole);
            setCurrentFullName(session.user.user_metadata?.full_name || "Administrateur");
          } else if (isMounted) {
            setIsAuthenticated(false);
          }
        }
      } catch (e) {
        if (isMounted) setIsAuthenticated(false);
      } finally {
        if (isMounted) setIsCheckingAuth(false);
      }
    }

    checkSupabaseSession();

    let subscription;
    if (supabase) {
      const res = supabase.auth.onAuthStateChange((_event, session) => {
        if (!isMounted) return;
        if (session?.user) {
          setIsAuthenticated(true);
          setCurrentUserEmail(session.user.email);
          const userRole = session.user.user_metadata?.role || "admin";
          setCurrentUserRole(userRole);
          setCurrentFullName(session.user.user_metadata?.full_name || "Administrateur");
        } else {
          setIsAuthenticated(false);
        }
      });
      subscription = res.data.subscription;
    }


    refreshData();
    fetchUsers();

    const handleUpdate = () => refreshData();
    window.addEventListener("messages_updated", handleUpdate);
    window.addEventListener("projects_updated", handleUpdate);
    window.addEventListener("articles_updated", handleUpdate);
    window.addEventListener("equipments_updated", handleUpdate);

    return () => {
      isMounted = false;
      if (subscription) subscription.unsubscribe();
      window.removeEventListener("messages_updated", handleUpdate);
      window.removeEventListener("projects_updated", handleUpdate);
      window.removeEventListener("articles_updated", handleUpdate);
      window.removeEventListener("equipments_updated", handleUpdate);
    };
  }, []);

  const fetchUsers = async () => {
    setIsLoadingUsers(true);
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      if (res.ok && data.users) {
        setUsers(data.users);
      }
    } catch (e) {
      // Gérer l'erreur silencieusement
    } finally {
      setIsLoadingUsers(false);
    }
  };

  const refreshData = async () => {
    setIsLoadingData(true);
    try {
      const [fetchedArticles, fetchedProjects, fetchedMessages, fetchedEquipments] = await Promise.all([
        getArticles(),
        getProjects(),
        getContactMessages(),
        getEquipments()
      ]);
      if (fetchedArticles && fetchedArticles.length > 0) setArticles(fetchedArticles);
      if (fetchedProjects && fetchedProjects.length > 0) setProjects(fetchedProjects);
      if (fetchedMessages && fetchedMessages.length > 0) setMessages(fetchedMessages);
      if (fetchedEquipments && fetchedEquipments.length > 0) setEquipments(fetchedEquipments);
    } catch (err) {
      // Gérer l'erreur silencieusement
    } finally {
      setIsLoadingData(false);
    }
  };

  const handleLogin = (userData) => {
    const email = typeof userData === "string" ? userData : userData?.email;
    const role = userData?.role || "admin";
    const fullName = userData?.full_name || userData?.fullName || "Administrateur";

    if (email) setCurrentUserEmail(email);
    setCurrentUserRole(role);
    setCurrentFullName(fullName);
    setIsAuthenticated(true);
    fetchUsers();
  };

  const handleLogout = async () => {
    setIsAuthenticated(false);
    if (supabase) {
      await supabase.auth.signOut();
    }
  };


  const handleAddUser = async (e) => {
    e.preventDefault();
    setUserError("");
    if (!newUser.email || !newUser.name || !newUser.password) {
      setUserError("Veuillez remplir tous les champs (Nom, Email, Mot de passe).");
      return;
    }

    setIsSubmittingUser(true);
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: newUser.name,
          email: newUser.email,
          password: newUser.password,
          role: newUser.role,
          creatorEmail: currentUserEmail,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setUserError(data.error || "Erreur lors de la création de l'utilisateur.");
        return;
      }

      triggerSuccess(`Utilisateur ${newUser.email} créé dans Supabase !`);
      setShowAddUser(false);
      setNewUser({ name: "", email: "", password: "", role: "admin" });
      fetchUsers();
    } catch (err) {
      setUserError("Erreur de connexion au serveur.");
    } finally {
      setIsSubmittingUser(false);
    }
  };

  const handleDeleteUser = async (userObj) => {
    if (userObj.role === "super_admin" && userObj.email.toLowerCase() === (process.env.NEXT_PUBLIC_ADMIN_EMAIL || "bestbuilders@gmail.com").toLowerCase()) {
      alert("Impossible de supprimer le Super Admin principal du système !");
      return;
    }

    if (confirm(`Voulez-vous vraiment supprimer l'utilisateur ${userObj.email} ?`)) {
      try {
        const res = await fetch(`/api/admin/users?id=${userObj.id}&email=${encodeURIComponent(userObj.email)}`, {
          method: "DELETE",
        });
        const data = await res.json();
        if (!res.ok) {
          alert(data.error || "Erreur lors de la suppression.");
          return;
        }
        triggerSuccess("Utilisateur supprimé de la base de données.");
        fetchUsers();
      } catch (err) {
        alert("Erreur lors de la suppression de l'utilisateur.");
      }
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

  const handleEditProject = (project) => {
    setEditingProjectId(project.id);
    setEditingProject({ ...project });
    setShowAddProject(false);
  };

  const handleUpdateProject = async (e) => {
    e.preventDefault();
    const payload = {
      title: sanitizeText(editingProject.title),
      category: editingProject.category,
      description: sanitizeText(editingProject.description),
      location: sanitizeText(editingProject.location),
      surface: sanitizeText(editingProject.surface),
      duration: sanitizeText(editingProject.duration),
      photo_before: editingProject.photo_before || "/img/logo.png"
    };
    const updated = await updateProject(editingProjectId, payload);
    setProjects((prev) => prev.map((p) => (p.id === editingProjectId ? { ...p, ...updated } : p)));
    setEditingProjectId(null);
    setEditingProject(null);
    triggerSuccess("Projet mis à jour avec succès !");
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

  const handleEditArticle = (article) => {
    setEditingArticleId(article.id);
    setEditingArticle({ ...article });
    setShowAddArticle(false);
  };

  const handleUpdateArticle = async (e) => {
    e.preventDefault();
    const payload = {
      title: sanitizeText(editingArticle.title),
      content: sanitizeText(editingArticle.content),
      image: editingArticle.image || "/img/logo.png",
      published_at: editingArticle.published_at
    };
    const updated = await updateArticle(editingArticleId, payload);
    setArticles((prev) => prev.map((a) => (a.id === editingArticleId ? { ...a, ...updated } : a)));
    setEditingArticleId(null);
    setEditingArticle(null);
    triggerSuccess("Article mis à jour avec succès !");
  };

  const handleAddEquipment = async (e) => {
    e.preventDefault();
    const equipmentPayload = {
      title: sanitizeText(newEquipment.title),
      category: newEquipment.category,
      type: newEquipment.type,
      price_sale: sanitizeText(newEquipment.price_sale),
      price_rent: sanitizeText(newEquipment.price_rent),
      condition: newEquipment.condition,
      brand: sanitizeText(newEquipment.brand),
      model: sanitizeText(newEquipment.model),
      specs: sanitizeText(newEquipment.specs),
      image: newEquipment.image || "/img/showcase/tour-grue-ciel.webp",
      slug: newEquipment.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")
    };

    const created = await createEquipment(equipmentPayload);
    setEquipments((prev) => [created, ...prev.filter((eq) => eq.id !== created.id)]);
    setShowAddEquipment(false);
    setNewEquipment({
      title: "",
      category: "Engins lourds",
      type: "both",
      price_sale: "145 000 000 GNF",
      price_rent: "3 500 000 GNF / Jour",
      condition: "Neuf",
      brand: "Caterpillar",
      model: "CAT 320",
      specs: "",
      image: "/img/showcase/tour-grue-ciel.webp"
    });
    triggerSuccess("Équipement publié avec succès dans le catalogue !");
  };

  const handleDeleteEquipment = async (id) => {
    if (confirm("Voulez-vous supprimer cet équipement du catalogue ?")) {
      await deleteEquipment(id);
      setEquipments((prev) => prev.filter((eq) => eq.id !== id));
      triggerSuccess("Équipement supprimé.");
    }
  };

  const handleEditEquipment = (item) => {
    setEditingEquipmentId(item.id);
    setEditingEquipment({ ...item });
    setShowAddEquipment(false);
  };

  const handleUpdateEquipment = async (e) => {
    e.preventDefault();
    const payload = {
      title: sanitizeText(editingEquipment.title),
      category: editingEquipment.category,
      type: editingEquipment.type,
      price_sale: sanitizeText(editingEquipment.price_sale),
      price_rent: sanitizeText(editingEquipment.price_rent),
      condition: editingEquipment.condition,
      brand: sanitizeText(editingEquipment.brand),
      model: sanitizeText(editingEquipment.model),
      specs: sanitizeText(editingEquipment.specs),
      image: editingEquipment.image || "/img/showcase/tour-grue-ciel.webp"
    };
    const updated = await updateEquipment(editingEquipmentId, payload);
    setEquipments((prev) => prev.map((eq) => (eq.id === editingEquipmentId ? { ...eq, ...updated } : eq)));
    setEditingEquipmentId(null);
    setEditingEquipment(null);
    triggerSuccess("Équipement mis à jour avec succès !");
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

  const handleImageFileChange = (e, callback) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("La taille de la photo ne doit pas dépasser 5 Mo.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        callback(reader.result);
      };
      reader.readAsDataURL(file);
    }
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

  const filteredEquipments = equipments.filter((eq) =>
    (eq.title + eq.category + (eq.brand || "") + (eq.model || "") + eq.specs)
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
              <div className="flex items-center gap-1.5">
                <p className="text-[13px] font-bold text-white leading-tight">{currentFullName}</p>
                <span className={`text-[9px] font-mono px-1.5 py-0.2 uppercase font-bold rounded-xs ${currentUserRole === 'super_admin' ? 'bg-[#00C2FF] text-[#000F22]' : currentUserRole === 'admin' ? 'bg-[#1E56A0] text-white' : 'bg-slate-700 text-slate-200'}`}>
                  {currentUserRole === 'super_admin' ? 'PDG' : currentUserRole === 'admin' ? 'Admin' : 'Éditeur'}
                </span>
              </div>
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
                onClick={() => setActiveTab("equipments")}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-lg font-medium text-[13px] transition-all text-left ${
                  activeTab === "equipments"
                    ? "bg-[#1E56A0] text-white font-bold shadow-lg border border-[#00C2FF]/30"
                    : "text-slate-300 hover:bg-[#0F3854] hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Wrench className={`w-4 h-4 ${activeTab === "equipments" ? "text-[#00C2FF]" : "text-slate-400"}`} />
                  <span>Équipements &amp; Engins</span>
                </div>
                <span className="text-[11px] font-mono text-slate-400">{equipments.length}</span>
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
                      <p className="text-[11px] font-mono uppercase text-slate-500 font-semibold tracking-wider">Équipements &amp; Engins</p>
                      <h3 className="text-[32px] font-bold text-[#0A2540] mt-1">{equipments.length}</h3>
                    </div>
                    <div className="w-12 h-12 bg-[#0A2540]/5 border border-[#1E56A0]/20 text-[#1E56A0] flex items-center justify-center rounded-xl group-hover:scale-110 transition-transform">
                      <Wrench className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[12px]">
                    <span className="text-emerald-600 font-medium">Catalogue actif</span>
                    <button onClick={() => setActiveTab("equipments")} className="text-[#1E56A0] font-semibold hover:underline">Catalogue →</button>
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
                  onClick={() => { setActiveTab("equipments"); setShowAddEquipment(true); }}
                  className="px-5 py-3 bg-[#0F3854] hover:bg-[#1E56A0] text-white font-bold text-[13px] uppercase tracking-wider flex items-center gap-2.5 rounded-lg transition-all shadow-md"
                >
                  <Wrench className="w-4 h-4 text-[#00C2FF]" />
                  <span>Ajouter un engin / matériel</span>
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
                  
                  {/* Photo Selection / Upload Field for Project */}
                  <div>
                    <label className="block text-[12px] font-bold uppercase tracking-wider text-[#0A2540] mb-2 flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-[#1E56A0]" /> Photo / Illustration du projet
                    </label>
                    <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-50 p-4 border border-slate-300 rounded-lg">
                      <label className="cursor-pointer px-4 py-2.5 bg-[#0A2540] hover:bg-[#1E56A0] text-white text-[12px] font-bold uppercase tracking-wider rounded-md flex items-center gap-2 transition-colors shrink-0">
                        <Upload className="w-4 h-4 text-[#00C2FF]" />
                        <span>Choisir une photo (Ordinateur / Téléphone)</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleImageFileChange(e, (base64) => setNewProject({ ...newProject, photo_before: base64 }))}
                        />
                      </label>
                      <span className="text-[12px] text-slate-400 font-mono">ou</span>
                      <input
                        type="text"
                        placeholder="Lien / URL d'image (ex: /img/logo.png)"
                        value={newProject.photo_before}
                        onChange={(e) => setNewProject({ ...newProject, photo_before: e.target.value })}
                        className="flex-1 w-full p-2.5 bg-white border border-slate-200 text-[#0A2540] text-[13px] outline-none focus:border-[#1E56A0] rounded-md"
                      />
                    </div>
                    {newProject.photo_before && (
                      <div className="mt-3 flex items-center gap-3 bg-slate-100 p-2.5 rounded-lg border border-slate-200">
                        <img src={newProject.photo_before} alt="Aperçu" className="h-16 w-24 object-cover rounded-md border border-slate-300 bg-white" />
                        <div className="text-[12px]">
                          <p className="font-bold text-[#0A2540]">Aperçu de la photo du projet</p>
                          <button
                            type="button"
                            onClick={() => setNewProject({ ...newProject, photo_before: "/img/logo.png" })}
                            className="text-red-500 hover:underline text-[11px] mt-0.5"
                          >
                            Réinitialiser
                          </button>
                        </div>
                      </div>
                    )}
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
                    Publier le projet
                  </button>
                </form>
              )}

              <div className="grid sm:grid-cols-2 gap-6">
                {filteredProjects.map((p) => (
                  <div key={p.id} className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden hover:border-[#1E56A0] transition-all group">
                    {/* Inline edit form for this project */}
                    {editingProjectId === p.id && editingProject ? (
                      <form onSubmit={handleUpdateProject} className="p-5 space-y-3 bg-[#F1F5F9] border-b border-[#1E56A0]/30">
                        <p className="text-[12px] font-bold uppercase text-[#1E56A0] tracking-wider flex items-center gap-1.5 mb-3">
                          <Pencil className="w-3.5 h-3.5" /> Modifier le projet
                        </p>
                        <input
                          type="text"
                          required
                          value={editingProject.title}
                          onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                          placeholder="Titre"
                          className="w-full p-2.5 bg-white border border-slate-300 text-[#0A2540] text-[13px] outline-none focus:border-[#1E56A0] rounded-lg"
                        />
                        <div className="grid grid-cols-2 gap-3">
                          <input
                            type="text"
                            value={editingProject.location}
                            onChange={(e) => setEditingProject({ ...editingProject, location: e.target.value })}
                            placeholder="Localisation"
                            className="p-2.5 bg-white border border-slate-300 text-[#0A2540] text-[13px] outline-none focus:border-[#1E56A0] rounded-lg"
                          />
                          <input
                            type="text"
                            value={editingProject.surface}
                            onChange={(e) => setEditingProject({ ...editingProject, surface: e.target.value })}
                            placeholder="Surface"
                            className="p-2.5 bg-white border border-slate-300 text-[#0A2540] text-[13px] outline-none focus:border-[#1E56A0] rounded-lg"
                          />
                        </div>
                        <textarea
                          rows={3}
                          value={editingProject.description}
                          onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                          placeholder="Description"
                          className="w-full p-2.5 bg-white border border-slate-300 text-[#0A2540] text-[13px] outline-none focus:border-[#1E56A0] rounded-lg"
                        ></textarea>

                        {/* Photo uploader in edit mode */}
                        <div className="flex flex-col sm:flex-row items-center gap-3">
                          <label className="cursor-pointer px-3 py-2 bg-[#0A2540] hover:bg-[#1E56A0] text-white text-[11px] font-bold uppercase tracking-wider rounded-md flex items-center gap-1.5 shrink-0">
                            <Upload className="w-3.5 h-3.5 text-[#00C2FF]" />
                            <span>Changer la photo</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleImageFileChange(e, (b64) => setEditingProject({ ...editingProject, photo_before: b64 }))}
                            />
                          </label>
                          {editingProject.photo_before && (
                            <img src={editingProject.photo_before} alt="Aperçu" className="h-12 w-16 object-cover rounded-md border border-slate-300 bg-white" />
                          )}
                        </div>

                        <div className="flex items-center gap-2 pt-1">
                          <button type="submit" className="px-4 py-2 bg-[#0A2540] hover:bg-[#1E56A0] text-white text-[12px] font-bold uppercase tracking-wider rounded-lg transition-colors">
                            Enregistrer
                          </button>
                          <button
                            type="button"
                            onClick={() => { setEditingProjectId(null); setEditingProject(null); }}
                            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-[#0A2540] text-[12px] font-bold uppercase tracking-wider rounded-lg transition-colors"
                          >
                            Annuler
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div className="p-5">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[11px] font-mono bg-[#0A2540]/10 text-[#0A2540] px-2.5 py-0.5 font-bold uppercase rounded-xs">
                            {p.category}
                          </span>
                          <span className="text-[12px] text-slate-500 font-semibold">{p.location}</span>
                        </div>
                        <div className="flex gap-4 mb-3">
                          {p.photo_before && (
                            <img src={p.photo_before} alt={p.title} className="w-16 h-16 object-cover rounded-lg border border-slate-200 shrink-0 bg-slate-50" />
                          )}
                          <div>
                            <h4 className="font-bold text-[17px] text-[#0A2540] group-hover:text-[#1E56A0] transition-colors">{p.title}</h4>
                            <p className="text-[13px] text-slate-600 line-clamp-2 mt-1">{p.description}</p>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="px-5 pb-5 pt-0 border-t border-slate-100 flex items-center justify-between text-[12px] text-slate-500">
                      <span className="font-medium">Surface : {p.surface}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEditProject(p)}
                          className="text-[#1E56A0] hover:text-[#0A2540] font-bold uppercase text-[11px] flex items-center gap-1 hover:underline"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                          <span>Modifier</span>
                        </button>
                        <span className="text-slate-300">|</span>
                        <button
                          onClick={() => handleDeleteProject(p.id)}
                          className="text-red-600 hover:text-red-800 font-bold uppercase text-[11px] flex items-center gap-1 hover:underline"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Supprimer</span>
                        </button>
                      </div>
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
                  <p className="text-[14px] text-slate-600 mt-1">Gérez les actualités techniques et la publication d'articles sur le site web.</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={() => setShowAddArticle(!showAddArticle)}
                    className="px-4 py-2.5 bg-[#0A2540] hover:bg-[#1E56A0] text-white font-bold text-[12px] uppercase tracking-wider flex items-center gap-2 rounded-lg transition-all shadow-md"
                  >
                    {showAddArticle ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4 text-[#00C2FF]" />}
                    <span>{showAddArticle ? "Fermer" : "Nouvel Article"}</span>
                  </button>
                </div>
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
                  
                  {/* Photo Selection / Upload Field for Article */}
                  <div>
                    <label className="block text-[12px] font-bold uppercase tracking-wider text-[#0A2540] mb-2 flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-[#1E56A0]" /> Image / Photo de l'article
                    </label>
                    <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-50 p-4 border border-slate-300 rounded-lg">
                      <label className="cursor-pointer px-4 py-2.5 bg-[#0A2540] hover:bg-[#1E56A0] text-white text-[12px] font-bold uppercase tracking-wider rounded-md flex items-center gap-2 transition-colors shrink-0">
                        <Upload className="w-4 h-4 text-[#00C2FF]" />
                        <span>Choisir une photo (Ordinateur / Téléphone)</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleImageFileChange(e, (base64) => setNewArticle({ ...newArticle, image: base64 }))}
                        />
                      </label>
                      <span className="text-[12px] text-slate-400 font-mono">ou</span>
                      <input
                        type="text"
                        placeholder="Lien / URL d'image (ex: /img/logo.png)"
                        value={newArticle.image}
                        onChange={(e) => setNewArticle({ ...newArticle, image: e.target.value })}
                        className="flex-1 w-full p-2.5 bg-white border border-slate-200 text-[#0A2540] text-[13px] outline-none focus:border-[#1E56A0] rounded-md"
                      />
                    </div>
                    {newArticle.image && (
                      <div className="mt-3 flex items-center gap-3 bg-slate-100 p-2.5 rounded-lg border border-slate-200">
                        <img src={newArticle.image} alt="Aperçu" className="h-16 w-24 object-cover rounded-md border border-slate-300 bg-white" />
                        <div className="text-[12px]">
                          <p className="font-bold text-[#0A2540]">Aperçu de la photo sélectionnée</p>
                          <button
                            type="button"
                            onClick={() => setNewArticle({ ...newArticle, image: "/img/logo.png" })}
                            className="text-red-500 hover:underline text-[11px] mt-0.5"
                          >
                            Réinitialiser
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  <textarea
                    required
                    rows={5}
                    placeholder="Contenu complet de la publication..."
                    value={newArticle.content}
                    onChange={(e) => setNewArticle({ ...newArticle, content: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-300 text-[#0A2540] outline-none focus:border-[#1E56A0] rounded-lg"
                  ></textarea>
                  <button type="submit" className="px-6 py-3 bg-[#0A2540] text-white font-bold text-[13px] uppercase tracking-wider rounded-lg hover:bg-[#1E56A0] transition-colors shadow-md">
                    Publier l'article sur le site web
                  </button>
                </form>
              )}

              <div className="space-y-4">
                {filteredArticles.map((a) => (
                  <div key={a.id} className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden hover:border-[#1E56A0] transition-all">
                    {/* Inline edit form for this article */}
                    {editingArticleId === a.id && editingArticle ? (
                      <form onSubmit={handleUpdateArticle} className="p-6 space-y-4 bg-[#F1F5F9] border-b border-[#1E56A0]/30">
                        <p className="text-[12px] font-bold uppercase text-[#1E56A0] tracking-wider flex items-center gap-1.5 mb-3">
                          <Pencil className="w-3.5 h-3.5" /> Modifier l'article
                        </p>
                        <input
                          type="text"
                          required
                          value={editingArticle.title}
                          onChange={(e) => setEditingArticle({ ...editingArticle, title: e.target.value })}
                          placeholder="Titre de l'article"
                          className="w-full p-3 bg-white border border-slate-300 text-[#0A2540] text-[13px] outline-none focus:border-[#1E56A0] rounded-lg"
                        />
                        <div className="flex flex-col sm:flex-row items-center gap-3">
                          <label className="cursor-pointer px-3 py-2 bg-[#0A2540] hover:bg-[#1E56A0] text-white text-[11px] font-bold uppercase tracking-wider rounded-md flex items-center gap-1.5 shrink-0">
                            <Upload className="w-3.5 h-3.5 text-[#00C2FF]" />
                            <span>Changer la photo</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleImageFileChange(e, (b64) => setEditingArticle({ ...editingArticle, image: b64 }))}
                            />
                          </label>
                          {editingArticle.image && (
                            <img src={editingArticle.image} alt="Aperçu" className="h-12 w-16 object-cover rounded-md border border-slate-300 bg-white" />
                          )}
                        </div>
                        <textarea
                          rows={5}
                          required
                          value={editingArticle.content}
                          onChange={(e) => setEditingArticle({ ...editingArticle, content: e.target.value })}
                          placeholder="Contenu de l'article..."
                          className="w-full p-3 bg-white border border-slate-300 text-[#0A2540] text-[13px] outline-none focus:border-[#1E56A0] rounded-lg"
                        ></textarea>
                        <div className="flex items-center gap-2">
                          <button type="submit" className="px-4 py-2 bg-[#0A2540] hover:bg-[#1E56A0] text-white text-[12px] font-bold uppercase tracking-wider rounded-lg transition-colors">
                            Enregistrer
                          </button>
                          <button
                            type="button"
                            onClick={() => { setEditingArticleId(null); setEditingArticle(null); }}
                            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-[#0A2540] text-[12px] font-bold uppercase tracking-wider rounded-lg transition-colors"
                          >
                            Annuler
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                          {a.image && (
                            <img src={a.image} alt={a.title} className="w-20 h-20 object-cover rounded-lg border border-slate-200 shrink-0 bg-slate-50 mt-1" />
                          )}
                          <div>
                            <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400 mb-1">
                              <span>Publié le : {a.published_at}</span>
                            </div>
                            <h4 className="font-bold text-[18px] text-[#0A2540] mb-2">{a.title}</h4>
                            <p className="text-[13px] text-slate-600 line-clamp-2">{a.content}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
                          <button
                            onClick={() => handleEditArticle(a)}
                            className="text-[#1E56A0] hover:text-[#0A2540] font-bold uppercase text-[11px] flex items-center gap-1 hover:underline"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                            <span>Modifier</span>
                          </button>
                          <span className="text-slate-300">|</span>
                          <button
                            onClick={() => handleDeleteArticle(a.id)}
                            className="text-red-600 hover:text-red-800 font-bold uppercase text-[11px] flex items-center gap-1 hover:underline"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span>Supprimer</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: EQUIPMENTS & MACHINERY MANAGEMENT */}
          {activeTab === "equipments" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
                <div>
                  <h2 className="font-display font-bold text-[24px] text-[#0A2540]">
                    Catalogue Équipements &amp; Engins ({filteredEquipments.length})
                  </h2>
                  <p className="text-[14px] text-slate-600 mt-1">
                    Gestion du matériel et des engins BTP disponibles à la vente et à la location.
                  </p>
                </div>
                <button
                  onClick={() => setShowAddEquipment(!showAddEquipment)}
                  className="px-5 py-2.5 bg-[#0A2540] hover:bg-[#1E56A0] text-white font-bold text-[13px] uppercase tracking-wider flex items-center gap-2 rounded-lg transition-all shadow-md shrink-0"
                >
                  {showAddEquipment ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4 text-[#00C2FF]" />}
                  <span>{showAddEquipment ? "Fermer" : "Ajouter un Matériel"}</span>
                </button>
              </div>

              {/* FORMULAIRE NOUVEL ÉQUIPEMENT */}
              {showAddEquipment && (
                <form onSubmit={handleAddEquipment} className="bg-white border border-slate-200 p-6 rounded-xl shadow-lg space-y-4">
                  <h3 className="font-bold text-[16px] text-[#0A2540] flex items-center gap-2">
                    <Wrench className="w-5 h-5 text-[#1E56A0]" /> Publier un Nouvel Équipement / Engin
                  </h3>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono uppercase text-[#0A2540] font-bold mb-1.5">Titre du Matériel</label>
                      <input
                        type="text"
                        required
                        placeholder="ex: Pelle Hydraulique Caterpillar CAT 320"
                        value={newEquipment.title}
                        onChange={(e) => setNewEquipment({ ...newEquipment, title: e.target.value })}
                        className="w-full p-3 bg-slate-50 border border-slate-300 text-[#0A2540] outline-none focus:border-[#1E56A0] rounded-lg text-[13px]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono uppercase text-[#0A2540] font-bold mb-1.5">Catégorie</label>
                      <select
                        value={newEquipment.category}
                        onChange={(e) => setNewEquipment({ ...newEquipment, category: e.target.value })}
                        className="w-full p-3 bg-slate-50 border border-slate-300 text-[#0A2540] outline-none focus:border-[#1E56A0] rounded-lg text-[13px]"
                      >
                        <option value="Engins lourds">Engins lourds</option>
                        <option value="Groupe électrogène">Groupe électrogène</option>
                        <option value="Coffrage & Échafaudage">Coffrage & Échafaudage</option>
                        <option value="Transport">Transport (Camion, Remorque)</option>
                        <option value="Outillage">Outillage & Électromécanique</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono uppercase text-[#0A2540] font-bold mb-1.5">Modalité de Transaction</label>
                      <select
                        value={newEquipment.type}
                        onChange={(e) => setNewEquipment({ ...newEquipment, type: e.target.value })}
                        className="w-full p-3 bg-slate-50 border border-slate-300 text-[#0A2540] outline-none focus:border-[#1E56A0] rounded-lg text-[13px]"
                      >
                        <option value="both">Vente &amp; Location</option>
                        <option value="rent">Location Seule</option>
                        <option value="sale">Vente Seule</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono uppercase text-[#0A2540] font-bold mb-1.5">État</label>
                      <select
                        value={newEquipment.condition}
                        onChange={(e) => setNewEquipment({ ...newEquipment, condition: e.target.value })}
                        className="w-full p-3 bg-slate-50 border border-slate-300 text-[#0A2540] outline-none focus:border-[#1E56A0] rounded-lg text-[13px]"
                      >
                        <option value="Neuf">Neuf</option>
                        <option value="Excellent état">Excellent état</option>
                        <option value="Occasion certifiée">Occasion certifiée</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono uppercase text-[#0A2540] font-bold mb-1.5">Prix de Vente (facultatif)</label>
                      <input
                        type="text"
                        placeholder="ex: 145 000 000 GNF"
                        value={newEquipment.price_sale}
                        onChange={(e) => setNewEquipment({ ...newEquipment, price_sale: e.target.value })}
                        className="w-full p-3 bg-slate-50 border border-slate-300 text-[#0A2540] outline-none focus:border-[#1E56A0] rounded-lg text-[13px]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono uppercase text-[#0A2540] font-bold mb-1.5">Tarif Location (facultatif)</label>
                      <input
                        type="text"
                        placeholder="ex: 3 500 000 GNF / Jour"
                        value={newEquipment.price_rent}
                        onChange={(e) => setNewEquipment({ ...newEquipment, price_rent: e.target.value })}
                        className="w-full p-3 bg-slate-50 border border-slate-300 text-[#0A2540] outline-none focus:border-[#1E56A0] rounded-lg text-[13px]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono uppercase text-[#0A2540] font-bold mb-1.5">Marque</label>
                      <input
                        type="text"
                        placeholder="ex: Caterpillar, Cummins"
                        value={newEquipment.brand}
                        onChange={(e) => setNewEquipment({ ...newEquipment, brand: e.target.value })}
                        className="w-full p-3 bg-slate-50 border border-slate-300 text-[#0A2540] outline-none focus:border-[#1E56A0] rounded-lg text-[13px]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono uppercase text-[#0A2540] font-bold mb-1.5">Modèle</label>
                      <input
                        type="text"
                        placeholder="ex: CAT 320 GC"
                        value={newEquipment.model}
                        onChange={(e) => setNewEquipment({ ...newEquipment, model: e.target.value })}
                        className="w-full p-3 bg-slate-50 border border-slate-300 text-[#0A2540] outline-none focus:border-[#1E56A0] rounded-lg text-[13px]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-[#0A2540] font-bold mb-1.5">Photo de l'Équipement</label>
                    <div className="flex flex-col sm:flex-row items-center gap-3">
                      <label className="cursor-pointer px-4 py-2.5 bg-[#0A2540] hover:bg-[#1E56A0] text-white text-[12px] font-bold uppercase tracking-wider rounded-lg flex items-center gap-2 shrink-0">
                        <Upload className="w-4 h-4 text-[#00C2FF]" />
                        <span>Téléverser une Photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleImageFileChange(e, (b64) => setNewEquipment({ ...newEquipment, image: b64 }))}
                        />
                      </label>
                      <input
                        type="text"
                        placeholder="ou coller l'URL de la photo"
                        value={newEquipment.image}
                        onChange={(e) => setNewEquipment({ ...newEquipment, image: e.target.value })}
                        className="flex-1 w-full p-2.5 bg-white border border-slate-200 text-[#0A2540] text-[13px] outline-none focus:border-[#1E56A0] rounded-md"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-[#0A2540] font-bold mb-1.5">Caractéristiques &amp; Fiche Technique</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Moteur, capacité godet, autonomie, réservoir, accessoires inclus..."
                      value={newEquipment.specs}
                      onChange={(e) => setNewEquipment({ ...newEquipment, specs: e.target.value })}
                      className="w-full p-3 bg-slate-50 border border-slate-300 text-[#0A2540] outline-none focus:border-[#1E56A0] rounded-lg text-[13px]"
                    ></textarea>
                  </div>

                  <button type="submit" className="px-6 py-3 bg-[#0A2540] text-white font-bold text-[13px] uppercase tracking-wider rounded-lg hover:bg-[#1E56A0] transition-colors shadow-md">
                    Publier l'équipement dans le catalogue
                  </button>
                </form>
              )}

              {/* LISTE DES ÉQUIPEMENTS */}
              <div className="space-y-4">
                {filteredEquipments.map((eq) => (
                  <div key={eq.id} className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden hover:border-[#1E56A0] transition-all">
                    {editingEquipmentId === eq.id && editingEquipment ? (
                      <form onSubmit={handleUpdateEquipment} className="p-6 space-y-4 bg-[#F1F5F9] border-b border-[#1E56A0]/30">
                        <p className="text-[12px] font-bold uppercase text-[#1E56A0] tracking-wider flex items-center gap-1.5 mb-3">
                          <Pencil className="w-3.5 h-3.5" /> Modifier la Fiche Matériel
                        </p>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <input
                            type="text"
                            required
                            value={editingEquipment.title}
                            onChange={(e) => setEditingEquipment({ ...editingEquipment, title: e.target.value })}
                            placeholder="Titre du matériel"
                            className="w-full p-3 bg-white border border-slate-300 text-[#0A2540] text-[13px] outline-none focus:border-[#1E56A0] rounded-lg"
                          />
                          <select
                            value={editingEquipment.category}
                            onChange={(e) => setEditingEquipment({ ...editingEquipment, category: e.target.value })}
                            className="w-full p-3 bg-white border border-slate-300 text-[#0A2540] text-[13px] outline-none focus:border-[#1E56A0] rounded-lg"
                          >
                            <option value="Engins lourds">Engins lourds</option>
                            <option value="Groupe électrogène">Groupe électrogène</option>
                            <option value="Coffrage & Échafaudage">Coffrage & Échafaudage</option>
                            <option value="Transport">Transport</option>
                            <option value="Outillage">Outillage</option>
                          </select>
                        </div>
                        <textarea
                          rows={3}
                          required
                          value={editingEquipment.specs}
                          onChange={(e) => setEditingEquipment({ ...editingEquipment, specs: e.target.value })}
                          placeholder="Caractéristiques..."
                          className="w-full p-3 bg-white border border-slate-300 text-[#0A2540] text-[13px] outline-none focus:border-[#1E56A0] rounded-lg"
                        ></textarea>
                        <div className="flex items-center gap-2">
                          <button type="submit" className="px-4 py-2 bg-[#0A2540] hover:bg-[#1E56A0] text-white text-[12px] font-bold uppercase tracking-wider rounded-lg transition-colors">
                            Enregistrer
                          </button>
                          <button
                            type="button"
                            onClick={() => { setEditingEquipmentId(null); setEditingEquipment(null); }}
                            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-[#0A2540] text-[12px] font-bold uppercase tracking-wider rounded-lg transition-colors"
                          >
                            Annuler
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <img
                            src={eq.image || "/img/showcase/tour-grue-ciel.webp"}
                            alt={eq.title}
                            className="w-24 h-24 object-cover rounded-lg border border-slate-200 shrink-0 bg-slate-50 mt-1"
                          />
                          <div>
                            <div className="flex items-center gap-2 text-[11px] font-mono text-[#1E56A0] mb-1 font-bold">
                              <span>{eq.category}</span>
                              <span>•</span>
                              <span className="uppercase text-emerald-700">{eq.type === 'both' ? 'Vente & Location' : eq.type === 'rent' ? 'Location' : 'Vente'}</span>
                            </div>
                            <h4 className="font-bold text-[18px] text-[#0A2540] mb-1">{eq.title}</h4>
                            <p className="text-[13px] text-slate-600 line-clamp-2 mb-2">{eq.specs}</p>
                            <div className="flex flex-wrap gap-4 text-[12px] font-mono text-slate-700">
                              {eq.price_rent && <span>Location: <strong className="text-[#1E56A0]">{eq.price_rent}</strong></span>}
                              {eq.price_sale && <span>Vente: <strong className="text-emerald-700">{eq.price_sale}</strong></span>}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
                          <button
                            onClick={() => handleEditEquipment(eq)}
                            className="text-[#1E56A0] hover:text-[#0A2540] font-bold uppercase text-[11px] flex items-center gap-1 hover:underline"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                            <span>Modifier</span>
                          </button>
                          {currentUserRole !== 'editor' && (
                            <>
                              <span className="text-slate-300">|</span>
                              <button
                                onClick={() => handleDeleteEquipment(eq.id)}
                                className="text-red-600 hover:text-red-800 font-bold uppercase text-[11px] flex items-center gap-1 hover:underline"
                              >
                                <Trash2 className="w-4 h-4" />
                                <span>Supprimer</span>
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    )}
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
                  <div className="flex items-center gap-3">
                    <h2 className="font-display font-bold text-[24px] text-[#0A2540]">Gestion des Utilisateurs Supabase ({users.length})</h2>
                    <span className="bg-emerald-500/10 text-emerald-600 border border-emerald-500/30 text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      Supabase Cloud
                    </span>
                  </div>
                  <p className="text-[14px] text-slate-600 mt-1">
                    Création et gestion des accès administrateurs exécutés directement dans Supabase.
                  </p>
                </div>
                {currentUserRole === "super_admin" && (
                  <button
                    onClick={() => { setShowAddUser(!showAddUser); setUserError(""); }}
                    className="px-5 py-2.5 bg-[#0A2540] hover:bg-[#1E56A0] text-white font-bold text-[13px] uppercase tracking-wider flex items-center gap-2 rounded-lg transition-all shadow-md shrink-0"
                  >
                    {showAddUser ? <X className="w-4 h-4" /> : <UserPlus className="w-4 h-4 text-[#00C2FF]" />}
                    <span>{showAddUser ? "Fermer" : "Créer un Utilisateur"}</span>
                  </button>
                )}
              </div>

              {/* AVERTISSEMENT SI NON SUPER ADMIN */}
              {currentUserRole !== "super_admin" && (
                <div className="bg-amber-500/10 border border-amber-500/30 text-amber-900 p-5 rounded-xl text-[13px] font-medium flex items-start gap-3">
                  <Shield className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-[14px]">Accès Restreint — Mode Lecture</h4>
                    <p className="mt-1 text-slate-700">
                      Seul le <strong>Super Admin</strong> est autorisé à créer de nouveaux utilisateurs et à modifier la base de données Supabase.
                    </p>
                  </div>
                </div>
              )}

              {/* FORMULAIRE DE CRÉATION D'UTILISATEUR (SUPER ADMIN ONLY) */}
              {showAddUser && currentUserRole === "super_admin" && (
                <form onSubmit={handleAddUser} className="bg-white border border-[#1E56A0]/30 p-6 rounded-xl shadow-lg space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h3 className="font-bold text-[16px] text-[#0A2540] flex items-center gap-2">
                      <UserPlus className="w-5 h-5 text-[#1E56A0]" /> Créer un Nouvel Utilisateur Supabase
                    </h3>
                    <span className="text-[11px] font-mono text-slate-500 uppercase">Créateur : {currentUserEmail}</span>
                  </div>

                  {userError && (
                    <div className="bg-red-500/10 border border-red-500/30 text-red-700 p-3.5 rounded-lg text-[13px] font-medium">
                      {userError}
                    </div>
                  )}

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono uppercase text-[#0A2540] font-bold mb-1.5">Nom Complet</label>
                      <input
                        type="text"
                        required
                        placeholder="ex: Mamadou Diallo"
                        value={newUser.name}
                        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                        className="w-full p-3 bg-slate-50 border border-slate-300 text-[#0A2540] outline-none focus:border-[#1E56A0] rounded-lg text-[13px]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono uppercase text-[#0A2540] font-bold mb-1.5">Adresse Email</label>
                      <input
                        type="email"
                        required
                        placeholder="ex: m.diallo@bestbuilders.gn"
                        value={newUser.email}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        className="w-full p-3 bg-slate-50 border border-slate-300 text-[#0A2540] outline-none focus:border-[#1E56A0] rounded-lg text-[13px]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono uppercase text-[#0A2540] font-bold mb-1.5">Mot de Passe Initial</label>
                      <input
                        type="password"
                        required
                        placeholder="••••••••••••"
                        value={newUser.password}
                        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                        className="w-full p-3 bg-slate-50 border border-slate-300 text-[#0A2540] outline-none focus:border-[#1E56A0] rounded-lg text-[13px]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono uppercase text-[#0A2540] font-bold mb-1.5">Rôle d'Accès</label>
                      <select
                        value={newUser.role}
                        onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                        className="w-full p-3 bg-slate-50 border border-slate-300 text-[#0A2540] outline-none focus:border-[#1E56A0] rounded-lg text-[13px]"
                      >
                        <option value="super_admin">PDG / Super Admin (Gestion complète &amp; Utilisateurs)</option>
                        <option value="admin">Administrateur / Directeur (Gestion chantiers &amp; devis)</option>
                        <option value="editor">Éditeur / Agent (Publication chantiers &amp; actualités)</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={isSubmittingUser}
                      className="px-6 py-3 bg-[#0A2540] hover:bg-[#1E56A0] text-white font-bold text-[13px] uppercase tracking-wider rounded-lg transition-colors shadow-md disabled:opacity-60 flex items-center gap-2"
                    >
                      {isSubmittingUser ? (
                        <>
                          <svg className="animate-spin w-4 h-4 text-white" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="31.4" strokeLinecap="round" />
                          </svg>
                          <span>Enregistrement dans Supabase...</span>
                        </>
                      ) : (
                        <>
                          <UserPlus className="w-4 h-4 text-[#00C2FF]" />
                          <span>Enregistrer l'utilisateur dans Supabase</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

              {/* TABLEAU DE LISTE DES UTILISATEURS */}
              <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
                {isLoadingUsers ? (
                  <div className="p-12 text-center text-slate-500 font-mono text-[13px]">
                    Chargement des utilisateurs depuis la base Supabase...
                  </div>
                ) : users.length === 0 ? (
                  <div className="p-12 text-center text-slate-500">
                    Aucun utilisateur trouvé dans la base de données.
                  </div>
                ) : (
                  <table className="w-full text-left text-[14px]">
                    <thead className="bg-slate-50 border-b border-slate-200 text-[11px] font-mono uppercase text-slate-500">
                      <tr>
                        <th className="py-4 px-6">Utilisateur</th>
                        <th className="py-4 px-6">Rôle</th>
                        <th className="py-4 px-6">Statut</th>
                        {currentUserRole === "super_admin" && <th className="py-4 px-6 text-right">Action</th>}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {users.map((u) => {
                        const isSuperAdminRole = u.role === "super_admin";
                        const isAdminRole = u.role === "admin";
                        const nameDisplay = u.full_name || u.name || u.email;
                        return (
                          <tr key={u.id || u.email} className="hover:bg-slate-50 transition-colors">
                            <td className="py-4 px-6">
                              <div className="flex items-center gap-3">
                                <div className={`w-9 h-9 ${isSuperAdminRole ? "bg-gradient-to-br from-[#0A2540] to-[#00C2FF]" : isAdminRole ? "bg-gradient-to-br from-[#0A2540] to-[#1E56A0]" : "bg-gradient-to-br from-[#1E293B] to-[#64748B]"} text-white flex items-center justify-center font-bold rounded-full shadow-xs`}>
                                  {nameDisplay.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                  <p className="font-bold text-[#0A2540]">{nameDisplay}</p>
                                  <p className="text-[12px] text-slate-500 font-mono">{u.email}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-6">
                              {isSuperAdminRole ? (
                                <span className="inline-block px-3 py-1 font-mono text-[11px] font-bold uppercase rounded-xs bg-[#0A2540] text-[#00C2FF] border border-[#00C2FF]/30 shadow-xs">
                                  PDG / Super Admin
                                </span>
                              ) : isAdminRole ? (
                                <span className="inline-block px-3 py-1 font-mono text-[11px] font-bold uppercase rounded-xs bg-[#1E56A0]/15 text-[#1E56A0] border border-[#1E56A0]/30">
                                  Administrateur
                                </span>
                              ) : (
                                <span className="inline-block px-3 py-1 font-mono text-[11px] font-bold uppercase rounded-xs bg-slate-100 text-slate-700 border border-slate-300">
                                  Éditeur / Agent
                                </span>
                              )}
                            </td>
                            <td className="py-4 px-6">
                              <span className="inline-flex items-center gap-1.5 text-xs text-emerald-600 font-semibold">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> {u.status === "inactive" ? "Inactif" : "Actif"}
                              </span>
                            </td>
                            {currentUserRole === "super_admin" && (
                              <td className="py-4 px-6 text-right">
                                <button
                                  onClick={() => handleDeleteUser(u)}
                                  className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                                  title="Supprimer l'utilisateur"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            )}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
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
