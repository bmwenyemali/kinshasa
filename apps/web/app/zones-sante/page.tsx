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
import { trpc } from "@/lib/trpc";
import { Card, Badge } from "@kinservices/ui";

export default function ZonesSantePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-12 px-4">
          <div className="container mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Stethoscope className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Zones de Santé</h1>
                <p className="text-white/80">
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
      {zones.map((zone) => (
        <Link key={zone.id} href={`/zones-sante/${zone.id}`}>
          <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
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
