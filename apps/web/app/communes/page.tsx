"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  MapPin,
  Users,
  Building,
  ChevronRight,
  LayoutGrid,
  Landmark,
  Map,
  ArrowRight,
} from "lucide-react";
import { Header, Footer } from "@/components/layout/Header";
import { trpc, type CommuneWithStats } from "@/lib/trpc";
import { Spinner } from "@kinservices/ui";

// Color palette for commune cards
const communeColors = [
  "from-blue-500 to-blue-600",
  "from-violet-500 to-purple-600",
  "from-emerald-500 to-teal-600",
  "from-rose-500 to-pink-600",
  "from-amber-500 to-orange-600",
  "from-cyan-500 to-sky-600",
  "from-indigo-500 to-blue-600",
  "from-fuchsia-500 to-pink-600",
];

export default function CommunesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: communes, isLoading } =
    trpc.communes.getAllWithStats.useQuery();

  const filteredCommunes = communes?.filter((c: CommuneWithStats) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const totalPopulation = communes?.reduce(
    (sum: number, c: CommuneWithStats) => sum + (c.population ?? 0),
    0,
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Header */}
        <section className="relative bg-gradient-to-br from-primary via-primary-dark to-[#003d6b] text-white overflow-hidden">
          <div className="absolute inset-0 hero-pattern" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />

          <div className="relative container mx-auto max-w-6xl px-4 py-14">
            <h1 className="text-3xl md:text-5xl font-extrabold mb-3 tracking-tight">
              Communes de <span className="text-secondary">Kinshasa</span>
            </h1>
            <p className="text-white/60 text-lg max-w-xl leading-relaxed">
              Découvrez les 24 communes de la ville-province, leurs services
              publics, quartiers et administrations.
            </p>

            {/* Stats bar */}
            {communes && (
              <div className="flex flex-wrap gap-6 mt-6">
                {[
                  {
                    icon: Building,
                    value: communes.length,
                    label: "communes",
                  },
                  {
                    icon: Users,
                    value: totalPopulation
                      ? `~${(totalPopulation / 1_000_000).toFixed(1)}M`
                      : "—",
                    label: "habitants",
                  },
                  {
                    icon: LayoutGrid,
                    value: communes.reduce(
                      (s: number, c: CommuneWithStats) => s + c.quartiersCount,
                      0,
                    ),
                    label: "quartiers",
                  },
                ].map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={stat.label}
                      className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-2 text-sm"
                    >
                      <Icon className="w-4 h-4 text-secondary" />
                      <span className="font-bold">{stat.value}</span>
                      <span className="text-white/60">{stat.label}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* Search + Grid */}
        <section className="py-8 px-4">
          <div className="container mx-auto max-w-6xl">
            {/* Search */}
            <div className="mb-8 -mt-6">
              <div className="relative max-w-md mx-auto md:mx-0">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Rechercher une commune..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-border bg-white shadow-lg shadow-black/5 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm"
                />
              </div>
            </div>

            {/* Grid */}
            {isLoading ? (
              <div className="flex items-center justify-center py-16">
                <Spinner size="lg" />
              </div>
            ) : filteredCommunes && filteredCommunes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredCommunes.map(
                  (commune: CommuneWithStats, index: number) => (
                    <Link key={commune.id} href={`/communes/${commune.id}`}>
                      <div className="card-hover bg-white rounded-2xl border border-border/50 overflow-hidden h-full group cursor-pointer">
                        {/* Color header bar */}
                        <div
                          className={`h-2 bg-gradient-to-r ${communeColors[index % communeColors.length]}`}
                        />
                        <div className="p-5">
                          <div className="flex items-start justify-between mb-3">
                            <div
                              className={`w-11 h-11 bg-gradient-to-br ${communeColors[index % communeColors.length]} rounded-xl flex items-center justify-center shadow-lg shadow-black/5`}
                            >
                              <Landmark className="w-5 h-5 text-white" />
                            </div>
                            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                          </div>
                          <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors mb-2.5">
                            {commune.name}
                          </h3>
                          <div className="space-y-2 text-sm text-muted-foreground">
                            {commune.population && (
                              <p className="flex items-center gap-2">
                                <Users className="w-3.5 h-3.5 flex-shrink-0 text-muted-foreground/60" />
                                {commune.population.toLocaleString("fr-FR")}{" "}
                                habitants
                              </p>
                            )}
                            <p className="flex items-center gap-2">
                              <LayoutGrid className="w-3.5 h-3.5 flex-shrink-0 text-muted-foreground/60" />
                              {commune.quartiersCount} quartiers
                            </p>
                            <p className="flex items-center gap-2">
                              <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-muted-foreground/60" />
                              {commune.lieuxCount} lieux &amp; services
                            </p>
                            {commune.superficie && (
                              <p className="flex items-center gap-2">
                                <Map className="w-3.5 h-3.5 flex-shrink-0 text-muted-foreground/60" />
                                {commune.superficie} km²
                              </p>
                            )}
                          </div>
                          {commune.bourgmestre && (
                            <div className="mt-3 pt-3 border-t border-border/50">
                              <p className="text-xs text-muted-foreground">
                                <span className="font-medium text-foreground/70">
                                  Bourgmestre :
                                </span>{" "}
                                {commune.bourgmestre}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </Link>
                  ),
                )}
              </div>
            ) : (
              <div className="text-center py-16">
                <Landmark className="w-10 h-10 mx-auto mb-3 text-muted-foreground/30" />
                <p className="text-muted-foreground">
                  Aucune commune trouvée
                  {searchQuery ? ` pour "${searchQuery}"` : ""}
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
