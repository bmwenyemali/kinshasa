"use client";

import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  Suspense,
} from "react";
import { useSearchParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import {
  X,
  MapPin,
  Building2,
  Stethoscope,
  Navigation,
  Star,
  Filter,
  Layers,
  ChevronDown,
  ChevronUp,
  Search,
  Shield,
  Scale,
  GraduationCap,
  Landmark,
  Cross,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { trpc } from "@/lib/trpc";
import { Button, Badge, Spinner } from "@kinservices/ui";
import { LIEU_TYPE_LABELS } from "@kinservices/ui";
import { LieuType } from "@kinservices/api";
import Link from "next/link";

const Map = dynamic(() => import("@/components/map/MapboxMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50">
      <div className="text-center">
        <Spinner size="lg" />
        <p className="text-sm text-muted-foreground mt-3">
          Chargement de la carte...
        </p>
      </div>
    </div>
  ),
});

const typeIcons: Record<LieuType, React.ReactNode> = {
  HOPITAL: <Cross className="w-4 h-4" />,
  CLINIQUE: <Stethoscope className="w-4 h-4" />,
  CENTRE_SANTE: <Stethoscope className="w-4 h-4" />,
  ADMINISTRATION: <Building2 className="w-4 h-4" />,
  MAIRIE: <Landmark className="w-4 h-4" />,
  COMMISSARIAT: <Shield className="w-4 h-4" />,
  TRIBUNAL: <Scale className="w-4 h-4" />,
  ECOLE: <GraduationCap className="w-4 h-4" />,
  UNIVERSITE: <GraduationCap className="w-4 h-4" />,
  AUTRE: <MapPin className="w-4 h-4" />,
};

const typeColors: Record<LieuType, string> = {
  HOPITAL: "bg-red-500 text-white",
  CLINIQUE: "bg-red-400 text-white",
  CENTRE_SANTE: "bg-orange-500 text-white",
  ADMINISTRATION: "bg-blue-500 text-white",
  MAIRIE: "bg-blue-600 text-white",
  COMMISSARIAT: "bg-indigo-500 text-white",
  TRIBUNAL: "bg-purple-500 text-white",
  ECOLE: "bg-emerald-500 text-white",
  UNIVERSITE: "bg-emerald-600 text-white",
  AUTRE: "bg-gray-500 text-white",
};

// Grouped filter categories
const filterGroups = [
  {
    label: "Santé",
    icon: <Stethoscope className="w-4 h-4" />,
    types: ["HOPITAL", "CLINIQUE", "CENTRE_SANTE"] as LieuType[],
    color: "text-red-600",
  },
  {
    label: "Administration",
    icon: <Building2 className="w-4 h-4" />,
    types: [
      "ADMINISTRATION",
      "MAIRIE",
      "COMMISSARIAT",
      "TRIBUNAL",
    ] as LieuType[],
    color: "text-blue-600",
  },
  {
    label: "Éducation",
    icon: <GraduationCap className="w-4 h-4" />,
    types: ["ECOLE", "UNIVERSITE"] as LieuType[],
    color: "text-emerald-600",
  },
  {
    label: "Autres",
    icon: <MapPin className="w-4 h-4" />,
    types: ["AUTRE"] as LieuType[],
    color: "text-gray-600",
  },
];

interface Lieu {
  id: string;
  nom: string;
  type: LieuType;
  latitude: number | null;
  longitude: number | null;
  adresse: string | null;
  verified: boolean;
  commune?: { name: string } | null;
  _count?: { avis: number };
}

function CarteContent() {
  const router = useRouter();
  const [selectedLieu, setSelectedLieu] = useState<Lieu | null>(null);
  const [selectedTypes, setSelectedTypes] = useState<LieuType[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [showBoundaries, setShowBoundaries] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const [viewport, setViewport] = useState({
    latitude: -4.375,
    longitude: 15.31,
    zoom: 11,
  });

  const { data: lieux, isLoading } = trpc.lieux.search.useQuery({
    types: selectedTypes.length > 0 ? selectedTypes : undefined,
    verified: true,
    limit: 500,
  });

  const toggleType = (type: LieuType) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };

  const toggleGroup = (types: LieuType[]) => {
    const allSelected = types.every((t) => selectedTypes.includes(t));
    if (allSelected) {
      setSelectedTypes((prev) => prev.filter((t) => !types.includes(t)));
    } else {
      setSelectedTypes((prev) => [...new Set([...prev, ...types])]);
    }
  };

  const handleMarkerClick = (lieu: Lieu) => {
    setSelectedLieu(lieu);
    if (lieu.latitude && lieu.longitude) {
      setViewport({
        latitude: lieu.latitude,
        longitude: lieu.longitude,
        zoom: 15,
      });
    }
  };

  const handleCommuneClick = (communeName: string) => {
    // Navigate to commune page or zoom in
    router.push(`/communes?search=${encodeURIComponent(communeName)}`);
  };

  const clearSelection = () => setSelectedLieu(null);

  const hasFilters = selectedTypes.length > 0;

  const filteredLieux =
    lieux?.items
      ?.filter((lieu) => lieu.latitude && lieu.longitude)
      .filter(
        (lieu) =>
          !searchQuery ||
          lieu.nom.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      .map((lieu) => ({
        ...lieu,
        latitude: lieu.latitude ? Number(lieu.latitude) : null,
        longitude: lieu.longitude ? Number(lieu.longitude) : null,
      })) || [];

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <Header />

      <main className="flex-1 relative overflow-hidden">
        {/* Top control bar */}
        <div className="absolute top-3 left-3 right-3 z-10 flex items-start gap-2">
          {/* Filter button + panel */}
          <div className="flex flex-col gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`
                flex items-center gap-2 px-4 py-2.5 rounded-xl shadow-lg backdrop-blur-md border
                transition-all font-medium text-sm
                ${
                  showFilters
                    ? "bg-primary text-white border-primary shadow-primary/25"
                    : "bg-white/90 text-foreground border-white/50 hover:bg-white"
                }
              `}
            >
              <Filter className="w-4 h-4" />
              Filtres
              {hasFilters && (
                <span className="ml-1 w-5 h-5 bg-white text-primary rounded-full text-xs flex items-center justify-center font-bold">
                  {selectedTypes.length}
                </span>
              )}
              {showFilters ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </button>

            {showFilters && (
              <div className="bg-white/95 backdrop-blur-lg rounded-xl shadow-xl border border-white/50 p-4 w-72 animate-fade-in">
                {/* Search within map */}
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Rechercher un lieu..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  />
                </div>

                {/* Filter groups */}
                <div className="space-y-3">
                  {filterGroups.map((group) => {
                    const allSelected = group.types.every((t) =>
                      selectedTypes.includes(t),
                    );
                    const someSelected = group.types.some((t) =>
                      selectedTypes.includes(t),
                    );
                    return (
                      <div key={group.label}>
                        <button
                          onClick={() => toggleGroup(group.types)}
                          className={`
                            flex items-center gap-2 w-full text-left text-sm font-semibold mb-1.5 px-1
                            ${someSelected ? group.color : "text-foreground"}
                          `}
                        >
                          {group.icon}
                          {group.label}
                          {someSelected && (
                            <span className="ml-auto text-xs opacity-60">
                              {allSelected ? "Tout" : "Partiel"}
                            </span>
                          )}
                        </button>
                        <div className="flex flex-wrap gap-1.5">
                          {group.types.map((type) => (
                            <button
                              key={type}
                              onClick={() => toggleType(type)}
                              className={`
                                flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium
                                transition-all border
                                ${
                                  selectedTypes.includes(type)
                                    ? `${typeColors[type]} border-transparent shadow-sm`
                                    : "bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-300"
                                }
                              `}
                            >
                              {typeIcons[type]}
                              {LIEU_TYPE_LABELS[type]}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {hasFilters && (
                  <button
                    onClick={() => setSelectedTypes([])}
                    className="mt-3 w-full flex items-center justify-center gap-1.5 text-xs text-muted-foreground hover:text-foreground py-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                    Effacer tous les filtres
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Right controls */}
          <div className="flex flex-col gap-2 items-end">
            {/* Boundaries toggle */}
            <button
              onClick={() => setShowBoundaries(!showBoundaries)}
              className={`
                flex items-center gap-2 px-3 py-2 rounded-xl shadow-lg backdrop-blur-md border
                text-sm font-medium transition-all
                ${
                  showBoundaries
                    ? "bg-white/90 text-primary border-primary/30"
                    : "bg-white/70 text-muted-foreground border-white/50"
                }
              `}
            >
              <Layers className="w-4 h-4" />
              <span className="hidden sm:inline">Communes</span>
            </button>

            {/* Stats pill */}
            <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-white/50 px-3 py-2">
              <p className="text-xs text-muted-foreground">
                <span className="font-bold text-foreground text-sm">
                  {filteredLieux.length}
                </span>{" "}
                lieux
              </p>
            </div>
          </div>
        </div>

        {/* Map */}
        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50">
            <div className="text-center">
              <Spinner size="lg" />
              <p className="text-sm text-muted-foreground mt-3">
                Chargement...
              </p>
            </div>
          </div>
        ) : (
          <Map
            lieux={filteredLieux}
            viewport={viewport}
            onViewportChange={setViewport}
            onMarkerClick={handleMarkerClick}
            selectedLieuId={selectedLieu?.id}
            showBoundaries={showBoundaries}
            onCommuneClick={handleCommuneClick}
          />
        )}

        {/* Selected lieu panel */}
        {selectedLieu && (
          <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-10 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/50 p-5 animate-slide-in-bottom">
            <button
              onClick={clearSelection}
              className="absolute top-3 right-3 p-1.5 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-start gap-3">
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${typeColors[selectedLieu.type]}`}
              >
                {typeIcons[selectedLieu.type]}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-foreground text-base leading-tight">
                  {selectedLieu.nom}
                </h3>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-md font-medium">
                    {LIEU_TYPE_LABELS[selectedLieu.type]}
                  </span>
                  {selectedLieu.verified && (
                    <span className="text-xs px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-md font-medium">
                      ✓ Vérifié
                    </span>
                  )}
                </div>
              </div>
            </div>

            {selectedLieu.adresse && (
              <p className="text-sm text-muted-foreground mt-3 flex items-start gap-2">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5 text-primary" />
                {selectedLieu.adresse}
                {selectedLieu.commune && `, ${selectedLieu.commune.name}`}
              </p>
            )}

            {selectedLieu._count && selectedLieu._count.avis > 0 && (
              <p className="text-sm text-muted-foreground mt-2 flex items-center gap-2">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                {selectedLieu._count.avis} avis
              </p>
            )}

            <div className="flex gap-2 mt-4">
              <Link href={`/lieux/${selectedLieu.id}`} className="flex-1">
                <button className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-2.5 px-4 rounded-xl transition-colors text-sm">
                  Voir les détails
                </button>
              </Link>
              {selectedLieu.latitude && selectedLieu.longitude && (
                <button
                  className="px-3 py-2.5 rounded-xl border border-border hover:bg-gray-50 transition-colors"
                  onClick={() => {
                    window.open(
                      `https://www.google.com/maps/dir/?api=1&destination=${selectedLieu.latitude},${selectedLieu.longitude}`,
                      "_blank",
                    );
                  }}
                >
                  <Navigation className="w-4 h-4 text-primary" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Legend (bottom left, collapsed by default) */}
        <div className="absolute bottom-4 left-4 z-10 hidden md:block">
          {!selectedLieu && (
            <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-white/50 p-3">
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Légende
              </p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                {Object.entries(LIEU_TYPE_LABELS).map(([type, label]) => (
                  <div key={type} className="flex items-center gap-1.5">
                    <span className="text-xs">
                      {typeIcons[type as LieuType]}
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default function CartePage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen flex flex-col bg-background">
          <Header />
          <main className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <Spinner size="lg" />
              <p className="text-sm text-muted-foreground mt-3">
                Chargement...
              </p>
            </div>
          </main>
        </div>
      }
    >
      <CarteContent />
    </Suspense>
  );
}
