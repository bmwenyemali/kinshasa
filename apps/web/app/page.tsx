"use client";

import React from "react";
import Link from "next/link";
import {
  Building2,
  Stethoscope,
  FileText,
  AlertTriangle,
  Map,
  ChevronRight,
  TrendingUp,
  MapPin,
} from "lucide-react";
import { Header, Footer } from "@/components/layout/Header";
import { SearchBar } from "@/components/search/SearchBar";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { trpc } from "@/lib/trpc";
import { Spinner, CardSkeleton } from "@kinservices/ui";

const categories = [
  {
    name: "Communes",
    description: "24 communes de Kinshasa",
    icon: Building2,
    href: "/communes",
    color: "bg-blue-500",
  },
  {
    name: "Zones de Santé",
    description: "35 zones de santé",
    icon: Stethoscope,
    href: "/zones-sante",
    color: "bg-green-500",
  },
  {
    name: "Services Administratifs",
    description: "État civil, impôts, justice",
    icon: FileText,
    href: "/services",
    color: "bg-purple-500",
  },
  {
    name: "Urgences",
    description: "Hôpitaux, commissariats",
    icon: AlertTriangle,
    href: "/urgences",
    color: "bg-red-500",
  },
];

export default function HomePage() {
  const { data: featuredLieux, isLoading: loadingFeatured } =
    trpc.lieux.getFeatured.useQuery();

  const { data: alertes } = trpc.alertes.getActive.useQuery({});

  const { data: popularSearches } = trpc.search.getPopularSearches.useQuery({
    limit: 5,
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-16 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Trouvez les services publics à Kinshasa
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Communes, hôpitaux, administrations : découvrez les prix
              officiels, documents requis et obtenez l'itinéraire.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <SearchBar
                size="lg"
                placeholder="Rechercher un service (ex: acte de naissance, moustiquaire...)"
                className="shadow-xl"
              />
            </div>

            {/* Popular searches */}
            {popularSearches && popularSearches.length > 0 && (
              <div className="mt-6 flex items-center justify-center gap-2 flex-wrap">
                <span className="text-white/60 text-sm flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  Recherches populaires:
                </span>
                {popularSearches.slice(0, 4).map((search, index) => (
                  <Link
                    key={index}
                    href={`/recherche?q=${encodeURIComponent(search.query)}`}
                    className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-full text-sm transition-colors"
                  >
                    {search.query}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Alertes */}
        {alertes && alertes.length > 0 && (
          <section className="bg-yellow-50 border-y border-yellow-200 py-3">
            <div className="container mx-auto px-4">
              <div className="flex items-center gap-3 text-yellow-800">
                <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                <div className="overflow-hidden">
                  <p className="text-sm font-medium truncate">
                    {alertes[0].titre}
                  </p>
                </div>
                <Link
                  href="/alertes"
                  className="text-sm font-medium text-yellow-900 hover:underline flex-shrink-0"
                >
                  Voir plus →
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Categories */}
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Explorer par catégorie
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <Link key={category.name} href={category.href}>
                    <div className="bg-white rounded-xl border border-border hover:border-primary/30 hover:shadow-md transition-all p-6 text-center group h-full">
                      <div
                        className={`w-14 h-14 ${category.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
                      >
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-1">
                        {category.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {category.description}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Featured Lieux */}
        <section className="py-12 px-4 bg-white">
          <div className="container mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">
                Lieux populaires
              </h2>
              <Link
                href="/lieux"
                className="text-primary font-medium flex items-center gap-1 hover:underline"
              >
                Voir tous
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {loadingFeatured ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <CardSkeleton key={i} />
                ))}
              </div>
            ) : featuredLieux && featuredLieux.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {featuredLieux.map((lieu) => (
                  <ServiceCard
                    key={lieu.id}
                    id={lieu.id}
                    nom={lieu.nom}
                    type={lieu.type}
                    commune={lieu.commune?.name}
                    verified={lieu.verified}
                    featured={lieu.featured}
                    services={lieu.servicesProposed}
                    avisCount={lieu._count.avis}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                Aucun lieu disponible pour le moment.
              </div>
            )}
          </div>
        </section>

        {/* Map CTA */}
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                  Explorez sur la carte
                </h2>
                <p className="text-muted-foreground mb-6">
                  Trouvez les services publics près de vous grâce à notre carte
                  interactive. Filtrez par catégorie et obtenez l'itinéraire.
                </p>
                <Link
                  href="/carte"
                  className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors"
                >
                  <Map className="w-5 h-5" />
                  Ouvrir la carte
                </Link>
              </div>
              <div className="w-full md:w-80 h-48 bg-muted rounded-xl flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <MapPin className="w-12 h-12 mx-auto mb-2 text-primary" />
                  <p className="text-sm">Carte interactive</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-12 px-4 bg-foreground text-white">
          <div className="container mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <p className="text-4xl font-bold text-secondary">24</p>
                <p className="text-white/80 mt-1">Communes</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-secondary">35</p>
                <p className="text-white/80 mt-1">Zones de Santé</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-secondary">100+</p>
                <p className="text-white/80 mt-1">Lieux répertoriés</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-secondary">500+</p>
                <p className="text-white/80 mt-1">Services disponibles</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
