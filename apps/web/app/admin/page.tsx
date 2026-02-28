"use client";

import React, { useState } from "react";
import { Header } from "@/components/layout/Header";
import { trpc } from "@/lib/trpc";
import { CloudinaryUpload } from "@/components/ui/CloudinaryUpload";
import {
  Users,
  MapPin,
  FileText,
  Star,
  Building2,
  Shield,
  BarChart3,
  Search,
  ChevronDown,
  ToggleLeft,
  ToggleRight,
  Plus,
  AlertTriangle,
  FolderKanban,
  Settings,
  Landmark,
  Save,
  Trash2,
  Phone,
  Mail,
  Globe,
  Edit3,
  X,
  ScrollText,
  Bell,
  Layers,
  Activity,
} from "lucide-react";
import { LIEU_TYPE_LABELS } from "@kinservices/ui";

type Tab =
  | "dashboard"
  | "users"
  | "lieux"
  | "ville"
  | "projets"
  | "documents"
  | "signalements"
  | "services"
  | "communes"
  | "alertes";

const ROLE_LABELS: Record<string, string> = {
  VISITEUR: "Visiteur",
  GESTIONNAIRE: "Gestionnaire",
  ADMINISTRATEUR: "Administrateur",
};

const ROLE_COLORS: Record<string, string> = {
  VISITEUR: "bg-gray-100 text-gray-700",
  GESTIONNAIRE: "bg-blue-50 text-blue-700",
  ADMINISTRATEUR: "bg-red-50 text-red-700",
};

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [userSearch, setUserSearch] = useState("");
  const [userRoleFilter, setUserRoleFilter] = useState("");
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  // Ville management state — ALL hooks must be before any conditional return
  const [villeSubTab, setVilleSubTab] = useState<
    "gouvernorat" | "ministres" | "commissaires" | "assemblee" | "historique"
  >("gouvernorat");
  const [editingGouv, setEditingGouv] = useState(false);
  const [gouvForm, setGouvForm] = useState({
    gouverneur: "",
    photoUrl: "",
    adresse: "",
    telephone: "",
    email: "",
    siteWeb: "",
    description: "",
  });
  const [editingMinistreId, setEditingMinistreId] = useState<string | null>(
    null,
  );
  const [ministreForm, setMinistreForm] = useState({
    nom: "",
    portefeuille: "",
    type: "MINISTRE",
    photoUrl: "",
    telephone: "",
    email: "",
    biographie: "",
    ordre: 0,
  });
  const [showAddMinistre, setShowAddMinistre] = useState(false);
  const [editingDeputeId, setEditingDeputeId] = useState<string | null>(null);
  const [deputeForm, setDeputeForm] = useState({
    nom: "",
    parti: "",
    circonscription: "",
    photoUrl: "",
    telephone: "",
    email: "",
    biographie: "",
  });
  const [showAddDepute, setShowAddDepute] = useState(false);
  const [showAddGouverneurHist, setShowAddGouverneurHist] = useState(false);
  const [editingGouvHistId, setEditingGouvHistId] = useState<string | null>(
    null,
  );
  const [gouvHistForm, setGouvHistForm] = useState({
    nom: "",
    photoUrl: "",
    dateDebut: "",
    dateFin: "",
    biographie: "",
    ordre: 0,
  });

  const { data: stats, isLoading: loadingStats } =
    trpc.admin.getStats.useQuery();
  const { data: usersData, isLoading: loadingUsers } =
    trpc.admin.getUsers.useQuery({
      search: userSearch || undefined,
      role: userRoleFilter || undefined,
      limit: 50,
    });

  const utils = trpc.useUtils();
  const updateRoleMutation = trpc.admin.updateUserRole.useMutation({
    onSuccess: () => utils.admin.getUsers.invalidate(),
    onError: (e) => alert("Erreur: " + e.message),
  });
  const toggleActiveMutation = trpc.admin.toggleUserActive.useMutation({
    onSuccess: () => utils.admin.getUsers.invalidate(),
    onError: (e) => alert("Erreur: " + e.message),
  });

  // Ville data
  const { data: gouvernorat, isLoading: loadingGouv } =
    trpc.ville.getGouvernorat.useQuery();
  const { data: deputes, isLoading: loadingDeputes } =
    trpc.ville.getDeputes.useQuery({});

  const upsertGouvMutation = trpc.admin.upsertGouvernorat.useMutation({
    onSuccess: () => {
      utils.ville.getGouvernorat.invalidate();
      setEditingGouv(false);
    },
    onError: (e) => alert("Erreur: " + e.message),
  });
  const updateMinistreMutation = trpc.admin.updateMinistre.useMutation({
    onSuccess: () => {
      utils.ville.getGouvernorat.invalidate();
      setEditingMinistreId(null);
    },
    onError: (e) => alert("Erreur: " + e.message),
  });
  const createMinistreMutation = trpc.admin.createMinistre.useMutation({
    onSuccess: () => {
      utils.ville.getGouvernorat.invalidate();
      setShowAddMinistre(false);
      setMinistreForm({
        nom: "",
        portefeuille: "",
        type: "MINISTRE",
        photoUrl: "",
        telephone: "",
        email: "",
        biographie: "",
        ordre: 0,
      });
    },
    onError: (e) => alert("Erreur: " + e.message),
  });
  const deleteMinistreMutation = trpc.admin.deleteMinistre.useMutation({
    onSuccess: () => utils.ville.getGouvernorat.invalidate(),
    onError: (e) => alert("Erreur: " + e.message),
  });
  const updateDeputeMutation = trpc.admin.updateDepute.useMutation({
    onSuccess: () => {
      utils.ville.getDeputes.invalidate();
      setEditingDeputeId(null);
    },
    onError: (e) => alert("Erreur: " + e.message),
  });
  const createDeputeMutation = trpc.admin.createDepute.useMutation({
    onSuccess: () => {
      utils.ville.getDeputes.invalidate();
      setShowAddDepute(false);
      setDeputeForm({
        nom: "",
        parti: "",
        circonscription: "",
        photoUrl: "",
        telephone: "",
        email: "",
        biographie: "",
      });
    },
    onError: (e) => alert("Erreur: " + e.message),
  });
  const deleteDeputeMutation = trpc.admin.deleteDepute.useMutation({
    onSuccess: () => utils.ville.getDeputes.invalidate(),
    onError: (e) => alert("Erreur: " + e.message),
  });

  // Gouverneurs historiques
  const { data: gouverneursHist, isLoading: loadingGouvHist } =
    trpc.admin.getGouverneursHistoriques.useQuery();
  const createGouvHistMutation =
    trpc.admin.createGouverneurHistorique.useMutation({
      onSuccess: () => {
        utils.admin.getGouverneursHistoriques.invalidate();
        setShowAddGouverneurHist(false);
        setGouvHistForm({
          nom: "",
          photoUrl: "",
          dateDebut: "",
          dateFin: "",
          biographie: "",
          ordre: 0,
        });
      },
      onError: (e) => alert("Erreur: " + e.message),
    });
  const updateGouvHistMutation =
    trpc.admin.updateGouverneurHistorique.useMutation({
      onSuccess: () => {
        utils.admin.getGouverneursHistoriques.invalidate();
        setEditingGouvHistId(null);
      },
      onError: (e) => alert("Erreur: " + e.message),
    });
  const deleteGouvHistMutation =
    trpc.admin.deleteGouverneurHistorique.useMutation({
      onSuccess: () => utils.admin.getGouverneursHistoriques.invalidate(),
      onError: (e) => alert("Erreur: " + e.message),
    });

  // Auth protection: require ADMINISTRATEUR role
  React.useEffect(() => {
    const stored = localStorage.getItem("kinservices_user");
    if (!stored) {
      window.location.href = "/auth/login";
      return;
    }
    try {
      const user = JSON.parse(stored);
      if (user.role !== "ADMINISTRATEUR") {
        window.location.href = "/";
        return;
      }
      setIsAuthorized(true);
    } catch {
      window.location.href = "/auth/login";
      return;
    }
    setAuthChecked(true);
  }, []);

  // Show nothing while checking auth
  if (!authChecked || !isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-muted-foreground text-sm">
            Vérification des accès...
          </p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "dashboard" as Tab, label: "Tableau de bord", icon: BarChart3 },
    { id: "users" as Tab, label: "Utilisateurs", icon: Users },
    { id: "ville" as Tab, label: "Ville", icon: Landmark },
    { id: "lieux" as Tab, label: "Lieux", icon: MapPin },
    { id: "services" as Tab, label: "Services", icon: FileText },
    { id: "documents" as Tab, label: "Documents", icon: ScrollText },
    { id: "communes" as Tab, label: "Communes", icon: Building2 },
    { id: "signalements" as Tab, label: "Signalements", icon: AlertTriangle },
    { id: "alertes" as Tab, label: "Alertes", icon: Bell },
    { id: "projets" as Tab, label: "Projets", icon: FolderKanban },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Admin header */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Administration</h1>
              <p className="text-white/60 text-sm">
                Gestion complète de la plateforme KinServices
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab navigation */}
      <div className="sticky top-16 z-20 bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto py-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-gray-900 text-white"
                    : "text-muted-foreground hover:bg-gray-100"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* DASHBOARD TAB */}
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            {loadingStats ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
              </div>
            ) : stats ? (
              <>
                {/* Stats grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {[
                    {
                      label: "Utilisateurs",
                      value: stats.totalUsers,
                      icon: Users,
                      color: "text-blue-500",
                      tab: "users" as Tab,
                    },
                    {
                      label: "Lieux",
                      value: stats.totalLieux,
                      icon: MapPin,
                      color: "text-emerald-500",
                      tab: "lieux" as Tab,
                    },
                    {
                      label: "Services",
                      value: stats.totalServices,
                      icon: FileText,
                      color: "text-purple-500",
                      tab: "services" as Tab,
                    },
                    {
                      label: "Documents",
                      value: stats.totalDocuments,
                      icon: ScrollText,
                      color: "text-teal-500",
                      tab: "documents" as Tab,
                    },
                    {
                      label: "Communes",
                      value: stats.totalCommunes,
                      icon: Building2,
                      color: "text-indigo-500",
                      tab: "communes" as Tab,
                    },
                    {
                      label: "Districts",
                      value: stats.totalDistricts,
                      icon: Layers,
                      color: "text-violet-500",
                      tab: "communes" as Tab,
                    },
                    {
                      label: "Ministres",
                      value: stats.totalMinistres,
                      icon: Landmark,
                      color: "text-cyan-500",
                      tab: "ville" as Tab,
                    },
                    {
                      label: "Députés",
                      value: stats.totalDeputes,
                      icon: Users,
                      color: "text-sky-500",
                      tab: "ville" as Tab,
                    },
                    {
                      label: "Signalements",
                      value: stats.totalSignalements,
                      icon: AlertTriangle,
                      color: "text-yellow-500",
                      tab: "signalements" as Tab,
                    },
                    {
                      label: "Alertes",
                      value: stats.totalAlertes,
                      icon: Bell,
                      color: "text-red-500",
                      tab: "alertes" as Tab,
                    },
                    {
                      label: "Avis",
                      value: stats.totalAvis,
                      icon: Star,
                      color: "text-amber-500",
                      tab: "dashboard" as Tab,
                    },
                    {
                      label: "Zones de Santé",
                      value: stats.totalZonesSante,
                      icon: Activity,
                      color: "text-rose-500",
                      tab: "dashboard" as Tab,
                    },
                    {
                      label: "Quartiers",
                      value: stats.totalQuartiers,
                      icon: MapPin,
                      color: "text-pink-500",
                      tab: "dashboard" as Tab,
                    },
                    {
                      label: "Projets",
                      value: stats.totalProjets,
                      icon: FolderKanban,
                      color: "text-orange-500",
                      tab: "projets" as Tab,
                    },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="bg-white rounded-xl border border-border p-4 cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => setActiveTab(stat.tab)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <stat.icon className={`w-5 h-5 ${stat.color}`} />
                      </div>
                      <p className="text-2xl font-bold text-foreground">
                        {stat.value.toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Lieux by type */}
                <div className="bg-white rounded-xl border border-border p-6">
                  <h3 className="font-semibold text-foreground mb-4">
                    Lieux par type
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {stats.lieuxByType.map((item) => (
                      <div
                        key={item.type}
                        className="bg-gray-50 rounded-lg p-3 text-center"
                      >
                        <p className="text-lg font-bold text-foreground">
                          {item.count}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {LIEU_TYPE_LABELS[
                            item.type as keyof typeof LIEU_TYPE_LABELS
                          ] || item.type}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent users */}
                <div className="bg-white rounded-xl border border-border p-6">
                  <h3 className="font-semibold text-foreground mb-4">
                    Derniers utilisateurs inscrits
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-2 px-3 text-muted-foreground font-medium">
                            Email
                          </th>
                          <th className="text-left py-2 px-3 text-muted-foreground font-medium">
                            Nom
                          </th>
                          <th className="text-left py-2 px-3 text-muted-foreground font-medium">
                            Rôle
                          </th>
                          <th className="text-left py-2 px-3 text-muted-foreground font-medium">
                            Statut
                          </th>
                          <th className="text-left py-2 px-3 text-muted-foreground font-medium">
                            Date
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {stats.recentUsers.map((user) => (
                          <tr
                            key={user.id}
                            className="border-b border-border/50 hover:bg-gray-50"
                          >
                            <td className="py-2 px-3">{user.email}</td>
                            <td className="py-2 px-3">
                              {user.prenom} {user.nom}
                            </td>
                            <td className="py-2 px-3">
                              <span
                                className={`text-xs px-2 py-0.5 rounded-md font-medium ${ROLE_COLORS[user.role] || ""}`}
                              >
                                {ROLE_LABELS[user.role] || user.role}
                              </span>
                            </td>
                            <td className="py-2 px-3">
                              <span
                                className={`text-xs px-2 py-0.5 rounded-md font-medium ${user.active ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}
                              >
                                {user.active ? "Actif" : "Inactif"}
                              </span>
                            </td>
                            <td className="py-2 px-3 text-muted-foreground">
                              {new Date(user.createdAt).toLocaleDateString(
                                "fr-FR",
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            ) : null}
          </div>
        )}

        {/* USERS TAB */}
        {activeTab === "users" && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Rechercher par email, nom..."
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
                />
              </div>
              <div className="flex gap-2">
                {["", "VISITEUR", "GESTIONNAIRE", "ADMINISTRATEUR"].map(
                  (role) => (
                    <button
                      key={role}
                      onClick={() => setUserRoleFilter(role)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        userRoleFilter === role
                          ? "bg-gray-900 text-white"
                          : "bg-white border border-border text-muted-foreground hover:bg-gray-50"
                      }`}
                    >
                      {role === "" ? "Tous" : ROLE_LABELS[role] || role}
                    </button>
                  ),
                )}
              </div>
            </div>

            {loadingUsers ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
              </div>
            ) : usersData && usersData.items.length > 0 ? (
              <div className="bg-white rounded-xl border border-border overflow-hidden">
                <div className="p-4 border-b border-border bg-gray-50">
                  <p className="text-sm text-muted-foreground">
                    {usersData.total} utilisateur
                    {usersData.total > 1 ? "s" : ""}
                  </p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border bg-gray-50/50">
                        <th className="text-left py-3 px-4 text-muted-foreground font-medium">
                          Utilisateur
                        </th>
                        <th className="text-left py-3 px-4 text-muted-foreground font-medium">
                          Fournisseur
                        </th>
                        <th className="text-left py-3 px-4 text-muted-foreground font-medium">
                          Rôle
                        </th>
                        <th className="text-left py-3 px-4 text-muted-foreground font-medium">
                          Statut
                        </th>
                        <th className="text-left py-3 px-4 text-muted-foreground font-medium">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {usersData.items.map((user) => (
                        <tr
                          key={user.id}
                          className="border-b border-border/50 hover:bg-gray-50"
                        >
                          <td className="py-3 px-4">
                            <div>
                              <p className="font-medium text-foreground">
                                {user.prenom} {user.nom}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {user.email}
                              </p>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-md">
                              {user.provider}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <select
                              value={user.role}
                              onChange={(e) =>
                                updateRoleMutation.mutate({
                                  userId: user.id,
                                  role: e.target.value as any,
                                })
                              }
                              className="text-xs px-2 py-1 rounded-md border border-border bg-white"
                            >
                              <option value="VISITEUR">Visiteur</option>
                              <option value="GESTIONNAIRE">Gestionnaire</option>
                              <option value="ADMINISTRATEUR">
                                Administrateur
                              </option>
                            </select>
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`text-xs px-2 py-0.5 rounded-md font-medium ${user.active ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}
                            >
                              {user.active ? "Actif" : "Inactif"}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <button
                              onClick={() =>
                                toggleActiveMutation.mutate({
                                  userId: user.id,
                                })
                              }
                              className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
                                user.active
                                  ? "bg-red-50 text-red-700 hover:bg-red-100"
                                  : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                              }`}
                            >
                              {user.active ? "Désactiver" : "Activer"}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="text-center py-20">
                <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold">Aucun utilisateur</h3>
              </div>
            )}
          </div>
        )}

        {/* VILLE TAB */}
        {activeTab === "ville" && (
          <div className="space-y-6">
            {/* Sub-tabs navigation */}
            <div className="flex gap-2 flex-wrap">
              {[
                {
                  id: "gouvernorat" as const,
                  label: "Gouvernorat",
                  icon: "🏛️",
                },
                {
                  id: "ministres" as const,
                  label: "Ministres Provinciaux",
                  icon: "👔",
                },
                {
                  id: "commissaires" as const,
                  label: "Commissaires Généraux",
                  icon: "⭐",
                },
                {
                  id: "assemblee" as const,
                  label: "Assemblée Provinciale",
                  icon: "🏢",
                },
                {
                  id: "historique" as const,
                  label: "Gouverneurs Historiques",
                  icon: "📜",
                },
              ].map((st) => (
                <button
                  key={st.id}
                  onClick={() => setVilleSubTab(st.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    villeSubTab === st.id
                      ? "bg-primary text-white shadow-md"
                      : "bg-white border border-border text-muted-foreground hover:bg-gray-50"
                  }`}
                >
                  <span>{st.icon}</span> {st.label}
                </button>
              ))}
            </div>

            {/* GOUVERNORAT SUB-TAB */}
            {villeSubTab === "gouvernorat" && (
              <div className="bg-white rounded-xl border border-border p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-foreground flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-primary" />
                    Gouvernorat de Kinshasa
                  </h3>
                  {gouvernorat && !editingGouv && (
                    <button
                      onClick={() => {
                        setGouvForm({
                          gouverneur: gouvernorat.gouverneur || "",
                          photoUrl: gouvernorat.photoUrl || "",
                          adresse: gouvernorat.adresse || "",
                          telephone: gouvernorat.telephone || "",
                          email: gouvernorat.email || "",
                          siteWeb: gouvernorat.siteWeb || "",
                          description: gouvernorat.description || "",
                        });
                        setEditingGouv(true);
                      }}
                      className="flex items-center gap-1.5 text-sm text-primary hover:bg-primary/10 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      <Edit3 className="w-4 h-4" /> Modifier
                    </button>
                  )}
                </div>

                {loadingGouv ? (
                  <div className="flex justify-center py-10">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" />
                  </div>
                ) : editingGouv ? (
                  <div className="space-y-4">
                    <CloudinaryUpload
                      value={gouvForm.photoUrl}
                      onChange={(url) =>
                        setGouvForm({ ...gouvForm, photoUrl: url })
                      }
                      label="Photo du Gouverneur"
                      size="lg"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Gouverneur
                        </label>
                        <input
                          type="text"
                          value={gouvForm.gouverneur}
                          onChange={(e) =>
                            setGouvForm({
                              ...gouvForm,
                              gouverneur: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 rounded-lg border border-border text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Téléphone
                        </label>
                        <input
                          type="text"
                          value={gouvForm.telephone}
                          onChange={(e) =>
                            setGouvForm({
                              ...gouvForm,
                              telephone: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 rounded-lg border border-border text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          value={gouvForm.email}
                          onChange={(e) =>
                            setGouvForm({ ...gouvForm, email: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-lg border border-border text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Site Web
                        </label>
                        <input
                          type="url"
                          value={gouvForm.siteWeb}
                          onChange={(e) =>
                            setGouvForm({
                              ...gouvForm,
                              siteWeb: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 rounded-lg border border-border text-sm"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-1">
                          Adresse
                        </label>
                        <input
                          type="text"
                          value={gouvForm.adresse}
                          onChange={(e) =>
                            setGouvForm({
                              ...gouvForm,
                              adresse: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 rounded-lg border border-border text-sm"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-1">
                          Description
                        </label>
                        <textarea
                          value={gouvForm.description}
                          onChange={(e) =>
                            setGouvForm({
                              ...gouvForm,
                              description: e.target.value,
                            })
                          }
                          rows={3}
                          className="w-full px-3 py-2 rounded-lg border border-border text-sm"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          upsertGouvMutation.mutate({
                            id: gouvernorat?.id,
                            gouverneur: gouvForm.gouverneur,
                            photoUrl: gouvForm.photoUrl || undefined,
                            adresse: gouvForm.adresse || undefined,
                            telephone: gouvForm.telephone || undefined,
                            email: gouvForm.email || undefined,
                            siteWeb: gouvForm.siteWeb || undefined,
                            description: gouvForm.description || undefined,
                          })
                        }
                        disabled={upsertGouvMutation.isPending}
                        className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors disabled:opacity-50"
                      >
                        <Save className="w-4 h-4" />
                        {upsertGouvMutation.isPending
                          ? "Enregistrement..."
                          : "Enregistrer"}
                      </button>
                      <button
                        onClick={() => setEditingGouv(false)}
                        className="px-4 py-2 border border-border rounded-lg text-sm hover:bg-gray-50 transition-colors"
                      >
                        Annuler
                      </button>
                    </div>
                  </div>
                ) : gouvernorat ? (
                  <div className="flex items-center gap-4">
                    {gouvernorat.photoUrl ? (
                      <img
                        src={gouvernorat.photoUrl}
                        alt={gouvernorat.gouverneur}
                        className="w-20 h-20 rounded-xl object-cover"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-2xl">
                        {gouvernorat.gouverneur?.charAt(0) || "G"}
                      </div>
                    )}
                    <div>
                      <h4 className="font-bold text-lg">
                        {gouvernorat.gouverneur}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {gouvernorat.description}
                      </p>
                      <div className="flex gap-3 mt-1 text-xs text-muted-foreground">
                        {gouvernorat.telephone && (
                          <span>
                            <Phone className="w-3 h-3 inline" />{" "}
                            {gouvernorat.telephone}
                          </span>
                        )}
                        {gouvernorat.email && (
                          <span>
                            <Mail className="w-3 h-3 inline" />{" "}
                            {gouvernorat.email}
                          </span>
                        )}
                        {gouvernorat.siteWeb && (
                          <span>
                            <Globe className="w-3 h-3 inline" />{" "}
                            {gouvernorat.siteWeb}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Aucun gouvernorat configuré. Cliquez sur Modifier pour
                    ajouter.
                  </p>
                )}
              </div>
            )}

            {/* MINISTRES SUB-TAB */}
            {villeSubTab === "ministres" && (
              <div className="bg-white rounded-xl border border-border p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-foreground flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-500" />
                    Ministres Provinciaux
                    {gouvernorat?.ministres && (
                      <span className="text-sm font-normal text-muted-foreground">
                        (
                        {
                          gouvernorat.ministres.filter(
                            (m: any) => m.type !== "COMMISSAIRE_GENERAL",
                          ).length
                        }
                        )
                      </span>
                    )}
                  </h3>
                  {gouvernorat && (
                    <button
                      onClick={() => {
                        setShowAddMinistre(true);
                        setMinistreForm({
                          nom: "",
                          portefeuille: "",
                          type: "MINISTRE",
                          photoUrl: "",
                          telephone: "",
                          email: "",
                          biographie: "",
                          ordre: (gouvernorat.ministres?.length || 0) + 1,
                        });
                      }}
                      className="flex items-center gap-1.5 text-sm text-white bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      <Plus className="w-4 h-4" /> Ajouter un Ministre
                    </button>
                  )}
                </div>

                {showAddMinistre && gouvernorat && (
                  <div className="bg-blue-50 rounded-xl p-4 mb-4 space-y-3">
                    <h4 className="text-sm font-semibold text-blue-800">
                      Nouveau Ministre
                    </h4>
                    <CloudinaryUpload
                      value={ministreForm.photoUrl}
                      onChange={(url) =>
                        setMinistreForm({ ...ministreForm, photoUrl: url })
                      }
                      label="Photo"
                      size="sm"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Nom complet"
                        value={ministreForm.nom}
                        onChange={(e) =>
                          setMinistreForm({
                            ...ministreForm,
                            nom: e.target.value,
                          })
                        }
                        className="px-3 py-2 rounded-lg border border-border text-sm"
                      />
                      <input
                        type="text"
                        placeholder="Portefeuille / Ministère"
                        value={ministreForm.portefeuille}
                        onChange={(e) =>
                          setMinistreForm({
                            ...ministreForm,
                            portefeuille: e.target.value,
                          })
                        }
                        className="px-3 py-2 rounded-lg border border-border text-sm"
                      />
                      <input
                        type="text"
                        placeholder="Téléphone"
                        value={ministreForm.telephone}
                        onChange={(e) =>
                          setMinistreForm({
                            ...ministreForm,
                            telephone: e.target.value,
                          })
                        }
                        className="px-3 py-2 rounded-lg border border-border text-sm"
                      />
                      <input
                        type="email"
                        placeholder="Email"
                        value={ministreForm.email}
                        onChange={(e) =>
                          setMinistreForm({
                            ...ministreForm,
                            email: e.target.value,
                          })
                        }
                        className="px-3 py-2 rounded-lg border border-border text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Biographie
                      </label>
                      <textarea
                        placeholder="Biographie du ministre..."
                        value={ministreForm.biographie}
                        onChange={(e) =>
                          setMinistreForm({
                            ...ministreForm,
                            biographie: e.target.value,
                          })
                        }
                        rows={3}
                        className="w-full px-3 py-2 rounded-lg border border-border text-sm"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          createMinistreMutation.mutate({
                            gouvernoratId: gouvernorat.id,
                            nom: ministreForm.nom,
                            portefeuille: ministreForm.portefeuille,
                            type: "MINISTRE",
                            photoUrl: ministreForm.photoUrl || undefined,
                            telephone: ministreForm.telephone || undefined,
                            email: ministreForm.email || undefined,
                            biographie: ministreForm.biographie || undefined,
                            ordre: ministreForm.ordre,
                          })
                        }
                        disabled={
                          !ministreForm.nom ||
                          !ministreForm.portefeuille ||
                          createMinistreMutation.isPending
                        }
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
                      >
                        <Save className="w-3.5 h-3.5" /> Créer
                      </button>
                      <button
                        onClick={() => setShowAddMinistre(false)}
                        className="px-3 py-1.5 border border-border rounded-lg text-sm hover:bg-gray-50"
                      >
                        Annuler
                      </button>
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  {gouvernorat?.ministres
                    ?.filter((m: any) => m.type !== "COMMISSAIRE_GENERAL")
                    .map((m: any) => (
                      <div
                        key={m.id}
                        className="border border-border rounded-xl p-4"
                      >
                        {editingMinistreId === m.id ? (
                          <div className="space-y-3">
                            <CloudinaryUpload
                              value={ministreForm.photoUrl}
                              onChange={(url) =>
                                setMinistreForm({
                                  ...ministreForm,
                                  photoUrl: url,
                                })
                              }
                              label="Photo"
                              size="sm"
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <input
                                type="text"
                                value={ministreForm.nom}
                                onChange={(e) =>
                                  setMinistreForm({
                                    ...ministreForm,
                                    nom: e.target.value,
                                  })
                                }
                                className="px-3 py-2 rounded-lg border border-border text-sm"
                                placeholder="Nom"
                              />
                              <input
                                type="text"
                                value={ministreForm.portefeuille}
                                onChange={(e) =>
                                  setMinistreForm({
                                    ...ministreForm,
                                    portefeuille: e.target.value,
                                  })
                                }
                                className="px-3 py-2 rounded-lg border border-border text-sm"
                                placeholder="Portefeuille"
                              />
                              <input
                                type="text"
                                value={ministreForm.telephone}
                                onChange={(e) =>
                                  setMinistreForm({
                                    ...ministreForm,
                                    telephone: e.target.value,
                                  })
                                }
                                className="px-3 py-2 rounded-lg border border-border text-sm"
                                placeholder="Téléphone"
                              />
                              <input
                                type="email"
                                value={ministreForm.email}
                                onChange={(e) =>
                                  setMinistreForm({
                                    ...ministreForm,
                                    email: e.target.value,
                                  })
                                }
                                className="px-3 py-2 rounded-lg border border-border text-sm"
                                placeholder="Email"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">
                                Biographie
                              </label>
                              <textarea
                                value={ministreForm.biographie}
                                onChange={(e) =>
                                  setMinistreForm({
                                    ...ministreForm,
                                    biographie: e.target.value,
                                  })
                                }
                                rows={3}
                                className="w-full px-3 py-2 rounded-lg border border-border text-sm"
                                placeholder="Biographie..."
                              />
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() =>
                                  updateMinistreMutation.mutate({
                                    id: m.id,
                                    nom: ministreForm.nom || undefined,
                                    portefeuille:
                                      ministreForm.portefeuille || undefined,
                                    photoUrl:
                                      ministreForm.photoUrl || undefined,
                                    telephone:
                                      ministreForm.telephone || undefined,
                                    email: ministreForm.email || undefined,
                                    biographie:
                                      ministreForm.biographie || undefined,
                                  })
                                }
                                disabled={updateMinistreMutation.isPending}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white rounded-lg text-sm font-medium disabled:opacity-50"
                              >
                                <Save className="w-3.5 h-3.5" /> Enregistrer
                              </button>
                              <button
                                onClick={() => setEditingMinistreId(null)}
                                className="px-3 py-1.5 border border-border rounded-lg text-sm hover:bg-gray-50"
                              >
                                Annuler
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center gap-3">
                            {m.photoUrl ? (
                              <img
                                src={m.photoUrl}
                                alt={m.nom}
                                className="w-12 h-12 rounded-xl object-cover"
                              />
                            ) : (
                              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                                {m.nom?.charAt(0)}
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-sm">{m.nom}</h4>
                              <p className="text-xs text-primary">
                                {m.portefeuille}
                              </p>
                              {m.biographie && (
                                <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-1">
                                  {m.biographie}
                                </p>
                              )}
                              <div className="flex gap-2 mt-0.5 text-[11px] text-muted-foreground">
                                {m.telephone && (
                                  <span>
                                    <Phone className="w-3 h-3 inline" />{" "}
                                    {m.telephone}
                                  </span>
                                )}
                                {m.email && (
                                  <span>
                                    <Mail className="w-3 h-3 inline" />{" "}
                                    {m.email}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="flex gap-1">
                              <button
                                onClick={() => {
                                  setMinistreForm({
                                    nom: m.nom || "",
                                    portefeuille: m.portefeuille || "",
                                    type: m.type || "MINISTRE",
                                    photoUrl: m.photoUrl || "",
                                    telephone: m.telephone || "",
                                    email: m.email || "",
                                    biographie: m.biographie || "",
                                    ordre: m.ordre || 0,
                                  });
                                  setEditingMinistreId(m.id);
                                }}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                title="Modifier"
                              >
                                <Edit3 className="w-4 h-4 text-muted-foreground" />
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm("Supprimer ce ministre ?"))
                                    deleteMinistreMutation.mutate({ id: m.id });
                                }}
                                className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                                title="Supprimer"
                              >
                                <Trash2 className="w-4 h-4 text-red-500" />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  {(!gouvernorat?.ministres ||
                    gouvernorat.ministres.filter(
                      (m: any) => m.type !== "COMMISSAIRE_GENERAL",
                    ).length === 0) && (
                    <p className="text-sm text-muted-foreground text-center py-6">
                      Aucun ministre configuré
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* COMMISSAIRES GENERAUX SUB-TAB */}
            {villeSubTab === "commissaires" && (
              <div className="bg-white rounded-xl border border-border p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-foreground flex items-center gap-2">
                    <Star className="w-5 h-5 text-amber-500" />
                    Commissaires Généraux
                    {gouvernorat?.ministres && (
                      <span className="text-sm font-normal text-muted-foreground">
                        (
                        {
                          gouvernorat.ministres.filter(
                            (m: any) => m.type === "COMMISSAIRE_GENERAL",
                          ).length
                        }
                        )
                      </span>
                    )}
                  </h3>
                  {gouvernorat && (
                    <button
                      onClick={() => {
                        setShowAddMinistre(true);
                        setMinistreForm({
                          nom: "",
                          portefeuille: "",
                          type: "COMMISSAIRE_GENERAL",
                          photoUrl: "",
                          telephone: "",
                          email: "",
                          biographie: "",
                          ordre: (gouvernorat.ministres?.length || 0) + 1,
                        });
                      }}
                      className="flex items-center gap-1.5 text-sm text-white bg-amber-600 hover:bg-amber-700 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      <Plus className="w-4 h-4" /> Ajouter un Commissaire
                    </button>
                  )}
                </div>

                {showAddMinistre &&
                  gouvernorat &&
                  ministreForm.type === "COMMISSAIRE_GENERAL" && (
                    <div className="bg-amber-50 rounded-xl p-4 mb-4 space-y-3">
                      <h4 className="text-sm font-semibold text-amber-800">
                        Nouveau Commissaire Général
                      </h4>
                      <CloudinaryUpload
                        value={ministreForm.photoUrl}
                        onChange={(url) =>
                          setMinistreForm({ ...ministreForm, photoUrl: url })
                        }
                        label="Photo"
                        size="sm"
                      />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="Nom complet"
                          value={ministreForm.nom}
                          onChange={(e) =>
                            setMinistreForm({
                              ...ministreForm,
                              nom: e.target.value,
                            })
                          }
                          className="px-3 py-2 rounded-lg border border-border text-sm"
                        />
                        <input
                          type="text"
                          placeholder="Portefeuille / Fonction"
                          value={ministreForm.portefeuille}
                          onChange={(e) =>
                            setMinistreForm({
                              ...ministreForm,
                              portefeuille: e.target.value,
                            })
                          }
                          className="px-3 py-2 rounded-lg border border-border text-sm"
                        />
                        <input
                          type="text"
                          placeholder="Téléphone"
                          value={ministreForm.telephone}
                          onChange={(e) =>
                            setMinistreForm({
                              ...ministreForm,
                              telephone: e.target.value,
                            })
                          }
                          className="px-3 py-2 rounded-lg border border-border text-sm"
                        />
                        <input
                          type="email"
                          placeholder="Email"
                          value={ministreForm.email}
                          onChange={(e) =>
                            setMinistreForm({
                              ...ministreForm,
                              email: e.target.value,
                            })
                          }
                          className="px-3 py-2 rounded-lg border border-border text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Biographie
                        </label>
                        <textarea
                          placeholder="Biographie..."
                          value={ministreForm.biographie}
                          onChange={(e) =>
                            setMinistreForm({
                              ...ministreForm,
                              biographie: e.target.value,
                            })
                          }
                          rows={3}
                          className="w-full px-3 py-2 rounded-lg border border-border text-sm"
                        />
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            createMinistreMutation.mutate({
                              gouvernoratId: gouvernorat.id,
                              nom: ministreForm.nom,
                              portefeuille: ministreForm.portefeuille,
                              type: "COMMISSAIRE_GENERAL",
                              photoUrl: ministreForm.photoUrl || undefined,
                              telephone: ministreForm.telephone || undefined,
                              email: ministreForm.email || undefined,
                              biographie: ministreForm.biographie || undefined,
                              ordre: ministreForm.ordre,
                            })
                          }
                          disabled={
                            !ministreForm.nom ||
                            !ministreForm.portefeuille ||
                            createMinistreMutation.isPending
                          }
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-600 text-white rounded-lg text-sm font-medium hover:bg-amber-700 disabled:opacity-50"
                        >
                          <Save className="w-3.5 h-3.5" /> Créer
                        </button>
                        <button
                          onClick={() => setShowAddMinistre(false)}
                          className="px-3 py-1.5 border border-border rounded-lg text-sm hover:bg-gray-50"
                        >
                          Annuler
                        </button>
                      </div>
                    </div>
                  )}

                <div className="space-y-3">
                  {gouvernorat?.ministres
                    ?.filter((m: any) => m.type === "COMMISSAIRE_GENERAL")
                    .map((m: any) => (
                      <div
                        key={m.id}
                        className="border border-border rounded-xl p-4"
                      >
                        {editingMinistreId === m.id ? (
                          <div className="space-y-3">
                            <CloudinaryUpload
                              value={ministreForm.photoUrl}
                              onChange={(url) =>
                                setMinistreForm({
                                  ...ministreForm,
                                  photoUrl: url,
                                })
                              }
                              label="Photo"
                              size="sm"
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <input
                                type="text"
                                value={ministreForm.nom}
                                onChange={(e) =>
                                  setMinistreForm({
                                    ...ministreForm,
                                    nom: e.target.value,
                                  })
                                }
                                className="px-3 py-2 rounded-lg border border-border text-sm"
                                placeholder="Nom"
                              />
                              <input
                                type="text"
                                value={ministreForm.portefeuille}
                                onChange={(e) =>
                                  setMinistreForm({
                                    ...ministreForm,
                                    portefeuille: e.target.value,
                                  })
                                }
                                className="px-3 py-2 rounded-lg border border-border text-sm"
                                placeholder="Fonction"
                              />
                              <input
                                type="text"
                                value={ministreForm.telephone}
                                onChange={(e) =>
                                  setMinistreForm({
                                    ...ministreForm,
                                    telephone: e.target.value,
                                  })
                                }
                                className="px-3 py-2 rounded-lg border border-border text-sm"
                                placeholder="Téléphone"
                              />
                              <input
                                type="email"
                                value={ministreForm.email}
                                onChange={(e) =>
                                  setMinistreForm({
                                    ...ministreForm,
                                    email: e.target.value,
                                  })
                                }
                                className="px-3 py-2 rounded-lg border border-border text-sm"
                                placeholder="Email"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">
                                Biographie
                              </label>
                              <textarea
                                value={ministreForm.biographie}
                                onChange={(e) =>
                                  setMinistreForm({
                                    ...ministreForm,
                                    biographie: e.target.value,
                                  })
                                }
                                rows={3}
                                className="w-full px-3 py-2 rounded-lg border border-border text-sm"
                                placeholder="Biographie..."
                              />
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() =>
                                  updateMinistreMutation.mutate({
                                    id: m.id,
                                    nom: ministreForm.nom || undefined,
                                    portefeuille:
                                      ministreForm.portefeuille || undefined,
                                    photoUrl:
                                      ministreForm.photoUrl || undefined,
                                    telephone:
                                      ministreForm.telephone || undefined,
                                    email: ministreForm.email || undefined,
                                    biographie:
                                      ministreForm.biographie || undefined,
                                  })
                                }
                                disabled={updateMinistreMutation.isPending}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white rounded-lg text-sm font-medium disabled:opacity-50"
                              >
                                <Save className="w-3.5 h-3.5" /> Enregistrer
                              </button>
                              <button
                                onClick={() => setEditingMinistreId(null)}
                                className="px-3 py-1.5 border border-border rounded-lg text-sm hover:bg-gray-50"
                              >
                                Annuler
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center gap-3">
                            {m.photoUrl ? (
                              <img
                                src={m.photoUrl}
                                alt={m.nom}
                                className="w-12 h-12 rounded-xl object-cover"
                              />
                            ) : (
                              <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 font-bold">
                                {m.nom?.charAt(0)}
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-sm">{m.nom}</h4>
                              <p className="text-xs text-amber-600">
                                {m.portefeuille}
                              </p>
                              {m.biographie && (
                                <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-1">
                                  {m.biographie}
                                </p>
                              )}
                              <div className="flex gap-2 mt-0.5 text-[11px] text-muted-foreground">
                                {m.telephone && (
                                  <span>
                                    <Phone className="w-3 h-3 inline" />{" "}
                                    {m.telephone}
                                  </span>
                                )}
                                {m.email && (
                                  <span>
                                    <Mail className="w-3 h-3 inline" />{" "}
                                    {m.email}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="flex gap-1">
                              <button
                                onClick={() => {
                                  setMinistreForm({
                                    nom: m.nom || "",
                                    portefeuille: m.portefeuille || "",
                                    type: m.type || "COMMISSAIRE_GENERAL",
                                    photoUrl: m.photoUrl || "",
                                    telephone: m.telephone || "",
                                    email: m.email || "",
                                    biographie: m.biographie || "",
                                    ordre: m.ordre || 0,
                                  });
                                  setEditingMinistreId(m.id);
                                }}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                title="Modifier"
                              >
                                <Edit3 className="w-4 h-4 text-muted-foreground" />
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm("Supprimer ce commissaire ?"))
                                    deleteMinistreMutation.mutate({ id: m.id });
                                }}
                                className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                                title="Supprimer"
                              >
                                <Trash2 className="w-4 h-4 text-red-500" />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  {(!gouvernorat?.ministres ||
                    gouvernorat.ministres.filter(
                      (m: any) => m.type === "COMMISSAIRE_GENERAL",
                    ).length === 0) && (
                    <p className="text-sm text-muted-foreground text-center py-6">
                      Aucun commissaire général configuré
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* ASSEMBLEE PROVINCIALE SUB-TAB */}
            {villeSubTab === "assemblee" && (
              <div className="bg-white rounded-xl border border-border p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-foreground flex items-center gap-2">
                    <Users className="w-5 h-5 text-emerald-500" />
                    Députés Provinciaux
                    {deputes && (
                      <span className="text-sm font-normal text-muted-foreground">
                        ({deputes.total})
                      </span>
                    )}
                  </h3>
                  <button
                    onClick={() => {
                      setShowAddDepute(true);
                      setDeputeForm({
                        nom: "",
                        parti: "",
                        circonscription: "",
                        photoUrl: "",
                        telephone: "",
                        email: "",
                        biographie: "",
                      });
                    }}
                    className="flex items-center gap-1.5 text-sm text-white bg-emerald-600 hover:bg-emerald-700 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <Plus className="w-4 h-4" /> Ajouter
                  </button>
                </div>

                {showAddDepute && (
                  <div className="bg-emerald-50 rounded-xl p-4 mb-4 space-y-3">
                    <h4 className="text-sm font-semibold text-emerald-800">
                      Nouveau Député
                    </h4>
                    <CloudinaryUpload
                      value={deputeForm.photoUrl}
                      onChange={(url) =>
                        setDeputeForm({ ...deputeForm, photoUrl: url })
                      }
                      label="Photo"
                      size="sm"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <input
                        type="text"
                        placeholder="Nom complet"
                        value={deputeForm.nom}
                        onChange={(e) =>
                          setDeputeForm({ ...deputeForm, nom: e.target.value })
                        }
                        className="px-3 py-2 rounded-lg border border-border text-sm"
                      />
                      <input
                        type="text"
                        placeholder="Parti politique"
                        value={deputeForm.parti}
                        onChange={(e) =>
                          setDeputeForm({
                            ...deputeForm,
                            parti: e.target.value,
                          })
                        }
                        className="px-3 py-2 rounded-lg border border-border text-sm"
                      />
                      <input
                        type="text"
                        placeholder="Circonscription"
                        value={deputeForm.circonscription}
                        onChange={(e) =>
                          setDeputeForm({
                            ...deputeForm,
                            circonscription: e.target.value,
                          })
                        }
                        className="px-3 py-2 rounded-lg border border-border text-sm"
                      />
                      <input
                        type="text"
                        placeholder="Téléphone"
                        value={deputeForm.telephone}
                        onChange={(e) =>
                          setDeputeForm({
                            ...deputeForm,
                            telephone: e.target.value,
                          })
                        }
                        className="px-3 py-2 rounded-lg border border-border text-sm"
                      />
                      <input
                        type="email"
                        placeholder="Email"
                        value={deputeForm.email}
                        onChange={(e) =>
                          setDeputeForm({
                            ...deputeForm,
                            email: e.target.value,
                          })
                        }
                        className="px-3 py-2 rounded-lg border border-border text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Biographie
                      </label>
                      <textarea
                        placeholder="Biographie du député..."
                        value={deputeForm.biographie}
                        onChange={(e) =>
                          setDeputeForm({
                            ...deputeForm,
                            biographie: e.target.value,
                          })
                        }
                        rows={3}
                        className="w-full px-3 py-2 rounded-lg border border-border text-sm"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          createDeputeMutation.mutate({
                            nom: deputeForm.nom,
                            parti: deputeForm.parti || undefined,
                            circonscription:
                              deputeForm.circonscription || undefined,
                            photoUrl: deputeForm.photoUrl || undefined,
                            telephone: deputeForm.telephone || undefined,
                            email: deputeForm.email || undefined,
                            biographie: deputeForm.biographie || undefined,
                          })
                        }
                        disabled={
                          !deputeForm.nom || createDeputeMutation.isPending
                        }
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 disabled:opacity-50"
                      >
                        <Save className="w-3.5 h-3.5" /> Créer
                      </button>
                      <button
                        onClick={() => setShowAddDepute(false)}
                        className="px-3 py-1.5 border border-border rounded-lg text-sm hover:bg-gray-50"
                      >
                        Annuler
                      </button>
                    </div>
                  </div>
                )}

                {loadingDeputes ? (
                  <div className="flex justify-center py-10">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {deputes?.items.map((d) => (
                      <div
                        key={d.id}
                        className="border border-border rounded-xl p-4"
                      >
                        {editingDeputeId === d.id ? (
                          <div className="space-y-3">
                            <CloudinaryUpload
                              value={deputeForm.photoUrl}
                              onChange={(url) =>
                                setDeputeForm({ ...deputeForm, photoUrl: url })
                              }
                              label="Photo"
                              size="sm"
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <input
                                type="text"
                                value={deputeForm.nom}
                                onChange={(e) =>
                                  setDeputeForm({
                                    ...deputeForm,
                                    nom: e.target.value,
                                  })
                                }
                                className="px-3 py-2 rounded-lg border border-border text-sm"
                                placeholder="Nom"
                              />
                              <input
                                type="text"
                                value={deputeForm.parti}
                                onChange={(e) =>
                                  setDeputeForm({
                                    ...deputeForm,
                                    parti: e.target.value,
                                  })
                                }
                                className="px-3 py-2 rounded-lg border border-border text-sm"
                                placeholder="Parti"
                              />
                              <input
                                type="text"
                                value={deputeForm.circonscription}
                                onChange={(e) =>
                                  setDeputeForm({
                                    ...deputeForm,
                                    circonscription: e.target.value,
                                  })
                                }
                                className="px-3 py-2 rounded-lg border border-border text-sm"
                                placeholder="Circonscription"
                              />
                              <input
                                type="text"
                                value={deputeForm.telephone}
                                onChange={(e) =>
                                  setDeputeForm({
                                    ...deputeForm,
                                    telephone: e.target.value,
                                  })
                                }
                                className="px-3 py-2 rounded-lg border border-border text-sm"
                                placeholder="Téléphone"
                              />
                              <input
                                type="email"
                                value={deputeForm.email}
                                onChange={(e) =>
                                  setDeputeForm({
                                    ...deputeForm,
                                    email: e.target.value,
                                  })
                                }
                                className="px-3 py-2 rounded-lg border border-border text-sm"
                                placeholder="Email"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">
                                Biographie
                              </label>
                              <textarea
                                value={deputeForm.biographie}
                                onChange={(e) =>
                                  setDeputeForm({
                                    ...deputeForm,
                                    biographie: e.target.value,
                                  })
                                }
                                rows={3}
                                className="w-full px-3 py-2 rounded-lg border border-border text-sm"
                                placeholder="Biographie..."
                              />
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() =>
                                  updateDeputeMutation.mutate({
                                    id: d.id,
                                    nom: deputeForm.nom || undefined,
                                    parti: deputeForm.parti || undefined,
                                    circonscription:
                                      deputeForm.circonscription || undefined,
                                    photoUrl: deputeForm.photoUrl || undefined,
                                    telephone:
                                      deputeForm.telephone || undefined,
                                    email: deputeForm.email || undefined,
                                    biographie:
                                      deputeForm.biographie || undefined,
                                  })
                                }
                                disabled={updateDeputeMutation.isPending}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white rounded-lg text-sm font-medium disabled:opacity-50"
                              >
                                <Save className="w-3.5 h-3.5" /> Enregistrer
                              </button>
                              <button
                                onClick={() => setEditingDeputeId(null)}
                                className="px-3 py-1.5 border border-border rounded-lg text-sm hover:bg-gray-50"
                              >
                                Annuler
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center gap-3">
                            {d.photoUrl ? (
                              <img
                                src={d.photoUrl}
                                alt={d.nom}
                                className="w-11 h-11 rounded-full object-cover"
                              />
                            ) : (
                              <div className="w-11 h-11 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold">
                                {d.nom?.charAt(0)}
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-sm">{d.nom}</h4>
                              {d.parti && (
                                <span className="text-[11px] px-1.5 py-0.5 bg-primary/10 text-primary rounded-md">
                                  {d.parti}
                                </span>
                              )}
                              {d.circonscription && (
                                <p className="text-[11px] text-muted-foreground mt-0.5">
                                  {d.circonscription}
                                </p>
                              )}
                              {(d as any).biographie && (
                                <p className="text-[11px] text-muted-foreground line-clamp-1">
                                  {(d as any).biographie}
                                </p>
                              )}
                            </div>
                            <div className="flex gap-1">
                              <button
                                onClick={() => {
                                  setDeputeForm({
                                    nom: d.nom || "",
                                    parti: d.parti || "",
                                    circonscription: d.circonscription || "",
                                    photoUrl: d.photoUrl || "",
                                    telephone: d.telephone || "",
                                    email: d.email || "",
                                    biographie: (d as any).biographie || "",
                                  });
                                  setEditingDeputeId(d.id);
                                }}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                title="Modifier"
                              >
                                <Edit3 className="w-4 h-4 text-muted-foreground" />
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm("Supprimer ce député ?"))
                                    deleteDeputeMutation.mutate({ id: d.id });
                                }}
                                className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                                title="Supprimer"
                              >
                                <Trash2 className="w-4 h-4 text-red-500" />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                    {(!deputes?.items || deputes.items.length === 0) && (
                      <p className="text-sm text-muted-foreground text-center py-6 col-span-2">
                        Aucun député configuré
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* GOUVERNEURS HISTORIQUES SUB-TAB */}
            {villeSubTab === "historique" && (
              <div className="bg-white rounded-xl border border-border p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-foreground flex items-center gap-2">
                    <ScrollText className="w-5 h-5 text-purple-500" />
                    Gouverneurs Historiques
                    {gouverneursHist && (
                      <span className="text-sm font-normal text-muted-foreground">
                        ({gouverneursHist.length})
                      </span>
                    )}
                  </h3>
                  <button
                    onClick={() => {
                      setShowAddGouverneurHist(true);
                      setGouvHistForm({
                        nom: "",
                        photoUrl: "",
                        dateDebut: "",
                        dateFin: "",
                        biographie: "",
                        ordre: (gouverneursHist?.length || 0) + 1,
                      });
                    }}
                    className="flex items-center gap-1.5 text-sm text-white bg-purple-600 hover:bg-purple-700 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <Plus className="w-4 h-4" /> Ajouter
                  </button>
                </div>

                {showAddGouverneurHist && (
                  <div className="bg-purple-50 rounded-xl p-4 mb-4 space-y-3">
                    <h4 className="text-sm font-semibold text-purple-800">
                      Nouveau Gouverneur Historique
                    </h4>
                    <CloudinaryUpload
                      value={gouvHistForm.photoUrl}
                      onChange={(url) =>
                        setGouvHistForm({ ...gouvHistForm, photoUrl: url })
                      }
                      label="Photo"
                      size="sm"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <input
                        type="text"
                        placeholder="Nom complet"
                        value={gouvHistForm.nom}
                        onChange={(e) =>
                          setGouvHistForm({
                            ...gouvHistForm,
                            nom: e.target.value,
                          })
                        }
                        className="px-3 py-2 rounded-lg border border-border text-sm"
                      />
                      <input
                        type="text"
                        placeholder="Début de mandat (ex: 1960)"
                        value={gouvHistForm.dateDebut}
                        onChange={(e) =>
                          setGouvHistForm({
                            ...gouvHistForm,
                            dateDebut: e.target.value,
                          })
                        }
                        className="px-3 py-2 rounded-lg border border-border text-sm"
                      />
                      <input
                        type="text"
                        placeholder="Fin de mandat (ex: 1965)"
                        value={gouvHistForm.dateFin}
                        onChange={(e) =>
                          setGouvHistForm({
                            ...gouvHistForm,
                            dateFin: e.target.value,
                          })
                        }
                        className="px-3 py-2 rounded-lg border border-border text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Biographie
                      </label>
                      <textarea
                        placeholder="Biographie..."
                        value={gouvHistForm.biographie}
                        onChange={(e) =>
                          setGouvHistForm({
                            ...gouvHistForm,
                            biographie: e.target.value,
                          })
                        }
                        rows={3}
                        className="w-full px-3 py-2 rounded-lg border border-border text-sm"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          createGouvHistMutation.mutate({
                            nom: gouvHistForm.nom,
                            photoUrl: gouvHistForm.photoUrl || undefined,
                            dateDebut: gouvHistForm.dateDebut || undefined,
                            dateFin: gouvHistForm.dateFin || undefined,
                            biographie: gouvHistForm.biographie || undefined,
                            ordre: gouvHistForm.ordre,
                          })
                        }
                        disabled={
                          !gouvHistForm.nom || createGouvHistMutation.isPending
                        }
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 disabled:opacity-50"
                      >
                        <Save className="w-3.5 h-3.5" /> Créer
                      </button>
                      <button
                        onClick={() => setShowAddGouverneurHist(false)}
                        className="px-3 py-1.5 border border-border rounded-lg text-sm hover:bg-gray-50"
                      >
                        Annuler
                      </button>
                    </div>
                  </div>
                )}

                {loadingGouvHist ? (
                  <div className="flex justify-center py-10">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" />
                  </div>
                ) : (
                  <div className="space-y-3">
                    {gouverneursHist?.map((g) => (
                      <div
                        key={g.id}
                        className="border border-border rounded-xl p-4"
                      >
                        {editingGouvHistId === g.id ? (
                          <div className="space-y-3">
                            <CloudinaryUpload
                              value={gouvHistForm.photoUrl}
                              onChange={(url) =>
                                setGouvHistForm({
                                  ...gouvHistForm,
                                  photoUrl: url,
                                })
                              }
                              label="Photo"
                              size="sm"
                            />
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                              <input
                                type="text"
                                value={gouvHistForm.nom}
                                onChange={(e) =>
                                  setGouvHistForm({
                                    ...gouvHistForm,
                                    nom: e.target.value,
                                  })
                                }
                                className="px-3 py-2 rounded-lg border border-border text-sm"
                                placeholder="Nom"
                              />
                              <input
                                type="text"
                                value={gouvHistForm.dateDebut}
                                onChange={(e) =>
                                  setGouvHistForm({
                                    ...gouvHistForm,
                                    dateDebut: e.target.value,
                                  })
                                }
                                className="px-3 py-2 rounded-lg border border-border text-sm"
                                placeholder="Début mandat"
                              />
                              <input
                                type="text"
                                value={gouvHistForm.dateFin}
                                onChange={(e) =>
                                  setGouvHistForm({
                                    ...gouvHistForm,
                                    dateFin: e.target.value,
                                  })
                                }
                                className="px-3 py-2 rounded-lg border border-border text-sm"
                                placeholder="Fin mandat"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">
                                Biographie
                              </label>
                              <textarea
                                value={gouvHistForm.biographie}
                                onChange={(e) =>
                                  setGouvHistForm({
                                    ...gouvHistForm,
                                    biographie: e.target.value,
                                  })
                                }
                                rows={3}
                                className="w-full px-3 py-2 rounded-lg border border-border text-sm"
                                placeholder="Biographie..."
                              />
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() =>
                                  updateGouvHistMutation.mutate({
                                    id: g.id,
                                    nom: gouvHistForm.nom || undefined,
                                    photoUrl:
                                      gouvHistForm.photoUrl || undefined,
                                    dateDebut:
                                      gouvHistForm.dateDebut || undefined,
                                    dateFin: gouvHistForm.dateFin || undefined,
                                    biographie:
                                      gouvHistForm.biographie || undefined,
                                  })
                                }
                                disabled={updateGouvHistMutation.isPending}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white rounded-lg text-sm font-medium disabled:opacity-50"
                              >
                                <Save className="w-3.5 h-3.5" /> Enregistrer
                              </button>
                              <button
                                onClick={() => setEditingGouvHistId(null)}
                                className="px-3 py-1.5 border border-border rounded-lg text-sm hover:bg-gray-50"
                              >
                                Annuler
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center gap-4">
                            {g.photoUrl ? (
                              <img
                                src={g.photoUrl}
                                alt={g.nom}
                                className="w-14 h-14 rounded-xl object-cover"
                              />
                            ) : (
                              <div className="w-14 h-14 rounded-xl bg-purple-100 flex items-center justify-center text-purple-700 font-bold text-lg">
                                {g.nom?.charAt(0)}
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold">{g.nom}</h4>
                              <p className="text-sm text-purple-600">
                                {g.dateDebut && g.dateFin
                                  ? `${g.dateDebut} — ${g.dateFin}`
                                  : g.dateDebut
                                    ? `Depuis ${g.dateDebut}`
                                    : ""}
                              </p>
                              {g.biographie && (
                                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                  {g.biographie}
                                </p>
                              )}
                            </div>
                            <div className="flex gap-1">
                              <button
                                onClick={() => {
                                  setGouvHistForm({
                                    nom: g.nom || "",
                                    photoUrl: g.photoUrl || "",
                                    dateDebut: g.dateDebut || "",
                                    dateFin: g.dateFin || "",
                                    biographie: g.biographie || "",
                                    ordre: g.ordre || 0,
                                  });
                                  setEditingGouvHistId(g.id);
                                }}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                title="Modifier"
                              >
                                <Edit3 className="w-4 h-4 text-muted-foreground" />
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm("Supprimer ce gouverneur ?"))
                                    deleteGouvHistMutation.mutate({ id: g.id });
                                }}
                                className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                                title="Supprimer"
                              >
                                <Trash2 className="w-4 h-4 text-red-500" />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                    {(!gouverneursHist || gouverneursHist.length === 0) && (
                      <p className="text-sm text-muted-foreground text-center py-6">
                        Aucun gouverneur historique configuré
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* LIEUX TAB */}
        {activeTab === "lieux" && <AdminLieuxTab />}

        {/* PROJETS TAB */}
        {activeTab === "projets" && <AdminProjetsTab />}

        {/* DOCUMENTS TAB */}
        {activeTab === "documents" && <AdminDocumentsTab />}

        {/* SERVICES TAB */}
        {activeTab === "services" && <AdminServicesTab />}

        {/* COMMUNES TAB */}
        {activeTab === "communes" && <AdminCommunesTab />}

        {/* SIGNALEMENTS TAB */}
        {activeTab === "signalements" && <AdminSignalementsTab />}

        {/* ALERTES TAB */}
        {activeTab === "alertes" && <AdminAlertesTab />}
      </main>
    </div>
  );
}

// ======================== ADMIN SUB-TABS ========================

const CATEGORIES = [
  "ETAT_CIVIL",
  "SANTE",
  "JUSTICE",
  "EDUCATION",
  "IMPOTS",
  "URGENCE",
  "SOCIAL",
  "TRANSPORT",
  "SECURITE",
  "AUTRE",
];

function AdminDocumentsTab() {
  const [search, setSearch] = useState("");
  const [editDoc, setEditDoc] = useState<any>(null);
  const [showCreate, setShowCreate] = useState(false);
  const { data, isLoading, error } = trpc.admin.getDocuments.useQuery({
    search: search || undefined,
  });
  const utils = trpc.useUtils();
  const deleteMut = trpc.admin.deleteDocument.useMutation({
    onSuccess: () => utils.admin.getDocuments.invalidate(),
    onError: (e) => alert("Erreur suppression: " + e.message),
  });
  const updateMut = trpc.admin.updateDocument.useMutation({
    onSuccess: () => {
      utils.admin.getDocuments.invalidate();
      setEditDoc(null);
    },
    onError: (e) => alert("Erreur mise à jour: " + e.message),
  });
  const createMut = trpc.admin.createDocument.useMutation({
    onSuccess: () => {
      utils.admin.getDocuments.invalidate();
      setShowCreate(false);
    },
    onError: (e) => alert("Erreur création: " + e.message),
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
          <ScrollText className="w-5 h-5 text-primary" />
          Documents référence ({data?.total || 0})
        </h3>
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm hover:bg-primary/90"
        >
          <Plus className="w-4 h-4" /> Nouveau document
        </button>
      </div>
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Rechercher un document..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border text-sm focus:ring-2 focus:ring-primary/20"
        />
      </div>
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">
          <strong>Erreur:</strong> {error.message}
        </div>
      )}
      {isLoading ? (
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-gray-50">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                    Nom
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                    Catégorie
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                    Prix
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                    Délai
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                    Commentaire
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                    Actif
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.items.map((doc: any) => (
                  <tr
                    key={doc.id}
                    className="border-b border-border hover:bg-gray-50"
                  >
                    <td className="py-3 px-4">
                      <p className="font-medium text-foreground">{doc.nom}</p>
                      <p className="text-xs text-muted-foreground">
                        {doc.slug}
                      </p>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                        {doc.categorie}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-xs">
                      {doc.prixEstimatif ? String(doc.prixEstimatif) : "—"}
                    </td>
                    <td className="py-3 px-4 text-xs">
                      {doc.delaiEstimatif || "—"}
                    </td>
                    <td className="py-3 px-4 text-xs max-w-[200px]">
                      <p className="truncate text-muted-foreground">
                        {doc.commentaire || "—"}
                      </p>
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() =>
                          updateMut.mutate({ id: doc.id, actif: !doc.actif })
                        }
                        className="text-muted-foreground hover:text-primary"
                      >
                        {doc.actif ? (
                          <ToggleRight className="w-5 h-5 text-emerald-500" />
                        ) : (
                          <ToggleLeft className="w-5 h-5" />
                        )}
                      </button>
                    </td>
                    <td className="py-3 px-4 flex items-center gap-1">
                      <button
                        onClick={() => setEditDoc(doc)}
                        className="p-1.5 hover:bg-blue-50 rounded-lg"
                        title="Modifier"
                      >
                        <Edit3 className="w-4 h-4 text-blue-500" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm("Supprimer ce document ?"))
                            deleteMut.mutate({ id: doc.id });
                        }}
                        className="p-1.5 hover:bg-red-50 rounded-lg"
                        title="Supprimer"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {(!data?.items || data.items.length === 0) && (
            <p className="text-sm text-muted-foreground text-center py-8">
              Aucun document trouvé
            </p>
          )}
        </div>
      )}

      {/* Edit Document Modal */}
      {editDoc && (
        <EditDocumentModal
          doc={editDoc}
          onClose={() => setEditDoc(null)}
          onSave={(vals) => updateMut.mutate({ id: editDoc.id, ...vals })}
          saving={updateMut.isPending}
        />
      )}

      {/* Create Document Modal */}
      {showCreate && (
        <EditDocumentModal
          doc={{
            nom: "",
            slug: "",
            categorie: "ETAT_CIVIL",
            description: "",
            definition: "",
            role: "",
            prixEstimatif: "",
            devise: "FC",
            delaiEstimatif: "",
            procedure: "",
            ouObtenir: "",
            conseils: "",
            baseJuridique: "",
            commentaire: "",
          }}
          onClose={() => setShowCreate(false)}
          onSave={(vals) => {
            if (!vals.nom) {
              alert("Le nom du document est requis");
              return;
            }
            const slug = (vals.nom || "document")
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/^-|-$/g, "");
            createMut.mutate({ ...vals, slug });
          }}
          saving={createMut.isPending}
          title="Nouveau document"
        />
      )}
    </div>
  );
}

function EditDocumentModal({
  doc,
  onClose,
  onSave,
  saving,
  title,
}: {
  doc: any;
  onClose: () => void;
  onSave: (vals: any) => void;
  saving: boolean;
  title?: string;
}) {
  const [form, setForm] = useState({
    nom: doc.nom || "",
    categorie: doc.categorie || "ETAT_CIVIL",
    description: doc.description || "",
    definition: doc.definition || "",
    role: doc.role || "",
    prixEstimatif: doc.prixEstimatif ? String(doc.prixEstimatif) : "",
    devise: doc.devise || "FC",
    delaiEstimatif: doc.delaiEstimatif || "",
    procedure: doc.procedure || "",
    ouObtenir: doc.ouObtenir || "",
    conseils: doc.conseils || "",
    baseJuridique: doc.baseJuridique || "",
    commentaire: doc.commentaire || "",
  });

  const upd = (key: string, val: string) =>
    setForm((p: any) => ({ ...p, [key]: val }));

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-white rounded-t-2xl z-10">
          <h3 className="text-lg font-bold text-foreground">
            {title || "Modifier le document"}
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground">
                Nom
              </label>
              <input
                value={form.nom}
                onChange={(e) => upd("nom", e.target.value)}
                className="w-full mt-1 px-3 py-2 rounded-lg border border-border text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">
                Catégorie
              </label>
              <select
                value={form.categorie}
                onChange={(e) => upd("categorie", e.target.value)}
                className="w-full mt-1 px-3 py-2 rounded-lg border border-border text-sm"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">
                Prix estimatif
              </label>
              <input
                value={form.prixEstimatif}
                onChange={(e) => upd("prixEstimatif", e.target.value)}
                className="w-full mt-1 px-3 py-2 rounded-lg border border-border text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">
                Devise
              </label>
              <input
                value={form.devise}
                onChange={(e) => upd("devise", e.target.value)}
                className="w-full mt-1 px-3 py-2 rounded-lg border border-border text-sm"
              />
            </div>
            <div className="col-span-2">
              <label className="text-xs font-medium text-muted-foreground">
                Délai estimatif
              </label>
              <input
                value={form.delaiEstimatif}
                onChange={(e) => upd("delaiEstimatif", e.target.value)}
                className="w-full mt-1 px-3 py-2 rounded-lg border border-border text-sm"
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) => upd("description", e.target.value)}
              rows={2}
              className="w-full mt-1 px-3 py-2 rounded-lg border border-border text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">
              Définition
            </label>
            <textarea
              value={form.definition}
              onChange={(e) => upd("definition", e.target.value)}
              rows={3}
              className="w-full mt-1 px-3 py-2 rounded-lg border border-border text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">
              Rôle
            </label>
            <textarea
              value={form.role}
              onChange={(e) => upd("role", e.target.value)}
              rows={2}
              className="w-full mt-1 px-3 py-2 rounded-lg border border-border text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">
              Procédure
            </label>
            <textarea
              value={form.procedure}
              onChange={(e) => upd("procedure", e.target.value)}
              rows={4}
              className="w-full mt-1 px-3 py-2 rounded-lg border border-border text-sm font-mono"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">
              Où obtenir
            </label>
            <textarea
              value={form.ouObtenir}
              onChange={(e) => upd("ouObtenir", e.target.value)}
              rows={2}
              className="w-full mt-1 px-3 py-2 rounded-lg border border-border text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">
              Conseils
            </label>
            <textarea
              value={form.conseils}
              onChange={(e) => upd("conseils", e.target.value)}
              rows={2}
              className="w-full mt-1 px-3 py-2 rounded-lg border border-border text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">
              Base juridique
            </label>
            <textarea
              value={form.baseJuridique}
              onChange={(e) => upd("baseJuridique", e.target.value)}
              rows={2}
              className="w-full mt-1 px-3 py-2 rounded-lg border border-border text-sm"
            />
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <label className="text-xs font-bold text-amber-700">
              💬 Commentaire admin
            </label>
            <textarea
              value={form.commentaire}
              onChange={(e) => upd("commentaire", e.target.value)}
              rows={3}
              placeholder="Ajoutez un commentaire interne (visible uniquement dans l'admin)..."
              className="w-full mt-2 px-3 py-2 rounded-lg border border-amber-200 text-sm bg-white"
            />
          </div>
        </div>
        <div className="flex gap-3 justify-end p-6 border-t border-border sticky bottom-0 bg-white rounded-b-2xl">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-border text-sm hover:bg-gray-50"
          >
            Annuler
          </button>
          <button
            onClick={() =>
              onSave({
                nom: form.nom,
                categorie: form.categorie,
                description: form.description || undefined,
                definition: form.definition || undefined,
                role: form.role || undefined,
                prixEstimatif: form.prixEstimatif || undefined,
                devise: form.devise || undefined,
                delaiEstimatif: form.delaiEstimatif || undefined,
                procedure: form.procedure || undefined,
                ouObtenir: form.ouObtenir || undefined,
                conseils: form.conseils || undefined,
                baseJuridique: form.baseJuridique || undefined,
                commentaire: form.commentaire || null,
              })
            }
            disabled={saving}
            className="px-4 py-2 rounded-lg bg-primary text-white text-sm hover:bg-primary/90 flex items-center gap-2 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? "Enregistrement..." : "Enregistrer"}
          </button>
        </div>
      </div>
    </div>
  );
}

function AdminServicesTab() {
  const [search, setSearch] = useState("");
  const [editSvc, setEditSvc] = useState<any>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [newSvc, setNewSvc] = useState({
    nomService: "",
    categorie: "ETAT_CIVIL",
    description: "",
    lieuId: "",
    prixOfficiel: 0,
    devise: "FC",
    delai: "",
    documentsRequis: "",
    procedure: "",
    conditionsParticulieres: "",
  });
  const { data, isLoading, error } = trpc.admin.getServices.useQuery({
    search: search || undefined,
  });
  const { data: lieuxData } = trpc.admin.getLieux.useQuery({});
  const utils = trpc.useUtils();
  const deleteMut = trpc.admin.deleteService.useMutation({
    onSuccess: () => utils.admin.getServices.invalidate(),
    onError: (e) => alert("Erreur suppression: " + e.message),
  });
  const updateMut = trpc.admin.updateService.useMutation({
    onSuccess: () => {
      utils.admin.getServices.invalidate();
      setEditSvc(null);
    },
    onError: (e) => alert("Erreur mise à jour: " + e.message),
  });
  const createMut = trpc.admin.createService.useMutation({
    onSuccess: () => {
      utils.admin.getServices.invalidate();
      setShowCreate(false);
      setNewSvc({
        nomService: "",
        categorie: "ETAT_CIVIL",
        description: "",
        lieuId: "",
        prixOfficiel: 0,
        devise: "FC",
        delai: "",
        documentsRequis: "",
        procedure: "",
        conditionsParticulieres: "",
      });
    },
    onError: (e) => alert("Erreur création: " + e.message),
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary" />
          Services ({data?.total || 0})
        </h3>
        <button
          onClick={() => setShowCreate(!showCreate)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm hover:bg-primary/90"
        >
          <Plus className="w-4 h-4" /> Nouveau service
        </button>
      </div>

      {/* Search bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Rechercher un service..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border text-sm focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {/* Inline Create Form */}
      {showCreate && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 space-y-3">
          <h4 className="font-bold text-sm text-blue-800">Créer un service</h4>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground">
                Nom du service *
              </label>
              <input
                value={newSvc.nomService}
                onChange={(e) =>
                  setNewSvc((p) => ({ ...p, nomService: e.target.value }))
                }
                className="w-full mt-1 px-3 py-2 rounded-lg border border-border text-sm"
                placeholder="Ex: Achat d'une parcelle"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">
                Catégorie *
              </label>
              <select
                value={newSvc.categorie}
                onChange={(e) =>
                  setNewSvc((p) => ({ ...p, categorie: e.target.value }))
                }
                className="w-full mt-1 px-3 py-2 rounded-lg border border-border text-sm"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">
                Lieu *
              </label>
              <select
                value={newSvc.lieuId}
                onChange={(e) =>
                  setNewSvc((p) => ({ ...p, lieuId: e.target.value }))
                }
                className="w-full mt-1 px-3 py-2 rounded-lg border border-border text-sm"
              >
                <option value="">-- Sélectionner un lieu --</option>
                {lieuxData?.items?.map((l: any) => (
                  <option key={l.id} value={l.id}>
                    {l.nom} ({l.type})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">
                Prix officiel
              </label>
              <input
                type="number"
                value={newSvc.prixOfficiel}
                onChange={(e) =>
                  setNewSvc((p) => ({
                    ...p,
                    prixOfficiel: Number(e.target.value),
                  }))
                }
                className="w-full mt-1 px-3 py-2 rounded-lg border border-border text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">
                Devise
              </label>
              <input
                value={newSvc.devise}
                onChange={(e) =>
                  setNewSvc((p) => ({ ...p, devise: e.target.value }))
                }
                className="w-full mt-1 px-3 py-2 rounded-lg border border-border text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">
                Délai
              </label>
              <input
                value={newSvc.delai}
                onChange={(e) =>
                  setNewSvc((p) => ({ ...p, delai: e.target.value }))
                }
                className="w-full mt-1 px-3 py-2 rounded-lg border border-border text-sm"
                placeholder="Ex: 3 à 5 jours"
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">
              Description
            </label>
            <textarea
              value={newSvc.description}
              onChange={(e) =>
                setNewSvc((p) => ({ ...p, description: e.target.value }))
              }
              rows={2}
              className="w-full mt-1 px-3 py-2 rounded-lg border border-border text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">
              Documents requis (un par ligne)
            </label>
            <textarea
              value={newSvc.documentsRequis}
              onChange={(e) =>
                setNewSvc((p) => ({ ...p, documentsRequis: e.target.value }))
              }
              rows={3}
              className="w-full mt-1 px-3 py-2 rounded-lg border border-border text-sm font-mono"
              placeholder={"Carte d'identité\nActe de naissance"}
            />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">
              Procédure
            </label>
            <textarea
              value={newSvc.procedure}
              onChange={(e) =>
                setNewSvc((p) => ({ ...p, procedure: e.target.value }))
              }
              rows={4}
              className="w-full mt-1 px-3 py-2 rounded-lg border border-border text-sm font-mono"
            />
          </div>
          <div className="flex gap-2 pt-2">
            <button
              onClick={() => setShowCreate(false)}
              className="px-4 py-2 rounded-lg border border-border text-sm hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              onClick={() => {
                if (!newSvc.nomService || !newSvc.lieuId) {
                  alert("Nom du service et lieu sont requis");
                  return;
                }
                createMut.mutate({
                  lieuId: newSvc.lieuId,
                  nomService: newSvc.nomService,
                  categorie: newSvc.categorie,
                  description: newSvc.description || undefined,
                  prixOfficiel:
                    newSvc.prixOfficiel > 0 ? newSvc.prixOfficiel : undefined,
                  devise: newSvc.devise,
                  delai: newSvc.delai || undefined,
                  documentsRequis: newSvc.documentsRequis
                    .split("\n")
                    .map((s) => s.trim())
                    .filter(Boolean),
                  procedure: newSvc.procedure || undefined,
                  conditionsParticulieres:
                    newSvc.conditionsParticulieres || undefined,
                });
              }}
              disabled={createMut.isPending}
              className="px-4 py-2 rounded-lg bg-primary text-white text-sm hover:bg-primary/90 disabled:opacity-50 flex items-center gap-2"
            >
              <Save className="w-4 h-4" />{" "}
              {createMut.isPending ? "Création..." : "Créer"}
            </button>
          </div>
        </div>
      )}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Rechercher un service..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border text-sm focus:ring-2 focus:ring-primary/20"
        />
      </div>
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">
          <strong>Erreur:</strong> {error.message}
        </div>
      )}
      {isLoading ? (
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-gray-50">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                    Nom du service
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                    Lieu
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                    Catégorie
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                    Prix
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                    Commentaire
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                    Actif
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.items.map((svc: any) => (
                  <tr
                    key={svc.id}
                    className="border-b border-border hover:bg-gray-50"
                  >
                    <td className="py-3 px-4 font-medium text-foreground max-w-[250px]">
                      <p className="truncate">{svc.nomService}</p>
                    </td>
                    <td className="py-3 px-4 text-xs text-muted-foreground">
                      {svc.lieu?.nom || "—"}
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                        {svc.categorie}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-xs">
                      {svc.prixOfficiel
                        ? `${Number(svc.prixOfficiel).toLocaleString()} ${svc.devise}`
                        : "—"}
                    </td>
                    <td className="py-3 px-4 text-xs max-w-[200px]">
                      <p className="truncate text-muted-foreground">
                        {svc.commentaire || "—"}
                      </p>
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() =>
                          updateMut.mutate({ id: svc.id, actif: !svc.actif })
                        }
                        className="text-muted-foreground hover:text-primary"
                      >
                        {svc.actif ? (
                          <ToggleRight className="w-5 h-5 text-emerald-500" />
                        ) : (
                          <ToggleLeft className="w-5 h-5" />
                        )}
                      </button>
                    </td>
                    <td className="py-3 px-4 flex items-center gap-1">
                      <button
                        onClick={() => setEditSvc(svc)}
                        className="p-1.5 hover:bg-blue-50 rounded-lg"
                        title="Modifier"
                      >
                        <Edit3 className="w-4 h-4 text-blue-500" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm("Supprimer ce service ?"))
                            deleteMut.mutate({ id: svc.id });
                        }}
                        className="p-1.5 hover:bg-red-50 rounded-lg"
                        title="Supprimer"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {(!data?.items || data.items.length === 0) && (
            <p className="text-sm text-muted-foreground text-center py-8">
              Aucun service trouvé
            </p>
          )}
        </div>
      )}

      {/* Edit Service Modal */}
      {editSvc && (
        <EditServiceModal
          svc={editSvc}
          onClose={() => setEditSvc(null)}
          onSave={(vals) => updateMut.mutate({ id: editSvc.id, ...vals })}
          saving={updateMut.isPending}
        />
      )}
    </div>
  );
}

function EditServiceModal({
  svc,
  onClose,
  onSave,
  saving,
}: {
  svc: any;
  onClose: () => void;
  onSave: (vals: any) => void;
  saving: boolean;
}) {
  const [form, setForm] = useState({
    nomService: svc.nomService || "",
    categorie: svc.categorie || "ETAT_CIVIL",
    description: svc.description || "",
    prixOfficiel: svc.prixOfficiel ? Number(svc.prixOfficiel) : 0,
    devise: svc.devise || "FC",
    delai: svc.delai || "",
    documentsRequis: (svc.documentsRequis || []).join("\n"),
    procedure: svc.procedure || "",
    conditionsParticulieres: svc.conditionsParticulieres || "",
    commentaire: svc.commentaire || "",
  });

  const upd = (key: string, val: any) =>
    setForm((p: any) => ({ ...p, [key]: val }));

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-white rounded-t-2xl z-10">
          <h3 className="text-lg font-bold text-foreground">
            Modifier le service
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="text-xs font-medium text-muted-foreground">
                Nom du service
              </label>
              <input
                value={form.nomService}
                onChange={(e) => upd("nomService", e.target.value)}
                className="w-full mt-1 px-3 py-2 rounded-lg border border-border text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">
                Catégorie
              </label>
              <select
                value={form.categorie}
                onChange={(e) => upd("categorie", e.target.value)}
                className="w-full mt-1 px-3 py-2 rounded-lg border border-border text-sm"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">
                Délai
              </label>
              <input
                value={form.delai}
                onChange={(e) => upd("delai", e.target.value)}
                className="w-full mt-1 px-3 py-2 rounded-lg border border-border text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">
                Prix officiel
              </label>
              <input
                type="number"
                value={form.prixOfficiel}
                onChange={(e) => upd("prixOfficiel", Number(e.target.value))}
                className="w-full mt-1 px-3 py-2 rounded-lg border border-border text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">
                Devise
              </label>
              <input
                value={form.devise}
                onChange={(e) => upd("devise", e.target.value)}
                className="w-full mt-1 px-3 py-2 rounded-lg border border-border text-sm"
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) => upd("description", e.target.value)}
              rows={3}
              className="w-full mt-1 px-3 py-2 rounded-lg border border-border text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">
              Documents requis (un par ligne)
            </label>
            <textarea
              value={form.documentsRequis}
              onChange={(e) => upd("documentsRequis", e.target.value)}
              rows={4}
              className="w-full mt-1 px-3 py-2 rounded-lg border border-border text-sm font-mono"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">
              Procédure
            </label>
            <textarea
              value={form.procedure}
              onChange={(e) => upd("procedure", e.target.value)}
              rows={6}
              className="w-full mt-1 px-3 py-2 rounded-lg border border-border text-sm font-mono"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">
              Conditions particulières
            </label>
            <textarea
              value={form.conditionsParticulieres}
              onChange={(e) => upd("conditionsParticulieres", e.target.value)}
              rows={4}
              className="w-full mt-1 px-3 py-2 rounded-lg border border-border text-sm"
            />
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <label className="text-xs font-bold text-amber-700">
              💬 Commentaire admin
            </label>
            <textarea
              value={form.commentaire}
              onChange={(e) => upd("commentaire", e.target.value)}
              rows={3}
              placeholder="Ajoutez un commentaire interne (visible uniquement dans l'admin)..."
              className="w-full mt-2 px-3 py-2 rounded-lg border border-amber-200 text-sm bg-white"
            />
          </div>
        </div>
        <div className="flex gap-3 justify-end p-6 border-t border-border sticky bottom-0 bg-white rounded-b-2xl">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-border text-sm hover:bg-gray-50"
          >
            Annuler
          </button>
          <button
            onClick={() =>
              onSave({
                nomService: form.nomService,
                categorie: form.categorie,
                description: form.description || undefined,
                prixOfficiel: form.prixOfficiel || undefined,
                devise: form.devise || undefined,
                delai: form.delai || undefined,
                documentsRequis: form.documentsRequis
                  .split("\n")
                  .map((s: string) => s.trim())
                  .filter(Boolean),
                procedure: form.procedure || undefined,
                conditionsParticulieres:
                  form.conditionsParticulieres || undefined,
                commentaire: form.commentaire || null,
              })
            }
            disabled={saving}
            className="px-4 py-2 rounded-lg bg-primary text-white text-sm hover:bg-primary/90 flex items-center gap-2 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? "Enregistrement..." : "Enregistrer"}
          </button>
        </div>
      </div>
    </div>
  );
}

function AdminLieuxTab() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const { data, isLoading, error } = trpc.admin.getLieux.useQuery({
    search: search || undefined,
    type: typeFilter || undefined,
  });
  const { data: communes } = trpc.admin.getCommunes.useQuery({});
  const utils = trpc.useUtils();
  const deleteMut = trpc.admin.deleteLieu.useMutation({
    onSuccess: () => {
      utils.admin.getLieux.invalidate();
      utils.admin.getStats.invalidate();
    },
    onError: (e) => alert("Erreur suppression: " + e.message),
  });
  const updateMut = trpc.admin.updateLieu.useMutation({
    onSuccess: () => utils.admin.getLieux.invalidate(),
    onError: (e) => alert("Erreur mise à jour: " + e.message),
  });
  const createMut = trpc.admin.createLieu.useMutation({
    onSuccess: () => {
      utils.admin.getLieux.invalidate();
      utils.admin.getStats.invalidate();
      setShowCreate(false);
      setNewLieu({
        nom: "",
        type: "ADMINISTRATION",
        communeId: "",
        adresse: "",
        telephone: "",
        responsable: "",
      });
    },
    onError: (e) => alert("Erreur création: " + e.message),
  });

  const [showCreate, setShowCreate] = useState(false);
  const [newLieu, setNewLieu] = useState({
    nom: "",
    type: "ADMINISTRATION",
    communeId: "",
    adresse: "",
    telephone: "",
    responsable: "",
  });
  const [editLieu, setEditLieu] = useState<any>(null);

  const lieuTypes = Object.entries(LIEU_TYPE_LABELS);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary" />
          Lieux ({data?.total || 0})
        </h3>
        <button
          onClick={() => setShowCreate(!showCreate)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm hover:bg-primary/90"
        >
          <Plus className="w-4 h-4" /> Nouveau lieu
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Rechercher un lieu..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border text-sm focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="px-3 py-2 rounded-xl border border-border text-sm"
        >
          <option value="">Tous les types</option>
          {lieuTypes.map(([val, label]) => (
            <option key={val} value={val}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {/* Create form */}
      {showCreate && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 space-y-3">
          <h4 className="font-bold text-sm text-emerald-800">Nouveau lieu</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground">
                Nom *
              </label>
              <input
                value={newLieu.nom}
                onChange={(e) =>
                  setNewLieu((p) => ({ ...p, nom: e.target.value }))
                }
                className="w-full mt-1 px-3 py-2 rounded-lg border border-border text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">
                Type *
              </label>
              <select
                value={newLieu.type}
                onChange={(e) =>
                  setNewLieu((p) => ({ ...p, type: e.target.value }))
                }
                className="w-full mt-1 px-3 py-2 rounded-lg border border-border text-sm"
              >
                {lieuTypes.map(([val, label]) => (
                  <option key={val} value={val}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">
                Commune
              </label>
              <select
                value={newLieu.communeId}
                onChange={(e) =>
                  setNewLieu((p) => ({ ...p, communeId: e.target.value }))
                }
                className="w-full mt-1 px-3 py-2 rounded-lg border border-border text-sm"
              >
                <option value="">— Aucune —</option>
                {communes?.items?.map((c: any) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">
                Adresse
              </label>
              <input
                value={newLieu.adresse}
                onChange={(e) =>
                  setNewLieu((p) => ({ ...p, adresse: e.target.value }))
                }
                className="w-full mt-1 px-3 py-2 rounded-lg border border-border text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">
                Téléphone
              </label>
              <input
                value={newLieu.telephone}
                onChange={(e) =>
                  setNewLieu((p) => ({ ...p, telephone: e.target.value }))
                }
                className="w-full mt-1 px-3 py-2 rounded-lg border border-border text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">
                Responsable
              </label>
              <input
                value={newLieu.responsable}
                onChange={(e) =>
                  setNewLieu((p) => ({ ...p, responsable: e.target.value }))
                }
                className="w-full mt-1 px-3 py-2 rounded-lg border border-border text-sm"
              />
            </div>
          </div>
          <div className="flex gap-2 pt-2">
            <button
              onClick={() => setShowCreate(false)}
              className="px-4 py-2 rounded-lg border border-border text-sm hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              onClick={() => {
                if (!newLieu.nom) return;
                createMut.mutate({
                  nom: newLieu.nom,
                  type: newLieu.type,
                  communeId: newLieu.communeId || undefined,
                  adresse: newLieu.adresse || undefined,
                  telephone: newLieu.telephone || undefined,
                  responsable: newLieu.responsable || undefined,
                  verified: true,
                });
              }}
              disabled={createMut.isPending}
              className="px-4 py-2 rounded-lg bg-primary text-white text-sm hover:bg-primary/90 disabled:opacity-50 flex items-center gap-2"
            >
              <Save className="w-4 h-4" />{" "}
              {createMut.isPending ? "Création..." : "Créer"}
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">
          <strong>Erreur:</strong> {error.message}
        </div>
      )}
      {isLoading ? (
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-gray-50">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                  Nom
                </th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                  Type
                </th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                  Commune
                </th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                  Adresse
                </th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                  Responsable
                </th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.items.map((l: any) => (
                <tr
                  key={l.id}
                  className="border-b border-border hover:bg-gray-50"
                >
                  {editLieu?.id === l.id ? (
                    <>
                      <td className="py-2 px-4">
                        <input
                          value={editLieu.nom}
                          onChange={(e) =>
                            setEditLieu((p: any) => ({
                              ...p,
                              nom: e.target.value,
                            }))
                          }
                          className="w-full px-2 py-1 rounded border border-border text-sm"
                        />
                      </td>
                      <td className="py-2 px-4">
                        <select
                          value={editLieu.type}
                          onChange={(e) =>
                            setEditLieu((p: any) => ({
                              ...p,
                              type: e.target.value,
                            }))
                          }
                          className="w-full px-2 py-1 rounded border border-border text-sm"
                        >
                          {lieuTypes.map(([val, label]) => (
                            <option key={val} value={val}>
                              {label}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="py-2 px-4 text-xs">
                        {l.commune?.name || "—"}
                      </td>
                      <td className="py-2 px-4">
                        <input
                          value={editLieu.adresse || ""}
                          onChange={(e) =>
                            setEditLieu((p: any) => ({
                              ...p,
                              adresse: e.target.value,
                            }))
                          }
                          className="w-full px-2 py-1 rounded border border-border text-sm"
                        />
                      </td>
                      <td className="py-2 px-4">
                        <input
                          value={editLieu.responsable || ""}
                          onChange={(e) =>
                            setEditLieu((p: any) => ({
                              ...p,
                              responsable: e.target.value,
                            }))
                          }
                          className="w-full px-2 py-1 rounded border border-border text-sm"
                        />
                      </td>
                      <td className="py-2 px-4 flex items-center gap-1">
                        <button
                          onClick={() => {
                            updateMut.mutate({
                              id: l.id,
                              nom: editLieu.nom,
                              type: editLieu.type,
                              adresse: editLieu.adresse || undefined,
                              responsable: editLieu.responsable || undefined,
                            });
                            setEditLieu(null);
                          }}
                          className="p-1.5 hover:bg-emerald-50 rounded-lg"
                        >
                          <Save className="w-4 h-4 text-emerald-600" />
                        </button>
                        <button
                          onClick={() => setEditLieu(null)}
                          className="p-1.5 hover:bg-gray-100 rounded-lg"
                        >
                          <X className="w-4 h-4 text-muted-foreground" />
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="py-3 px-4 font-medium text-foreground">
                        {l.nom}
                      </td>
                      <td className="py-3 px-4 text-xs">
                        {LIEU_TYPE_LABELS[
                          l.type as keyof typeof LIEU_TYPE_LABELS
                        ] || l.type}
                      </td>
                      <td className="py-3 px-4 text-xs">
                        {l.commune?.name || "—"}
                      </td>
                      <td className="py-3 px-4 text-xs">{l.adresse || "—"}</td>
                      <td className="py-3 px-4 text-xs">
                        {l.responsable || "—"}
                      </td>
                      <td className="py-3 px-4 flex items-center gap-1">
                        <button
                          onClick={() =>
                            setEditLieu({
                              id: l.id,
                              nom: l.nom,
                              type: l.type,
                              adresse: l.adresse,
                              responsable: l.responsable,
                            })
                          }
                          className="p-1.5 hover:bg-blue-50 rounded-lg"
                          title="Modifier"
                        >
                          <Edit3 className="w-4 h-4 text-blue-500" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm("Supprimer ce lieu ?"))
                              deleteMut.mutate({ id: l.id });
                          }}
                          className="p-1.5 hover:bg-red-50 rounded-lg"
                          title="Supprimer"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          {(!data?.items || data.items.length === 0) && (
            <p className="text-sm text-muted-foreground text-center py-8">
              Aucun lieu trouvé
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function AdminCommunesTab() {
  const [search, setSearch] = useState("");
  const {
    data: communes,
    isLoading,
    error,
  } = trpc.admin.getCommunes.useQuery({
    search: search || undefined,
  });
  const { data: districts } = trpc.admin.getDistricts.useQuery();
  const utils = trpc.useUtils();
  const deleteMut = trpc.admin.deleteCommune.useMutation({
    onSuccess: () => utils.admin.getCommunes.invalidate(),
    onError: (e) => alert("Erreur suppression: " + e.message),
  });
  const updateMut = trpc.admin.updateCommune.useMutation({
    onSuccess: () => utils.admin.getCommunes.invalidate(),
    onError: (e) => alert("Erreur mise à jour: " + e.message),
  });
  const createMut = trpc.admin.createCommune.useMutation({
    onSuccess: () => {
      utils.admin.getCommunes.invalidate();
      setShowCreate(false);
      setNewCommune({
        name: "",
        population: 0,
        superficie: 0,
        bourgmestre: "",
        districtId: "",
        description: "",
      });
    },
    onError: (e) => alert("Erreur création: " + e.message),
  });
  // District CRUD
  const createDistrictMut = trpc.admin.createDistrict.useMutation({
    onSuccess: () => {
      utils.admin.getDistricts.invalidate();
      setNewDistrict({ name: "", description: "" });
    },
    onError: (e) => alert("Erreur création district: " + e.message),
  });
  const updateDistrictMut = trpc.admin.updateDistrict.useMutation({
    onSuccess: () => {
      utils.admin.getDistricts.invalidate();
      setEditDistrict(null);
    },
    onError: (e) => alert("Erreur mise à jour district: " + e.message),
  });
  const deleteDistrictMut = trpc.admin.deleteDistrict.useMutation({
    onSuccess: () => utils.admin.getDistricts.invalidate(),
    onError: (e) => alert("Erreur suppression district: " + e.message),
  });

  const [showCreate, setShowCreate] = useState(false);
  const [newCommune, setNewCommune] = useState({
    name: "",
    population: 0,
    superficie: 0,
    bourgmestre: "",
    districtId: "",
    description: "",
  });
  const [editCommune, setEditCommune] = useState<any>(null);
  const [editDistrict, setEditDistrict] = useState<any>(null);
  const [newDistrict, setNewDistrict] = useState({ name: "", description: "" });
  const [showCreateDistrict, setShowCreateDistrict] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Building2 className="w-5 h-5 text-primary" />
          Communes ({communes?.total || 0}) & Districts (
          {districts?.length || 0})
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => setShowCreateDistrict(!showCreateDistrict)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border text-sm hover:bg-gray-50"
          >
            <Plus className="w-4 h-4" /> District
          </button>
          <button
            onClick={() => setShowCreate(!showCreate)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm hover:bg-primary/90"
          >
            <Plus className="w-4 h-4" /> Commune
          </button>
        </div>
      </div>

      {/* Search bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Rechercher une commune..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border text-sm focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {/* Create District inline */}
      {showCreateDistrict && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex gap-3 items-end">
          <div className="flex-1">
            <label className="text-xs font-medium text-muted-foreground">
              Nom du district *
            </label>
            <input
              value={newDistrict.name}
              onChange={(e) =>
                setNewDistrict((p) => ({ ...p, name: e.target.value }))
              }
              className="w-full mt-1 px-3 py-2 rounded-lg border border-border text-sm"
            />
          </div>
          <div className="flex-1">
            <label className="text-xs font-medium text-muted-foreground">
              Description
            </label>
            <input
              value={newDistrict.description}
              onChange={(e) =>
                setNewDistrict((p) => ({ ...p, description: e.target.value }))
              }
              className="w-full mt-1 px-3 py-2 rounded-lg border border-border text-sm"
            />
          </div>
          <button
            onClick={() => {
              if (newDistrict.name) createDistrictMut.mutate(newDistrict);
            }}
            disabled={createDistrictMut.isPending}
            className="px-4 py-2 rounded-lg bg-primary text-white text-sm hover:bg-primary/90 disabled:opacity-50"
          >
            Créer
          </button>
          <button
            onClick={() => setShowCreateDistrict(false)}
            className="px-3 py-2 rounded-lg border border-border text-sm hover:bg-gray-50"
          >
            Annuler
          </button>
        </div>
      )}

      {/* Districts overview with edit/delete */}
      {districts && districts.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {districts.map((d: any) => (
            <div
              key={d.id}
              className="bg-white rounded-xl border border-border p-4"
            >
              {editDistrict?.id === d.id ? (
                <div className="space-y-2">
                  <input
                    value={editDistrict.name}
                    onChange={(e) =>
                      setEditDistrict((p: any) => ({
                        ...p,
                        name: e.target.value,
                      }))
                    }
                    className="w-full px-2 py-1 rounded border border-border text-sm"
                  />
                  <input
                    value={editDistrict.description || ""}
                    onChange={(e) =>
                      setEditDistrict((p: any) => ({
                        ...p,
                        description: e.target.value,
                      }))
                    }
                    className="w-full px-2 py-1 rounded border border-border text-sm"
                    placeholder="Description"
                  />
                  <div className="flex gap-1">
                    <button
                      onClick={() =>
                        updateDistrictMut.mutate({
                          id: d.id,
                          name: editDistrict.name,
                          description: editDistrict.description || undefined,
                        })
                      }
                      className="px-2 py-1 bg-primary text-white rounded text-xs"
                    >
                      Sauver
                    </button>
                    <button
                      onClick={() => setEditDistrict(null)}
                      className="px-2 py-1 border rounded text-xs"
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h4 className="font-bold text-foreground">{d.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {d._count.communes} communes
                  </p>
                  {d.description && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {d.description}
                    </p>
                  )}
                  <div className="flex gap-1 mt-2">
                    <button
                      onClick={() =>
                        setEditDistrict({
                          id: d.id,
                          name: d.name,
                          description: d.description,
                        })
                      }
                      className="p-1 hover:bg-blue-50 rounded"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-blue-500" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm("Supprimer ce district ?"))
                          deleteDistrictMut.mutate({ id: d.id });
                      }}
                      className="p-1 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-red-500" />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Create Commune inline */}
      {showCreate && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 space-y-3">
          <h4 className="font-bold text-sm text-emerald-800">
            Nouvelle commune
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground">
                Nom *
              </label>
              <input
                value={newCommune.name}
                onChange={(e) =>
                  setNewCommune((p) => ({ ...p, name: e.target.value }))
                }
                className="w-full mt-1 px-3 py-2 rounded-lg border border-border text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">
                District
              </label>
              <select
                value={newCommune.districtId}
                onChange={(e) =>
                  setNewCommune((p) => ({ ...p, districtId: e.target.value }))
                }
                className="w-full mt-1 px-3 py-2 rounded-lg border border-border text-sm"
              >
                <option value="">— Aucun —</option>
                {districts?.map((d: any) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">
                Bourgmestre
              </label>
              <input
                value={newCommune.bourgmestre}
                onChange={(e) =>
                  setNewCommune((p) => ({ ...p, bourgmestre: e.target.value }))
                }
                className="w-full mt-1 px-3 py-2 rounded-lg border border-border text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">
                Population
              </label>
              <input
                type="number"
                value={newCommune.population}
                onChange={(e) =>
                  setNewCommune((p) => ({
                    ...p,
                    population: Number(e.target.value),
                  }))
                }
                className="w-full mt-1 px-3 py-2 rounded-lg border border-border text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">
                Superficie (km²)
              </label>
              <input
                type="number"
                value={newCommune.superficie}
                onChange={(e) =>
                  setNewCommune((p) => ({
                    ...p,
                    superficie: Number(e.target.value),
                  }))
                }
                className="w-full mt-1 px-3 py-2 rounded-lg border border-border text-sm"
              />
            </div>
          </div>
          <div className="flex gap-2 pt-2">
            <button
              onClick={() => setShowCreate(false)}
              className="px-4 py-2 rounded-lg border border-border text-sm hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              onClick={() => {
                if (!newCommune.name) return;
                createMut.mutate({
                  name: newCommune.name,
                  description: newCommune.description || undefined,
                  population: newCommune.population || undefined,
                  superficie: newCommune.superficie || undefined,
                  bourgmestre: newCommune.bourgmestre || undefined,
                  districtId: newCommune.districtId || undefined,
                });
              }}
              disabled={createMut.isPending}
              className="px-4 py-2 rounded-lg bg-primary text-white text-sm hover:bg-primary/90 disabled:opacity-50 flex items-center gap-2"
            >
              <Save className="w-4 h-4" />{" "}
              {createMut.isPending ? "Création..." : "Créer"}
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">
          <strong>Erreur:</strong> {error.message}
        </div>
      )}
      {isLoading ? (
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-gray-50">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                  Commune
                </th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                  District
                </th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                  Bourgmestre
                </th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                  Population
                </th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {communes?.items.map((c: any) => (
                <tr
                  key={c.id}
                  className="border-b border-border hover:bg-gray-50"
                >
                  {editCommune?.id === c.id ? (
                    <>
                      <td className="py-2 px-4">
                        <input
                          value={editCommune.name}
                          onChange={(e) =>
                            setEditCommune((p: any) => ({
                              ...p,
                              name: e.target.value,
                            }))
                          }
                          className="w-full px-2 py-1 rounded border border-border text-sm"
                        />
                      </td>
                      <td className="py-2 px-4">
                        <select
                          value={editCommune.districtId || ""}
                          onChange={(e) =>
                            setEditCommune((p: any) => ({
                              ...p,
                              districtId: e.target.value,
                            }))
                          }
                          className="w-full px-2 py-1 rounded border border-border text-sm"
                        >
                          <option value="">—</option>
                          {districts?.map((d: any) => (
                            <option key={d.id} value={d.id}>
                              {d.name}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="py-2 px-4">
                        <input
                          value={editCommune.bourgmestre || ""}
                          onChange={(e) =>
                            setEditCommune((p: any) => ({
                              ...p,
                              bourgmestre: e.target.value,
                            }))
                          }
                          className="w-full px-2 py-1 rounded border border-border text-sm"
                        />
                      </td>
                      <td className="py-2 px-4">
                        <input
                          type="number"
                          value={editCommune.population || ""}
                          onChange={(e) =>
                            setEditCommune((p: any) => ({
                              ...p,
                              population: Number(e.target.value),
                            }))
                          }
                          className="w-full px-2 py-1 rounded border border-border text-sm"
                        />
                      </td>
                      <td className="py-2 px-4 flex items-center gap-1">
                        <button
                          onClick={() => {
                            updateMut.mutate({
                              id: c.id,
                              name: editCommune.name,
                              bourgmestre: editCommune.bourgmestre || undefined,
                              population: editCommune.population || undefined,
                              districtId: editCommune.districtId || undefined,
                            });
                            setEditCommune(null);
                          }}
                          className="p-1.5 hover:bg-emerald-50 rounded-lg"
                        >
                          <Save className="w-4 h-4 text-emerald-600" />
                        </button>
                        <button
                          onClick={() => setEditCommune(null)}
                          className="p-1.5 hover:bg-gray-100 rounded-lg"
                        >
                          <X className="w-4 h-4 text-muted-foreground" />
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="py-3 px-4 font-medium text-foreground">
                        {c.name}
                      </td>
                      <td className="py-3 px-4 text-xs">
                        {c.district?.name || "—"}
                      </td>
                      <td className="py-3 px-4 text-xs">
                        {c.bourgmestre || "—"}
                      </td>
                      <td className="py-3 px-4 text-xs">
                        {c.population
                          ? Number(c.population).toLocaleString()
                          : "—"}
                      </td>
                      <td className="py-3 px-4 flex items-center gap-1">
                        <button
                          onClick={() =>
                            setEditCommune({
                              id: c.id,
                              name: c.name,
                              bourgmestre: c.bourgmestre,
                              population: c.population
                                ? Number(c.population)
                                : 0,
                              districtId: c.districtId || "",
                            })
                          }
                          className="p-1.5 hover:bg-blue-50 rounded-lg"
                          title="Modifier"
                        >
                          <Edit3 className="w-4 h-4 text-blue-500" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm("Supprimer cette commune ?"))
                              deleteMut.mutate({ id: c.id });
                          }}
                          className="p-1.5 hover:bg-red-50 rounded-lg"
                          title="Supprimer"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          {(!communes?.items || communes.items.length === 0) && (
            <p className="text-sm text-muted-foreground text-center py-8">
              Aucune commune trouvée
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function AdminSignalementsTab() {
  const [traiteFilter, setTraiteFilter] = useState<string>("");
  const [search, setSearch] = useState("");
  const { data, isLoading } = trpc.admin.getSignalements.useQuery({
    traite: traiteFilter === "" ? undefined : traiteFilter === "true",
  });
  const utils = trpc.useUtils();
  const updateMut = trpc.admin.updateSignalement.useMutation({
    onSuccess: () => utils.admin.getSignalements.invalidate(),
    onError: (e) => alert("Erreur: " + e.message),
  });
  const deleteMut = trpc.admin.deleteSignalement.useMutation({
    onSuccess: () => utils.admin.getSignalements.invalidate(),
    onError: (e) => alert("Erreur suppression: " + e.message),
  });

  const TYPE_LABELS: Record<string, string> = {
    INFO_ERRONNEE: "Information erronée",
    CORRUPTION: "Corruption",
    FERME: "Lieu fermé",
    PRIX_INCORRECT: "Prix incorrect",
    AUTRE: "Autre",
  };
  const TYPE_COLORS: Record<string, string> = {
    INFO_ERRONNEE: "bg-blue-50 text-blue-700",
    CORRUPTION: "bg-red-50 text-red-700",
    FERME: "bg-gray-100 text-gray-700",
    PRIX_INCORRECT: "bg-amber-50 text-amber-700",
    AUTRE: "bg-purple-50 text-purple-700",
  };

  const filteredItems = data?.items?.filter((sig: any) => {
    if (!search) return true;
    const s = search.toLowerCase();
    return (
      sig.description?.toLowerCase().includes(s) ||
      sig.lieu?.nom?.toLowerCase().includes(s) ||
      sig.email?.toLowerCase().includes(s)
    );
  });

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
        <AlertTriangle className="w-5 h-5 text-yellow-500" />
        Signalements ({data?.total || 0})
      </h3>

      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Rechercher dans les signalements..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
          />
        </div>
        <div className="flex gap-2">
          {[
            { value: "", label: "Tous" },
            { value: "false", label: "Non traités" },
            { value: "true", label: "Traités" },
          ].map((s) => (
            <button
              key={s.value}
              onClick={() => setTraiteFilter(s.value)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                traiteFilter === s.value
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-muted-foreground hover:bg-gray-200"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      ) : (
        <div className="space-y-4">
          {filteredItems?.map((sig: any) => (
            <div
              key={sig.id}
              className="bg-white rounded-xl border border-border p-5"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${TYPE_COLORS[sig.type] || "bg-gray-100 text-gray-600"}`}
                    >
                      {TYPE_LABELS[sig.type] || sig.type}
                    </span>
                    {sig.traite ? (
                      <span className="text-xs px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full font-medium">
                        ✓ Traité
                      </span>
                    ) : (
                      <span className="text-xs px-2 py-0.5 bg-yellow-50 text-yellow-700 rounded-full font-medium">
                        En attente
                      </span>
                    )}
                    <span className="text-xs text-muted-foreground">
                      {new Date(sig.createdAt).toLocaleDateString("fr-FR")}
                    </span>
                  </div>
                  <p className="text-sm text-foreground">{sig.description}</p>
                  {sig.lieu && (
                    <p className="text-xs text-primary mt-1">
                      📍 Lieu: {sig.lieu.nom}
                    </p>
                  )}
                  {sig.email && (
                    <p className="text-xs text-muted-foreground mt-1">
                      ✉️ Par: {sig.email}
                    </p>
                  )}
                </div>
                <div className="flex gap-1 ml-3">
                  {!sig.traite && (
                    <button
                      onClick={() =>
                        updateMut.mutate({ id: sig.id, traite: true })
                      }
                      className="px-3 py-1.5 hover:bg-emerald-50 rounded-lg text-xs text-emerald-600 font-medium border border-emerald-200"
                      title="Marquer comme traité"
                    >
                      ✓ Traiter
                    </button>
                  )}
                  {sig.traite && (
                    <button
                      onClick={() =>
                        updateMut.mutate({ id: sig.id, traite: false })
                      }
                      className="px-3 py-1.5 hover:bg-yellow-50 rounded-lg text-xs text-yellow-600 font-medium border border-yellow-200"
                      title="Remettre en attente"
                    >
                      Rouvrir
                    </button>
                  )}
                  <button
                    onClick={() => {
                      if (confirm("Supprimer ce signalement ?"))
                        deleteMut.mutate({ id: sig.id });
                    }}
                    className="p-1.5 hover:bg-red-50 rounded-lg"
                    title="Supprimer"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {(!filteredItems || filteredItems.length === 0) && (
            <div className="text-center py-10 bg-white rounded-xl border border-border">
              <AlertTriangle className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Aucun signalement</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function AdminAlertesTab() {
  const { data, isLoading } = trpc.admin.getAlertes.useQuery({});
  const utils = trpc.useUtils();
  const deleteMut = trpc.admin.deleteAlerte.useMutation({
    onSuccess: () => utils.admin.getAlertes.invalidate(),
    onError: (e) => alert("Erreur suppression: " + e.message),
  });
  const toggleMut = trpc.admin.updateAlerte.useMutation({
    onSuccess: () => utils.admin.getAlertes.invalidate(),
    onError: (e) => alert("Erreur: " + e.message),
  });

  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({
    titre: "",
    message: "",
    type: "INFO",
    dateDebut: "",
    dateFin: "",
  });
  const createMut = trpc.admin.createAlerte.useMutation({
    onSuccess: () => {
      utils.admin.getAlertes.invalidate();
      setShowAdd(false);
      setForm({
        titre: "",
        message: "",
        type: "INFO",
        dateDebut: "",
        dateFin: "",
      });
    },
    onError: (e) => alert("Erreur création: " + e.message),
  });

  const TYPE_COLORS: Record<string, string> = {
    INFO: "bg-blue-50 text-blue-700",
    AVERTISSEMENT: "bg-amber-50 text-amber-700",
    URGENT: "bg-red-50 text-red-700",
    SUCCES: "bg-emerald-50 text-emerald-700",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Bell className="w-5 h-5 text-red-500" />
          Alertes ({data?.total || 0})
        </h3>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary/90"
        >
          <Plus className="w-4 h-4" />
          Nouvelle alerte
        </button>
      </div>

      {showAdd && (
        <div className="bg-white rounded-xl border border-border p-5 space-y-4">
          <input
            type="text"
            placeholder="Titre de l'alerte"
            value={form.titre}
            onChange={(e) => setForm({ ...form, titre: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-border text-sm"
          />
          <textarea
            placeholder="Message de l'alerte"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-border text-sm h-24 resize-none"
          />
          <div className="flex gap-2">
            {["INFO", "AVERTISSEMENT", "URGENT", "SUCCES"].map((t) => (
              <button
                key={t}
                onClick={() => setForm({ ...form, type: t })}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
                  form.type === t
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-muted-foreground"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground">
                Date début
              </label>
              <input
                type="datetime-local"
                value={form.dateDebut}
                onChange={(e) =>
                  setForm({ ...form, dateDebut: e.target.value })
                }
                className="w-full mt-1 px-4 py-2.5 rounded-xl border border-border text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">
                Date fin (optionnelle)
              </label>
              <input
                type="datetime-local"
                value={form.dateFin}
                onChange={(e) => setForm({ ...form, dateFin: e.target.value })}
                className="w-full mt-1 px-4 py-2.5 rounded-xl border border-border text-sm"
              />
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => setShowAdd(false)}
              className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground"
            >
              Annuler
            </button>
            <button
              onClick={() =>
                createMut.mutate({
                  titre: form.titre,
                  message: form.message,
                  type: form.type,
                  dateDebut: form.dateDebut || undefined,
                  dateFin: form.dateFin || undefined,
                })
              }
              disabled={!form.titre || !form.message}
              className="px-4 py-2 bg-primary text-white rounded-xl text-sm disabled:opacity-50"
            >
              Publier l&apos;alerte
            </button>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      ) : (
        <div className="space-y-4">
          {data?.items.map((alerte: any) => (
            <div
              key={alerte.id}
              className="bg-white rounded-xl border border-border p-5"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${TYPE_COLORS[alerte.type] || "bg-gray-100 text-gray-600"}`}
                    >
                      {alerte.type}
                    </span>
                    {alerte.actif ? (
                      <span className="text-xs px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full">
                        Active
                      </span>
                    ) : (
                      <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full">
                        Inactive
                      </span>
                    )}
                    <span className="text-xs text-muted-foreground">
                      {new Date(alerte.createdAt).toLocaleDateString("fr-FR")}
                    </span>
                  </div>
                  <h4 className="font-semibold text-foreground">
                    {alerte.titre}
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {alerte.message}
                  </p>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() =>
                      toggleMut.mutate({
                        id: alerte.id,
                        actif: !alerte.actif,
                      })
                    }
                    className="p-1.5 hover:bg-gray-100 rounded-lg"
                    title={alerte.actif ? "Désactiver" : "Activer"}
                  >
                    {alerte.actif ? (
                      <ToggleRight className="w-5 h-5 text-emerald-500" />
                    ) : (
                      <ToggleLeft className="w-5 h-5 text-muted-foreground" />
                    )}
                  </button>
                  <button
                    onClick={() => {
                      if (confirm("Supprimer cette alerte ?"))
                        deleteMut.mutate({ id: alerte.id });
                    }}
                    className="p-1.5 hover:bg-red-50 rounded-lg"
                    title="Supprimer"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {(!data?.items || data.items.length === 0) && (
            <div className="text-center py-10 bg-white rounded-xl border border-border">
              <Bell className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Aucune alerte</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function AdminProjetsTab() {
  const [search, setSearch] = useState("");
  const [statutFilter, setStatutFilter] = useState("");
  const { data, isLoading, error } = trpc.admin.getProjets.useQuery({
    search: search || undefined,
    statut: statutFilter || undefined,
  });
  const utils = trpc.useUtils();

  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({
    titre: "",
    description: "",
    statut: "PLANIFIE",
    budget: "",
    devise: "USD",
    dateDebut: "",
    dateFin: "",
    localisation: "",
    maitreDoeuvre: "",
    categorie: "",
  });

  const createMut = trpc.admin.createProjet.useMutation({
    onSuccess: () => {
      utils.admin.getProjets.invalidate();
      utils.admin.getStats.invalidate();
      setShowCreate(false);
      setForm({
        titre: "",
        description: "",
        statut: "PLANIFIE",
        budget: "",
        devise: "USD",
        dateDebut: "",
        dateFin: "",
        localisation: "",
        maitreDoeuvre: "",
        categorie: "",
      });
    },
    onError: (e) => alert("Erreur création: " + e.message),
  });
  const updateMut = trpc.admin.updateProjet.useMutation({
    onSuccess: () => utils.admin.getProjets.invalidate(),
    onError: (e) => alert("Erreur mise à jour: " + e.message),
  });
  const deleteMut = trpc.admin.deleteProjet.useMutation({
    onSuccess: () => {
      utils.admin.getProjets.invalidate();
      utils.admin.getStats.invalidate();
    },
    onError: (e) => alert("Erreur suppression: " + e.message),
  });

  const STATUTS = ["PLANIFIE", "EN_COURS", "TERMINE"];
  const STATUT_LABELS: Record<string, string> = {
    PLANIFIE: "Planifié",
    EN_COURS: "En cours",
    TERMINE: "Terminé",
  };
  const STATUT_COLORS: Record<string, string> = {
    PLANIFIE: "bg-blue-50 text-blue-700",
    EN_COURS: "bg-amber-50 text-amber-700",
    TERMINE: "bg-emerald-50 text-emerald-700",
  };
  const CATEGORIES = [
    "Infrastructure",
    "Santé",
    "Éducation",
    "Transport",
    "Eau & Assainissement",
    "Énergie",
    "Autre",
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
          <FolderKanban className="w-5 h-5 text-primary" />
          Projets ({data?.total || 0})
        </h3>
        <button
          onClick={() => setShowCreate(!showCreate)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90"
        >
          <Plus className="w-4 h-4" /> Nouveau projet
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Rechercher un projet..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setStatutFilter("")}
            className={`px-3 py-2 rounded-lg text-sm font-medium ${statutFilter === "" ? "bg-gray-900 text-white" : "bg-white border border-border text-muted-foreground hover:bg-gray-50"}`}
          >
            Tous
          </button>
          {STATUTS.map((s) => (
            <button
              key={s}
              onClick={() => setStatutFilter(s)}
              className={`px-3 py-2 rounded-lg text-sm font-medium ${statutFilter === s ? "bg-gray-900 text-white" : "bg-white border border-border text-muted-foreground hover:bg-gray-50"}`}
            >
              {STATUT_LABELS[s]}
            </button>
          ))}
        </div>
      </div>

      {/* Create form */}
      {showCreate && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 space-y-4">
          <h4 className="font-bold text-sm text-blue-800">Nouveau projet</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="md:col-span-2">
              <label className="text-xs font-medium text-muted-foreground">
                Titre *
              </label>
              <input
                value={form.titre}
                onChange={(e) =>
                  setForm((p) => ({ ...p, titre: e.target.value }))
                }
                className="w-full mt-1 px-3 py-2 rounded-lg border border-border text-sm"
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs font-medium text-muted-foreground">
                Description *
              </label>
              <textarea
                value={form.description}
                onChange={(e) =>
                  setForm((p) => ({ ...p, description: e.target.value }))
                }
                className="w-full mt-1 px-3 py-2 rounded-lg border border-border text-sm h-20 resize-none"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">
                Statut
              </label>
              <select
                value={form.statut}
                onChange={(e) =>
                  setForm((p) => ({ ...p, statut: e.target.value }))
                }
                className="w-full mt-1 px-3 py-2 rounded-lg border border-border text-sm"
              >
                {STATUTS.map((s) => (
                  <option key={s} value={s}>
                    {STATUT_LABELS[s]}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">
                Catégorie
              </label>
              <select
                value={form.categorie}
                onChange={(e) =>
                  setForm((p) => ({ ...p, categorie: e.target.value }))
                }
                className="w-full mt-1 px-3 py-2 rounded-lg border border-border text-sm"
              >
                <option value="">— Choisir —</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">
                Budget
              </label>
              <input
                type="number"
                value={form.budget}
                onChange={(e) =>
                  setForm((p) => ({ ...p, budget: e.target.value }))
                }
                className="w-full mt-1 px-3 py-2 rounded-lg border border-border text-sm"
                placeholder="0"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">
                Devise
              </label>
              <select
                value={form.devise}
                onChange={(e) =>
                  setForm((p) => ({ ...p, devise: e.target.value }))
                }
                className="w-full mt-1 px-3 py-2 rounded-lg border border-border text-sm"
              >
                <option value="USD">USD</option>
                <option value="FC">FC</option>
                <option value="EUR">EUR</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">
                Date début
              </label>
              <input
                type="date"
                value={form.dateDebut}
                onChange={(e) =>
                  setForm((p) => ({ ...p, dateDebut: e.target.value }))
                }
                className="w-full mt-1 px-3 py-2 rounded-lg border border-border text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">
                Date fin
              </label>
              <input
                type="date"
                value={form.dateFin}
                onChange={(e) =>
                  setForm((p) => ({ ...p, dateFin: e.target.value }))
                }
                className="w-full mt-1 px-3 py-2 rounded-lg border border-border text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">
                Localisation
              </label>
              <input
                value={form.localisation}
                onChange={(e) =>
                  setForm((p) => ({ ...p, localisation: e.target.value }))
                }
                className="w-full mt-1 px-3 py-2 rounded-lg border border-border text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">
                Maître d&apos;œuvre
              </label>
              <input
                value={form.maitreDoeuvre}
                onChange={(e) =>
                  setForm((p) => ({ ...p, maitreDoeuvre: e.target.value }))
                }
                className="w-full mt-1 px-3 py-2 rounded-lg border border-border text-sm"
              />
            </div>
          </div>
          <div className="flex gap-2 pt-2">
            <button
              onClick={() => setShowCreate(false)}
              className="px-4 py-2 rounded-lg border border-border text-sm hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              onClick={() => {
                if (!form.titre || !form.description) return;
                createMut.mutate({
                  titre: form.titre,
                  description: form.description,
                  statut: form.statut,
                  budget: form.budget ? parseFloat(form.budget) : undefined,
                  devise: form.devise,
                  dateDebut: form.dateDebut || undefined,
                  dateFin: form.dateFin || undefined,
                  localisation: form.localisation || undefined,
                  maitreDoeuvre: form.maitreDoeuvre || undefined,
                  categorie: form.categorie || undefined,
                });
              }}
              disabled={createMut.isPending}
              className="px-4 py-2 rounded-lg bg-primary text-white text-sm hover:bg-primary/90 disabled:opacity-50 flex items-center gap-2"
            >
              <Save className="w-4 h-4" />{" "}
              {createMut.isPending ? "Création..." : "Créer"}
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">
          <strong>Erreur:</strong> {error.message}
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      ) : (
        <div className="space-y-4">
          {data?.items.map((projet: any) => (
            <div
              key={projet.id}
              className="bg-white rounded-xl border border-border p-5"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span
                      className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${STATUT_COLORS[projet.statut] || "bg-gray-100 text-gray-600"}`}
                    >
                      {STATUT_LABELS[projet.statut] || projet.statut}
                    </span>
                    {projet.categorie && (
                      <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                        {projet.categorie}
                      </span>
                    )}
                    <span className="text-xs text-muted-foreground">
                      {new Date(projet.createdAt).toLocaleDateString("fr-FR")}
                    </span>
                  </div>
                  <h4 className="font-semibold text-foreground">
                    {projet.titre}
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {projet.description}
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground flex-wrap">
                    {projet.budget && (
                      <span className="font-medium text-foreground">
                        {Number(projet.budget).toLocaleString()} {projet.devise}
                      </span>
                    )}
                    {projet.localisation && (
                      <span>📍 {projet.localisation}</span>
                    )}
                    {projet.maitreDoeuvre && (
                      <span>🏗️ {projet.maitreDoeuvre}</span>
                    )}
                    {projet.dateDebut && (
                      <span>
                        Début:{" "}
                        {new Date(projet.dateDebut).toLocaleDateString("fr-FR")}
                      </span>
                    )}
                    {projet.dateFin && (
                      <span>
                        Fin:{" "}
                        {new Date(projet.dateFin).toLocaleDateString("fr-FR")}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-1 ml-3">
                  <select
                    value={projet.statut}
                    onChange={(e) =>
                      updateMut.mutate({
                        id: projet.id,
                        statut: e.target.value,
                      })
                    }
                    className="text-xs px-2 py-1 rounded-md border border-border bg-white"
                  >
                    {STATUTS.map((s) => (
                      <option key={s} value={s}>
                        {STATUT_LABELS[s]}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => {
                      if (confirm("Supprimer ce projet ?"))
                        deleteMut.mutate({ id: projet.id });
                    }}
                    className="p-1.5 hover:bg-red-50 rounded-lg"
                    title="Supprimer"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {(!data?.items || data.items.length === 0) && (
            <div className="text-center py-10 bg-white rounded-xl border border-border">
              <FolderKanban className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Aucun projet</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
