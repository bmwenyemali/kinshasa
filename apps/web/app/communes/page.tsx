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
  ChevronDown,
  ChevronUp,
  Layers,
} from "lucide-react";
import { Header, Footer } from "@/components/layout/Header";
import { trpc, type CommuneWithStats } from "@/lib/trpc";
import { Spinner } from "@kinservices/ui";
import { DISTRICTS, getDistrictForCommune } from "@/data/kinshasa-communes";

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

const districtColors: Record<string, string> = {
  Lukunga: "bg-white border-2 border-primary",
  Funa: "bg-white border-2 border-primary",
  "Mont-Amba": "bg-white border-2 border-primary",
  Tshangu: "bg-white border-2 border-primary",
};

const districtDescriptions: Record<string, string> = {
  Lukunga:
    "District ouest et centre-ville — inclut Gombe (quartier des affaires), Ngaliema (quartiers résidentiels de Binza) et les communes historiques.",
  Funa: "District central — communes populaires et dynamiques dont Bandalungwa, Kalamu, et Selembao. Cœur de la vie quotidienne kinoise.",
  "Mont-Amba":
    "District sud — abrite l'Université de Kinshasa (UNIKIN) à Lemba, le grand espace vert de Mont-Ngafula et les communes résidentielles.",
  Tshangu:
    "District est — le plus vaste et le plus peuplé, comprenant Kimbanseke (commune la plus peuplée d'Afrique), l'aéroport de Ndjili et l'immense commune rurale de Maluku.",
};

export default function CommunesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [expandedDistricts, setExpandedDistricts] = useState<Set<string>>(
    new Set(DISTRICTS.map((d) => d.name)),
  );
  const { data: communes, isLoading } =
    trpc.communes.getAllWithStats.useQuery();

  const toggleDistrict = (name: string) => {
    setExpandedDistricts((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  // Group communes by district
  const communesByDistrict = DISTRICTS.map((district) => {
    const districtCommunes =
      communes?.filter((c: CommuneWithStats) =>
        district.communes.some(
          (dc) => dc.toLowerCase() === c.name.toLowerCase(),
        ),
      ) ?? [];
    return {
      ...district,
      communes: districtCommunes.filter((c: CommuneWithStats) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
      allCommunes: districtCommunes,
    };
  });

  // Filter districts: show district if it has matching communes or district name matches search
  const filteredDistricts = communesByDistrict.filter(
    (d) =>
      !searchQuery ||
      d.communes.length > 0 ||
      d.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Also filter by selected district
  const displayDistricts = selectedDistrict
    ? filteredDistricts.filter((d) => d.name === selectedDistrict)
    : filteredDistricts;

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
              Découvrez les 24 communes de la ville-province, regroupées en 4
              districts, avec leurs services publics, quartiers et
              administrations.
            </p>

            {/* Stats bar */}
            {communes && (
              <div className="flex flex-wrap gap-6 mt-6">
                {[
                  {
                    icon: Layers,
                    value: "4",
                    label: "districts",
                  },
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

        {/* Search + District Filter + Grid */}
        <section className="py-8 px-4">
          <div className="container mx-auto max-w-6xl">
            {/* Search + District Filter */}
            <div className="mb-8 -mt-6 flex flex-col md:flex-row gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Rechercher une commune..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-border bg-white shadow-lg shadow-black/5 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => setSelectedDistrict(null)}
                  className={`px-4 py-2.5 rounded-2xl border text-sm font-medium transition-all shadow-lg shadow-black/5 ${
                    !selectedDistrict
                      ? "bg-gray-900 text-white border-gray-900"
                      : "bg-white text-foreground border-border hover:bg-gray-50"
                  }`}
                >
                  Tous
                </button>
                {DISTRICTS.map((d) => (
                  <button
                    key={d.name}
                    onClick={() =>
                      setSelectedDistrict(
                        selectedDistrict === d.name ? null : d.name,
                      )
                    }
                    className={`px-4 py-2.5 rounded-2xl border text-sm font-medium transition-all shadow-lg shadow-black/5 ${
                      selectedDistrict === d.name
                        ? "bg-gray-900 text-white border-gray-900"
                        : "bg-white text-foreground border-border hover:bg-gray-50"
                    }`}
                  >
                    {d.name}{" "}
                    <span className="text-xs opacity-60">
                      ({d.communes.length})
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Districts + Communes Grid */}
            {isLoading ? (
              <div className="flex items-center justify-center py-16">
                <Spinner size="lg" />
              </div>
            ) : (
              <div className="space-y-8">
                {displayDistricts.map((district) => (
                  <div key={district.name} className="space-y-4">
                    {/* District Header */}
                    <button
                      onClick={() => toggleDistrict(district.name)}
                      className="w-full text-left"
                    >
                      <div
                        className={`${districtColors[district.name] ?? "bg-white border-2 border-primary"} rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                              <Layers className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <h2 className="text-xl font-bold text-foreground">
                                District de {district.name}
                              </h2>
                              <p className="text-muted-foreground text-sm mt-0.5">
                                {district.allCommunes.length} commune
                                {district.allCommunes.length > 1 ? "s" : ""}
                                {" · "}
                                {district.allCommunes
                                  .reduce(
                                    (s: number, c: CommuneWithStats) =>
                                      s + (c.population ?? 0),
                                    0,
                                  )
                                  .toLocaleString("fr-FR")}{" "}
                                habitants
                              </p>
                            </div>
                          </div>
                          {expandedDistricts.has(district.name) ? (
                            <ChevronUp className="w-5 h-5 text-muted-foreground" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-muted-foreground" />
                          )}
                        </div>
                        {expandedDistricts.has(district.name) && (
                          <p className="text-muted-foreground text-sm mt-3 leading-relaxed max-w-3xl">
                            {districtDescriptions[district.name]}
                          </p>
                        )}
                      </div>
                    </button>

                    {/* Communes Grid */}
                    {expandedDistricts.has(district.name) && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pl-2">
                        {district.communes.length > 0 ? (
                          district.communes.map(
                            (commune: CommuneWithStats, index: number) => (
                              <Link
                                key={commune.id}
                                href={`/communes/${commune.id}`}
                              >
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
                                      <div className="flex items-center gap-2">
                                        <span className="text-[10px] px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full font-medium">
                                          {district.name}
                                        </span>
                                        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                                      </div>
                                    </div>
                                    <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors mb-2.5">
                                      {commune.name}
                                    </h3>
                                    <div className="space-y-2 text-sm text-muted-foreground">
                                      {commune.population && (
                                        <p className="flex items-center gap-2">
                                          <Users className="w-3.5 h-3.5 flex-shrink-0 text-muted-foreground/60" />
                                          {commune.population.toLocaleString(
                                            "fr-FR",
                                          )}{" "}
                                          habitants
                                        </p>
                                      )}
                                      <p className="flex items-center gap-2">
                                        <LayoutGrid className="w-3.5 h-3.5 flex-shrink-0 text-muted-foreground/60" />
                                        {commune.quartiersCount} quartiers
                                      </p>
                                      <p className="flex items-center gap-2">
                                        <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-muted-foreground/60" />
                                        {commune.lieuxCount} lieux &amp;
                                        services
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
                          )
                        ) : (
                          <p className="text-sm text-muted-foreground col-span-full py-4">
                            Aucune commune trouvée dans ce district
                            {searchQuery ? ` pour "${searchQuery}"` : ""}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                ))}

                {displayDistricts.length === 0 && (
                  <div className="text-center py-16">
                    <Landmark className="w-10 h-10 mx-auto mb-3 text-muted-foreground/30" />
                    <p className="text-muted-foreground">
                      Aucune commune trouvée
                      {searchQuery ? ` pour "${searchQuery}"` : ""}
                    </p>
                  </div>
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
