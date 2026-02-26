"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Building2,
  FileText,
  AlertTriangle,
  Map,
  ChevronRight,
  TrendingUp,
  MapPin,
  Search,
  ArrowRight,
  Stethoscope,
  Shield,
  Sparkles,
} from "lucide-react";
import { Header, Footer } from "@/components/layout/Header";
import { SearchBar } from "@/components/search/SearchBar";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { trpc, type FeaturedLieu, type PopularSearch } from "@/lib/trpc";
import { Spinner, CardSkeleton } from "@kinservices/ui";

const categories = [
  {
    name: "Communes",
    description: "24 communes de Kinshasa",
    icon: Building2,
    href: "/communes",
    gradient: "from-blue-500 to-blue-600",
    bg: "bg-blue-50",
    text: "text-blue-700",
  },
  {
    name: "Services",
    description: "État civil, impôts, justice",
    icon: FileText,
    href: "/services",
    gradient: "from-violet-500 to-purple-600",
    bg: "bg-violet-50",
    text: "text-violet-700",
  },
  {
    name: "Carte",
    description: "Trouvez les services proches",
    icon: Map,
    href: "/carte",
    gradient: "from-emerald-500 to-teal-600",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
  },
  {
    name: "Urgences",
    description: "Hôpitaux, commissariats",
    icon: AlertTriangle,
    href: "/recherche?q=urgence",
    gradient: "from-rose-500 to-red-600",
    bg: "bg-rose-50",
    text: "text-rose-700",
  },
];

const quickLinks = [
  {
    icon: Stethoscope,
    label: "Hôpitaux",
    href: "/carte?type=HOPITAL",
    color: "text-red-500",
  },
  {
    icon: Shield,
    label: "Commissariats",
    href: "/carte?type=COMMISSARIAT",
    color: "text-indigo-500",
  },
  {
    icon: Building2,
    label: "Mairies",
    href: "/carte?type=MAIRIE",
    color: "text-blue-500",
  },
  {
    icon: FileText,
    label: "État civil",
    href: "/recherche?q=acte%20de%20naissance",
    color: "text-purple-500",
  },
];

export default function HomePage() {
  const { data: featuredLieux, isLoading: loadingFeatured } =
    trpc.lieux.getFeatured.useQuery();

  const { data: alertes } = trpc.alertes.getActive.useQuery({});

  const { data: popularSearches } = trpc.search.getPopularSearches.useQuery({
    limit: 5,
  });

  // JSON-LD structured data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Kin Services",
    alternateName: "Services Publics de Kinshasa",
    url: "https://kinshasa-seven.vercel.app",
    description:
      "Trouvez facilement les services publics à Kinshasa : communes, hôpitaux, commissariats, tribunaux, écoles. Prix officiels, documents requis et itinéraires.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate:
          "https://kinshasa-seven.vercel.app/recherche?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
    publisher: {
      "@type": "Organization",
      name: "Akili Group",
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary via-primary-dark to-[#003d6b] text-white overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 hero-pattern" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary-light/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />

          {/* Large logo with transparent background */}
          <div className="absolute top-1/2 right-4 lg:right-12 -translate-y-1/2 hidden md:block pointer-events-none">
            <Image
              src="/logo.png"
              alt="Kin Services"
              width={500}
              height={500}
              className="w-[280px] lg:w-[360px] h-auto select-none drop-shadow-2xl"
              priority
            />
          </div>

          <div className="relative container mx-auto max-w-6xl px-4 py-16 md:py-24">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-secondary" />
              <span className="text-sm font-medium text-white/70">
                Le guide des services publics de Kinshasa
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold mb-5 leading-tight tracking-tight">
              Trouvez les services
              <br />
              publics à <span className="text-secondary">Kinshasa</span>
            </h1>
            <p className="text-lg md:text-xl text-white/70 mb-8 max-w-xl leading-relaxed">
              Communes, hôpitaux, administrations — découvrez les prix
              officiels, documents requis et obtenez l&apos;itinéraire.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl">
              <SearchBar
                size="lg"
                placeholder="Rechercher un service (ex: acte de naissance, vaccin...)"
                className="shadow-2xl shadow-black/20"
              />
            </div>

            {/* Quick links */}
            <div className="mt-8 flex items-center gap-3 flex-wrap">
              {quickLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-sm font-medium transition-all border border-white/10 hover:border-white/20"
                  >
                    <Icon className="w-4 h-4" />
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* Popular searches */}
            {popularSearches && popularSearches.length > 0 && (
              <div className="mt-6 flex items-center gap-2 flex-wrap">
                <span className="text-white/40 text-sm flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  Populaire :
                </span>
                {popularSearches
                  .slice(0, 4)
                  .map((search: PopularSearch, index: number) => (
                    <Link
                      key={index}
                      href={`/recherche?q=${encodeURIComponent(search.query)}`}
                      className="text-white/50 hover:text-white/80 text-sm transition-colors"
                    >
                      {search.query}
                      {index < Math.min(popularSearches.length, 4) - 1 && " · "}
                    </Link>
                  ))}
              </div>
            )}
          </div>
        </section>

        {/* Alertes */}
        {alertes && alertes.length > 0 && (
          <section className="bg-amber-50 border-b border-amber-200/50 py-3">
            <div className="container mx-auto px-4">
              <div className="flex items-center gap-3 text-amber-800">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                <p className="text-sm font-medium truncate flex-1">
                  {alertes[0].titre}
                </p>
                <Link
                  href="/alertes"
                  className="text-xs font-semibold text-amber-900 hover:underline flex-shrink-0"
                >
                  Voir plus →
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Categories */}
        <section className="py-14 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Explorer
                </h2>
                <p className="text-muted-foreground mt-1">
                  Naviguez par catégorie
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <Link key={category.name} href={category.href}>
                    <div className="card-hover bg-white rounded-2xl border border-border/50 p-6 text-center group h-full cursor-pointer">
                      <div
                        className={`w-14 h-14 bg-gradient-to-br ${category.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-black/5`}
                      >
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-1">
                        {category.name}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-snug">
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
        <section className="py-14 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Lieux populaires
                </h2>
                <p className="text-muted-foreground mt-1">
                  Les plus consultés par les Kinois
                </p>
              </div>
              <Link
                href="/lieux"
                className="text-primary font-medium flex items-center gap-1 hover:gap-2 transition-all text-sm"
              >
                Voir tous
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {loadingFeatured ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {[1, 2, 3].map((i) => (
                  <CardSkeleton key={i} />
                ))}
              </div>
            ) : featuredLieux && featuredLieux.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {featuredLieux.map((lieu: FeaturedLieu) => (
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
              <div className="text-center py-16 text-muted-foreground">
                <MapPin className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p>Aucun lieu disponible pour le moment.</p>
              </div>
            )}
          </div>
        </section>

        {/* Map CTA */}
        <section className="py-14 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="relative bg-gradient-to-br from-primary to-primary-dark rounded-3xl p-8 md:p-14 overflow-hidden">
              {/* Decorative circles */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/10 rounded-full translate-y-1/3 -translate-x-1/4" />

              <div className="relative flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                    Explorez sur la carte
                  </h2>
                  <p className="text-white/70 mb-6 leading-relaxed">
                    Trouvez les services publics près de vous grâce à notre
                    carte interactive avec les limites des communes.
                  </p>
                  <Link
                    href="/carte"
                    className="inline-flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-xl font-semibold hover:bg-white/90 transition-colors shadow-lg"
                  >
                    <Map className="w-5 h-5" />
                    Ouvrir la carte
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="w-full md:w-72 h-48 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 mx-auto mb-2 text-secondary" />
                    <p className="text-sm text-white/60 font-medium">
                      24 communes
                    </p>
                    <p className="text-xs text-white/40">
                      avec limites géographiques
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-14 px-4 bg-foreground text-white">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: "24", label: "Communes" },
                { value: "150+", label: "Quartiers" },
                { value: "100+", label: "Lieux répertoriés" },
                { value: "500+", label: "Services disponibles" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-4xl md:text-5xl font-extrabold text-secondary tracking-tight">
                    {stat.value}
                  </p>
                  <p className="text-white/50 mt-1.5 text-sm font-medium">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
