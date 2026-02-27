"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Header, Footer } from "@/components/layout/Header";
import { trpc } from "@/lib/trpc";
import {
  FileText,
  ArrowLeft,
  Clock,
  DollarSign,
  CheckCircle,
  BookOpen,
  MapPin,
  Scale,
  ListChecks,
  Lightbulb,
  ScrollText,
  AlertTriangle,
  ChevronRight,
  Stethoscope,
  Building2,
  GraduationCap,
  ShoppingBag,
  HelpCircle,
  Heart,
  Bus,
  Shield,
} from "lucide-react";

const CATEGORY_LABELS: Record<
  string,
  { label: string; icon: any; gradient: string }
> = {
  SANTE: {
    label: "Santé",
    icon: Stethoscope,
    gradient: "from-red-500 to-rose-600",
  },
  ETAT_CIVIL: {
    label: "État Civil",
    icon: FileText,
    gradient: "from-blue-500 to-blue-600",
  },
  JUSTICE: {
    label: "Justice",
    icon: Building2,
    gradient: "from-purple-500 to-violet-600",
  },
  EDUCATION: {
    label: "Éducation",
    icon: GraduationCap,
    gradient: "from-emerald-500 to-green-600",
  },
  IMPOTS: {
    label: "Impôts & Taxes",
    icon: ShoppingBag,
    gradient: "from-amber-500 to-orange-600",
  },
  SECURITE: {
    label: "Sécurité",
    icon: Shield,
    gradient: "from-indigo-500 to-indigo-600",
  },
  TRANSPORT: {
    label: "Transport",
    icon: Bus,
    gradient: "from-orange-500 to-amber-600",
  },
  SOCIAL: {
    label: "Affaires Sociales",
    icon: Heart,
    gradient: "from-pink-500 to-fuchsia-600",
  },
  URGENCE: {
    label: "Urgences",
    icon: HelpCircle,
    gradient: "from-rose-500 to-red-600",
  },
  AUTRE: {
    label: "Autres",
    icon: HelpCircle,
    gradient: "from-gray-500 to-slate-600",
  },
};

export default function DocumentDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const { data: doc, isLoading } = trpc.documents.getBySlug.useQuery(
    { slug },
    { enabled: !!slug },
  );

  const catInfo = doc
    ? CATEGORY_LABELS[doc.categorie] || CATEGORY_LABELS.AUTRE
    : CATEGORY_LABELS.AUTRE;
  const CatIcon = catInfo.icon;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {isLoading ? (
          <div className="flex justify-center py-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        ) : !doc ? (
          <div className="flex-1 flex items-center justify-center py-32">
            <div className="text-center">
              <ScrollText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h1 className="text-2xl font-bold mb-2">Document non trouvé</h1>
              <Link href="/services" className="text-primary hover:underline">
                ← Retour aux services
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Hero */}
            <section
              className={`relative bg-gradient-to-br ${catInfo.gradient} text-white overflow-hidden`}
            >
              <div className="absolute inset-0 hero-pattern opacity-20" />
              <div className="relative max-w-4xl mx-auto px-4 py-14">
                <Link
                  href={`/services/${doc.categorie.toLowerCase()}`}
                  className="inline-flex items-center gap-1 text-white/60 hover:text-white/90 text-sm mb-4 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" /> {catInfo.label}
                </Link>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                    <ScrollText className="w-8 h-8" />
                  </div>
                  <div>
                    <h1 className="text-2xl md:text-3xl font-extrabold">
                      {doc.nom}
                    </h1>
                    {doc.description && (
                      <p className="text-white/80 mt-1">{doc.description}</p>
                    )}
                  </div>
                </div>

                {/* Quick stats */}
                <div className="flex flex-wrap gap-4 mt-8">
                  {doc.prixEstimatif && (
                    <div className="bg-white/15 backdrop-blur-sm rounded-xl px-4 py-2.5 border border-white/10">
                      <DollarSign className="w-4 h-4 inline mr-1" />
                      <span className="font-bold">
                        {String(doc.prixEstimatif)}
                      </span>
                      <span className="text-white/70 text-sm ml-1">
                        {doc.devise || "FC"}
                      </span>
                    </div>
                  )}
                  {doc.delaiEstimatif && (
                    <div className="bg-white/15 backdrop-blur-sm rounded-xl px-4 py-2.5 border border-white/10">
                      <Clock className="w-4 h-4 inline mr-1" />
                      <span className="font-bold">
                        {String(doc.delaiEstimatif)}
                      </span>
                    </div>
                  )}
                  <div className="bg-white/15 backdrop-blur-sm rounded-xl px-4 py-2.5 border border-white/10 flex items-center gap-2">
                    <CatIcon className="w-4 h-4" />
                    <span className="text-sm">{catInfo.label}</span>
                  </div>
                </div>
              </div>
            </section>

            <div className="max-w-4xl mx-auto px-4 py-10">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main content */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Definition */}
                  {doc.definition && (
                    <div className="bg-white rounded-2xl border border-border p-6">
                      <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-primary" />
                        Définition
                      </h2>
                      <p className="text-muted-foreground leading-relaxed">
                        {doc.definition}
                      </p>
                    </div>
                  )}

                  {/* Role */}
                  {doc.role && (
                    <div className="bg-white rounded-2xl border border-border p-6">
                      <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                        <Scale className="w-5 h-5 text-amber-500" />
                        Rôle & utilité
                      </h2>
                      <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                        {doc.role}
                      </p>
                    </div>
                  )}

                  {/* Procedure */}
                  {doc.procedure && (
                    <div className="bg-white rounded-2xl border border-border p-6">
                      <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                        <ListChecks className="w-5 h-5 text-emerald-500" />
                        Procédure d&apos;obtention
                      </h2>
                      <div className="text-muted-foreground leading-relaxed whitespace-pre-line bg-gray-50 rounded-xl p-4">
                        {doc.procedure.replace(/\\n/g, "\n")}
                      </div>
                    </div>
                  )}

                  {/* Base juridique */}
                  {doc.baseJuridique && (
                    <div className="bg-blue-50 rounded-2xl border border-blue-200 p-6">
                      <h2 className="text-lg font-bold text-blue-800 mb-3 flex items-center gap-2">
                        <Scale className="w-5 h-5" />
                        Base juridique
                      </h2>
                      <p className="text-blue-700 text-sm leading-relaxed whitespace-pre-line">
                        {doc.baseJuridique}
                      </p>
                    </div>
                  )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Prix & Délai */}
                  <div className="bg-white rounded-2xl border border-border p-5">
                    <h3 className="font-bold text-foreground mb-3 text-sm">
                      Informations pratiques
                    </h3>
                    <div className="space-y-3">
                      {doc.prixEstimatif && (
                        <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-xl">
                          <DollarSign className="w-5 h-5 text-emerald-600" />
                          <div>
                            <p className="font-bold text-emerald-700">
                              {String(doc.prixEstimatif)} {doc.devise || "FC"}
                            </p>
                            <p className="text-xs text-emerald-600">
                              Prix estimatif
                            </p>
                          </div>
                        </div>
                      )}
                      {doc.delaiEstimatif && (
                        <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
                          <Clock className="w-5 h-5 text-blue-600" />
                          <div>
                            <p className="font-bold text-blue-700">
                              {String(doc.delaiEstimatif)}
                            </p>
                            <p className="text-xs text-blue-600">
                              Délai estimatif
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Documents requis */}
                  {doc.documentsRequis && doc.documentsRequis.length > 0 && (
                    <div className="bg-white rounded-2xl border border-border p-5">
                      <h3 className="font-bold text-foreground mb-3 text-sm flex items-center gap-2">
                        <FileText className="w-4 h-4 text-primary" />
                        Documents requis
                      </h3>
                      <ul className="space-y-2">
                        {doc.documentsRequis.map((d, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm text-foreground"
                          >
                            <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Où obtenir */}
                  {doc.ouObtenir && (
                    <div className="bg-white rounded-2xl border border-border p-5">
                      <h3 className="font-bold text-foreground mb-3 text-sm flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        Où obtenir ce document
                      </h3>
                      <p className="text-sm text-muted-foreground whitespace-pre-line">
                        {doc.ouObtenir}
                      </p>
                    </div>
                  )}

                  {/* Conseils */}
                  {doc.conseils && (
                    <div className="bg-amber-50 rounded-2xl border border-amber-200 p-5">
                      <h3 className="font-bold text-amber-800 mb-3 text-sm flex items-center gap-2">
                        <Lightbulb className="w-4 h-4" />
                        Conseils pratiques
                      </h3>
                      <p className="text-sm text-amber-900 whitespace-pre-line">
                        {doc.conseils}
                      </p>
                    </div>
                  )}

                  {/* Signaler */}
                  <Link href="/signaler" className="block">
                    <div className="bg-red-50 rounded-2xl border border-red-200 p-5 hover:shadow-md transition-shadow">
                      <h3 className="font-bold text-red-800 mb-1 text-sm flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" />
                        Signaler un problème
                      </h3>
                      <p className="text-xs text-red-700">
                        Information erronée, prix incorrect ? Signalez-le.
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
