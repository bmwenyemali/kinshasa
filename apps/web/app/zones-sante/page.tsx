"use client";

import React from "react";
import Link from "next/link";
import {
  Stethoscope,
  MapPin,
  Building2,
  ChevronRight,
  Search,
} from "lucide-react";
import { Header, Footer } from "@/components/layout/Header";
import { trpc, type ZoneSanteWithStats } from "@/lib/trpc";
import { Card, Badge } from "@kinservices/ui";

export default function ZonesSantePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary via-primary-dark to-[#003d6b] text-white py-12 px-4 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          </div>
          <div className="container mx-auto relative z-10">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <Stethoscope className="w-7 h-7" />
              </div>
              <div>
                <h1 className="text-3xl font-extrabold">Zones de Santé</h1>
                <p className="text-white/70 mt-0.5">
                  Kinshasa compte 35 zones de santé couvrant tout le territoire
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Zones list */}
        <section className="py-8 px-4">
          <div className="container mx-auto">
            <ZonesSanteList />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function ZonesSanteList() {
  const { data: zones, isLoading } = trpc.zonesSante.getAllWithStats.useQuery();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="h-32 bg-muted rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  if (!zones || zones.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Aucune zone de santé trouvée</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {zones.map((zone: ZoneSanteWithStats) => (
        <Link key={zone.id} href={`/zones-sante/${zone.id}`}>
          <Card className="h-full hover:shadow-md transition-all cursor-pointer card-hover">
            <div className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center">
                    <Stethoscope className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      ZS {zone.name}
                    </h3>
                    {zone.communeResponsable && (
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {zone.communeResponsable}
                      </p>
                    )}
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>

              <div className="mt-4 flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Building2 className="w-4 h-4" />
                  <span>{zone.lieuxCount || 0} établissements</span>
                </div>
              </div>

              {zone.description && (
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                  {zone.description}
                </p>
              )}
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}
