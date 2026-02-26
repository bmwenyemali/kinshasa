"use client";

import React, { useState, useMemo } from "react";
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
  Landmark,
  LayoutGrid,
  FileText,
  Shield,
  Stethoscope,
  GraduationCap,
  Gavel,
  Phone,
  Clock,
  DollarSign,
  User,
} from "lucide-react";
import { Header, Footer } from "@/components/layout/Header";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { trpc } from "@/lib/trpc";
import { Spinner, Badge } from "@kinservices/ui";
import { LIEU_TYPE_LABELS } from "@kinservices/ui";

type TabKey = "overview" | "services" | "quartiers" | "lieux";

const LIEU_TYPE_ICON: Record<string, React.ReactNode> = {
  MAIRIE: <Landmark className="w-5 h-5" />,
  ADMINISTRATION: <Building className="w-5 h-5" />,
  HOPITAL: <Stethoscope className="w-5 h-5" />,
  CLINIQUE: <Stethoscope className="w-5 h-5" />,
  CENTRE_SANTE: <Stethoscope className="w-5 h-5" />,
  COMMISSARIAT: <Shield className="w-5 h-5" />,
  TRIBUNAL: <Gavel className="w-5 h-5" />,
  ECOLE: <GraduationCap className="w-5 h-5" />,
  UNIVERSITE: <GraduationCap className="w-5 h-5" />,
  AUTRE: <MapPin className="w-5 h-5" />,
};

export default function CommuneDetailPage() {
  const params = useParams();
  const router = useRouter();
  const communeId = params.id as string;
  const [activeTab, setActiveTab] = useState<TabKey>("overview");

  const { data: commune, isLoading } = trpc.communes.getById.useQuery({
    id: communeId,
  });

  // Group lieux by type
  const lieuxByType = useMemo(() => {
    if (!commune?.lieux) return {};
    const groups: Record<string, typeof commune.lieux> = {};
    for (const lieu of commune.lieux) {
      const key = lieu.type;
      if (!groups[key]) groups[key] = [];
      groups[key].push(lieu);
    }
    return groups;
  }, [commune?.lieux]);

  // Collect all services across all lieux
  const allServices = useMemo(() => {
    if (!commune?.lieux) return [];
    return commune.lieux.flatMap((l) =>
      l.servicesProposed.map((s) => ({ ...s, lieuNom: l.nom, lieuId: l.id })),
    );
  }, [commune?.lieux]);

  // Group services by categorie
  const servicesByCategorie = useMemo(() => {
    const groups: Record<string, typeof allServices> = {};
    for (const s of allServices) {
      const key = s.categorie;
      if (!groups[key]) groups[key] = [];
      groups[key].push(s);
    }
    return groups;
  }, [allServices]);

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
              La commune demandée n&apos;existe pas.
            </p>
            <button
              onClick={() => router.push("/communes")}
              className="text-primary font-medium hover:underline"
            >
              &larr; Retour aux communes
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const tabs: { key: TabKey; label: string; count?: number }[] = [
    { key: "overview", label: "Aperçu" },
    { key: "services", label: "Services", count: allServices.length },
    {
      key: "quartiers",
      label: "Quartiers",
      count: commune.quartiers?.length ?? 0,
    },
    { key: "lieux", label: "Lieux", count: commune._count.lieux },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Header */}
        <section className="bg-gradient-to-br from-primary via-primary-dark to-[#003d6b] text-white py-10 px-4 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl" />
          </div>
          <div className="container mx-auto max-w-5xl relative z-10">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-white/70 hover:text-white mb-5 transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour aux communes
            </button>

            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold mb-3">
                  {commune.name}
                </h1>
                <div className="flex items-center gap-3 flex-wrap text-sm">
                  {commune.population && (
                    <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
                      <Users className="w-3.5 h-3.5" />
                      {commune.population.toLocaleString("fr-FR")} hab.
                    </span>
                  )}
                  {commune.superficie && (
                    <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
                      <Map className="w-3.5 h-3.5" />
                      {commune.superficie} km²
                    </span>
                  )}
                  <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
                    <LayoutGrid className="w-3.5 h-3.5" />
                    {commune._count.quartiers} quartiers
                  </span>
                  <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
                    <Building className="w-3.5 h-3.5" />
                    {commune._count.lieux} lieux
                  </span>
                </div>
                {commune.bourgmestre && (
                  <div className="mt-4 flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl w-fit text-sm">
                    <User className="w-4 h-4" />
                    <span>
                      Bourgmestre : <strong>{commune.bourgmestre}</strong>
                    </span>
                  </div>
                )}
              </div>

              {commune.latitude && commune.longitude && (
                <a
                  href={`https://www.google.com/maps?q=${commune.latitude},${commune.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 px-4 py-2.5 rounded-xl transition-colors text-sm"
                >
                  <MapPin className="w-4 h-4" />
                  Voir sur la carte
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        </section>

        {/* Tabs */}
        <div className="bg-white/80 backdrop-blur-lg border-b border-border sticky top-0 z-10">
          <div className="container mx-auto max-w-5xl flex gap-1 overflow-x-auto px-4">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-5 py-3.5 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
                  activeTab === tab.key
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-t-lg"
                }`}
              >
                {tab.label}
                {tab.count !== undefined && (
                  <span
                    className={`ml-1.5 text-xs px-2 py-0.5 rounded-full ${
                      activeTab === tab.key
                        ? "bg-primary/10 text-primary"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="container mx-auto max-w-5xl py-8 px-4">
          {/* === OVERVIEW TAB === */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              {/* Description */}
              {commune.description && (
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-2">
                    À propos
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {commune.description}
                  </p>
                </div>
              )}

              {/* Key stats cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard
                  icon={<Users className="w-5 h-5 text-blue-600" />}
                  label="Population"
                  value={
                    commune.population
                      ? commune.population.toLocaleString("fr-FR")
                      : "—"
                  }
                />
                <StatCard
                  icon={<Map className="w-5 h-5 text-green-600" />}
                  label="Superficie"
                  value={commune.superficie ? `${commune.superficie} km²` : "—"}
                />
                <StatCard
                  icon={<LayoutGrid className="w-5 h-5 text-purple-600" />}
                  label="Quartiers"
                  value={String(commune._count.quartiers)}
                />
                <StatCard
                  icon={<Building className="w-5 h-5 text-amber-600" />}
                  label="Lieux & Services"
                  value={String(commune._count.lieux)}
                />
              </div>

              {/* Governance */}
              {commune.bourgmestre && (
                <div className="bg-white rounded-2xl border border-border p-5 shadow-sm">
                  <h2 className="text-lg font-semibold text-foreground mb-3">
                    Administration
                  </h2>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {commune.bourgmestre}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Bourgmestre de la commune de {commune.name}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Summary of lieu types */}
              {Object.keys(lieuxByType).length > 0 && (
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-3">
                    Types de lieux
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {Object.entries(lieuxByType).map(([type, lieux]) => (
                      <button
                        key={type}
                        onClick={() => setActiveTab("lieux")}
                        className="flex items-center gap-3 bg-white rounded-xl border border-border hover:border-primary/30 hover:shadow-sm p-4 transition-all text-left group"
                      >
                        <div className="w-10 h-10 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                          {LIEU_TYPE_ICON[type] || (
                            <MapPin className="w-5 h-5" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-foreground text-sm">
                            {LIEU_TYPE_LABELS[type] || type}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {lieux.length} lieu(x)
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* === SERVICES TAB === */}
          {activeTab === "services" && (
            <div className="space-y-8">
              {allServices.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  Aucun service répertorié dans cette commune pour le moment.
                </div>
              ) : (
                Object.entries(servicesByCategorie).map(([cat, services]) => (
                  <div key={cat}>
                    <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-primary" />
                      {categorieName(cat)}{" "}
                      <span className="text-sm font-normal text-muted-foreground">
                        ({services.length})
                      </span>
                    </h2>
                    <div className="space-y-3">
                      {services.map((service) => (
                        <Link
                          key={service.id}
                          href={`/lieux/${service.lieuId}`}
                          className="block"
                        >
                          <div className="bg-white rounded-lg border border-border hover:border-primary/30 hover:shadow-sm transition-all p-4">
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex-1">
                                <h3 className="font-medium text-foreground">
                                  {service.nomService}
                                </h3>
                                <p className="text-sm text-muted-foreground mt-0.5">
                                  {service.lieuNom}
                                </p>
                                {service.description && (
                                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                    {service.description}
                                  </p>
                                )}
                                <div className="flex flex-wrap gap-3 mt-2 text-xs text-muted-foreground">
                                  {service.prixOfficiel && (
                                    <span className="flex items-center gap-1">
                                      <DollarSign className="w-3.5 h-3.5" />
                                      {Number(
                                        service.prixOfficiel,
                                      ).toLocaleString("fr-FR")}{" "}
                                      {service.devise}
                                    </span>
                                  )}
                                  {service.delai && (
                                    <span className="flex items-center gap-1">
                                      <Clock className="w-3.5 h-3.5" />
                                      {service.delai}
                                    </span>
                                  )}
                                </div>
                                {service.documentsRequis &&
                                  service.documentsRequis.length > 0 && (
                                    <div className="mt-2 flex flex-wrap gap-1.5">
                                      {service.documentsRequis.map(
                                        (doc: string, i: number) => (
                                          <Badge
                                            key={i}
                                            variant="default"
                                            className="text-xs"
                                          >
                                            {doc}
                                          </Badge>
                                        ),
                                      )}
                                    </div>
                                  )}
                              </div>
                              <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-1" />
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* === QUARTIERS TAB === */}
          {activeTab === "quartiers" && (
            <div>
              {commune.quartiers && commune.quartiers.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {commune.quartiers.map(
                    (quartier: {
                      id: string;
                      name: string;
                      population?: number | null;
                    }) => (
                      <div
                        key={quartier.id}
                        className="bg-white rounded-xl border border-border p-4 card-hover"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center">
                            <LayoutGrid className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium text-foreground">
                              {quartier.name}
                            </h3>
                            {quartier.population && (
                              <p className="text-sm text-muted-foreground">
                                {quartier.population.toLocaleString("fr-FR")}{" "}
                                habitants
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  Aucun quartier répertorié pour le moment.
                </div>
              )}
            </div>
          )}

          {/* === LIEUX TAB === */}
          {activeTab === "lieux" && (
            <div className="space-y-8">
              {commune.lieux && commune.lieux.length > 0 ? (
                Object.entries(lieuxByType).map(([type, lieux]) => (
                  <div key={type}>
                    <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                      <span className="text-primary">
                        {LIEU_TYPE_ICON[type] || <MapPin className="w-5 h-5" />}
                      </span>
                      {LIEU_TYPE_LABELS[type] || type}
                      <span className="text-sm font-normal text-muted-foreground">
                        ({lieux.length})
                      </span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {lieux.map(
                        (lieu: {
                          id: string;
                          nom: string;
                          type: string;
                          verified: boolean;
                          servicesProposed: { nomService: string }[];
                          _count: { avis: number };
                        }) => (
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
                        ),
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  Aucun lieu répertorié dans cette commune pour le moment.
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

/* ---------- helpers ---------- */

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-border p-4 card-hover">
      <div className="flex items-center gap-2 mb-2">{icon}</div>
      <p className="text-2xl font-extrabold text-foreground">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

const CATEGORIE_LABELS: Record<string, string> = {
  ETAT_CIVIL: "État Civil",
  SANTE: "Santé",
  JUSTICE: "Justice",
  EDUCATION: "Éducation",
  IMPOTS: "Impôts & Taxes",
  URGENCE: "Urgences",
  SOCIAL: "Social",
  TRANSPORT: "Transport",
  AUTRE: "Autres",
};

function categorieName(cat: string): string {
  return CATEGORIE_LABELS[cat] || cat;
}
