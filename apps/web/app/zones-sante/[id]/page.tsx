"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Stethoscope,
  MapPin,
  Building2,
  Phone,
  ChevronLeft,
  ExternalLink,
  Navigation,
  Star,
  Clock,
} from "lucide-react";
import { Header, Footer } from "@/components/layout/Header";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { trpc, type ZoneSanteLieu } from "@/lib/trpc";
import { Card, Badge, Button, Spinner } from "@kinservices/ui";
import { LIEU_TYPE_LABELS } from "@kinservices/ui";

export default function ZoneSanteDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const {
    data: zone,
    isLoading,
    error,
  } = trpc.zonesSante.getById.useQuery({ id });

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

  if (error || !zone) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center py-12 px-4">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Zone de santé non trouvée
          </h1>
          <p className="text-muted-foreground mb-4">
            Cette zone de santé n'existe pas ou a été supprimée.
          </p>
          <Link href="/zones-sante">
            <Button variant="primary">
              <ChevronLeft className="w-4 h-4" />
              Retour aux zones de santé
            </Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const hospitals =
    zone.lieux?.filter((l: ZoneSanteLieu) => l.type === "HOPITAL") || [];
  const otherLieux =
    zone.lieux?.filter((l: ZoneSanteLieu) => l.type !== "HOPITAL") || [];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Header */}
        <section className="bg-gradient-to-br from-primary via-primary-dark to-[#003d6b] text-white py-10 px-4 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          </div>
          <div className="container mx-auto relative z-10">
            <Link
              href="/zones-sante"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-5 transition-colors text-sm"
            >
              <ChevronLeft className="w-4 h-4" />
              Zones de santé
            </Link>

            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <Stethoscope className="w-8 h-8" />
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-extrabold mb-2">
                  Zone de Santé {zone.name}
                </h1>
                {zone.communeResponsable && (
                  <p className="text-white/80 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {zone.communeResponsable}
                  </p>
                )}
              </div>
            </div>

            {zone.description && (
              <p className="mt-4 text-white/90 max-w-2xl">{zone.description}</p>
            )}

            {/* Stats */}
            <div className="flex flex-wrap gap-4 mt-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-5 py-3">
                <p className="text-2xl font-extrabold">{hospitals.length}</p>
                <p className="text-sm text-white/60">Hôpitaux & Centres</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-5 py-3">
                <p className="text-2xl font-extrabold">{otherLieux.length}</p>
                <p className="text-sm text-white/60">Autres établissements</p>
              </div>
            </div>
          </div>
        </section>

        {/* Hospitals */}
        {hospitals.length > 0 && (
          <section className="py-8 px-4">
            <div className="container mx-auto">
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-primary" />
                Hôpitaux et Centres de Santé
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {hospitals.map((lieu: ZoneSanteLieu) => (
                  <ServiceCard
                    key={lieu.id}
                    id={lieu.id}
                    nom={lieu.nom}
                    type={lieu.type}
                    adresse={lieu.adresse}
                    verified={lieu.verified}
                    services={lieu.servicesProposed}
                    avisCount={lieu._count?.avis || 0}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Other establishments */}
        {otherLieux.length > 0 && (
          <section className="py-8 px-4 bg-muted">
            <div className="container mx-auto">
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-primary" />
                Autres Établissements
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {otherLieux.map((lieu: ZoneSanteLieu) => (
                  <ServiceCard
                    key={lieu.id}
                    id={lieu.id}
                    nom={lieu.nom}
                    type={lieu.type}
                    adresse={lieu.adresse}
                    verified={lieu.verified}
                    services={lieu.servicesProposed}
                    avisCount={lieu._count?.avis || 0}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Empty state */}
        {hospitals.length === 0 && otherLieux.length === 0 && (
          <section className="py-12 px-4">
            <div className="container mx-auto text-center">
              <Building2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-bold text-foreground mb-2">
                Aucun établissement référencé
              </h2>
              <p className="text-muted-foreground">
                Les établissements de cette zone de santé seront ajoutés
                prochainement.
              </p>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
