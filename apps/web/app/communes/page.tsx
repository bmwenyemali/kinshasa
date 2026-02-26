"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, MapPin, Users, Building, ChevronRight } from "lucide-react";
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

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Header */}
        <section className="bg-primary text-white py-12 px-4">
          <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-2">Communes de Kinshasa</h1>
            <p className="text-white/80">
              Découvrez les 24 communes de la ville de Kinshasa et leurs
              services publics
            </p>
          </div>
        </section>

        {/* Search and Grid */}
        <section className="py-8 px-4">
          <div className="container mx-auto">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredCommunes?.map((commune: CommuneWithStats) => (
                  <Link key={commune.id} href={`/communes/${commune.id}`}>
                    <div className="bg-white rounded-xl border border-border hover:border-primary/30 hover:shadow-md transition-all p-5 h-full group">
                      <div className="flex items-start justify-between mb-3">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Building className="w-6 h-6 text-primary" />
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors mb-1">
                        {commune.name}
                      </h3>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        {commune.population && (
                          <p className="flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            {commune.population.toLocaleString()} habitants
                          </p>
                        )}
                        <p className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {commune.lieuxCount} lieux répertoriés
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Aucune commune trouvée</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
