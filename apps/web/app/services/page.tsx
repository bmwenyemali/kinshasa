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
} from "lucide-react";
import { Header, Footer } from "@/components/layout/Header";
import { SearchBar } from "@/components/search/SearchBar";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { trpc } from "@/lib/trpc";
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
};

const categoryDescriptions: Record<ServiceCategorie, string> = {
  ETAT_CIVIL: "Actes de naissance, mariage, décès, certificats divers",
  SANTE: "Hôpitaux, centres de santé, vaccinations, analyses",
  JUSTICE: "Casier judiciaire, plaintes, tribunal",
  EDUCATION: "Inscriptions scolaires, diplômes, équivalences",
  IMPOTS: "Déclarations fiscales, patentes, taxes",
  URGENCE: "Services d'urgence, pompiers, SAMU",
  SOCIAL: "Aide sociale, pensions, allocations",
  TRANSPORT: "Permis de conduire, carte grise, transport public",
  AUTRE: "Autres services administratifs",
};

const categoryColors: Record<ServiceCategorie, string> = {
  ETAT_CIVIL: "bg-blue-100 text-blue-700",
  SANTE: "bg-red-100 text-red-700",
  JUSTICE: "bg-purple-100 text-purple-700",
  EDUCATION: "bg-green-100 text-green-700",
  IMPOTS: "bg-amber-100 text-amber-700",
  URGENCE: "bg-rose-100 text-rose-700",
  SOCIAL: "bg-pink-100 text-pink-700",
  TRANSPORT: "bg-orange-100 text-orange-700",
  AUTRE: "bg-gray-100 text-gray-700",
};

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] =
    useState<ServiceCategorie | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-12 px-4">
          <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-2">Services Publics</h1>
            <p className="text-white/80 max-w-xl">
              Trouvez tous les services administratifs et publics disponibles à
              Kinshasa, avec les documents requis, prix officiels et délais.
            </p>

            <div className="mt-6">
              <SearchBar
                placeholder="Rechercher un service..."
                onSearch={(q) =>
                  (window.location.href = `/recherche?q=${encodeURIComponent(q)}`)
                }
                className="max-w-xl"
              />
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-8 px-4">
          <div className="container mx-auto">
            <h2 className="text-xl font-bold text-foreground mb-6">
              Catégories de Services
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(SERVICE_CATEGORIE_LABELS).map(([cat, label]) => (
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
                    relative p-6 rounded-xl border-2 transition-all text-left
                    ${
                      selectedCategory === cat
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50 bg-white"
                    }
                  `}
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${
                      categoryColors[cat as ServiceCategorie]
                    }`}
                  >
                    {categoryIcons[cat as ServiceCategorie]}
                  </div>
                  <h3 className="font-semibold text-foreground">{label}</h3>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {categoryDescriptions[cat as ServiceCategorie]}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Services by category */}
        {selectedCategory && (
          <section className="py-8 px-4 bg-muted">
            <div className="container mx-auto">
              <ServicesList category={selectedCategory} />
            </div>
          </section>
        )}

        {/* Popular services */}
        {!selectedCategory && (
          <section className="py-8 px-4 bg-muted">
            <div className="container mx-auto">
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
        {lieux.items.map((lieu) => (
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
      {lieux.map((lieu) => (
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
