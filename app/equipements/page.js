"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Wrench,
  Search,
  Filter,
  CheckCircle2,
  Phone,
  Mail,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Tag,
  Building2,
  X,
  Send,
  SlidersHorizontal,
  ChevronRight,
  Info,
  Calendar,
  Layers
} from "lucide-react";
import { getEquipments, sendContactMessage } from "@/lib/data";

const CATEGORIES = [
  "Tous",
  "Engins lourds",
  "Groupe électrogène",
  "Coffrage & Échafaudage",
  "Transport",
  "Outillage"
];

export default function EquipementsPage() {
  const [equipments, setEquipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [selectedType, setSelectedType] = useState("all"); // 'all', 'sale', 'rent'
  const [searchQuery, setSearchQuery] = useState("");

  // Modal states
  const [activeEquipment, setActiveEquipment] = useState(null); // Equipment for Detail Modal
  const [quoteEquipment, setQuoteEquipment] = useState(null); // Equipment for Quote Modal

  // Form state for quote modal
  const [quoteForm, setQuoteForm] = useState({
    name: "",
    email: "",
    phone: "",
    transactionType: "location", // 'location' or 'achat'
    duration: "1 semaine",
    message: ""
  });

  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const data = await getEquipments();
        if (data && data.length > 0) setEquipments(data);
      } catch (err) {
        console.error("Erreur de chargement des équipements :", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();

    const handleUpdate = () => loadData();
    window.addEventListener("equipments_updated", handleUpdate);
    return () => window.removeEventListener("equipments_updated", handleUpdate);
  }, []);

  const handleOpenQuoteModal = (equipment, defaultType = "location") => {
    setQuoteEquipment(equipment);
    setQuoteForm({
      name: "",
      email: "",
      phone: "",
      transactionType: defaultType,
      duration: "1 semaine",
      message: `Bonjour, je souhaite recevoir une proposition pour : ${equipment.title} (${equipment.brand || ''} ${equipment.model || ''}).`
    });
    setFormSuccess(false);
  };

  const handleSendQuote = async (e) => {
    e.preventDefault();
    setFormSubmitting(true);
    try {
      await sendContactMessage({
        name: quoteForm.name,
        email: quoteForm.email,
        phone: quoteForm.phone,
        service_requested: `Demande ${quoteForm.transactionType === 'achat' ? 'Achat' : 'Location'} : ${quoteEquipment.title}`,
        message: `${quoteForm.message} \n[Durée/Option: ${quoteForm.duration}]`
      });
      setFormSuccess(true);
      setTimeout(() => {
        setFormSuccess(false);
        setQuoteEquipment(null);
      }, 3000);
    } catch (err) {
      alert("Erreur lors de l'envoi de la demande. Veuillez réessayer.");
    } finally {
      setFormSubmitting(false);
    }
  };

  // Filtered List
  const filteredEquipments = equipments.filter((item) => {
    const matchesCategory = selectedCategory === "Tous" || item.category === selectedCategory;
    const matchesType =
      selectedType === "all" ||
      item.type === "both" ||
      item.type === selectedType;
    const matchesSearch =
      (item.title + item.category + item.brand + item.model + item.specs)
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesType && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#0A2540] text-white pt-24 pb-20 selection:bg-[#00C2FF] selection:text-[#000F22] blueprint-grid-dark font-sans">
      
      {/* HEADER BANNER */}
      <section className="relative py-14 px-6 border-b border-[#295EA8]/30 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00C2FF]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-6xl mx-auto text-center relative z-10">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#0F3854] border border-[#00C2FF]/40 rounded-full text-[11px] font-mono font-bold text-[#00C2FF] uppercase tracking-widest mb-4">
            <Wrench className="w-3.5 h-3.5 text-[#00C2FF]" />
            <span>CATALOGUE MATÉRIELS &amp; ENGINS BTP</span>
          </div>

          <h1 className="font-display font-black text-[32px] sm:text-[46px] text-white tracking-tight leading-tight mb-4">
            Vente &amp; Location d&apos;Équipements BTP
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-[15px] sm:text-[16px] leading-relaxed">
            Mise à disposition d&apos;engins lourds, outillages certifiés, groupes électrogènes et systèmes de coffrage haut de gamme à Conakry et en région.
          </p>

          {/* Quick Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-[12px] font-mono text-slate-300">
            <span className="flex items-center gap-2 bg-[#0F3854]/60 px-3 py-1.5 rounded-md border border-[#295EA8]/30">
              <CheckCircle2 className="w-4 h-4 text-[#00C2FF]" />
              Matériel Révisé &amp; Certifié
            </span>
            <span className="flex items-center gap-2 bg-[#0F3854]/60 px-3 py-1.5 rounded-md border border-[#295EA8]/30">
              <CheckCircle2 className="w-4 h-4 text-[#00C2FF]" />
              Livraison Directe sur Chantier
            </span>
            <span className="flex items-center gap-2 bg-[#0F3854]/60 px-3 py-1.5 rounded-md border border-[#295EA8]/30">
              <CheckCircle2 className="w-4 h-4 text-[#00C2FF]" />
              Assistance Technique 7j/7
            </span>
          </div>
        </div>
      </section>

      {/* FILTER & SEARCH BAR */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="bg-[#0F3854]/90 backdrop-blur-md border border-[#00C2FF]/30 p-5 rounded-2xl shadow-2xl flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-5">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#00C2FF] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Rechercher une pelle, groupe électrogène, coffrage, camion..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[#0A2540] border border-[#295EA8]/60 rounded-xl text-white placeholder-slate-400 text-[14px] outline-none focus:border-[#00C2FF] transition-all font-sans"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Transaction Type Filter (Vente / Location) */}
          <div className="flex items-center bg-[#0A2540] p-1 rounded-xl border border-[#295EA8]/60 shrink-0">
            <button
              onClick={() => setSelectedType("all")}
              className={`px-4 py-2 rounded-lg font-mono text-[12px] font-bold uppercase transition-all ${
                selectedType === "all"
                  ? "bg-[#00C2FF] text-[#000F22] shadow-md"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              Tous
            </button>
            <button
              onClick={() => setSelectedType("rent")}
              className={`px-4 py-2 rounded-lg font-mono text-[12px] font-bold uppercase transition-all ${
                selectedType === "rent"
                  ? "bg-[#00C2FF] text-[#000F22] shadow-md"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              Location
            </button>
            <button
              onClick={() => setSelectedType("sale")}
              className={`px-4 py-2 rounded-lg font-mono text-[12px] font-bold uppercase transition-all ${
                selectedType === "sale"
                  ? "bg-[#00C2FF] text-[#000F22] shadow-md"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              Achat
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-5 pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full font-mono text-[12px] font-semibold whitespace-nowrap transition-all border ${
                selectedCategory === cat
                  ? "bg-[#00C2FF]/20 text-[#00C2FF] border-[#00C2FF] shadow-lg shadow-[#00C2FF]/10"
                  : "bg-[#0F3854]/40 text-slate-300 border-[#295EA8]/30 hover:border-[#00C2FF]/50 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* CATALOG GRID */}
      <section className="max-w-6xl mx-auto px-6 py-6">
        {loading ? (
          <div className="py-20 text-center">
            <svg className="animate-spin w-10 h-10 text-[#00C2FF] mx-auto mb-4" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="31.4" strokeLinecap="round" />
            </svg>
            <p className="font-mono text-[13px] text-[#00C2FF] uppercase tracking-widest animate-pulse">
              Chargement du catalogue matériel...
            </p>
          </div>
        ) : filteredEquipments.length === 0 ? (
          <div className="bg-[#0F3854]/60 border border-[#295EA8]/40 p-12 rounded-2xl text-center max-w-lg mx-auto">
            <Info className="w-12 h-12 text-[#00C2FF] mx-auto mb-3 opacity-60" />
            <h3 className="font-display font-bold text-[18px] text-white">Aucun équipement trouvé</h3>
            <p className="text-slate-300 text-[13px] mt-1 mb-4">
              Aucun matériel ne correspond à vos filtres actuels.
            </p>
            <button
              onClick={() => { setSelectedCategory("Tous"); setSelectedType("all"); setSearchQuery(""); }}
              className="px-5 py-2.5 bg-[#00C2FF] text-[#000F22] font-mono font-bold text-[12px] uppercase tracking-wider rounded-lg hover:bg-white transition-colors"
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEquipments.map((item) => {
              const isSale = item.type === "sale" || item.type === "both";
              const isRent = item.type === "rent" || item.type === "both";

              return (
                <div
                  key={item.id}
                  className="group bg-[#0F3854]/80 border border-[#295EA8]/40 hover:border-[#00C2FF] rounded-2xl overflow-hidden shadow-xl hover:shadow-[0_15px_40px_rgba(0,194,255,0.15)] transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Image Container */}
                  <div className="relative h-56 w-full overflow-hidden bg-[#0A2540]">
                    <img
                      src={item.image || "/img/showcase/tour-grue-ciel.webp"}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F3854] via-transparent to-transparent opacity-80" />

                    {/* Top Type Badges */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                      {isRent && (
                        <span className="px-2.5 py-1 bg-[#00C2FF] text-[#000F22] font-mono text-[10px] font-black uppercase tracking-wider rounded-md shadow-md">
                          LOCATION
                        </span>
                      )}
                      {isSale && (
                        <span className="px-2.5 py-1 bg-emerald-500 text-white font-mono text-[10px] font-black uppercase tracking-wider rounded-md shadow-md">
                          VENTE
                        </span>
                      )}
                    </div>

                    {/* Condition Badge */}
                    <span className="absolute top-3 right-3 px-2.5 py-1 bg-[#0A2540]/90 border border-[#00C2FF]/30 text-slate-200 font-mono text-[10px] font-bold rounded-md backdrop-blur-sm">
                      {item.condition || "Excellent état"}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center gap-2 text-[11px] font-mono text-[#00C2FF] uppercase tracking-wider mb-1 font-bold">
                        <Tag className="w-3 h-3 text-[#00C2FF]" />
                        <span>{item.category}</span>
                        {item.brand && <span>• {item.brand}</span>}
                      </div>

                      <h3 className="font-display font-bold text-[18px] text-white group-hover:text-[#00C2FF] transition-colors leading-snug">
                        {item.title}
                      </h3>

                      <p className="text-[13px] text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                        {item.specs}
                      </p>
                    </div>

                    {/* Pricing Display */}
                    <div className="pt-3 border-t border-[#295EA8]/40 space-y-1 font-mono text-[13px]">
                      {item.price_rent && (
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400 text-[11px]">Tarif Location :</span>
                          <span className="text-[#00C2FF] font-bold">{item.price_rent}</span>
                        </div>
                      )}
                      {item.price_sale && (
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400 text-[11px]">Prix d&apos;Achat :</span>
                          <span className="text-emerald-400 font-bold">{item.price_sale}</span>
                        </div>
                      )}
                    </div>

                    {/* Card Action Buttons */}
                    <div className="pt-2 grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setActiveEquipment(item)}
                        className="py-2.5 px-3 bg-[#0A2540] hover:bg-[#1E56A0] text-slate-200 text-[11px] font-mono font-bold uppercase tracking-wider rounded-xl transition-colors border border-[#295EA8]/50 flex items-center justify-center gap-1.5"
                      >
                        <Info className="w-3.5 h-3.5 text-[#00C2FF]" />
                        <span>Fiche Produit</span>
                      </button>

                      <button
                        onClick={() => handleOpenQuoteModal(item, isRent ? 'location' : 'achat')}
                        className="py-2.5 px-3 bg-[#00C2FF] hover:bg-white text-[#000F22] text-[11px] font-mono font-extrabold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5"
                      >
                        <span>Demander Devis</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* MODALE 1 : FICHE TECHNIQUE DÉTAILLÉE DU MATÉRIEL */}
      {activeEquipment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-[#0F3854] border border-[#00C2FF]/40 rounded-2xl shadow-2xl overflow-hidden text-white my-8 max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-[#295EA8]/40 flex items-center justify-between bg-[#0A2540]/80">
              <div>
                <span className="text-[10px] font-mono text-[#00C2FF] uppercase font-bold tracking-widest block">
                  FICHE TECHNIQUE — BEST BUILDERS BTP
                </span>
                <h2 className="font-display font-extrabold text-[20px] text-white mt-0.5">
                  {activeEquipment.title}
                </h2>
              </div>
              <button
                onClick={() => setActiveEquipment(null)}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-[#1E56A0]/40"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Content */}
            <div className="p-6 overflow-y-auto space-y-6">
              <div className="h-64 w-full rounded-xl overflow-hidden bg-[#0A2540] border border-[#295EA8]/30">
                <img
                  src={activeEquipment.image || "/img/showcase/tour-grue-ciel.webp"}
                  alt={activeEquipment.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Technical Specifications Grid */}
              <div className="grid sm:grid-cols-2 gap-4 font-mono text-[13px]">
                <div className="p-3 bg-[#0A2540]/80 border border-[#295EA8]/40 rounded-xl">
                  <span className="text-[10px] text-slate-400 uppercase block">Catégorie</span>
                  <span className="font-bold text-[#00C2FF]">{activeEquipment.category}</span>
                </div>
                <div className="p-3 bg-[#0A2540]/80 border border-[#295EA8]/40 rounded-xl">
                  <span className="text-[10px] text-slate-400 uppercase block">Marque / Modèle</span>
                  <span className="font-bold text-white">{activeEquipment.brand || 'N/C'} — {activeEquipment.model || 'N/C'}</span>
                </div>
                <div className="p-3 bg-[#0A2540]/80 border border-[#295EA8]/40 rounded-xl">
                  <span className="text-[10px] text-slate-400 uppercase block">État du Matériel</span>
                  <span className="font-bold text-emerald-400">{activeEquipment.condition || 'Neuf'}</span>
                </div>
                <div className="p-3 bg-[#0A2540]/80 border border-[#295EA8]/40 rounded-xl">
                  <span className="text-[10px] text-slate-400 uppercase block">Disponibilité</span>
                  <span className="font-bold text-emerald-400">Disponible Immédiatement</span>
                </div>
              </div>

              {/* Description & Specs */}
              <div>
                <h4 className="font-display font-bold text-[14px] uppercase text-[#00C2FF] tracking-wider mb-2">
                  Caractéristiques &amp; Spécifications
                </h4>
                <p className="text-[14px] text-slate-300 leading-relaxed bg-[#0A2540]/60 p-4 rounded-xl border border-[#295EA8]/30">
                  {activeEquipment.specs}
                </p>
              </div>

              {/* Pricing Box */}
              <div className="p-4 bg-[#0A2540] border border-[#00C2FF]/30 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 font-mono">
                <div>
                  {activeEquipment.price_rent && (
                    <p className="text-[13px]">
                      <span className="text-slate-400">Location : </span>
                      <strong className="text-[#00C2FF] font-extrabold">{activeEquipment.price_rent}</strong>
                    </p>
                  )}
                  {activeEquipment.price_sale && (
                    <p className="text-[13px] mt-1">
                      <span className="text-slate-400">Achat : </span>
                      <strong className="text-emerald-400 font-extrabold">{activeEquipment.price_sale}</strong>
                    </p>
                  )}
                </div>
                <button
                  onClick={() => {
                    const item = activeEquipment;
                    setActiveEquipment(null);
                    handleOpenQuoteModal(item);
                  }}
                  className="px-6 py-3 bg-[#00C2FF] hover:bg-white text-[#000F22] font-mono font-extrabold text-[12px] uppercase tracking-wider rounded-xl transition-all shadow-md shrink-0"
                >
                  Obtenir un Devis
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODALE 2 : FORMULAIRE DE DEMANDE DE DEVIS / RÉSERVATION */}
      {quoteEquipment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-xl bg-[#0F3854] border border-[#00C2FF]/40 rounded-2xl shadow-2xl overflow-hidden text-white my-8">
            
            <div className="p-6 border-b border-[#295EA8]/40 flex items-center justify-between bg-[#0A2540]/80">
              <div>
                <span className="text-[10px] font-mono text-[#00C2FF] uppercase font-bold tracking-widest block">
                  DEMANDE DE DEVIS MATÉRIEL BTP
                </span>
                <h2 className="font-display font-extrabold text-[18px] text-white mt-0.5 line-clamp-1">
                  {quoteEquipment.title}
                </h2>
              </div>
              <button
                onClick={() => setQuoteEquipment(null)}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-[#1E56A0]/40"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {formSuccess ? (
                <div className="p-8 text-center bg-emerald-500/10 border border-emerald-500/40 rounded-xl space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                  <h3 className="font-display font-bold text-[18px] text-white">Demande Envoyée avec Succès !</h3>
                  <p className="text-[13px] text-slate-300">
                    Notre département matériel prend en charge votre demande. Vous recevrez une proposition tarifaire dans les plus brefs délais.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSendQuote} className="space-y-4">
                  {/* Transaction Option (Location vs Achat) */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setQuoteForm({ ...quoteForm, transactionType: "location" })}
                      className={`py-3 px-4 rounded-xl font-mono text-[12px] font-bold uppercase transition-all border ${
                        quoteForm.transactionType === "location"
                          ? "bg-[#00C2FF] text-[#000F22] border-[#00C2FF] shadow-lg"
                          : "bg-[#0A2540] text-slate-300 border-[#295EA8]/40 hover:text-white"
                      }`}
                    >
                      Option Location
                    </button>
                    <button
                      type="button"
                      onClick={() => setQuoteForm({ ...quoteForm, transactionType: "achat" })}
                      className={`py-3 px-4 rounded-xl font-mono text-[12px] font-bold uppercase transition-all border ${
                        quoteForm.transactionType === "achat"
                          ? "bg-emerald-500 text-white border-emerald-500 shadow-lg"
                          : "bg-[#0A2540] text-slate-300 border-[#295EA8]/40 hover:text-white"
                      }`}
                    >
                      Option Achat
                    </button>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-[#00C2FF] font-bold mb-1.5">Nom Complet / Société</label>
                    <input
                      type="text"
                      required
                      placeholder="ex: Paul Bangoura - Entreprise BTP"
                      value={quoteForm.name}
                      onChange={(e) => setQuoteForm({ ...quoteForm, name: e.target.value })}
                      className="w-full p-3 bg-[#0A2540] border border-[#295EA8]/50 rounded-xl text-white placeholder-slate-400 text-[13px] outline-none focus:border-[#00C2FF]"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono uppercase text-[#00C2FF] font-bold mb-1.5">Numéro de Téléphone</label>
                      <input
                        type="tel"
                        required
                        placeholder="+224 6XX XX XX XX"
                        value={quoteForm.phone}
                        onChange={(e) => setQuoteForm({ ...quoteForm, phone: e.target.value })}
                        className="w-full p-3 bg-[#0A2540] border border-[#295EA8]/50 rounded-xl text-white placeholder-slate-400 text-[13px] outline-none focus:border-[#00C2FF]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono uppercase text-[#00C2FF] font-bold mb-1.5">Adresse Email</label>
                      <input
                        type="email"
                        required
                        placeholder="exemple@email.com"
                        value={quoteForm.email}
                        onChange={(e) => setQuoteForm({ ...quoteForm, email: e.target.value })}
                        className="w-full p-3 bg-[#0A2540] border border-[#295EA8]/50 rounded-xl text-white placeholder-slate-400 text-[13px] outline-none focus:border-[#00C2FF]"
                      />
                    </div>
                  </div>

                  {quoteForm.transactionType === "location" && (
                    <div>
                      <label className="block text-[11px] font-mono uppercase text-[#00C2FF] font-bold mb-1.5">Durée estimée de location</label>
                      <select
                        value={quoteForm.duration}
                        onChange={(e) => setQuoteForm({ ...quoteForm, duration: e.target.value })}
                        className="w-full p-3 bg-[#0A2540] border border-[#295EA8]/50 rounded-xl text-white text-[13px] outline-none focus:border-[#00C2FF]"
                      >
                        <option value="1 à 3 jours">1 à 3 jours (Besoin ponctuel)</option>
                        <option value="1 semaine">1 semaine</option>
                        <option value="1 mois">1 mois</option>
                        <option value="Longue durée (3 mois+)">Longue durée (Plus de 3 mois)</option>
                      </select>
                    </div>
                  )}

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-[#00C2FF] font-bold mb-1.5">Message / Détails du Chantier</label>
                    <textarea
                      rows={3}
                      required
                      value={quoteForm.message}
                      onChange={(e) => setQuoteForm({ ...quoteForm, message: e.target.value })}
                      className="w-full p-3 bg-[#0A2540] border border-[#295EA8]/50 rounded-xl text-white text-[13px] outline-none focus:border-[#00C2FF]"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={formSubmitting}
                    className="w-full py-4 bg-[#00C2FF] hover:bg-white text-[#000F22] font-mono font-extrabold text-[13px] uppercase tracking-wider rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 mt-2 disabled:opacity-60"
                  >
                    {formSubmitting ? (
                      <span>Envoi en cours...</span>
                    ) : (
                      <>
                        <span>Transmettre la demande de devis</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
