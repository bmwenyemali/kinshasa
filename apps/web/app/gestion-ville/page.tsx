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
  BookOpen,
  X,
  History,
  Landmark,
  Shield,
  Scale,
  FileText,
} from "lucide-react";
import Link from "next/link";

type Tab = "gouvernorat" | "assemblee" | "projets" | "histoire";

// Biography modal component
function BiographyModal({
  isOpen,
  onClose,
  person,
}: {
  isOpen: boolean;
  onClose: () => void;
  person: {
    nom: string;
    photoUrl?: string | null;
    role: string;
    biographie?: string | null;
    telephone?: string | null;
    email?: string | null;
    parti?: string | null;
    circonscription?: string | null;
  } | null;
}) {
  if (!isOpen || !person) return null;
  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-border p-4 flex items-center justify-between rounded-t-2xl">
          <h3 className="font-bold text-lg text-foreground">Biographie</h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-4 mb-6">
            {person.photoUrl ? (
              <img
                src={person.photoUrl}
                alt={person.nom}
                className="w-20 h-20 rounded-2xl object-cover shadow-lg"
              />
            ) : (
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                {person.nom?.charAt(0) || "?"}
              </div>
            )}
            <div>
              <h4 className="text-xl font-bold text-foreground">
                {person.nom}
              </h4>
              <p className="text-sm text-primary font-medium">{person.role}</p>
              {person.parti && (
                <span className="text-xs text-muted-foreground">
                  {person.parti}
                </span>
              )}
              {person.circonscription && (
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3" /> {person.circonscription}
                </p>
              )}
            </div>
          </div>

          {person.biographie ? (
            <div className="prose prose-sm max-w-none">
              <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">
                {person.biographie}
              </p>
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-xl">
              <BookOpen className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                Biographie non encore disponible.
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Les informations seront ajoutées prochainement.
              </p>
            </div>
          )}

          {(person.telephone || person.email) && (
            <div className="mt-6 pt-4 border-t border-border flex flex-wrap gap-3">
              {person.telephone && (
                <a
                  href={`tel:${person.telephone}`}
                  className="flex items-center gap-1.5 text-sm text-primary hover:underline"
                >
                  <Phone className="w-4 h-4" /> {person.telephone}
                </a>
              )}
              {person.email && (
                <a
                  href={`mailto:${person.email}`}
                  className="flex items-center gap-1.5 text-sm text-primary hover:underline"
                >
                  <Mail className="w-4 h-4" /> {person.email}
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function GestionVillePage() {
  const [activeTab, setActiveTab] = useState<Tab>("gouvernorat");
  const [searchDepute, setSearchDepute] = useState("");
  const [projetFilter, setProjetFilter] = useState("");
  const [bioModal, setBioModal] = useState<{
    nom: string;
    photoUrl?: string | null;
    role: string;
    biographie?: string | null;
    telephone?: string | null;
    email?: string | null;
    parti?: string | null;
    circonscription?: string | null;
  } | null>(null);

  const { data: gouvernorat, isLoading: loadingGouv } =
    trpc.ville.getGouvernorat.useQuery();
  const { data: deputes, isLoading: loadingDeputes } =
    trpc.ville.getDeputes.useQuery({ search: searchDepute || undefined });
  const { data: projets, isLoading: loadingProjets } =
    trpc.ville.getProjets.useQuery({
      statut: projetFilter || undefined,
    });
  const { data: gouverneursHistoriques, isLoading: loadingHistoire } =
    trpc.ville.getGouverneursHistoriques.useQuery();

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
    {
      id: "histoire" as Tab,
      label: "Histoire",
      icon: History,
      description: "Histoire de la ville-province",
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

      {/* Biography Modal */}
      <BiographyModal
        isOpen={!!bioModal}
        onClose={() => setBioModal(null)}
        person={bioModal}
      />

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
                <div
                  className="bg-white rounded-2xl shadow-lg border border-border overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
                  onClick={() =>
                    setBioModal({
                      nom: gouvernorat.gouverneur,
                      photoUrl: gouvernorat.photoUrl,
                      role: "Gouverneur de la Ville-Province de Kinshasa",
                      biographie: gouvernorat.biographie,
                      telephone: gouvernorat.telephone,
                      email: gouvernorat.email,
                    })
                  }
                >
                  <div className="bg-gradient-to-r from-primary/10 to-amber-50 p-8">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                      {gouvernorat.photoUrl ? (
                        <img
                          src={gouvernorat.photoUrl}
                          alt={gouvernorat.gouverneur}
                          className="w-32 h-32 rounded-2xl object-cover shadow-xl"
                        />
                      ) : (
                        <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white text-5xl font-bold shadow-xl">
                          {gouvernorat.gouverneur?.charAt(0) || "G"}
                        </div>
                      )}
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
                        <div className="mt-3">
                          <span className="text-xs text-primary font-medium flex items-center gap-1">
                            <BookOpen className="w-3.5 h-3.5" /> Cliquez pour
                            voir la biographie
                          </span>
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
                          className="bg-white rounded-xl border border-border p-4 hover:shadow-md transition-shadow cursor-pointer"
                          onClick={() =>
                            setBioModal({
                              nom: ministre.nom,
                              photoUrl: ministre.photoUrl,
                              role: `Ministre Provincial — ${ministre.portefeuille}`,
                              biographie: (ministre as any).biographie,
                              telephone: ministre.telephone,
                              email: ministre.email,
                            })
                          }
                        >
                          <div className="flex items-start gap-3">
                            {ministre.photoUrl ? (
                              <img
                                src={ministre.photoUrl}
                                alt={ministre.nom}
                                className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                              />
                            ) : (
                              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-blue-700 font-bold text-lg flex-shrink-0">
                                {ministre.nom?.charAt(0) || "M"}
                              </div>
                            )}
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

                {/* Commissaires Généraux */}
                {(gouvernorat as any).commissaires &&
                  (gouvernorat as any).commissaires.length > 0 && (
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                        <Award className="w-5 h-5 text-amber-500" />
                        Commissaires Généraux
                        <span className="text-sm font-normal text-muted-foreground ml-2">
                          ({(gouvernorat as any).commissaires.length})
                        </span>
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {(gouvernorat as any).commissaires.map(
                          (commissaire: any) => (
                            <div
                              key={commissaire.id}
                              className="bg-white rounded-xl border border-amber-200 p-4 hover:shadow-md transition-shadow cursor-pointer bg-gradient-to-br from-white to-amber-50/30"
                              onClick={() =>
                                setBioModal({
                                  nom: commissaire.nom,
                                  photoUrl: commissaire.photoUrl,
                                  role: `Commissaire Général — ${commissaire.portefeuille}`,
                                  biographie: commissaire.biographie,
                                  telephone: commissaire.telephone,
                                  email: commissaire.email,
                                })
                              }
                            >
                              <div className="flex items-start gap-3">
                                {commissaire.photoUrl ? (
                                  <img
                                    src={commissaire.photoUrl}
                                    alt={commissaire.nom}
                                    className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                                  />
                                ) : (
                                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center text-amber-700 font-bold text-lg flex-shrink-0">
                                    {commissaire.nom?.charAt(0) || "C"}
                                  </div>
                                )}
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-semibold text-foreground text-sm leading-tight">
                                    {commissaire.nom}
                                  </h4>
                                  <p className="text-xs text-amber-600 font-medium mt-0.5">
                                    {commissaire.portefeuille}
                                  </p>
                                  <div className="flex flex-wrap gap-2 mt-2">
                                    {commissaire.telephone && (
                                      <a
                                        href={`tel:${commissaire.telephone}`}
                                        className="text-[11px] text-muted-foreground hover:text-primary flex items-center gap-1"
                                      >
                                        <Phone className="w-3 h-3" />
                                        {commissaire.telephone}
                                      </a>
                                    )}
                                    {commissaire.email && (
                                      <a
                                        href={`mailto:${commissaire.email}`}
                                        className="text-[11px] text-muted-foreground hover:text-primary flex items-center gap-1"
                                      >
                                        <Mail className="w-3 h-3" />
                                        {commissaire.email}
                                      </a>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  )}

                {/* Gouvernorat Details Section */}
                <div className="bg-white rounded-2xl border border-border p-6">
                  <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <Landmark className="w-5 h-5 text-primary" />
                    Le Gouvernorat de Kinshasa
                  </h3>
                  <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
                    <p>
                      Le{" "}
                      <strong>
                        Gouvernorat de la ville-province de Kinshasa
                      </strong>{" "}
                      est l&apos;organe exécutif provincial dirigé par le
                      Gouverneur, assisté d&apos;un Vice-Gouverneur. Il est
                      responsable de la gestion administrative, politique et
                      économique de Kinshasa, la capitale de la République
                      Démocratique du Congo.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-blue-50 rounded-xl p-4">
                        <h4 className="font-semibold text-blue-800 flex items-center gap-2 mb-2">
                          <Shield className="w-4 h-4" /> Missions principales
                        </h4>
                        <ul className="text-sm text-blue-900 space-y-1">
                          <li>• Assurer l&apos;ordre public et la sécurité</li>
                          <li>• Coordonner les services provinciaux</li>
                          <li>
                            • Exécuter les décisions de l&apos;Assemblée
                            provinciale
                          </li>
                          <li>
                            • Représenter la province auprès du pouvoir central
                          </li>
                          <li>
                            • Gérer les finances et ressources de la province
                          </li>
                        </ul>
                      </div>
                      <div className="bg-emerald-50 rounded-xl p-4">
                        <h4 className="font-semibold text-emerald-800 flex items-center gap-2 mb-2">
                          <Scale className="w-4 h-4" /> Cadre juridique
                        </h4>
                        <ul className="text-sm text-emerald-900 space-y-1">
                          <li>
                            • Constitution de la RDC (2006, révisée en 2011)
                          </li>
                          <li>
                            • Loi organique n° 08/016 sur les entités
                            territoriales
                          </li>
                          <li>
                            • Loi n° 06/006 portant organisation des élections
                          </li>
                          <li>
                            • Le Gouverneur est élu par les députés provinciaux
                          </li>
                          <li>• Mandat de 5 ans, renouvelable une fois</li>
                        </ul>
                      </div>
                    </div>
                    <div className="bg-amber-50 rounded-xl p-4">
                      <h4 className="font-semibold text-amber-800 flex items-center gap-2 mb-2">
                        <FileText className="w-4 h-4" /> Kinshasa en chiffres
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
                        <div>
                          <p className="text-2xl font-bold text-amber-700">
                            24
                          </p>
                          <p className="text-xs text-amber-800">Communes</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-amber-700">
                            ~17M
                          </p>
                          <p className="text-xs text-amber-800">
                            Habitants (est.)
                          </p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-amber-700">
                            9 965
                          </p>
                          <p className="text-xs text-amber-800">
                            km² superficie
                          </p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-amber-700">
                            35
                          </p>
                          <p className="text-xs text-amber-800">
                            Zones de santé
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
                      className="bg-white rounded-xl border border-border p-4 hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() =>
                        setBioModal({
                          nom: depute.nom,
                          photoUrl: depute.photoUrl,
                          role: "Député Provincial",
                          biographie: (depute as any).biographie,
                          telephone: depute.telephone,
                          email: depute.email,
                          parti: depute.parti,
                          circonscription: depute.circonscription,
                        })
                      }
                    >
                      <div className="flex items-start gap-3">
                        {depute.photoUrl ? (
                          <img
                            src={depute.photoUrl}
                            alt={depute.nom}
                            className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center text-emerald-700 font-bold text-lg flex-shrink-0">
                            {depute.nom?.charAt(0) || "D"}
                          </div>
                        )}
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

        {/* HISTOIRE TAB */}
        {activeTab === "histoire" && (
          <div className="space-y-8">
            {/* Histoire narrative */}
            <div className="bg-white rounded-2xl border border-border p-6">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <History className="w-6 h-6 text-primary" />
                Histoire de la Ville-Province de Kinshasa
              </h2>
              <div className="prose prose-sm max-w-none text-muted-foreground space-y-3">
                <p>
                  <strong>Kinshasa</strong>, anciennement <em>Léopoldville</em>,
                  est la capitale et la plus grande ville de la République
                  Démocratique du Congo. Fondée en 1881 par l&apos;explorateur
                  Henry Morton Stanley sous le nom de <em>Léopoldville</em> en
                  l&apos;honneur du roi Léopold II de Belgique, la ville est
                  située sur la rive gauche du fleuve Congo, face à Brazzaville.
                </p>
                <p>
                  La ville a connu plusieurs appellations et transformations
                  administratives. De simple poste colonial, elle est devenue
                  chef-lieu de la colonie du Congo belge, puis capitale du pays
                  à l&apos;indépendance le 30 juin 1960. Elle a été renommée{" "}
                  <strong>Kinshasa</strong> le 1er octobre 1966, d&apos;après le
                  nom d&apos;un ancien village situé sur le site,{" "}
                  <em>Kinchassa</em>.
                </p>
                <p>
                  En tant que ville-province, Kinshasa jouit d&apos;un statut
                  particulier : elle est à la fois une ville et une province.
                  Elle est dirigée par un <strong>Gouverneur</strong> élu par
                  les députés provinciaux, et dispose de sa propre{" "}
                  <strong>Assemblée provinciale</strong>.
                </p>
                <p>
                  Avec une population estimée à plus de 17 millions
                  d&apos;habitants, Kinshasa est la troisième plus grande
                  agglomération d&apos;Afrique et la plus grande ville
                  francophone du monde. Ses 24 communes couvrent une superficie
                  de 9 965 km².
                </p>
                <h3 className="text-lg font-bold text-foreground mt-6">
                  Dates clés
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    {
                      date: "1881",
                      event: "Fondation de Léopoldville par H.M. Stanley",
                    },
                    {
                      date: "1923",
                      event: "Léopoldville devient chef-lieu du Congo belge",
                    },
                    {
                      date: "1960",
                      event: "Indépendance — capitale de la Rép. du Congo",
                    },
                    { date: "1966", event: "Renommée Kinshasa" },
                    {
                      date: "1971-1997",
                      event: "Capitale du Zaïre sous Mobutu",
                    },
                    { date: "1997", event: "Redevient capitale de la RDC" },
                    {
                      date: "2006",
                      event: "Statut de ville-province dans la Constitution",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 bg-gray-50 rounded-lg p-3"
                    >
                      <span className="text-sm font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
                        {item.date}
                      </span>
                      <span className="text-sm text-foreground">
                        {item.event}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Historical governors */}
            <div className="bg-white rounded-2xl border border-border p-6">
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" />
                Gouverneurs historiques de Kinshasa
              </h2>
              {loadingHistoire ? (
                <div className="flex justify-center py-10">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                </div>
              ) : gouverneursHistoriques &&
                gouverneursHistoriques.length > 0 ? (
                <div className="relative">
                  <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-primary/20" />
                  <div className="space-y-4">
                    {gouverneursHistoriques.map((g, i) => (
                      <div key={g.id} className="relative pl-14">
                        <div className="absolute left-4 top-3 w-4 h-4 rounded-full bg-primary border-2 border-white shadow" />
                        <div
                          className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer"
                          onClick={() =>
                            setBioModal({
                              nom: g.nom,
                              photoUrl: g.photoUrl,
                              role: `Gouverneur de Kinshasa (${g.dateDebut || "?"} — ${g.dateFin || "?"})`,
                              biographie: g.biographie,
                              telephone: null,
                              email: null,
                            })
                          }
                        >
                          <div className="flex items-start gap-3">
                            {g.photoUrl ? (
                              <img
                                src={g.photoUrl}
                                alt={g.nom}
                                className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                              />
                            ) : (
                              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center text-amber-700 font-bold flex-shrink-0">
                                {g.nom?.charAt(0)}
                              </div>
                            )}
                            <div className="flex-1">
                              <h4 className="font-semibold text-foreground">
                                {g.nom}
                              </h4>
                              <p className="text-xs text-primary font-medium">
                                {g.dateDebut} — {g.dateFin || "en fonction"}
                              </p>
                              {g.biographie && (
                                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                  {g.biographie}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-10 bg-gray-50 rounded-xl">
                  <History className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Les gouverneurs historiques seront ajoutés prochainement par
                    l&apos;administrateur.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
