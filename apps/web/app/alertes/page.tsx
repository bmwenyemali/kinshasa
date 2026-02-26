"use client";

import React from "react";
import { Header, Footer } from "@/components/layout/Header";
import { trpc } from "@/lib/trpc";
import {
  Bell,
  AlertTriangle,
  Info,
  AlertCircle,
  Calendar,
  MapPin,
} from "lucide-react";

const typeConfig: Record<
  string,
  { icon: typeof Info; color: string; bg: string; label: string }
> = {
  urgent: {
    icon: AlertTriangle,
    color: "text-red-700",
    bg: "bg-red-50 border-red-200",
    label: "Urgent",
  },
  warning: {
    icon: AlertCircle,
    color: "text-amber-700",
    bg: "bg-amber-50 border-amber-200",
    label: "Attention",
  },
  info: {
    icon: Info,
    color: "text-blue-700",
    bg: "bg-blue-50 border-blue-200",
    label: "Information",
  },
};

export default function AlertesPage() {
  const { data: alertes, isLoading } = trpc.alertes.getActive.useQuery({});

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-amber-500 via-amber-600 to-orange-600 text-white py-14 px-4 relative overflow-hidden">
          <div className="absolute inset-0 hero-pattern opacity-20" />
          <div className="relative max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Bell className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold">
                  Alertes & Annonces
                </h1>
                <p className="text-white/80 mt-1">
                  Informations importantes pour les habitants de Kinshasa
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-10 px-4">
          <div className="max-w-4xl mx-auto">
            {isLoading ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
              </div>
            ) : alertes && alertes.length > 0 ? (
              <div className="space-y-4">
                {alertes.map((alerte) => {
                  const config = typeConfig[alerte.type] || typeConfig.info;
                  const Icon = config.icon;
                  return (
                    <div
                      key={alerte.id}
                      className={`rounded-2xl border-2 p-6 ${config.bg} transition-shadow hover:shadow-md`}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center ${config.color} bg-white/80 flex-shrink-0`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              className={`text-xs font-bold uppercase tracking-wider ${config.color}`}
                            >
                              {config.label}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-foreground mb-2">
                            {alerte.titre}
                          </h3>
                          <p className="text-sm text-foreground/80 leading-relaxed whitespace-pre-line">
                            {alerte.message}
                          </p>
                          <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5" />
                              {new Date(alerte.dateDebut).toLocaleDateString(
                                "fr-FR",
                                {
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                },
                              )}
                            </span>
                            {alerte.dateFin && (
                              <span className="flex items-center gap-1">
                                Jusqu&apos;au{" "}
                                {new Date(alerte.dateFin).toLocaleDateString(
                                  "fr-FR",
                                  {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                  },
                                )}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bell className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Aucune alerte en cours
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Bonne nouvelle ! Il n&apos;y a aucune alerte ou annonce
                  importante pour le moment. Revenez régulièrement pour rester
                  informé.
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
