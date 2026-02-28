"use client";

import React, { useState, useEffect, useRef } from "react";
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
  X,
  Send,
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

// MapBox Map component
function LieuMap({
  latitude,
  longitude,
  nom,
}: {
  latitude: number;
  longitude: number;
  nom: string;
}) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    const initMap = async () => {
      const mapboxgl = (await import("mapbox-gl")).default;

      // Load mapbox CSS via link tag
      if (!document.getElementById("mapbox-css")) {
        const link = document.createElement("link");
        link.id = "mapbox-css";
        link.rel = "stylesheet";
        link.href = "https://api.mapbox.com/mapbox-gl-js/v3.0.1/mapbox-gl.css";
        document.head.appendChild(link);
      }

      mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

      const map = new mapboxgl.Map({
        container: mapContainer.current!,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [longitude, latitude],
        zoom: 15,
        attributionControl: false,
      });

      map.addControl(new mapboxgl.NavigationControl(), "top-right");

      new mapboxgl.Marker({ color: "#0066cc" })
        .setLngLat([longitude, latitude])
        .setPopup(new mapboxgl.Popup().setHTML(`<strong>${nom}</strong>`))
        .addTo(map);

      mapRef.current = map;
    };

    initMap();

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [latitude, longitude, nom]);

  return <div ref={mapContainer} className="w-full h-full" />;
}

// Signaler Modal component
function SignalerModal({
  lieuId,
  lieuNom,
  onClose,
}: {
  lieuId: string;
  lieuNom: string;
  onClose: () => void;
}) {
  const [type, setType] = useState("INFO_ERRONNEE");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const createSignalement = trpc.signalements.create.useMutation({
    onSuccess: () => setSuccess(true),
    onError: (e) => alert("Erreur: " + e.message),
  });

  const TYPES = [
    { value: "INFO_ERRONNEE", label: "Information erronée" },
    { value: "CORRUPTION", label: "Corruption signalée" },
    { value: "FERME", label: "Lieu fermé" },
    { value: "PRIX_INCORRECT", label: "Prix incorrect" },
    { value: "AUTRE", label: "Autre" },
  ];

  if (success) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-2xl p-8 max-w-md w-full text-center"
          onClick={(e) => e.stopPropagation()}
        >
          <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-foreground mb-2">
            Merci pour votre signalement
          </h3>
          <p className="text-muted-foreground text-sm mb-6">
            Votre signalement concernant &quot;{lieuNom}&quot; a été enregistré.
            Notre équipe le traitera dans les plus brefs délais.
          </p>
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary/90"
          >
            Fermer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            Signaler un problème
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <p className="text-sm text-muted-foreground mb-4">
          Signaler un problème avec <strong>{lieuNom}</strong>
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Type de signalement *
            </label>
            <div className="grid grid-cols-1 gap-2">
              {TYPES.map((t) => (
                <button
                  key={t.value}
                  onClick={() => setType(t.value)}
                  className={`text-left px-4 py-2.5 rounded-xl border text-sm transition-all ${
                    type === t.value
                      ? "border-primary bg-primary/5 text-primary font-medium"
                      : "border-border text-muted-foreground hover:border-primary/30"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Description *
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Décrivez le problème en détail..."
              className="w-full px-4 py-3 rounded-xl border border-border text-sm h-28 resize-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Votre email (optionnel)
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="exemple@email.com"
              className="w-full px-4 py-2.5 rounded-xl border border-border text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Pour être informé du traitement de votre signalement
            </p>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-xl border border-border text-sm font-medium text-muted-foreground hover:bg-gray-50"
          >
            Annuler
          </button>
          <button
            onClick={() => {
              if (!description.trim())
                return alert("Veuillez décrire le problème");
              createSignalement.mutate({
                lieuId,
                type: type as any,
                description,
                email: email || undefined,
              });
            }}
            disabled={createSignalement.isPending || !description.trim()}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            {createSignalement.isPending ? "Envoi..." : "Envoyer"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function LieuDetailPage() {
  const params = useParams();
  const router = useRouter();
  const lieuId = params.id as string;
  const [expandedServices, setExpandedServices] = useState<string[]>([]);
  const [isFavorited, setIsFavorited] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  const { data: lieu, isLoading } = trpc.lieux.getById.useQuery({ id: lieuId });

  // Get unique service categories for this lieu to fetch relevant documents
  const serviceCategories = lieu?.servicesProposed
    ? [...new Set(lieu.servicesProposed.map((s: LieuService) => s.categorie))]
    : [];
  const { data: relatedDocuments } = trpc.documents.getByCategories.useQuery(
    { categories: serviceCategories as any[], limit: 20 },
    { enabled: serviceCategories.length > 0 },
  );

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

        {/* Map + Contact row */}
        <section className="py-6 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Map — large, left */}
              {lieu.latitude && lieu.longitude && (
                <div className="lg:col-span-2 bg-white rounded-2xl border border-border overflow-hidden shadow-sm">
                  <div className="h-[400px]">
                    <LieuMap
                      latitude={Number(lieu.latitude)}
                      longitude={Number(lieu.longitude)}
                      nom={lieu.nom}
                    />
                  </div>
                  <div className="p-4">
                    <Button
                      variant="primary"
                      className="w-full"
                      onClick={handleGetDirections}
                    >
                      <Navigation className="w-4 h-4" />
                      Obtenir l&apos;itinéraire
                    </Button>
                  </div>
                </div>
              )}

              {/* Contact info — right sidebar */}
              <div className="space-y-6">
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

        {/* Services + Documents + Avis */}
        <section className="pb-8 px-4">
          <div className="container mx-auto space-y-6">
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

            {/* Documents disponibles */}
            {relatedDocuments && relatedDocuments.length > 0 && (
              <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  Documents disponibles dans ce type de lieu (
                  {relatedDocuments.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {relatedDocuments.map((doc) => (
                    <Link
                      key={doc.id}
                      href={`/documents/${doc.slug}`}
                      className="flex items-start gap-3 p-4 border border-border rounded-xl hover:bg-primary/5 hover:border-primary/30 transition-all group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm text-foreground group-hover:text-primary transition-colors line-clamp-1">
                          {doc.nom}
                        </h4>
                        {doc.description && (
                          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                            {doc.description}
                          </p>
                        )}
                        <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
                          {doc.prixEstimatif && (
                            <span className="font-medium text-emerald-600">
                              {formatPrice(
                                Number(doc.prixEstimatif),
                                doc.devise,
                              )}
                            </span>
                          )}
                          {doc.delaiEstimatif && (
                            <span className="flex items-center gap-1">
                              <Timer className="w-3 h-3" />
                              {doc.delaiEstimatif}
                            </span>
                          )}
                          <span className="px-1.5 py-0.5 bg-gray-100 rounded text-[10px]">
                            {SERVICE_CATEGORIE_LABELS[doc.categorie] ||
                              doc.categorie}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

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
                          {new Date(avis.createdAt).toLocaleDateString("fr-FR")}
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
        </section>
      </main>

      {/* Signaler Modal */}
      {showReportModal && (
        <SignalerModal
          lieuId={lieuId}
          lieuNom={lieu.nom}
          onClose={() => setShowReportModal(false)}
        />
      )}

      <Footer />
    </div>
  );
}
