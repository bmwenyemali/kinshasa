"use client";

import React from "react";
import Link from "next/link";
import { Header, Footer } from "@/components/layout/Header";
import { trpc } from "@/lib/trpc";
import {
  BarChart3,
  MapPin,
  FileText,
  Building2,
  Users,
  Activity,
  MessageCircle,
  AlertTriangle,
  ArrowLeft,
  Heart,
  ScrollText,
  Search as SearchIcon,
  Stethoscope,
  GraduationCap,
  ShoppingBag,
  Bus,
  Shield,
  HelpCircle,
  TrendingUp,
} from "lucide-react";

const CATEGORY_LABELS: Record<string, string> = {
  ETAT_CIVIL: "État Civil",
  SANTE: "Santé",
  JUSTICE: "Justice",
  EDUCATION: "Éducation",
  IMPOTS: "Impôts & Taxes",
  TRANSPORT: "Transport",
  SECURITE: "Sécurité",
  SOCIAL: "Affaires Sociales",
  URGENCE: "Urgences",
  AUTRE: "Autres",
};

const LIEU_TYPE_LABELS: Record<string, string> = {
  HOPITAL: "Hôpitaux",
  CENTRE_SANTE: "Centres de santé",
  COMMISSARIAT: "Commissariats",
  TRIBUNAL: "Tribunaux",
  ECOLE: "Écoles",
  UNIVERSITE: "Universités",
  MAIRIE: "Mairies",
  BANQUE: "Banques",
  PHARMACIE: "Pharmacies",
  MARCHE: "Marchés",
  EGLISE: "Églises",
  ADMINISTRATION: "Administration",
  AUTRE: "Autres",
};

function StatCard({
  icon: Icon,
  label,
  value,
  color = "primary",
}: {
  icon: any;
  label: string;
  value: number | string;
  color?: string;
}) {
  const colorClasses: Record<string, string> = {
    primary: "bg-primary/10 text-primary",
    emerald: "bg-emerald-100 text-emerald-600",
    amber: "bg-amber-100 text-amber-600",
    purple: "bg-purple-100 text-purple-600",
    rose: "bg-rose-100 text-rose-600",
    blue: "bg-blue-100 text-blue-600",
    indigo: "bg-indigo-100 text-indigo-600",
    orange: "bg-orange-100 text-orange-600",
  };

  return (
    <div className="bg-white rounded-2xl border border-border p-5 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorClasses[color] || colorClasses.primary}`}
        >
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <p className="text-2xl font-bold text-foreground">{value}</p>
          <p className="text-xs text-muted-foreground">{label}</p>
        </div>
      </div>
    </div>
  );
}

function BarChartSimple({
  data,
  maxValue,
}: {
  data: { label: string; value: number }[];
  maxValue: number;
}) {
  return (
    <div className="space-y-2">
      {data.map((item, i) => (
        <div key={i} className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground w-28 truncate text-right flex-shrink-0">
            {item.label}
          </span>
          <div className="flex-1 bg-gray-100 rounded-full h-6 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-blue-500 rounded-full flex items-center justify-end px-2 transition-all duration-500"
              style={{
                width: `${maxValue > 0 ? Math.max((item.value / maxValue) * 100, 5) : 0}%`,
              }}
            >
              <span className="text-[10px] font-bold text-white">
                {item.value}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function StatistiquesPage() {
  const { data: stats, isLoading } = trpc.stats.getPublicStats.useQuery();
  const { data: servicesByCategory } = trpc.stats.servicesByCategory.useQuery();
  const { data: documentsByCategory } =
    trpc.stats.documentsByCategory.useQuery();
  const { data: lieuxByType } = trpc.stats.lieuxByType.useQuery();
  const { data: lieuxByCommune } = trpc.stats.lieuxByCommune.useQuery();
  const { data: topSearches } = trpc.stats.topSearches.useQuery();

  const serviceBarData = (servicesByCategory || []).map((s) => ({
    label: CATEGORY_LABELS[s.categorie] || s.categorie,
    value: s.count,
  }));
  const serviceMax = Math.max(...serviceBarData.map((d) => d.value), 1);

  const docBarData = (documentsByCategory || []).map((d) => ({
    label: CATEGORY_LABELS[d.categorie] || d.categorie,
    value: d.count,
  }));
  const docMax = Math.max(...docBarData.map((d) => d.value), 1);

  const lieuxTypeData = (lieuxByType || []).map((l) => ({
    label: LIEU_TYPE_LABELS[l.type] || l.type,
    value: l.count,
  }));
  const lieuxTypeMax = Math.max(...lieuxTypeData.map((d) => d.value), 1);

  const topCommuneData = (lieuxByCommune || [])
    .filter((c) => c.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, 15)
    .map((c) => ({
      label: c.name,
      value: c.count,
    }));
  const communeMax = Math.max(...topCommuneData.map((d) => d.value), 1);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-indigo-600 to-purple-700 text-white overflow-hidden">
          <div className="absolute inset-0 hero-pattern opacity-20" />
          <div className="relative max-w-6xl mx-auto px-4 py-12">
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-white/60 hover:text-white/90 text-sm mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Accueil
            </Link>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                <BarChart3 className="w-7 h-7" />
              </div>
              <div>
                <h1 className="text-3xl font-extrabold">
                  Tableau de bord public
                </h1>
                <p className="text-white/80 mt-1">
                  Données et statistiques ouvertes sur les services publics de
                  Kinshasa
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4 py-10">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            </div>
          ) : (
            <div className="space-y-10">
              {/* Global stats cards */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <StatCard
                  icon={Building2}
                  label="Communes"
                  value={stats?.totalCommunes || 0}
                  color="primary"
                />
                <StatCard
                  icon={MapPin}
                  label="Lieux vérifiés"
                  value={stats?.totalLieux || 0}
                  color="emerald"
                />
                <StatCard
                  icon={FileText}
                  label="Démarches"
                  value={stats?.totalServices || 0}
                  color="amber"
                />
                <StatCard
                  icon={ScrollText}
                  label="Documents"
                  value={stats?.totalDocuments || 0}
                  color="purple"
                />
                <StatCard
                  icon={Stethoscope}
                  label="Zones de santé"
                  value={stats?.totalZonesSante || 0}
                  color="rose"
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard
                  icon={Users}
                  label="Quartiers"
                  value={stats?.totalQuartiers || 0}
                  color="blue"
                />
                <StatCard
                  icon={MessageCircle}
                  label="FAQ"
                  value={stats?.totalFaqs || 0}
                  color="indigo"
                />
                <StatCard
                  icon={Activity}
                  label="Avis citoyens"
                  value={stats?.totalAvis || 0}
                  color="orange"
                />
                <StatCard
                  icon={AlertTriangle}
                  label="Signalements"
                  value={stats?.totalSignalements || 0}
                  color="rose"
                />
              </div>

              {/* Charts section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Services by category */}
                {serviceBarData.length > 0 && (
                  <div className="bg-white rounded-2xl border border-border p-6">
                    <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-primary" />
                      Démarches par catégorie
                    </h3>
                    <BarChartSimple
                      data={serviceBarData}
                      maxValue={serviceMax}
                    />
                  </div>
                )}

                {/* Documents by category */}
                {docBarData.length > 0 && (
                  <div className="bg-white rounded-2xl border border-border p-6">
                    <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                      <ScrollText className="w-5 h-5 text-purple-500" />
                      Documents par catégorie
                    </h3>
                    <BarChartSimple data={docBarData} maxValue={docMax} />
                  </div>
                )}

                {/* Lieux by type */}
                {lieuxTypeData.length > 0 && (
                  <div className="bg-white rounded-2xl border border-border p-6">
                    <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-emerald-500" />
                      Lieux par type
                    </h3>
                    <BarChartSimple
                      data={lieuxTypeData}
                      maxValue={lieuxTypeMax}
                    />
                  </div>
                )}

                {/* Top communes */}
                {topCommuneData.length > 0 && (
                  <div className="bg-white rounded-2xl border border-border p-6">
                    <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-amber-500" />
                      Lieux par commune (top 15)
                    </h3>
                    <BarChartSimple
                      data={topCommuneData}
                      maxValue={communeMax}
                    />
                  </div>
                )}
              </div>

              {/* Top searches */}
              {topSearches && topSearches.length > 0 && (
                <div className="bg-white rounded-2xl border border-border p-6">
                  <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    Recherches les plus populaires
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {topSearches.map((s, i) => (
                      <Link
                        key={i}
                        href={`/recherche?q=${encodeURIComponent(s.query)}`}
                        className="inline-flex items-center gap-1.5 bg-gray-50 hover:bg-gray-100 border border-border px-3 py-1.5 rounded-full text-sm transition-colors"
                      >
                        <SearchIcon className="w-3.5 h-3.5 text-muted-foreground" />
                        <span className="text-foreground">{s.query}</span>
                        <span className="text-xs text-muted-foreground">
                          ({s.count})
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Data disclaimer */}
              <div className="bg-blue-50 rounded-2xl border border-blue-200 p-6 text-center">
                <p className="text-sm text-blue-800">
                  Ces données sont collectées et mises à jour régulièrement par
                  la communauté et les administrateurs de Kin Services. Elles
                  sont en accès libre (open data).
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
