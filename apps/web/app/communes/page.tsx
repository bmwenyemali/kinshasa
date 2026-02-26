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
} from "lucide-react";
import { Header, Footer } from "@/components/layout/Header";
import { trpc, type CommuneWithStats } from "@/lib/trpc";
import { Spinner } from "@kinservices/ui";

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
        <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-12 px-4">
          <div className="container mx-auto max-w-5xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Communes de Kinshasa
            </h1>
            <p className="text-white/80 text-lg mb-6">
              Découvrez les 24 communes de la ville-province de Kinshasa, leurs
              services publics, quartiers et administrations.
            </p>

            {/* Stats bar */}
            {communes && (
              <div className="flex flex-wrap gap-6 text-white/90 text-sm">
                <div className="flex items-center gap-2">
                  <Building className="w-5 h-5" />
                  <span>
                    <strong>{communes.length}</strong> communes
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>
                    <strong>
                      {totalPopulation
                        ? `~${(totalPopulation / 1_000_000).toFixed(1)}M`
                        : "—"}
                    </strong>{" "}
                    habitants
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <LayoutGrid className="w-5 h-5" />
                  <span>
                    <strong>
                      {communes.reduce(
                        (s: number, c: CommuneWithStats) =>
                          s + c.quartiersCount,
                        0,
                      )}
                    </strong>{" "}
                    quartiers
                  </span>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Search + Grid */}
        <section className="py-8 px-4">
          <div className="container mx-auto max-w-5xl">
            {/* Search */}
            <div className="mb-6">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Rechercher une commune..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {/* Grid */}
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Spinner size="lg" />
              </div>
            ) : filteredCommunes && filteredCommunes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCommunes.map((commune: CommuneWithStats) => (
                  <Link key={commune.id} href={`/communes/${commune.id}`}>
                    <div className="bg-white rounded-xl border border-border hover:border-primary/30 hover:shadow-lg transition-all p-5 h-full group">
                      <div className="flex items-start justify-between mb-3">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Landmark className="w-6 h-6 text-primary" />
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors mb-2">
                        {commune.name}
                      </h3>
                      <div className="space-y-1.5 text-sm text-muted-foreground">
                        {commune.population && (
                          <p className="flex items-center gap-2">
                            <Users className="w-4 h-4 flex-shrink-0" />
                            {commune.population.toLocaleString("fr-FR")}{" "}
                            habitants
                          </p>
                        )}
                        <p className="flex items-center gap-2">
                          <LayoutGrid className="w-4 h-4 flex-shrink-0" />
                          {commune.quartiersCount} quartiers
                        </p>
                        <p className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 flex-shrink-0" />
                          {commune.lieuxCount} lieux &amp; services
                        </p>
                        {commune.superficie && (
                          <p className="flex items-center gap-2">
                            <Map className="w-4 h-4 flex-shrink-0" />
                            {commune.superficie} km²
                          </p>
                        )}
                      </div>
                      {commune.bourgmestre && (
                        <p className="mt-3 pt-3 border-t border-border text-xs text-muted-foreground">
                          Bourgmestre : {commune.bourgmestre}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
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
