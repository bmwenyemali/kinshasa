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
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { trpc } from "@/lib/trpc";
import { Button, Badge, Spinner } from "@kinservices/ui";
import { LIEU_TYPE_LABELS } from "@kinservices/ui";
import { LieuType } from "@kinservices/api";
import Link from "next/link";

// Dynamic import pour le composant Map (éviter SSR)
const Map = dynamic(() => import("@/components/map/MapboxMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-muted">
      <Spinner size="lg" />
    </div>
  ),
});

const typeIcons: Record<LieuType, React.ReactNode> = {
  HOPITAL: <Stethoscope className="w-4 h-4" />,
  CLINIQUE: <Stethoscope className="w-4 h-4" />,
  CENTRE_SANTE: <Stethoscope className="w-4 h-4" />,
  ADMINISTRATION: <Building2 className="w-4 h-4" />,
  MAIRIE: <Building2 className="w-4 h-4" />,
  COMMISSARIAT: <Building2 className="w-4 h-4" />,
  TRIBUNAL: <Building2 className="w-4 h-4" />,
  ECOLE: <Building2 className="w-4 h-4" />,
  UNIVERSITE: <Building2 className="w-4 h-4" />,
  AUTRE: <MapPin className="w-4 h-4" />,
};

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
  const searchParams = useSearchParams();
  const router = useRouter();

  const [selectedLieu, setSelectedLieu] = useState<Lieu | null>(null);
  const [selectedTypes, setSelectedTypes] = useState<LieuType[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Centrer sur Kinshasa
  const [viewport, setViewport] = useState({
    latitude: -4.4419,
    longitude: 15.2663,
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

  const clearSelection = () => {
    setSelectedLieu(null);
  };

  const hasFilters = selectedTypes.length > 0;

  const filteredLieux =
    lieux?.items
      ?.filter((lieu) => lieu.latitude && lieu.longitude)
      .map((lieu) => ({
        ...lieu,
        latitude: lieu.latitude ? Number(lieu.latitude) : null,
        longitude: lieu.longitude ? Number(lieu.longitude) : null,
      })) || [];

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <Header />

      <main className="flex-1 relative overflow-hidden">
        {/* Controls overlay */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          <Button
            variant={showFilters ? "primary" : "secondary"}
            onClick={() => setShowFilters(!showFilters)}
            className="shadow-lg"
          >
            <Filter className="w-4 h-4" />
            Filtrer
            {hasFilters && (
              <span className="ml-1 w-5 h-5 bg-white text-primary rounded-full text-xs flex items-center justify-center font-bold">
                {selectedTypes.length}
              </span>
            )}
          </Button>

          {showFilters && (
            <div className="bg-white rounded-lg shadow-lg p-4 w-64 animate-fade-in">
              <h3 className="font-medium text-sm mb-3">Type de lieu</h3>
              <div className="flex flex-wrap gap-2">
                {Object.entries(LIEU_TYPE_LABELS).map(([type, label]) => (
                  <Badge
                    key={type}
                    variant={
                      selectedTypes.includes(type as LieuType)
                        ? "primary"
                        : "default"
                    }
                    className="cursor-pointer text-xs"
                    onClick={() => toggleType(type as LieuType)}
                  >
                    {label}
                  </Badge>
                ))}
              </div>
              {hasFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedTypes([])}
                  className="mt-3 w-full"
                >
                  <X className="w-4 h-4" />
                  Effacer
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Stats overlay */}
        <div className="absolute top-4 right-4 z-10 bg-white rounded-lg shadow-lg px-4 py-2">
          <p className="text-sm text-muted-foreground">
            <span className="font-bold text-foreground">
              {filteredLieux.length}
            </span>{" "}
            lieux affichés
          </p>
        </div>

        {/* Map */}
        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center bg-muted">
            <Spinner size="lg" />
          </div>
        ) : (
          <Map
            lieux={filteredLieux}
            viewport={viewport}
            onViewportChange={setViewport}
            onMarkerClick={handleMarkerClick}
            selectedLieuId={selectedLieu?.id}
          />
        )}

        {/* Selected lieu panel */}
        {selectedLieu && (
          <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 z-10 bg-white rounded-lg shadow-xl p-4 animate-slide-in-bottom">
            <button
              onClick={clearSelection}
              className="absolute top-2 right-2 p-1 hover:bg-muted rounded-full transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                {typeIcons[selectedLieu.type]}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground truncate">
                  {selectedLieu.nom}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-xs">
                    {LIEU_TYPE_LABELS[selectedLieu.type]}
                  </Badge>
                  {selectedLieu.verified && (
                    <Badge variant="success" className="text-xs">
                      Vérifié
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {selectedLieu.adresse && (
              <p className="text-sm text-muted-foreground mt-3 flex items-start gap-2">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                {selectedLieu.adresse}
                {selectedLieu.commune && `, ${selectedLieu.commune.name}`}
              </p>
            )}

            {selectedLieu._count && selectedLieu._count.avis > 0 && (
              <p className="text-sm text-muted-foreground mt-2 flex items-center gap-2">
                <Star className="w-4 h-4 fill-warning text-warning" />
                {selectedLieu._count.avis} avis
              </p>
            )}

            <div className="flex gap-2 mt-4">
              <Link href={`/lieux/${selectedLieu.id}`} className="flex-1">
                <Button variant="primary" className="w-full">
                  Voir les détails
                </Button>
              </Link>
              {selectedLieu.latitude && selectedLieu.longitude && (
                <Button
                  variant="outline"
                  onClick={() => {
                    window.open(
                      `https://www.google.com/maps/dir/?api=1&destination=${selectedLieu.latitude},${selectedLieu.longitude}`,
                      "_blank",
                    );
                  }}
                >
                  <Navigation className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        )}
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
            <Spinner size="lg" />
          </main>
        </div>
      }
    >
      <CarteContent />
    </Suspense>
  );
}
