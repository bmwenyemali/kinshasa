"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  MapPin,
  Search,
  Filter,
  ChevronRight,
  Sparkles,
  Building2,
  Star,
  BadgeCheck,
  Heart,
  X,
} from "lucide-react";
import { Header, Footer } from "@/components/layout/Header";
import { SearchBar } from "@/components/search/SearchBar";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { trpc, type LieuSearchResult } from "@/lib/trpc";
import { Spinner, Badge } from "@kinservices/ui";
import { LIEU_TYPE_LABELS, LIEU_TYPE_ICONS } from "@kinservices/ui";

const TYPE_GRADIENTS: Record<string, string> = {
  HOPITAL: "from-red-500 to-rose-600",
  CLINIQUE: "from-pink-500 to-rose-600",
  CENTRE_SANTE: "from-emerald-500 to-green-600",
  ADMINISTRATION: "from-blue-500 to-indigo-600",
  MAISON_COMMUNALE: "from-indigo-500 to-violet-600",
  COMMISSARIAT: "from-slate-600 to-gray-700",
  POLICE: "from-slate-500 to-gray-600",
  TRIBUNAL: "from-purple-500 to-violet-600",
  ECOLE: "from-amber-500 to-orange-600",
  UNIVERSITE: "from-teal-500 to-cyan-600",
  GOUVERNORAT: "from-cyan-600 to-blue-700",
  AUTRE: "from-gray-500 to-slate-600",
};

const TYPE_DESCRIPTIONS: Record<string, string> = {
  HOPITAL: "Hôpitaux généraux et spécialisés",
  CLINIQUE: "Cliniques et centres médicaux privés",
  CENTRE_SANTE: "Centres de santé communautaires",
  ADMINISTRATION: "Bureaux administratifs publics",
  MAISON_COMMUNALE: "Maisons communales, état civil",
  COMMISSARIAT: "Commissariats de police",
  POLICE: "Postes et stations de police",
  TRIBUNAL: "Tribunaux et cours de justice",
  ECOLE: "Écoles primaires et secondaires",
  UNIVERSITE: "Universités et instituts supérieurs",
  GOUVERNORAT: "Gouvernorat et institutions",
  AUTRE: "Autres lieux de service",
};

export default function LieuxPage() {
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [showAllTypes, setShowAllTypes] = useState(false);

  const { data, isLoading, error } = trpc.lieux.search.useQuery({
    query: search || undefined,
    type: (selectedType as any) || undefined,
    verified: undefined,
    limit: 100,
    offset: 0,
  });

  // Count lieux by type from the unfiltered data
  const { data: allData } = trpc.lieux.search.useQuery({
    limit: 500,
    offset: 0,
  });

  const typeCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    if (allData?.items) {
      allData.items.forEach((l) => {
        counts[l.type] = (counts[l.type] || 0) + 1;
      });
    }
    return counts;
  }, [allData]);

  const typeEntries = Object.entries(LIEU_TYPE_LABELS);
  const displayTypes = showAllTypes ? typeEntries : typeEntries.slice(0, 8);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-primary via-primary-dark to-[#003d6b] text-white overflow-hidden">
          <div className="absolute inset-0 hero-pattern" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />

          <div className="relative container mx-auto max-w-6xl px-4 py-14">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium text-white/50">
                Annuaire des lieux
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold mb-3 tracking-tight">
              Lieux &amp; Établissements
            </h1>
            <p className="text-white/60 max-w-xl text-lg leading-relaxed">
              Trouvez tous les lieux de service public à Kinshasa : hôpitaux,
              administrations, écoles, tribunaux et plus encore.
            </p>

            <div className="mt-6 max-w-xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="text"
                  placeholder="Rechercher un lieu par nom, adresse..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-12 pr-10 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:bg-white/15 focus:border-white/40 focus:ring-2 focus:ring-white/20 text-base transition-all backdrop-blur-sm"
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-full"
                  >
                    <X className="w-4 h-4 text-white/50" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Category filters */}
        <section className="py-8 px-4 border-b border-border bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                <Filter className="w-4 h-4 text-primary" />
                Filtrer par type
              </h2>
              {selectedType && (
                <button
                  onClick={() => setSelectedType(null)}
                  className="text-sm text-primary hover:underline flex items-center gap-1"
                >
                  <X className="w-3.5 h-3.5" />
                  Effacer le filtre
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {displayTypes.map(([type, label]) => {
                const isSelected = selectedType === type;
                const count = typeCounts[type] || 0;
                return (
                  <button
                    key={type}
                    onClick={() => setSelectedType(isSelected ? null : type)}
                    className={`relative p-4 rounded-xl border text-left transition-all ${
                      isSelected
                        ? "border-primary bg-primary/5 shadow-md ring-2 ring-primary/20"
                        : "border-border hover:border-primary/30 hover:shadow-sm bg-white"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center mb-2 text-xl bg-gradient-to-br ${
                        TYPE_GRADIENTS[type] || "from-gray-500 to-slate-600"
                      } text-white shadow-sm`}
                    >
                      {LIEU_TYPE_ICONS[type] || "📍"}
                    </div>
                    <h3 className="font-semibold text-foreground text-sm">
                      {label}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                      {TYPE_DESCRIPTIONS[type]}
                    </p>
                    {count > 0 && (
                      <span className="absolute top-2 right-2 text-xs bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-full">
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {typeEntries.length > 8 && (
              <button
                onClick={() => setShowAllTypes(!showAllTypes)}
                className="mt-3 text-sm text-primary hover:underline font-medium"
              >
                {showAllTypes
                  ? "Afficher moins"
                  : `Voir tous les types (${typeEntries.length})`}
              </button>
            )}
          </div>
        </section>

        {/* Results */}
        <section className="py-8 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-foreground">
                  {selectedType
                    ? LIEU_TYPE_LABELS[selectedType]
                    : search
                      ? "Résultats de recherche"
                      : "Tous les lieux"}
                </h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {isLoading
                    ? "Chargement..."
                    : `${data?.total || 0} lieu${(data?.total || 0) > 1 ? "x" : ""} trouvé${(data?.total || 0) > 1 ? "s" : ""}`}
                </p>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm mb-6">
                <strong>Erreur:</strong> {error.message}
              </div>
            )}

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="h-28 bg-white rounded-xl border border-border animate-pulse"
                  />
                ))}
              </div>
            ) : data && data.items.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.items.map((lieu: LieuSearchResult) => (
                  <ServiceCard
                    key={lieu.id}
                    id={lieu.id}
                    nom={lieu.nom}
                    type={lieu.type}
                    commune={lieu.commune?.name}
                    adresse={lieu.adresse}
                    averageRating={lieu.averageRating}
                    avisCount={lieu._count?.avis || 0}
                    verified={lieu.verified}
                    services={lieu.servicesProposed}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-2xl border border-border">
                <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Aucun lieu trouvé
                </h3>
                <p className="text-muted-foreground text-sm max-w-md mx-auto">
                  {search
                    ? `Aucun résultat pour "${search}". Essayez avec d'autres mots-clés.`
                    : "Aucun lieu ne correspond aux filtres sélectionnés."}
                </p>
                {(search || selectedType) && (
                  <button
                    onClick={() => {
                      setSearch("");
                      setSelectedType(null);
                    }}
                    className="mt-4 text-primary font-medium hover:underline text-sm"
                  >
                    Effacer tous les filtres
                  </button>
                )}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
