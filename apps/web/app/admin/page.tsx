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
} from "lucide-react";
import { LIEU_TYPE_LABELS } from "@kinservices/ui";

type Tab = "dashboard" | "users" | "lieux" | "ville" | "projets";

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

  // Ville management state
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
    photoUrl: "",
    telephone: "",
    email: "",
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
  });
  const [showAddDepute, setShowAddDepute] = useState(false);

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
  });
  const toggleActiveMutation = trpc.admin.toggleUserActive.useMutation({
    onSuccess: () => utils.admin.getUsers.invalidate(),
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
  });
  const updateMinistreMutation = trpc.admin.updateMinistre.useMutation({
    onSuccess: () => {
      utils.ville.getGouvernorat.invalidate();
      setEditingMinistreId(null);
    },
  });
  const createMinistreMutation = trpc.admin.createMinistre.useMutation({
    onSuccess: () => {
      utils.ville.getGouvernorat.invalidate();
      setShowAddMinistre(false);
      setMinistreForm({
        nom: "",
        portefeuille: "",
        photoUrl: "",
        telephone: "",
        email: "",
        ordre: 0,
      });
    },
  });
  const deleteMinistreMutation = trpc.admin.deleteMinistre.useMutation({
    onSuccess: () => utils.ville.getGouvernorat.invalidate(),
  });
  const updateDeputeMutation = trpc.admin.updateDepute.useMutation({
    onSuccess: () => {
      utils.ville.getDeputes.invalidate();
      setEditingDeputeId(null);
    },
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
      });
    },
  });
  const deleteDeputeMutation = trpc.admin.deleteDepute.useMutation({
    onSuccess: () => utils.ville.getDeputes.invalidate(),
  });

  const tabs = [
    { id: "dashboard" as Tab, label: "Tableau de bord", icon: BarChart3 },
    { id: "users" as Tab, label: "Utilisateurs", icon: Users },
    { id: "ville" as Tab, label: "Ville", icon: Landmark },
    { id: "lieux" as Tab, label: "Lieux", icon: MapPin },
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
                    },
                    {
                      label: "Lieux",
                      value: stats.totalLieux,
                      icon: MapPin,
                      color: "text-emerald-500",
                    },
                    {
                      label: "Services",
                      value: stats.totalServices,
                      icon: FileText,
                      color: "text-purple-500",
                    },
                    {
                      label: "Avis",
                      value: stats.totalAvis,
                      icon: Star,
                      color: "text-amber-500",
                    },
                    {
                      label: "Communes",
                      value: stats.totalCommunes,
                      icon: Building2,
                      color: "text-teal-500",
                    },
                    {
                      label: "Quartiers",
                      value: stats.totalQuartiers,
                      icon: MapPin,
                      color: "text-indigo-500",
                    },
                    {
                      label: "Zones de Santé",
                      value: stats.totalZonesSante,
                      icon: Shield,
                      color: "text-red-500",
                    },
                    {
                      label: "Députés",
                      value: stats.totalDeputes,
                      icon: Users,
                      color: "text-cyan-500",
                    },
                    {
                      label: "Projets",
                      value: stats.totalProjets,
                      icon: FolderKanban,
                      color: "text-orange-500",
                    },
                    {
                      label: "Signalements",
                      value: stats.totalSignalements,
                      icon: AlertTriangle,
                      color: "text-yellow-500",
                    },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="bg-white rounded-xl border border-border p-4"
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
          <div className="space-y-8">
            {/* GOUVERNORAT SECTION */}
            <div className="bg-white rounded-xl border border-border p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-primary" />
                  Gouvernorat
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
                          setGouvForm({ ...gouvForm, siteWeb: e.target.value })
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
                          setGouvForm({ ...gouvForm, adresse: e.target.value })
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
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Aucun gouvernorat configuré.
                </p>
              )}
            </div>

            {/* MINISTRES SECTION */}
            <div className="bg-white rounded-xl border border-border p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-500" />
                  Ministres Provinciaux
                  {gouvernorat?.ministres && (
                    <span className="text-sm font-normal text-muted-foreground">
                      ({gouvernorat.ministres.length})
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
                        photoUrl: "",
                        telephone: "",
                        email: "",
                        ordre: (gouvernorat.ministres?.length || 0) + 1,
                      });
                    }}
                    className="flex items-center gap-1.5 text-sm text-white bg-primary hover:bg-primary-dark px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <Plus className="w-4 h-4" /> Ajouter
                  </button>
                )}
              </div>

              {/* Add ministre form */}
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
                      placeholder="Portefeuille"
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
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        createMinistreMutation.mutate({
                          gouvernoratId: gouvernorat.id,
                          nom: ministreForm.nom,
                          portefeuille: ministreForm.portefeuille,
                          photoUrl: ministreForm.photoUrl || undefined,
                          telephone: ministreForm.telephone || undefined,
                          email: ministreForm.email || undefined,
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

              {/* Ministres list */}
              <div className="space-y-3">
                {gouvernorat?.ministres?.map((m) => (
                  <div
                    key={m.id}
                    className="border border-border rounded-xl p-4"
                  >
                    {editingMinistreId === m.id ? (
                      <div className="space-y-3">
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
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              updateMinistreMutation.mutate({
                                id: m.id,
                                nom: ministreForm.nom || undefined,
                                portefeuille:
                                  ministreForm.portefeuille || undefined,
                                photoUrl: ministreForm.photoUrl || undefined,
                                telephone: ministreForm.telephone || undefined,
                                email: ministreForm.email || undefined,
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
                          <div className="flex gap-2 mt-0.5 text-[11px] text-muted-foreground">
                            {m.telephone && (
                              <span>
                                <Phone className="w-3 h-3 inline" />{" "}
                                {m.telephone}
                              </span>
                            )}
                            {m.email && (
                              <span>
                                <Mail className="w-3 h-3 inline" /> {m.email}
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
                                photoUrl: m.photoUrl || "",
                                telephone: m.telephone || "",
                                email: m.email || "",
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
                  gouvernorat.ministres.length === 0) && (
                  <p className="text-sm text-muted-foreground text-center py-6">
                    Aucun ministre configuré
                  </p>
                )}
              </div>
            </div>

            {/* DEPUTES SECTION */}
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
                    });
                  }}
                  className="flex items-center gap-1.5 text-sm text-white bg-emerald-600 hover:bg-emerald-700 px-3 py-1.5 rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" /> Ajouter
                </button>
              </div>

              {/* Add depute form */}
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
                        setDeputeForm({ ...deputeForm, parti: e.target.value })
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
                        setDeputeForm({ ...deputeForm, email: e.target.value })
                      }
                      className="px-3 py-2 rounded-lg border border-border text-sm"
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

              {/* Deputes list */}
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
                                  telephone: deputeForm.telephone || undefined,
                                  email: deputeForm.email || undefined,
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
          </div>
        )}

        {/* LIEUX TAB */}
        {activeTab === "lieux" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-border p-6">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                Gestion des Lieux
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Gérez les lieux enregistrés sur la plateforme. Vous pouvez
                ajouter, modifier ou supprimer des lieux depuis cette interface.
              </p>

              {stats && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                  {stats.lieuxByType.map((item) => (
                    <div key={item.type} className="bg-gray-50 rounded-lg p-3">
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
              )}

              <div className="text-sm text-muted-foreground bg-blue-50 rounded-lg p-4">
                <p className="font-medium text-blue-800 mb-1">
                  💡 Pour ajouter des lieux
                </p>
                <p className="text-blue-700">
                  Utilisez la page Carte pour visualiser les lieux existants.
                  Les gestionnaires peuvent proposer de nouveaux lieux via leur
                  interface dédiée.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* PROJETS TAB */}
        {activeTab === "projets" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-border p-6">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <FolderKanban className="w-5 h-5 text-primary" />
                Gestion des Projets
              </h3>
              <p className="text-sm text-muted-foreground">
                Gérez les projets de développement de la ville. Ajoutez de
                nouveaux projets, mettez à jour leur statut et suivez leur
                avancement.
              </p>

              {stats && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm">
                    <span className="font-semibold">{stats.totalProjets}</span>{" "}
                    projets enregistrés
                  </p>
                </div>
              )}

              <div className="mt-4 text-sm text-muted-foreground bg-blue-50 rounded-lg p-4">
                <p className="font-medium text-blue-800 mb-1">
                  💡 Gestion des projets
                </p>
                <p className="text-blue-700">
                  Visitez la page &quot;Gestion de la Ville&quot; onglet Projets
                  pour voir tous les projets publics.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
