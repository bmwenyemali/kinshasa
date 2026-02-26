"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Heart, MapPin, Star, Trash2, Building2 } from "lucide-react";
import { Header, Footer } from "@/components/layout/Header";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { trpc } from "@/lib/trpc";
import { Card, Button, Spinner, Badge } from "@kinservices/ui";
import { LIEU_TYPE_LABELS } from "@kinservices/ui";

export default function FavorisPage() {
  // Pour la démo, on utilise le localStorage pour les favoris
  // En production, on utiliserait l'API avec authentification
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("kinservices_favoris");
    if (stored) {
      try {
        setFavoriteIds(JSON.parse(stored));
      } catch {
        setFavoriteIds([]);
      }
    }
    setIsLoaded(true);
  }, []);

  const removeFavorite = (id: string) => {
    const newIds = favoriteIds.filter((fid) => fid !== id);
    setFavoriteIds(newIds);
    localStorage.setItem("kinservices_favoris", JSON.stringify(newIds));
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Spinner size="lg" />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Header */}
        <section className="bg-gradient-to-br from-secondary to-secondary-dark py-8 px-4">
          <div className="container mx-auto">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Mes Favoris
                </h1>
                <p className="text-foreground/70">
                  {favoriteIds.length} lieu(x) sauvegardé(s)
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Favorites list */}
        <section className="py-8 px-4">
          <div className="container mx-auto">
            {favoriteIds.length === 0 ? (
              <div className="text-center py-12">
                <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-xl font-bold text-foreground mb-2">
                  Aucun favori
                </h2>
                <p className="text-muted-foreground mb-6">
                  Ajoutez des lieux à vos favoris pour les retrouver facilement
                </p>
                <Link href="/communes">
                  <Button variant="primary">Explorer les services</Button>
                </Link>
              </div>
            ) : (
              <FavoritesList ids={favoriteIds} onRemove={removeFavorite} />
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function FavoritesList({
  ids,
  onRemove,
}: {
  ids: string[];
  onRemove: (id: string) => void;
}) {
  // Fetch each favorite lieu
  const results = ids.map((id) => {
    return trpc.lieux.getById.useQuery({ id });
  });

  const isLoading = results.some((r) => r.isLoading);
  const lieux = results
    .map((r) => r.data)
    .filter((lieu): lieu is NonNullable<(typeof results)[number]["data"]> =>
      Boolean(lieu),
    );

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ids.map((id) => (
          <div key={id} className="h-40 bg-muted rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {lieux.map((lieu) => {
        return (
          <Card key={lieu.id} className="relative overflow-hidden">
            <button
              onClick={() => onRemove(lieu.id)}
              className="absolute top-2 right-2 z-10 p-2 bg-white rounded-full shadow hover:bg-destructive hover:text-white transition-colors"
              title="Retirer des favoris"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            <Link href={`/lieux/${lieu.id}`} className="block p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground truncate">
                    {lieu.nom}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {LIEU_TYPE_LABELS[lieu.type]}
                    </Badge>
                    {lieu.verified && (
                      <Badge variant="success" className="text-xs">
                        Vérifié
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              {lieu.adresse && (
                <p className="text-sm text-muted-foreground mt-3 flex items-start gap-2">
                  <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span className="line-clamp-2">
                    {lieu.adresse}
                    {lieu.commune && `, ${lieu.commune.name}`}
                  </span>
                </p>
              )}

              {lieu.servicesProposed && lieu.servicesProposed.length > 0 && (
                <div className="mt-3">
                  <p className="text-xs text-muted-foreground">
                    {lieu.servicesProposed.length} service(s) disponible(s)
                  </p>
                </div>
              )}
            </Link>
          </Card>
        );
      })}
    </div>
  );
}
