"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  Phone,
  Mail,
  Globe,
  Clock,
  Star,
  Heart,
  Share2,
  Navigation,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  BadgeCheck,
  FileText,
  DollarSign,
  Timer,
  CheckCircle,
} from "lucide-react";
import { Header, Footer } from "@/components/layout/Header";
import { trpc, type LieuService, type LieuAvis } from "@/lib/trpc";
import { Spinner, Badge, Button } from "@kinservices/ui";
import {
  LIEU_TYPE_LABELS,
  SERVICE_CATEGORIE_LABELS,
  SERVICE_CATEGORIE_ICONS,
  formatPrice,
} from "@kinservices/ui";

export default function LieuDetailPage() {
  const params = useParams();
  const router = useRouter();
  const lieuId = params.id as string;
  const [expandedServices, setExpandedServices] = useState<string[]>([]);
  const [isFavorited, setIsFavorited] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  const { data: lieu, isLoading } = trpc.lieux.getById.useQuery({ id: lieuId });

  const toggleService = (id: string) => {
    setExpandedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: lieu?.nom,
        text: `Découvrez ${lieu?.nom} sur Kin Services`,
        url: window.location.href,
      });
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert("Lien copié!");
    }
  };

  const handleGetDirections = () => {
    if (lieu?.latitude && lieu?.longitude) {
      window.open(
        `https://www.google.com/maps/dir/?api=1&destination=${lieu.latitude},${lieu.longitude}`,
        "_blank",
      );
    }
  };

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

  if (!lieu) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Lieu non trouvé
            </h2>
            <p className="text-muted-foreground mb-4">
              Le lieu demandé n'existe pas.
            </p>
            <button
              onClick={() => router.push("/")}
              className="text-primary font-medium hover:underline"
            >
              ← Retour à l'accueil
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Group services by category
  const servicesByCategory: Record<string, typeof lieu.servicesProposed> = {};
  lieu.servicesProposed.forEach((service: LieuService) => {
    if (!servicesByCategory[service.categorie]) {
      servicesByCategory[service.categorie] = [];
    }
    servicesByCategory[service.categorie].push(service);
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Header */}
        <section className="bg-gradient-to-br from-slate-50 to-white border-b border-border py-8 px-4">
          <div className="container mx-auto">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-muted-foreground hover:text-primary mb-5 transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour
            </button>

            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <h1 className="text-2xl md:text-3xl font-extrabold text-foreground">
                    {lieu.nom}
                  </h1>
                  {lieu.verified && (
                    <Badge variant="verified">
                      <BadgeCheck className="w-3 h-3" />
                      Vérifié
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-4 text-muted-foreground flex-wrap">
                  <span className="flex items-center gap-1">
                    <Badge variant="primary">
                      {LIEU_TYPE_LABELS[lieu.type] || lieu.type}
                    </Badge>
                  </span>
                  {lieu.commune && (
                    <Link
                      href={`/communes/${lieu.commune.id}`}
                      className="flex items-center gap-1 hover:text-primary transition-colors"
                    >
                      <MapPin className="w-4 h-4" />
                      {lieu.commune.name}
                    </Link>
                  )}
                  {lieu.averageRating && (
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium text-foreground">
                        {lieu.averageRating.toFixed(1)}
                      </span>
                      <span className="text-muted-foreground">
                        ({lieu._count.avis} avis)
                      </span>
                    </span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-wrap">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsFavorited(!isFavorited)}
                >
                  <Heart
                    className={`w-4 h-4 ${
                      isFavorited ? "fill-red-500 text-red-500" : ""
                    }`}
                  />
                  {isFavorited ? "Favori" : "Ajouter"}
                </Button>
                <Button variant="outline" size="sm" onClick={handleShare}>
                  <Share2 className="w-4 h-4" />
                  Partager
                </Button>
                {lieu.latitude && lieu.longitude && (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleGetDirections}
                  >
                    <Navigation className="w-4 h-4" />
                    Itinéraire
                  </Button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Main content grid */}
        <section className="py-6 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Address & Contact */}
                <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
                  <h2 className="text-lg font-semibold text-foreground mb-4">
                    Informations de contact
                  </h2>
                  <div className="space-y-3">
                    {lieu.adresse && (
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-foreground">{lieu.adresse}</p>
                          {lieu.reperes && (
                            <p className="text-sm text-muted-foreground">
                              Repères: {lieu.reperes}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                    {lieu.telephone && (
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                        <a
                          href={`tel:${lieu.telephone}`}
                          className="text-primary hover:underline"
                        >
                          {lieu.telephone}
                        </a>
                        {lieu.telephone2 && (
                          <>
                            <span className="text-muted-foreground">/</span>
                            <a
                              href={`tel:${lieu.telephone2}`}
                              className="text-primary hover:underline"
                            >
                              {lieu.telephone2}
                            </a>
                          </>
                        )}
                      </div>
                    )}
                    {lieu.email && (
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                        <a
                          href={`mailto:${lieu.email}`}
                          className="text-primary hover:underline"
                        >
                          {lieu.email}
                        </a>
                      </div>
                    )}
                    {lieu.siteWeb && (
                      <div className="flex items-center gap-3">
                        <Globe className="w-5 h-5 text-primary flex-shrink-0" />
                        <a
                          href={lieu.siteWeb}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          {lieu.siteWeb}
                        </a>
                      </div>
                    )}
                    {lieu.horaires && (
                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <div className="text-sm">
                          {Object.entries(
                            lieu.horaires as Record<string, string>,
                          ).map(([jour, horaire]) => (
                            <p
                              key={jour}
                              className="flex justify-between gap-4"
                            >
                              <span className="capitalize text-muted-foreground">
                                {jour}:
                              </span>
                              <span className="font-medium">{horaire}</span>
                            </p>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Services */}
                <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
                  <h2 className="text-lg font-semibold text-foreground mb-4">
                    Services disponibles ({lieu.servicesProposed.length})
                  </h2>

                  <div className="space-y-4">
                    {Object.entries(servicesByCategory).map(
                      ([categorie, services]) => (
                        <div key={categorie}>
                          <h3 className="flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                            <span>
                              {SERVICE_CATEGORIE_ICONS[categorie] || "📋"}
                            </span>
                            {SERVICE_CATEGORIE_LABELS[categorie] || categorie}
                          </h3>
                          <div className="space-y-2">
                            {services.map((service: LieuService) => {
                              const isExpanded = expandedServices.includes(
                                service.id,
                              );
                              return (
                                <div
                                  key={service.id}
                                  className="border border-border rounded-lg overflow-hidden"
                                >
                                  <button
                                    onClick={() => toggleService(service.id)}
                                    className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors text-left"
                                  >
                                    <div className="flex-1">
                                      <p className="font-medium text-foreground">
                                        {service.nomService}
                                      </p>
                                      <div className="flex items-center gap-4 mt-1 text-sm">
                                        <span className="flex items-center gap-1 text-success font-medium">
                                          <DollarSign className="w-3.5 h-3.5" />
                                          {formatPrice(
                                            service.prixOfficiel
                                              ? Number(service.prixOfficiel)
                                              : null,
                                            service.devise,
                                          )}
                                        </span>
                                        {service.delai && (
                                          <span className="flex items-center gap-1 text-muted-foreground">
                                            <Timer className="w-3.5 h-3.5" />
                                            {service.delai}
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                    {isExpanded ? (
                                      <ChevronUp className="w-5 h-5 text-muted-foreground" />
                                    ) : (
                                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                                    )}
                                  </button>

                                  {isExpanded && (
                                    <div className="px-4 pb-4 pt-2 border-t border-border bg-muted/30 space-y-3 animate-fade-in">
                                      {service.description && (
                                        <p className="text-sm text-muted-foreground">
                                          {service.description}
                                        </p>
                                      )}

                                      {service.documentsRequis &&
                                        service.documentsRequis.length > 0 && (
                                          <div>
                                            <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                                              <FileText className="w-4 h-4 text-primary" />
                                              Documents requis
                                            </h4>
                                            <ul className="text-sm text-muted-foreground space-y-1 ml-6">
                                              {service.documentsRequis.map(
                                                (doc: string, i: number) => (
                                                  <li
                                                    key={i}
                                                    className="flex items-start gap-2"
                                                  >
                                                    <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                                                    {doc}
                                                  </li>
                                                ),
                                              )}
                                            </ul>
                                          </div>
                                        )}

                                      {service.procedure && (
                                        <div>
                                          <h4 className="text-sm font-medium text-foreground mb-2">
                                            Procédure
                                          </h4>
                                          <p className="text-sm text-muted-foreground whitespace-pre-line">
                                            {service.procedure.replace(
                                              /\\n/g,
                                              "\n",
                                            )}
                                          </p>
                                        </div>
                                      )}

                                      {service.conditionsParticulieres && (
                                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                                          <p className="text-sm text-yellow-800">
                                            <strong>Note:</strong>{" "}
                                            {service.conditionsParticulieres.replace(
                                              /\\n/g,
                                              "\n",
                                            )}
                                          </p>
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                {/* Reviews */}
                <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-foreground">
                      Avis ({lieu._count.avis})
                    </h2>
                    <Button variant="outline" size="sm">
                      Donner un avis
                    </Button>
                  </div>

                  {lieu.avis && lieu.avis.length > 0 ? (
                    <div className="space-y-4">
                      {lieu.avis.map((avis: LieuAvis) => (
                        <div
                          key={avis.id}
                          className="border-b border-border pb-4 last:border-0 last:pb-0"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex items-center gap-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`w-4 h-4 ${
                                    star <= avis.note
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm font-medium text-foreground">
                              {avis.userName || "Utilisateur anonyme"}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {new Date(avis.createdAt).toLocaleDateString(
                                "fr-FR",
                              )}
                            </span>
                          </div>
                          {avis.commentaire && (
                            <p className="text-sm text-muted-foreground">
                              {avis.commentaire}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-sm">
                      Aucun avis pour le moment. Soyez le premier à donner votre
                      avis!
                    </p>
                  )}
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Map placeholder */}
                {lieu.latitude && lieu.longitude && (
                  <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm">
                    <div className="h-48 bg-muted flex items-center justify-center">
                      <div className="text-center text-muted-foreground">
                        <MapPin className="w-8 h-8 mx-auto mb-2 text-primary" />
                        <p className="text-sm">Carte</p>
                      </div>
                    </div>
                    <div className="p-4">
                      <Button
                        variant="primary"
                        className="w-full"
                        onClick={handleGetDirections}
                      >
                        <Navigation className="w-4 h-4" />
                        Obtenir l'itinéraire
                      </Button>
                    </div>
                  </div>
                )}

                {/* Zone de Santé */}
                {lieu.zoneSante && (
                  <div className="bg-white rounded-2xl border border-border p-4 shadow-sm">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                      Zone de Santé
                    </h3>
                    <Link
                      href={`/zones-sante/${lieu.zoneSante.id}`}
                      className="flex items-center gap-3 p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                    >
                      <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center text-white">
                        🏥
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          {lieu.zoneSante.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Voir les centres de santé
                        </p>
                      </div>
                    </Link>
                  </div>
                )}

                {/* Report */}
                <div className="bg-white rounded-2xl border border-border p-4 shadow-sm">
                  <button
                    onClick={() => setShowReportModal(true)}
                    className="flex items-center gap-2 text-muted-foreground hover:text-red-500 transition-colors text-sm"
                  >
                    <AlertTriangle className="w-4 h-4" />
                    Signaler une information erronée
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
