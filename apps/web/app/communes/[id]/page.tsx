"use client";

import React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  Users,
  Building,
  Map,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { Header, Footer } from "@/components/layout/Header";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { trpc } from "@/lib/trpc";
import { Spinner, Badge } from "@kinservices/ui";
import { LIEU_TYPE_LABELS } from "@kinservices/ui";

export default function CommuneDetailPage() {
  const params = useParams();
  const router = useRouter();
  const communeId = params.id as string;

  const { data: commune, isLoading } = trpc.communes.getById.useQuery({
    id: communeId,
  });

  if (isLoading) {
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

  if (!commune) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Commune non trouvée
            </h2>
            <p className="text-muted-foreground mb-4">
              La commune demandée n'existe pas.
            </p>
            <button
              onClick={() => router.push("/communes")}
              className="text-primary font-medium hover:underline"
            >
              ← Retour aux communes
            </button>
          </div>
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
        <section className="bg-primary text-white py-8 px-4">
          <div className="container mx-auto">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour
            </button>

            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">{commune.name}</h1>
                <div className="flex items-center gap-4 text-white/80 flex-wrap">
                  {commune.population && (
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {commune.population.toLocaleString()} habitants
                    </span>
                  )}
                  {commune.superficie && (
                    <span className="flex items-center gap-1">
                      <Map className="w-4 h-4" />
                      {commune.superficie} km²
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Building className="w-4 h-4" />
                    {commune._count.lieux} lieux
                  </span>
                </div>
              </div>

              {commune.latitude && commune.longitude && (
                <a
                  href={`https://www.google.com/maps?q=${commune.latitude},${commune.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors"
                >
                  <MapPin className="w-4 h-4" />
                  Voir sur la carte
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        </section>

        {/* Description */}
        {commune.description && (
          <section className="py-6 px-4 bg-white border-b border-border">
            <div className="container mx-auto">
              <p className="text-muted-foreground">{commune.description}</p>
            </div>
          </section>
        )}

        {/* Quartiers */}
        {commune.quartiers && commune.quartiers.length > 0 && (
          <section className="py-8 px-4">
            <div className="container mx-auto">
              <h2 className="text-xl font-bold text-foreground mb-4">
                Quartiers ({commune.quartiers.length})
              </h2>
              <div className="flex flex-wrap gap-2">
                {commune.quartiers.map(
                  (quartier: { id: string; name: string }) => (
                    <Badge
                      key={quartier.id}
                      variant="default"
                      className="text-sm"
                    >
                      {quartier.name}
                    </Badge>
                  ),
                )}
              </div>
            </div>
          </section>
        )}

        {/* Lieux */}
        <section className="py-8 px-4 bg-white">
          <div className="container mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-foreground">
                Lieux dans cette commune ({commune._count.lieux})
              </h2>
              <Link
                href={`/recherche?commune=${communeId}`}
                className="text-primary font-medium flex items-center gap-1 hover:underline"
              >
                Voir tous
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {commune.lieux && commune.lieux.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {commune.lieux.map((lieu) => (
                  <ServiceCard
                    key={lieu.id}
                    id={lieu.id}
                    nom={lieu.nom}
                    type={lieu.type}
                    commune={commune.name}
                    verified={lieu.verified}
                    services={lieu.servicesProposed}
                    avisCount={lieu._count.avis}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                Aucun lieu répertorié dans cette commune pour le moment.
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
