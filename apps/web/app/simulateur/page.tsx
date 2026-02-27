"use client";

import React, { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Header, Footer } from "@/components/layout/Header";
import { trpc } from "@/lib/trpc";
import {
  ListChecks,
  Search,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  MapPin,
  Clock,
  DollarSign,
  ClipboardList,
  CheckCircle,
  ArrowLeft,
  FileText,
  Stethoscope,
  Building2,
  GraduationCap,
  ShoppingBag,
  HelpCircle,
  Heart,
  Bus,
  Shield,
  AlertTriangle,
  Printer,
} from "lucide-react";

const CATEGORIES = [
  { key: "ETAT_CIVIL", label: "État Civil", icon: FileText, color: "blue" },
  { key: "SANTE", label: "Santé", icon: Stethoscope, color: "red" },
  { key: "JUSTICE", label: "Justice", icon: Building2, color: "purple" },
  {
    key: "EDUCATION",
    label: "Éducation",
    icon: GraduationCap,
    color: "emerald",
  },
  { key: "IMPOTS", label: "Impôts & Taxes", icon: ShoppingBag, color: "amber" },
  { key: "TRANSPORT", label: "Transport", icon: Bus, color: "orange" },
  { key: "SECURITE", label: "Sécurité", icon: Shield, color: "indigo" },
  { key: "SOCIAL", label: "Affaires Sociales", icon: Heart, color: "pink" },
  { key: "URGENCE", label: "Urgences", icon: HelpCircle, color: "rose" },
];

export default function SimulateurPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex flex-col bg-background">
          <Header />
          <div className="flex-1 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
          <Footer />
        </div>
      }
    >
      <SimulateurContent />
    </Suspense>
  );
}

function SimulateurContent() {
  const searchParams = useSearchParams();
  const preselectedService = searchParams.get("service") || "";

  const [step, setStep] = useState(preselectedService ? 2 : 1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedServiceName, setSelectedServiceName] =
    useState(preselectedService);
  const [searchQuery, setSearchQuery] = useState(preselectedService);
  const [checkedSteps, setCheckedSteps] = useState<Record<number, boolean>>({});

  // Fetch all services to search across
  const { data: categoryCounts } = trpc.services.getCategoryCounts.useQuery();

  // If a category is selected, get its details
  const { data: categoryData } = trpc.services.getCategoryDetails.useQuery(
    { categorie: selectedCategory as any },
    { enabled: !!selectedCategory },
  );

  // Search across all services
  const { data: searchResults } = trpc.services.search.useQuery(
    { query: searchQuery, limit: 20 },
    { enabled: searchQuery.length >= 2 },
  );

  // Selected service details
  const selectedService = useMemo(() => {
    if (!selectedServiceName) return null;

    // Try from category data first
    if (categoryData?.allServices) {
      const found = categoryData.allServices.find(
        (s) => s.nomService === selectedServiceName,
      );
      if (found) return found;
    }

    // Try from search results
    if (searchResults) {
      const found = searchResults.find(
        (s) => s.nomService === selectedServiceName,
      );
      if (found) {
        return {
          id: found.id,
          nomService: found.nomService,
          description: found.description,
          documentsRequis: found.documentsRequis,
          prixOfficiel: found.prixOfficiel ? Number(found.prixOfficiel) : null,
          devise: found.devise,
          delai: found.delai,
          procedure: found.procedure,
          lieuNom: found.lieu?.nom,
          lieuId: found.lieu?.id,
          commune: found.lieu?.commune?.name,
        };
      }
    }

    return null;
  }, [selectedServiceName, categoryData, searchResults]);

  // Parse procedure into steps
  const procedureSteps = useMemo(() => {
    if (!selectedService?.procedure) return [];
    const lines = selectedService.procedure
      .replace(/\\n/g, "\n")
      .split("\n")
      .filter((l: string) => l.trim());
    return lines.map((line: string, i: number) => ({
      index: i,
      text: line.trim(),
    }));
  }, [selectedService]);

  const toggleStep = (index: number) => {
    setCheckedSteps((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const completedCount = Object.values(checkedSteps).filter(Boolean).length;
  const totalSteps = procedureSteps.length;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-primary to-blue-700 text-white overflow-hidden">
          <div className="absolute inset-0 hero-pattern opacity-20" />
          <div className="relative max-w-5xl mx-auto px-4 py-12">
            <Link
              href="/services"
              className="inline-flex items-center gap-1 text-white/60 hover:text-white/90 text-sm mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Retour aux services
            </Link>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                <ListChecks className="w-7 h-7" />
              </div>
              <div>
                <h1 className="text-3xl font-extrabold">
                  Simulateur de démarches
                </h1>
                <p className="text-white/80 mt-1">
                  Obtenez un guide personnalisé étape par étape pour votre
                  démarche administrative
                </p>
              </div>
            </div>

            {/* Progress stepper */}
            <div className="flex items-center gap-2 mt-8">
              {[1, 2, 3].map((s) => (
                <React.Fragment key={s}>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                      step >= s
                        ? "bg-white text-primary"
                        : "bg-white/20 text-white/50"
                    }`}
                  >
                    {step > s ? <CheckCircle className="w-5 h-5" /> : s}
                  </div>
                  {s < 3 && (
                    <div
                      className={`flex-1 h-1 rounded-full ${
                        step > s ? "bg-white" : "bg-white/20"
                      }`}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
            <div className="flex justify-between mt-1 text-xs text-white/60">
              <span>Choisir</span>
              <span>Démarche</span>
              <span>Guide</span>
            </div>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 py-10">
          {/* ═══ STEP 1: Choose category or search ═══ */}
          {step === 1 && (
            <div className="space-y-8">
              {/* Search bar */}
              <div className="max-w-xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Que voulez-vous faire ? Ex: obtenir un passeport, inscrire un enfant..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border border-border text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-sm"
                  />
                </div>

                {searchResults && searchQuery.length >= 2 && (
                  <div className="mt-3 bg-white rounded-2xl border border-border shadow-lg max-h-80 overflow-y-auto">
                    {searchResults.length > 0 ? (
                      searchResults.map((s) => (
                        <button
                          key={s.id}
                          onClick={() => {
                            setSelectedServiceName(s.nomService);
                            setSelectedCategory(s.categorie);
                            setStep(3);
                            setCheckedSteps({});
                          }}
                          className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors text-left border-b border-border last:border-0"
                        >
                          <ListChecks className="w-5 h-5 text-primary flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm text-foreground">
                              {s.nomService}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {s.lieu?.nom}
                              {s.prixOfficiel && (
                                <span className="ml-2 text-emerald-600">
                                  {Number(s.prixOfficiel).toLocaleString()}{" "}
                                  {s.devise}
                                </span>
                              )}
                            </p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                        </button>
                      ))
                    ) : (
                      <p className="p-4 text-sm text-muted-foreground text-center">
                        Aucun résultat pour &quot;{searchQuery}&quot;
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Category grid */}
              <div>
                <h2 className="text-lg font-bold text-foreground text-center mb-6">
                  Ou choisissez une catégorie
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
                  {CATEGORIES.map((cat) => {
                    const Icon = cat.icon;
                    const count = categoryCounts?.[cat.key] || 0;
                    return (
                      <button
                        key={cat.key}
                        onClick={() => {
                          setSelectedCategory(cat.key);
                          setStep(2);
                        }}
                        className="bg-white rounded-2xl border border-border p-5 hover:shadow-lg transition-all text-center group"
                      >
                        <Icon className="w-8 h-8 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                        <h3 className="font-bold text-sm text-foreground">
                          {cat.label}
                        </h3>
                        {count > 0 && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {count} démarche{count > 1 ? "s" : ""}
                          </p>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ═══ STEP 2: Choose specific service ═══ */}
          {step === 2 && (
            <div className="space-y-6">
              <button
                onClick={() => {
                  setStep(1);
                  setSelectedCategory("");
                }}
                className="text-sm text-primary hover:underline flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" /> Retour aux catégories
              </button>

              <h2 className="text-xl font-bold text-foreground">
                Quelle démarche souhaitez-vous effectuer ?
              </h2>

              {categoryData?.allServices &&
              categoryData.allServices.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {categoryData.allServices.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => {
                        setSelectedServiceName(s.nomService);
                        setStep(3);
                        setCheckedSteps({});
                      }}
                      className="bg-white rounded-2xl border border-border p-5 hover:shadow-lg hover:border-primary/30 transition-all text-left"
                    >
                      <h3 className="font-bold text-foreground">
                        {s.nomService}
                      </h3>
                      {s.description && (
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          {s.description}
                        </p>
                      )}
                      <div className="flex items-center gap-3 mt-3 flex-wrap">
                        {s.prixOfficiel !== null &&
                          Number(s.prixOfficiel) > 0 && (
                            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                              {Number(s.prixOfficiel).toLocaleString()}{" "}
                              {s.devise || "FC"}
                            </span>
                          )}
                        {s.prixOfficiel !== null &&
                          Number(s.prixOfficiel) === 0 && (
                            <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                              Gratuit
                            </span>
                          )}
                        {s.delai && (
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {s.delai}
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
                  <p className="text-sm text-muted-foreground mt-3">
                    Chargement des démarches...
                  </p>
                </div>
              )}
            </div>
          )}

          {/* ═══ STEP 3: Personalized guide ═══ */}
          {step === 3 && selectedService && (
            <div className="space-y-6">
              <button
                onClick={() => {
                  setStep(selectedCategory ? 2 : 1);
                  setSelectedServiceName("");
                  setCheckedSteps({});
                }}
                className="text-sm text-primary hover:underline flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" /> Choisir une autre démarche
              </button>

              {/* Service header */}
              <div className="bg-white rounded-2xl border border-border p-6">
                <h2 className="text-xl font-bold text-foreground">
                  {selectedService.nomService}
                </h2>
                {selectedService.description && (
                  <p className="text-muted-foreground mt-1">
                    {selectedService.description}
                  </p>
                )}
                <div className="flex flex-wrap gap-4 mt-4">
                  {selectedService.prixOfficiel !== null &&
                    Number(selectedService.prixOfficiel) > 0 && (
                      <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-2 rounded-xl text-sm font-medium">
                        <DollarSign className="w-4 h-4" />
                        Coût:{" "}
                        {Number(
                          selectedService.prixOfficiel,
                        ).toLocaleString()}{" "}
                        {selectedService.devise || "FC"}
                      </div>
                    )}
                  {selectedService.prixOfficiel !== null &&
                    Number(selectedService.prixOfficiel) === 0 && (
                      <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-2 rounded-xl text-sm font-medium">
                        <DollarSign className="w-4 h-4" /> Gratuit
                      </div>
                    )}
                  {selectedService.delai && (
                    <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-2 rounded-xl text-sm font-medium">
                      <Clock className="w-4 h-4" /> {selectedService.delai}
                    </div>
                  )}
                  {selectedService.lieuNom && (
                    <Link
                      href={`/lieux/${selectedService.lieuId}`}
                      className="flex items-center gap-2 bg-primary/5 text-primary px-3 py-2 rounded-xl text-sm font-medium hover:bg-primary/10 transition-colors"
                    >
                      <MapPin className="w-4 h-4" /> {selectedService.lieuNom}
                    </Link>
                  )}
                </div>
              </div>

              {/* Documents checklist */}
              {selectedService.documentsRequis &&
                selectedService.documentsRequis.length > 0 && (
                  <div className="bg-white rounded-2xl border border-border p-6">
                    <h3 className="font-bold text-foreground flex items-center gap-2 mb-4">
                      <ClipboardList className="w-5 h-5 text-amber-500" />
                      Documents à préparer
                    </h3>
                    <div className="space-y-2">
                      {selectedService.documentsRequis.map(
                        (doc: string, i: number) => (
                          <label
                            key={i}
                            className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors"
                          >
                            <input
                              type="checkbox"
                              className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary/20"
                            />
                            <span className="text-sm text-foreground">
                              {doc}
                            </span>
                          </label>
                        ),
                      )}
                    </div>
                  </div>
                )}

              {/* Procedure steps as checklist */}
              {procedureSteps.length > 0 && (
                <div className="bg-white rounded-2xl border border-border p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-foreground flex items-center gap-2">
                      <ListChecks className="w-5 h-5 text-primary" />
                      Étapes de la procédure
                    </h3>
                    {totalSteps > 0 && (
                      <span className="text-sm font-medium text-muted-foreground">
                        {completedCount}/{totalSteps} terminé
                        {completedCount > 1 ? "s" : ""}
                      </span>
                    )}
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${totalSteps > 0 ? (completedCount / totalSteps) * 100 : 0}%`,
                      }}
                    />
                  </div>

                  <div className="space-y-2">
                    {procedureSteps.map((ps) => (
                      <label
                        key={ps.index}
                        className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                          checkedSteps[ps.index]
                            ? "bg-emerald-50 border border-emerald-200"
                            : "bg-gray-50 hover:bg-gray-100"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={!!checkedSteps[ps.index]}
                          onChange={() => toggleStep(ps.index)}
                          className="w-5 h-5 mt-0.5 rounded border-gray-300 text-primary focus:ring-primary/20 flex-shrink-0"
                        />
                        <span
                          className={`text-sm leading-relaxed ${
                            checkedSteps[ps.index]
                              ? "text-emerald-800 line-through opacity-70"
                              : "text-foreground"
                          }`}
                        >
                          {ps.text}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Conditions */}
              {(selectedService as any).conditionsParticulieres && (
                <div className="bg-amber-50 rounded-2xl border border-amber-200 p-6">
                  <h3 className="font-bold text-amber-800 flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-5 h-5" />
                    Conditions particulières
                  </h3>
                  <p className="text-sm text-amber-900">
                    {(selectedService as any).conditionsParticulieres}
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-2 bg-gray-100 text-foreground px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors"
                >
                  <Printer className="w-4 h-4" /> Imprimer ce guide
                </button>
                {selectedService.lieuId && (
                  <Link
                    href={`/carte?lieu=${selectedService.lieuId}`}
                    className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors"
                  >
                    <MapPin className="w-4 h-4" /> Voir sur la carte
                  </Link>
                )}
              </div>
            </div>
          )}

          {/* Step 3 but no service found */}
          {step === 3 && !selectedService && (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
              <p className="text-sm text-muted-foreground mt-3">
                Chargement des détails...
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
