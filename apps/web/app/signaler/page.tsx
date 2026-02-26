"use client";

import React, { useState } from "react";
import { Header, Footer } from "@/components/layout/Header";
import { trpc } from "@/lib/trpc";
import {
  AlertTriangle,
  Send,
  CheckCircle,
  MapPin,
  FileText,
  DollarSign,
  ShieldAlert,
  HelpCircle,
  X as XIcon,
} from "lucide-react";

const TYPES = [
  {
    value: "INFO_ERRONNEE",
    label: "Information erronée",
    icon: FileText,
    color: "text-blue-600 bg-blue-50 border-blue-200",
  },
  {
    value: "CORRUPTION",
    label: "Corruption / Surfacturation",
    icon: DollarSign,
    color: "text-red-600 bg-red-50 border-red-200",
  },
  {
    value: "FERME",
    label: "Lieu fermé / Inexistant",
    icon: XIcon,
    color: "text-gray-600 bg-gray-50 border-gray-200",
  },
  {
    value: "PRIX_INCORRECT",
    label: "Prix incorrect",
    icon: DollarSign,
    color: "text-amber-600 bg-amber-50 border-amber-200",
  },
  {
    value: "AUTRE",
    label: "Autre problème",
    icon: HelpCircle,
    color: "text-purple-600 bg-purple-50 border-purple-200",
  },
];

const DESTINATIONS = [
  { label: "Police / Commissariat", value: "POLICE" },
  { label: "Commune / Mairie", value: "COMMUNE" },
  { label: "Hôpital / Centre de santé", value: "HOPITAL" },
  { label: "Gouvernorat", value: "GOUVERNORAT" },
  { label: "Justice / Tribunal", value: "JUSTICE" },
  { label: "Autre", value: "AUTRE" },
];

export default function SignalerPage() {
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [destination, setDestination] = useState("");
  const [localisation, setLocalisation] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const createMutation = trpc.signalements.create.useMutation({
    onSuccess: () => {
      setSubmitted(true);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!type || !description) return;
    createMutation.mutate({
      type: type as any,
      description: `${description}${localisation ? `\n\n📍 Localisation: ${localisation}` : ""}${destination ? `\n\n🏛️ Transférer à: ${DESTINATIONS.find((d) => d.value === destination)?.label || destination}` : ""}`,
      email: email || undefined,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-rose-600 via-red-600 to-red-700 text-white py-14 px-4 relative overflow-hidden">
          <div className="absolute inset-0 hero-pattern opacity-20" />
          <div className="relative max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold mb-3">
              Signaler un problème
            </h1>
            <p className="text-white/80 text-lg max-w-xl mx-auto">
              Aidez-nous à améliorer les services publics de Kinshasa. Votre
              signalement sera traité et transmis aux autorités compétentes.
            </p>
          </div>
        </section>

        <section className="py-10 px-4">
          <div className="max-w-2xl mx-auto">
            {submitted ? (
              <div className="bg-white rounded-2xl border border-border shadow-lg p-8 text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-emerald-600" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Signalement envoyé !
                </h2>
                <p className="text-muted-foreground mb-6">
                  Merci pour votre contribution. Notre équipe va examiner votre
                  signalement et le transmettre aux autorités compétentes.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setType("");
                    setDescription("");
                    setEmail("");
                    setDestination("");
                    setLocalisation("");
                  }}
                  className="bg-primary hover:bg-primary-dark text-white font-medium px-6 py-3 rounded-xl transition-colors"
                >
                  Faire un autre signalement
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Type selection */}
                <div className="bg-white rounded-2xl border border-border shadow-lg p-6">
                  <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-amber-500" />
                    Type de signalement
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {TYPES.map((t) => {
                      const Icon = t.icon;
                      return (
                        <button
                          key={t.value}
                          type="button"
                          onClick={() => setType(t.value)}
                          className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${
                            type === t.value
                              ? `${t.color} border-current shadow-sm`
                              : "border-border hover:border-gray-300"
                          }`}
                        >
                          <Icon className="w-5 h-5 flex-shrink-0" />
                          <span className="text-sm font-medium">{t.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Description */}
                <div className="bg-white rounded-2xl border border-border shadow-lg p-6">
                  <h2 className="text-lg font-semibold text-foreground mb-4">
                    Description détaillée
                  </h2>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Décrivez le problème en détail... Qu'avez-vous constaté ? Quand ? Où exactement ?"
                    rows={5}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm resize-none"
                  />

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      <MapPin className="w-4 h-4 inline mr-1" />
                      Localisation (optionnel)
                    </label>
                    <input
                      type="text"
                      value={localisation}
                      onChange={(e) => setLocalisation(e.target.value)}
                      placeholder="Ex: Avenue Lumumba, Commune de Gombe"
                      className="w-full px-4 py-2.5 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
                    />
                  </div>
                </div>

                {/* Transfer destination */}
                <div className="bg-white rounded-2xl border border-border shadow-lg p-6">
                  <h2 className="text-lg font-semibold text-foreground mb-2">
                    Transférer à (optionnel)
                  </h2>
                  <p className="text-sm text-muted-foreground mb-4">
                    Indiquez à quelle autorité ce signalement devrait être
                    transmis.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {DESTINATIONS.map((d) => (
                      <button
                        key={d.value}
                        type="button"
                        onClick={() =>
                          setDestination(destination === d.value ? "" : d.value)
                        }
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          destination === d.value
                            ? "bg-primary text-white"
                            : "bg-gray-100 text-muted-foreground hover:bg-gray-200"
                        }`}
                      >
                        {d.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Contact */}
                <div className="bg-white rounded-2xl border border-border shadow-lg p-6">
                  <h2 className="text-lg font-semibold text-foreground mb-2">
                    Votre email (optionnel)
                  </h2>
                  <p className="text-sm text-muted-foreground mb-3">
                    Pour recevoir un suivi de votre signalement.
                  </p>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre@email.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!type || !description || createMutation.isPending}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg"
                >
                  {createMutation.isPending ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Envoyer le signalement
                    </>
                  )}
                </button>

                {createMutation.isError && (
                  <p className="text-sm text-red-600 text-center">
                    Erreur: {createMutation.error.message}
                  </p>
                )}
              </form>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
