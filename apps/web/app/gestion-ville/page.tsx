"use client";

import React, { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Header";
import { trpc } from "@/lib/trpc";
import {
  Building2,
  Users,
  Briefcase,
  Phone,
  Mail,
  Globe,
  MapPin,
  Calendar,
  DollarSign,
  ChevronRight,
  User,
  Award,
  FolderKanban,
  Search,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

type Tab = "gouvernorat" | "assemblee" | "projets";

export default function GestionVillePage() {
  const [activeTab, setActiveTab] = useState<Tab>("gouvernorat");
  const [searchDepute, setSearchDepute] = useState("");
  const [projetFilter, setProjetFilter] = useState("");

  const { data: gouvernorat, isLoading: loadingGouv } =
    trpc.ville.getGouvernorat.useQuery();
  const { data: deputes, isLoading: loadingDeputes } =
    trpc.ville.getDeputes.useQuery({ search: searchDepute || undefined });
  const { data: projets, isLoading: loadingProjets } =
    trpc.ville.getProjets.useQuery({
      statut: projetFilter || undefined,
    });

  const tabs = [
    {
      id: "gouvernorat" as Tab,
      label: "Gouvernorat",
      icon: Building2,
      description: "Gouverneur et ministres provinciaux",
    },
    {
      id: "assemblee" as Tab,
      label: "Assemblée",
      icon: Users,
      description: "Députés provinciaux",
    },
    {
      id: "projets" as Tab,
      label: "Projets",
      icon: FolderKanban,
      description: "Projets de développement",
    },
  ];

  const statutColors: Record<string, string> = {
    PLANIFIE: "bg-blue-50 text-blue-700",
    EN_COURS: "bg-amber-50 text-amber-700",
    TERMINE: "bg-emerald-50 text-emerald-700",
    SUSPENDU: "bg-red-50 text-red-700",
  };

  const statutLabels: Record<string, string> = {
    PLANIFIE: "Planifié",
    EN_COURS: "En cours",
    TERMINE: "Terminé",
    SUSPENDU: "Suspendu",
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-gray-50/50">
      <Header />

      {/* Hero section */}
      <section className="relative bg-gradient-to-r from-primary to-primary-dark text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">
                Gestion de la Ville
              </h1>
              <p className="text-white/80 mt-1">
                Province de Kinshasa — Institutions et projets
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tab navigation */}
      <div className="sticky top-16 z-20 bg-white/95 backdrop-blur-lg border-b border-border">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto py-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-primary text-white shadow-md"
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

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* GOUVERNORAT TAB */}
        {activeTab === "gouvernorat" && (
          <div className="space-y-8">
            {loadingGouv ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
              </div>
            ) : gouvernorat ? (
              <>
                {/* Governor card */}
                <div className="bg-white rounded-2xl shadow-lg border border-border overflow-hidden">
                  <div className="bg-gradient-to-r from-primary/10 to-amber-50 p-8">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                      <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white text-5xl font-bold shadow-xl">
                        {gouvernorat.gouverneur?.charAt(0) || "G"}
                      </div>
                      <div className="text-center md:text-left flex-1">
                        <p className="text-sm font-medium text-primary uppercase tracking-wider mb-1">
                          Gouverneur de la Ville-Province de Kinshasa
                        </p>
                        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                          {gouvernorat.gouverneur}
                        </h2>
                        {gouvernorat.description && (
                          <p className="text-muted-foreground mt-2 max-w-2xl">
                            {gouvernorat.description}
                          </p>
                        )}
                        <div className="flex flex-wrap gap-4 mt-4 justify-center md:justify-start">
                          {gouvernorat.telephone && (
                            <a
                              href={`tel:${gouvernorat.telephone}`}
                              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                            >
                              <Phone className="w-4 h-4" />
                              {gouvernorat.telephone}
                            </a>
                          )}
                          {gouvernorat.email && (
                            <a
                              href={`mailto:${gouvernorat.email}`}
                              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                            >
                              <Mail className="w-4 h-4" />
                              {gouvernorat.email}
                            </a>
                          )}
                          {gouvernorat.siteWeb && (
                            <a
                              href={gouvernorat.siteWeb}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                            >
                              <Globe className="w-4 h-4" />
                              Site web
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                          {gouvernorat.adresse && (
                            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                              <MapPin className="w-4 h-4" />
                              {gouvernorat.adresse}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Ministers */}
                {gouvernorat.ministres && gouvernorat.ministres.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-primary" />
                      Ministres Provinciaux
                      <span className="text-sm font-normal text-muted-foreground ml-2">
                        ({gouvernorat.ministres.length})
                      </span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {gouvernorat.ministres.map((ministre) => (
                        <div
                          key={ministre.id}
                          className="bg-white rounded-xl border border-border p-4 hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-blue-700 font-bold text-lg flex-shrink-0">
                              {ministre.nom?.charAt(0) || "M"}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-foreground text-sm leading-tight">
                                {ministre.nom}
                              </h4>
                              <p className="text-xs text-primary font-medium mt-0.5">
                                {ministre.portefeuille}
                              </p>
                              <div className="flex flex-wrap gap-2 mt-2">
                                {ministre.telephone && (
                                  <a
                                    href={`tel:${ministre.telephone}`}
                                    className="text-[11px] text-muted-foreground hover:text-primary flex items-center gap-1"
                                  >
                                    <Phone className="w-3 h-3" />
                                    {ministre.telephone}
                                  </a>
                                )}
                                {ministre.email && (
                                  <a
                                    href={`mailto:${ministre.email}`}
                                    className="text-[11px] text-muted-foreground hover:text-primary flex items-center gap-1"
                                  >
                                    <Mail className="w-3 h-3" />
                                    {ministre.email}
                                  </a>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20">
                <Building2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground">
                  Données du gouvernorat non disponibles
                </h3>
                <p className="text-muted-foreground mt-1">
                  Les informations seront ajoutées prochainement.
                </p>
              </div>
            )}
          </div>
        )}

        {/* ASSEMBLEE TAB */}
        {activeTab === "assemblee" && (
          <div className="space-y-6">
            {/* Search */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Rechercher un député..."
                value={searchDepute}
                onChange={(e) => setSearchDepute(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
              />
            </div>

            {loadingDeputes ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
              </div>
            ) : deputes && deputes.items.length > 0 ? (
              <>
                <p className="text-sm text-muted-foreground">
                  {deputes.total} député{deputes.total > 1 ? "s" : ""} trouvé
                  {deputes.total > 1 ? "s" : ""}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {deputes.items.map((depute) => (
                    <div
                      key={depute.id}
                      className="bg-white rounded-xl border border-border p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center text-emerald-700 font-bold text-lg flex-shrink-0">
                          {depute.nom?.charAt(0) || "D"}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-foreground text-sm">
                            {depute.nom}
                          </h4>
                          {depute.parti && (
                            <span className="inline-block text-[11px] px-2 py-0.5 bg-primary/10 text-primary rounded-md mt-1 font-medium">
                              {depute.parti}
                            </span>
                          )}
                          {depute.circonscription && (
                            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {depute.circonscription}
                            </p>
                          )}
                          <div className="flex gap-2 mt-2">
                            {depute.telephone && (
                              <a
                                href={`tel:${depute.telephone}`}
                                className="text-[11px] text-muted-foreground hover:text-primary flex items-center gap-1"
                              >
                                <Phone className="w-3 h-3" />
                                Appeler
                              </a>
                            )}
                            {depute.email && (
                              <a
                                href={`mailto:${depute.email}`}
                                className="text-[11px] text-muted-foreground hover:text-primary flex items-center gap-1"
                              >
                                <Mail className="w-3 h-3" />
                                Email
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-20">
                <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground">
                  Aucun député trouvé
                </h3>
                <p className="text-muted-foreground mt-1">
                  Les données seront ajoutées prochainement.
                </p>
              </div>
            )}
          </div>
        )}

        {/* PROJETS TAB */}
        {activeTab === "projets" && (
          <div className="space-y-6">
            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              {["", "PLANIFIE", "EN_COURS", "TERMINE", "SUSPENDU"].map(
                (statut) => (
                  <button
                    key={statut}
                    onClick={() => setProjetFilter(statut)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      projetFilter === statut
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-muted-foreground hover:bg-gray-200"
                    }`}
                  >
                    {statut === "" ? "Tous" : statutLabels[statut] || statut}
                  </button>
                ),
              )}
            </div>

            {loadingProjets ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
              </div>
            ) : projets && projets.items.length > 0 ? (
              <>
                <p className="text-sm text-muted-foreground">
                  {projets.total} projet{projets.total > 1 ? "s" : ""}
                </p>
                <div className="space-y-4">
                  {projets.items.map((projet) => (
                    <div
                      key={projet.id}
                      className="bg-white rounded-xl border border-border p-5 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span
                              className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                                statutColors[projet.statut] ||
                                "bg-gray-100 text-gray-600"
                              }`}
                            >
                              {statutLabels[projet.statut] || projet.statut}
                            </span>
                            {projet.categorie && (
                              <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-md">
                                {projet.categorie}
                              </span>
                            )}
                          </div>
                          <h4 className="font-bold text-foreground text-lg">
                            {projet.titre}
                          </h4>
                          {projet.description && (
                            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                              {projet.description}
                            </p>
                          )}
                          <div className="flex flex-wrap gap-4 mt-3 text-sm text-muted-foreground">
                            {projet.budget && (
                              <span className="flex items-center gap-1">
                                <DollarSign className="w-4 h-4 text-emerald-500" />
                                {Number(projet.budget).toLocaleString()}{" "}
                                {projet.devise}
                              </span>
                            )}
                            {projet.localisation && (
                              <span className="flex items-center gap-1">
                                <MapPin className="w-4 h-4 text-primary" />
                                {projet.localisation}
                              </span>
                            )}
                            {projet.dateDebut && (
                              <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4 text-blue-500" />
                                {new Date(projet.dateDebut).toLocaleDateString(
                                  "fr-FR",
                                )}
                                {projet.dateFin &&
                                  ` — ${new Date(projet.dateFin).toLocaleDateString("fr-FR")}`}
                              </span>
                            )}
                            {projet.maitreDoeuvre && (
                              <span className="flex items-center gap-1">
                                <Briefcase className="w-4 h-4" />
                                {projet.maitreDoeuvre}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-20">
                <FolderKanban className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground">
                  Aucun projet trouvé
                </h3>
                <p className="text-muted-foreground mt-1">
                  Les projets de développement seront ajoutés prochainement.
                </p>
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
