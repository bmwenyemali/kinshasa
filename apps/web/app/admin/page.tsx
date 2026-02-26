"use client";

import React, { useState } from "react";
import { Header } from "@/components/layout/Header";
import { trpc } from "@/lib/trpc";
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
} from "lucide-react";
import { LIEU_TYPE_LABELS } from "@kinservices/ui";

type Tab = "dashboard" | "users" | "lieux" | "projets";

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

  const tabs = [
    { id: "dashboard" as Tab, label: "Tableau de bord", icon: BarChart3 },
    { id: "users" as Tab, label: "Utilisateurs", icon: Users },
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
