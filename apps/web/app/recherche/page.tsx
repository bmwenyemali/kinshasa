"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Filter, X, ChevronDown } from "lucide-react";
import { Header, Footer } from "@/components/layout/Header";
import { SearchBar } from "@/components/search/SearchBar";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { trpc, type SearchResult } from "@/lib/trpc";
import { Spinner, Button, Badge } from "@kinservices/ui";
import { LIEU_TYPE_LABELS, SERVICE_CATEGORIE_LABELS } from "@kinservices/ui";
import { LieuType, ServiceCategorie } from "@kinservices/api";

function RechercheContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get("q") || "";
  const initialCommune = searchParams.get("commune") || undefined;

  const [query, setQuery] = useState(initialQuery);
  const [selectedTypes, setSelectedTypes] = useState<LieuType[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<
    ServiceCategorie[]
  >([]);
  const [showFilters, setShowFilters] = useState(false);

  const { data: communes } = trpc.communes.getAll.useQuery();

  const {
    data: results,
    isLoading,
    refetch,
  } = trpc.search.advanced.useQuery({
    query: query || undefined,
    types: selectedTypes.length > 0 ? selectedTypes : undefined,
    categories: selectedCategories.length > 0 ? selectedCategories : undefined,
    communeIds: initialCommune ? [initialCommune] : undefined,
    verified: true,
    limit: 30,
  });

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    router.push(`/recherche?q=${encodeURIComponent(newQuery)}`);
  };

  const toggleType = (type: LieuType) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };

  const toggleCategory = (cat: ServiceCategorie) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    );
  };

  const clearFilters = () => {
    setSelectedTypes([]);
    setSelectedCategories([]);
  };

  const hasFilters = selectedTypes.length > 0 || selectedCategories.length > 0;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Search Header */}
        <section className="bg-gradient-to-b from-slate-50 to-white border-b border-border py-8 px-4">
          <div className="container mx-auto">
            <SearchBar
              placeholder="Rechercher un service, lieu..."
              onSearch={handleSearch}
              className="max-w-2xl"
            />

            <div className="flex items-center gap-3 mt-4 flex-wrap">
              <Button
                variant={showFilters ? "primary" : "outline"}
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-4 h-4" />
                Filtres
                {hasFilters && (
                  <span className="ml-1 w-5 h-5 bg-white text-primary rounded-full text-xs flex items-center justify-center font-bold">
                    {selectedTypes.length + selectedCategories.length}
                  </span>
                )}
              </Button>

              {hasFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  <X className="w-4 h-4" />
                  Effacer les filtres
                </Button>
              )}

              {query && (
                <span className="text-sm text-muted-foreground">
                  Résultats pour "{query}"
                </span>
              )}
            </div>

            {/* Filters panel */}
            {showFilters && (
              <div className="mt-4 p-5 bg-white rounded-2xl border border-border shadow-sm animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Type de lieu */}
                  <div>
                    <h3 className="font-medium text-foreground mb-3">
                      Type de lieu
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(LIEU_TYPE_LABELS).map(([type, label]) => (
                        <Badge
                          key={type}
                          variant={
                            selectedTypes.includes(type as LieuType)
                              ? "primary"
                              : "default"
                          }
                          className="cursor-pointer"
                          onClick={() => toggleType(type as LieuType)}
                        >
                          {label}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Catégorie de service */}
                  <div>
                    <h3 className="font-medium text-foreground mb-3">
                      Catégorie de service
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(SERVICE_CATEGORIE_LABELS).map(
                        ([cat, label]) => (
                          <Badge
                            key={cat}
                            variant={
                              selectedCategories.includes(
                                cat as ServiceCategorie,
                              )
                                ? "primary"
                                : "default"
                            }
                            className="cursor-pointer"
                            onClick={() =>
                              toggleCategory(cat as ServiceCategorie)
                            }
                          >
                            {label}
                          </Badge>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Results */}
        <section className="py-8 px-4">
          <div className="container mx-auto">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Spinner size="lg" />
              </div>
            ) : results && results.items.length > 0 ? (
              <>
                <p className="text-sm text-muted-foreground mb-4">
                  {results.total} résultat(s) trouvé(s)
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {results.items.map((lieu: SearchResult) => (
                    <ServiceCard
                      key={lieu.id}
                      id={lieu.id}
                      nom={lieu.nom}
                      type={lieu.type}
                      commune={lieu.commune?.name}
                      verified={lieu.verified}
                      services={lieu.servicesProposed}
                      avisCount={lieu._count.avis}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-xl font-medium text-foreground mb-2">
                  Aucun résultat trouvé
                </p>
                <p className="text-muted-foreground">
                  Essayez avec d'autres termes ou modifiez vos filtres
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

export default function RecherchePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex flex-col bg-background">
          <Header />
          <main className="flex-1 flex items-center justify-center">
            <Spinner size="lg" />
          </main>
          <Footer />
        </div>
      }
    >
      <RechercheContent />
    </Suspense>
  );
}
