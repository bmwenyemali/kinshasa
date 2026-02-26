"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileText,
  Heart,
  GraduationCap,
  Stethoscope,
  Building2,
  Bus,
  ShoppingBag,
  HelpCircle,
  ChevronRight,
  Search,
  Sparkles,
  Shield,
} from "lucide-react";
import { Header, Footer } from "@/components/layout/Header";
import { SearchBar } from "@/components/search/SearchBar";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { trpc, type LieuSearchResult, type FeaturedLieu } from "@/lib/trpc";
import { Card, Badge, Spinner } from "@kinservices/ui";
import { ServiceCategorie } from "@kinservices/api";
import { SERVICE_CATEGORIE_LABELS } from "@kinservices/ui";

const categoryIcons: Record<ServiceCategorie, React.ReactNode> = {
  ETAT_CIVIL: <FileText className="w-6 h-6" />,
  SANTE: <Stethoscope className="w-6 h-6" />,
  JUSTICE: <Building2 className="w-6 h-6" />,
  EDUCATION: <GraduationCap className="w-6 h-6" />,
  IMPOTS: <ShoppingBag className="w-6 h-6" />,
  URGENCE: <HelpCircle className="w-6 h-6" />,
  SOCIAL: <Heart className="w-6 h-6" />,
  TRANSPORT: <Bus className="w-6 h-6" />,
  AUTRE: <HelpCircle className="w-6 h-6" />,
  SECURITE: <Shield className="w-6 h-6" />,
};

const categoryDescriptions: Record<ServiceCategorie, string> = {
  ETAT_CIVIL: "Actes de naissance, mariage, décès",
  SANTE: "Hôpitaux, centres de santé, vaccins",
  JUSTICE: "Casier judiciaire, plaintes, tribunal",
  EDUCATION: "Inscriptions, diplômes, équivalences",
  IMPOTS: "Déclarations fiscales, patentes",
  URGENCE: "Services d'urgence, pompiers",
  SOCIAL: "Aide sociale, pensions",
  TRANSPORT: "Permis, carte grise",
  AUTRE: "Autres services administratifs",
  SECURITE: "Police, sécurité publique",
};

const categoryGradients: Record<ServiceCategorie, string> = {
  ETAT_CIVIL: "from-blue-500 to-blue-600",
  SANTE: "from-red-500 to-rose-600",
  JUSTICE: "from-purple-500 to-violet-600",
  EDUCATION: "from-emerald-500 to-green-600",
  IMPOTS: "from-amber-500 to-orange-600",
  URGENCE: "from-rose-500 to-red-600",
  SOCIAL: "from-pink-500 to-fuchsia-600",
  TRANSPORT: "from-orange-500 to-amber-600",
  AUTRE: "from-gray-500 to-slate-600",
  SECURITE: "from-indigo-500 to-indigo-600",
};

const categoryBgColors: Record<ServiceCategorie, string> = {
  ETAT_CIVIL: "bg-blue-50 border-blue-100",
  SANTE: "bg-red-50 border-red-100",
  JUSTICE: "bg-purple-50 border-purple-100",
  EDUCATION: "bg-emerald-50 border-emerald-100",
  IMPOTS: "bg-amber-50 border-amber-100",
  URGENCE: "bg-rose-50 border-rose-100",
  SOCIAL: "bg-pink-50 border-pink-100",
  TRANSPORT: "bg-orange-50 border-orange-100",
  AUTRE: "bg-gray-50 border-gray-100",
  SECURITE: "bg-indigo-50 border-indigo-100",
};

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] =
    useState<ServiceCategorie | null>(null);

  const { data: categoryCounts } = trpc.services.getCategoryCounts.useQuery();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-primary via-primary-dark to-[#003d6b] text-white overflow-hidden">
          <div className="absolute inset-0 hero-pattern" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />

          <div className="relative container mx-auto max-w-5xl px-4 py-14">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium text-white/50">
                Annuaire complet
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold mb-3 tracking-tight">
              Services Publics
            </h1>
            <p className="text-white/60 max-w-xl text-lg leading-relaxed">
              Trouvez tous les services administratifs disponibles à Kinshasa,
              avec les documents requis, prix officiels et délais.
            </p>

            <div className="mt-6">
              <SearchBar
                placeholder="Rechercher un service..."
                onSearch={(q) =>
                  (window.location.href = `/recherche?q=${encodeURIComponent(q)}`)
                }
                className="max-w-xl shadow-2xl shadow-black/20"
              />
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-10 px-4">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-xl font-bold text-foreground mb-6">
              Catégories de Services
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Object.entries(SERVICE_CATEGORIE_LABELS).map(([cat, label]) => {
                const count = categoryCounts?.[cat] ?? 0;
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() =>
                      setSelectedCategory(
                        selectedCategory === cat
                          ? null
                          : (cat as ServiceCategorie),
                      )
                    }
                    className={`
                      card-hover relative p-5 rounded-2xl border transition-all text-left
                      ${
                        isSelected
                          ? `${categoryBgColors[cat as ServiceCategorie]} shadow-md`
                          : "border-border/50 bg-white hover:border-primary/30"
                      }
                    `}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 bg-gradient-to-br ${
                        categoryGradients[cat as ServiceCategorie]
                      } text-white shadow-lg shadow-black/5`}
                    >
                      {categoryIcons[cat as ServiceCategorie]}
                    </div>
                    <h3 className="font-semibold text-foreground text-sm">
                      {label}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                      {categoryDescriptions[cat as ServiceCategorie]}
                    </p>
                    {count > 0 && (
                      <span className="absolute top-3 right-3 text-xs bg-primary/10 text-primary font-bold px-2.5 py-0.5 rounded-full">
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Services by category */}
        {selectedCategory && (
          <section className="py-10 px-4 bg-white border-t border-border/50">
            <div className="container mx-auto max-w-5xl animate-fade-in">
              <ServicesList category={selectedCategory} />
            </div>
          </section>
        )}

        {/* Popular services */}
        {!selectedCategory && (
          <section className="py-10 px-4 bg-white border-t border-border/50">
            <div className="container mx-auto max-w-5xl">
              <h2 className="text-xl font-bold text-foreground mb-6">
                Services Les Plus Demandés
              </h2>
              <PopularServices />
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}

function ServicesList({ category }: { category: ServiceCategorie }) {
  const { data: lieux, isLoading } = trpc.lieux.search.useQuery({
    categorie: category,
    verified: true,
    limit: 20,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!lieux?.items || lieux.items.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">
          Aucun lieu trouvé pour cette catégorie
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-foreground">
          {SERVICE_CATEGORIE_LABELS[category]}
        </h2>
        <Badge variant="outline">{lieux.items.length} résultat(s)</Badge>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {lieux.items.map((lieu: LieuSearchResult) => (
          <ServiceCard
            key={lieu.id}
            id={lieu.id}
            nom={lieu.nom}
            type={lieu.type}
            commune={lieu.commune?.name}
            verified={lieu.verified}
            services={lieu.servicesProposed}
            avisCount={lieu._count?.avis || 0}
          />
        ))}
      </div>
    </>
  );
}

function PopularServices() {
  const { data: lieux, isLoading } = trpc.lieux.getFeatured.useQuery();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-40 bg-white rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  if (!lieux || lieux.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {lieux.map((lieu: FeaturedLieu) => (
        <ServiceCard
          key={lieu.id}
          id={lieu.id}
          nom={lieu.nom}
          type={lieu.type}
          commune={lieu.commune?.name}
          verified={lieu.verified}
          services={lieu.servicesProposed}
          avisCount={lieu._count?.avis || 0}
        />
      ))}
    </div>
  );
}
