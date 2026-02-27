"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Header, Footer } from "@/components/layout/Header";
import { trpc } from "@/lib/trpc";
import {
  MessageCircle,
  Search,
  ChevronDown,
  ChevronUp,
  FileText,
  Stethoscope,
  Building2,
  GraduationCap,
  ShoppingBag,
  HelpCircle,
  Heart,
  Bus,
  Shield,
  ArrowLeft,
  Sparkles,
} from "lucide-react";

const CATEGORY_LABELS: Record<
  string,
  { label: string; icon: any; color: string }
> = {
  ETAT_CIVIL: { label: "État Civil", icon: FileText, color: "blue" },
  SANTE: { label: "Santé", icon: Stethoscope, color: "red" },
  JUSTICE: { label: "Justice", icon: Building2, color: "purple" },
  EDUCATION: { label: "Éducation", icon: GraduationCap, color: "emerald" },
  IMPOTS: { label: "Impôts & Taxes", icon: ShoppingBag, color: "amber" },
  TRANSPORT: { label: "Transport", icon: Bus, color: "orange" },
  SECURITE: { label: "Sécurité", icon: Shield, color: "indigo" },
  SOCIAL: { label: "Affaires Sociales", icon: Heart, color: "pink" },
  URGENCE: { label: "Urgences", icon: HelpCircle, color: "rose" },
  GENERAL: { label: "Général", icon: Sparkles, color: "gray" },
};

function FaqItem({
  faq,
}: {
  faq: { id: string; question: string; reponse: string };
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border rounded-xl overflow-hidden bg-white">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 md:p-5 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="font-medium text-foreground pr-3">{faq.question}</span>
        {open ? (
          <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
        )}
      </button>
      {open && (
        <div className="px-4 md:px-5 pb-4 md:pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border pt-3 bg-gray-50/50">
          {faq.reponse}
        </div>
      )}
    </div>
  );
}

export default function FaqPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data: groupedFaqs, isLoading } = trpc.faq.getGrouped.useQuery();
  const { data: searchResults } = trpc.faq.search.useQuery(
    { query: searchQuery },
    { enabled: searchQuery.length >= 2 },
  );

  const categories = groupedFaqs ? Object.keys(groupedFaqs) : [];
  const isSearching = searchQuery.length >= 2;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-primary to-blue-700 text-white overflow-hidden">
          <div className="absolute inset-0 hero-pattern opacity-20" />
          <div className="relative max-w-5xl mx-auto px-4 py-12">
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-white/60 hover:text-white/90 text-sm mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Accueil
            </Link>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                <MessageCircle className="w-7 h-7" />
              </div>
              <div>
                <h1 className="text-3xl font-extrabold">
                  Questions fréquentes
                </h1>
                <p className="text-white/80 mt-1">
                  Trouvez rapidement les réponses à vos questions sur les
                  services publics de Kinshasa
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 py-10">
          {/* Search */}
          <div className="relative max-w-xl mx-auto mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Rechercher une question..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-border text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-sm"
            />
          </div>

          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            </div>
          ) : isSearching ? (
            /* Search results */
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-foreground mb-4">
                {searchResults?.length || 0} résultat
                {(searchResults?.length || 0) > 1 ? "s" : ""} pour &quot;
                {searchQuery}&quot;
              </h2>
              {searchResults && searchResults.length > 0 ? (
                searchResults.map((faq) => <FaqItem key={faq.id} faq={faq} />)
              ) : (
                <div className="text-center py-16">
                  <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground">
                    Aucun résultat
                  </h3>
                  <p className="text-muted-foreground mt-1">
                    Essayez avec d&apos;autres mots-clés.
                  </p>
                </div>
              )}
            </div>
          ) : (
            /* Grouped FAQs */
            <div className="space-y-8">
              {/* Category filter pills */}
              <div className="flex flex-wrap gap-2 justify-center">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    !selectedCategory
                      ? "bg-primary text-white shadow-md"
                      : "bg-gray-100 text-muted-foreground hover:bg-gray-200"
                  }`}
                >
                  Toutes
                </button>
                {categories.map((cat) => {
                  const meta = CATEGORY_LABELS[cat] || {
                    label: cat,
                    icon: HelpCircle,
                    color: "gray",
                  };
                  const Icon = meta.icon;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                        selectedCategory === cat
                          ? "bg-primary text-white shadow-md"
                          : "bg-gray-100 text-muted-foreground hover:bg-gray-200"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {meta.label}
                    </button>
                  );
                })}
              </div>

              {/* FAQ sections */}
              {categories
                .filter((cat) => !selectedCategory || cat === selectedCategory)
                .map((cat) => {
                  const meta = CATEGORY_LABELS[cat] || {
                    label: cat,
                    icon: HelpCircle,
                    color: "gray",
                  };
                  const Icon = meta.icon;
                  const faqs = groupedFaqs![cat];

                  return (
                    <div key={cat}>
                      <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                        <Icon className="w-5 h-5 text-primary" />
                        {meta.label}
                        <span className="text-xs font-normal text-muted-foreground bg-gray-100 px-2 py-0.5 rounded-full">
                          {faqs.length}
                        </span>
                      </h2>
                      <div className="space-y-2">
                        {faqs.map((faq: any) => (
                          <FaqItem key={faq.id} faq={faq} />
                        ))}
                      </div>
                    </div>
                  );
                })}

              {categories.length === 0 && (
                <div className="text-center py-16">
                  <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground">
                    Aucune FAQ disponible
                  </h3>
                  <p className="text-muted-foreground mt-1">
                    Les questions seront ajoutées prochainement.
                  </p>
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
