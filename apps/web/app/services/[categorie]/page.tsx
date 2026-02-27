"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Header, Footer } from "@/components/layout/Header";
import { trpc } from "@/lib/trpc";
import {
  FileText,
  Stethoscope,
  Building2,
  GraduationCap,
  ShoppingBag,
  HelpCircle,
  Heart,
  Bus,
  Shield,
  MapPin,
  Clock,
  DollarSign,
  CheckCircle,
  AlertTriangle,
  BookOpen,
  Users,
  Activity,
  Landmark,
  ArrowLeft,
  ExternalLink,
  Search,
  Lightbulb,
  ScrollText,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Info,
  MessageCircle,
  ListChecks,
  ClipboardList,
} from "lucide-react";

type ServiceTab = "services" | "documents" | "plus";

// ─── CATEGORY METADATA ─────────────────────────────────────────────────────
const CATEGORY_META: Record<
  string,
  {
    title: string;
    subtitle: string;
    icon: any;
    gradient: string;
    description: string;
    keyInfo: string[];
    tips: string[];
    ministreTutelle: string;
    legalBasis?: string;
  }
> = {
  SANTE: {
    title: "Santé",
    subtitle: "Services de santé à Kinshasa",
    icon: Stethoscope,
    gradient: "from-red-500 to-rose-600",
    description:
      "La ville-province de Kinshasa dispose d'un réseau de structures sanitaires couvrant ses 24 communes, comprenant des hôpitaux généraux de référence, des centres de santé, des cliniques privées et des centres de santé communautaires. La Division Provinciale de la Santé (DPS) coordonne les 35 zones de santé que compte la ville.",
    keyInfo: [
      "35 zones de santé couvrent la ville-province",
      "Plus de 500 structures sanitaires enregistrées",
      "Vaccination gratuite pour les enfants de 0 à 5 ans",
      "Le paludisme reste la première cause de consultation",
      "Les urgences sont accessibles 24h/24 dans les hôpitaux généraux",
    ],
    tips: [
      "Munissez-vous toujours de votre carte d'identité ou de votre bon de consultation",
      "Les centres de santé communautaires offrent des soins de base à moindre coût",
      "Vérifiez les prix officiels affichés avant tout paiement",
      "Les vaccinations du Programme Élargi de Vaccination (PEV) sont gratuites",
      "En cas d'urgence, composez le 112 ou dirigez-vous vers l'hôpital le plus proche",
    ],
    ministreTutelle: "Ministère Provincial de la Santé",
    legalBasis:
      "Loi n° 18/035 du 13 décembre 2018 fixant les principes fondamentaux relatifs à l'organisation de la Santé publique",
  },
  ETAT_CIVIL: {
    title: "État Civil",
    subtitle: "Services d'état civil à Kinshasa",
    icon: FileText,
    gradient: "from-blue-500 to-blue-600",
    description:
      "L'état civil à Kinshasa est géré par les bureaux communaux. Chaque commune dispose d'un bureau d'état civil chargé d'enregistrer les actes de naissance, de mariage, de décès et de délivrer les copies conformes de ces actes. L'enregistrement des naissances dans les 90 jours est obligatoire et gratuit.",
    keyInfo: [
      "L'enregistrement des naissances est obligatoire dans les 90 jours",
      "24 bureaux d'état civil (un par commune)",
      "Le jugement supplétif est requis après le délai de 90 jours",
      "Le mariage civil a lieu devant l'officier d'état civil de la commune",
      "Les copies d'actes sont délivrées à l'hôtel de ville ou en commune",
    ],
    tips: [
      "Enregistrez les naissances rapidement pour éviter les frais de jugement supplétif",
      "Apportez 2 témoins majeurs pour la déclaration de naissance",
      "Conservez toujours les originaux de vos actes d'état civil en lieu sûr",
      "Les actes d'état civil sont des documents à valeur juridique permanente",
      "Vérifiez l'orthographe de tous les noms avant de signer",
    ],
    ministreTutelle: "Ministère Provincial de l'Intérieur",
    legalBasis: "Loi n° 87-010 du 1er août 1987 portant Code de la Famille",
  },
  JUSTICE: {
    title: "Justice",
    subtitle: "Services judiciaires à Kinshasa",
    icon: Building2,
    gradient: "from-purple-500 to-violet-600",
    description:
      "Kinshasa abrite les principales institutions judiciaires du pays. Les tribunaux de paix, les tribunaux de grande instance et la Cour d'appel traitent les affaires civiles, pénales et commerciales. Le casier judiciaire est délivré par le Parquet Général.",
    keyInfo: [
      "Plusieurs tribunaux de paix dans chaque district judiciaire",
      "Le casier judiciaire est requis pour de nombreuses démarches",
      "Les services d'aide juridique gratuite existent pour les démunis",
      "Les audiences sont généralement publiques",
      "Le délai de délivrance du casier judiciaire est de 3 à 7 jours",
    ],
    tips: [
      "Préparez tous vos documents avant de vous rendre au tribunal",
      "Consultez un avocat avant d'engager une procédure",
      "Le casier judiciaire a une validité de 6 mois",
      "Les audiences commencent généralement à 9h00",
    ],
    ministreTutelle: "Ministère Provincial de la Justice",
  },
  EDUCATION: {
    title: "Éducation",
    subtitle: "Services éducatifs à Kinshasa",
    icon: GraduationCap,
    gradient: "from-emerald-500 to-green-600",
    description:
      "Kinshasa est le principal pôle éducatif de la RDC avec des milliers d'écoles primaires, secondaires et de nombreuses universités et instituts supérieurs. La Division Provinciale de l'Enseignement gère l'administration scolaire et les inscriptions.",
    keyInfo: [
      "Plus de 15 000 écoles dans la ville-province",
      "L'enseignement primaire est gratuit dans les écoles publiques",
      "Principales universités: UNIKIN, UCC, UPN, ISTA",
      "Les inscriptions scolaires se font entre août et septembre",
      "L'EXETAT (examen d'État) est le diplôme de fin d'études secondaires",
    ],
    tips: [
      "Inscrivez les enfants tôt pour garantir une place",
      "Vérifiez que l'école est agréée par le ministère",
      "Conservez les bulletins et diplômes en lieu sûr",
      "Les équivalences de diplômes étrangers sont délivrées par le ministère",
    ],
    ministreTutelle: "Ministère Provincial de l'Éducation",
  },
  IMPOTS: {
    title: "Impôts & Taxes",
    subtitle: "Services fiscaux à Kinshasa",
    icon: ShoppingBag,
    gradient: "from-amber-500 to-orange-600",
    description:
      "La Direction Provinciale des Recettes de Kinshasa (DPRK) gère la collecte des impôts et taxes provinciaux. Les contribuables doivent s'acquitter de leurs obligations fiscales dans les délais pour éviter les pénalités.",
    keyInfo: [
      "La patente est obligatoire pour toute activité commerciale",
      "L'impôt foncier est dû par tout propriétaire immobilier",
      "Les déclarations fiscales se font trimestriellement ou annuellement",
      "La DGRK est l'organe de collecte de la ville",
      "Les quittances officielles sont les seuls justificatifs de paiement valables",
    ],
    tips: [
      "Payez vos impôts dans les délais pour éviter les majorations",
      "Exigez toujours une quittance officielle",
      "Les petites entreprises bénéficient de taux réduits",
      "Conservez vos quittances pendant au moins 5 ans",
    ],
    ministreTutelle: "Ministère Provincial des Finances",
  },
  SECURITE: {
    title: "Sécurité",
    subtitle: "Services de sécurité à Kinshasa",
    icon: Shield,
    gradient: "from-indigo-500 to-indigo-600",
    description:
      "La sécurité à Kinshasa est assurée par la Police Nationale Congolaise (PNC), les Forces Armées et les services de renseignement. Chaque commune dispose d'un ou plusieurs commissariats et sous-commissariats.",
    keyInfo: [
      "27 commissariats et sous-commissariats dans la ville",
      "Le numéro d'urgence est le 112",
      "La police de proximité est déployée dans chaque quartier",
      "Les plaintes peuvent être déposées dans tout commissariat",
      "La carte d'identité ou du passeport est obligatoire à tout moment",
    ],
    tips: [
      "En cas d'urgence, appelez le 112",
      "Déposez plainte dans les 48h suivant un incident",
      "Demandez toujours le procès-verbal de votre plainte",
      "Notez le numéro de badge de l'agent en cas de contrôle",
    ],
    ministreTutelle: "Ministère Provincial de l'Intérieur et Sécurité",
  },
  URGENCE: {
    title: "Urgences",
    subtitle: "Services d'urgence à Kinshasa",
    icon: HelpCircle,
    gradient: "from-rose-500 to-red-600",
    description:
      "Les services d'urgence de Kinshasa comprennent les urgences hospitalières, les pompiers, la protection civile et les services de secours.",
    keyInfo: [
      "Numéro d'urgence général: 112",
      "Les urgences hospitalières fonctionnent 24h/24",
      "Les pompiers interviennent pour les incendies et catastrophes",
      "La Croix-Rouge est active dans la ville",
    ],
    tips: [
      "Gardez les numéros d'urgence dans votre téléphone",
      "En cas d'accident de la route, ne déplacez pas les blessés",
      "Connaissez l'hôpital le plus proche de chez vous",
    ],
    ministreTutelle: "Ministère Provincial de l'Intérieur",
  },
  SOCIAL: {
    title: "Affaires Sociales",
    subtitle: "Services sociaux à Kinshasa",
    icon: Heart,
    gradient: "from-pink-500 to-fuchsia-600",
    description:
      "Les services sociaux de Kinshasa accompagnent les personnes vulnérables: enfants, personnes âgées, personnes handicapées. La Division des Affaires Sociales coordonne les programmes d'assistance et de réinsertion sociale.",
    keyInfo: [
      "Programmes d'aide aux orphelins et enfants vulnérables",
      "Services de réinsertion sociale pour les jeunes de la rue",
      "Accompagnement des personnes vivant avec handicap",
      "Centres d'hébergement pour les personnes sans abri",
    ],
    tips: [
      "Les services sociaux communaux peuvent vous orienter",
      "Des ONG partenaires offrent une assistance complémentaire",
    ],
    ministreTutelle: "Ministère Provincial des Affaires Sociales",
  },
  TRANSPORT: {
    title: "Transport",
    subtitle: "Services de transport à Kinshasa",
    icon: Bus,
    gradient: "from-orange-500 to-amber-600",
    description:
      "Kinshasa dispose d'un réseau de transport urbain comprenant les bus Transco, les taxis, les taxi-bus (Spirit) et les motos-taxis.",
    keyInfo: [
      "Transco opère les principales lignes de bus urbaines",
      "Le permis de conduire est délivré par la Commission Nationale",
      "La carte grise est obligatoire pour tout véhicule",
      "Les taxi-bus (Spirit) couvrent la plupart des trajets urbains",
    ],
    tips: [
      "Vérifiez le tarif avant de monter dans un taxi",
      "Le permis de conduire catégorie B suffit pour les véhicules légers",
      "Le contrôle technique est obligatoire annuellement",
    ],
    ministreTutelle: "Ministère Provincial des Transports",
  },
  AUTRE: {
    title: "Autres Services",
    subtitle: "Autres services administratifs",
    icon: HelpCircle,
    gradient: "from-gray-500 to-slate-600",
    description: "Cette catégorie regroupe les services administratifs divers.",
    keyInfo: [],
    tips: [],
    ministreTutelle: "Divers ministères",
  },
};

// ─── SERVICE CARD COMPONENT ────────────────────────────────────────────────
function ServiceCard({ service }: { service: any }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-5"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-bold text-foreground">
                {service.nomService}
              </h3>
              {service.prixOfficiel !== null &&
                Number(service.prixOfficiel) > 0 && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full">
                    <DollarSign className="w-3 h-3" />
                    {Number(service.prixOfficiel).toLocaleString()}{" "}
                    {service.devise || "FC"}
                  </span>
                )}
              {service.prixOfficiel !== null &&
                Number(service.prixOfficiel) === 0 && (
                  <span className="text-xs font-semibold bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full">
                    Gratuit
                  </span>
                )}
            </div>
            {service.description && (
              <p className="text-sm text-muted-foreground mt-1.5 line-clamp-2">
                {service.description}
              </p>
            )}
            <div className="flex items-center gap-3 mt-2 flex-wrap">
              {service.delai && (
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {service.delai}
                </span>
              )}
              {service.lieuNom && (
                <span className="text-xs text-primary flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> {service.lieuNom}
                  {service.commune && (
                    <span className="text-muted-foreground ml-0.5">
                      — {service.commune}
                    </span>
                  )}
                </span>
              )}
            </div>
          </div>
          <div className="flex-shrink-0 mt-1">
            {expanded ? (
              <ChevronUp className="w-5 h-5 text-muted-foreground" />
            ) : (
              <ChevronDown className="w-5 h-5 text-muted-foreground" />
            )}
          </div>
        </div>
      </button>

      {expanded && (
        <div className="border-t border-border bg-gray-50/50 p-5 space-y-4">
          {/* Required documents */}
          {service.documentsRequis && service.documentsRequis.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-2">
                <ClipboardList className="w-4 h-4 text-amber-500" />
                Documents requis
              </h4>
              <div className="flex flex-wrap gap-2">
                {service.documentsRequis.map((doc: string, i: number) => (
                  <span
                    key={i}
                    className="text-xs bg-white border border-border px-3 py-1.5 rounded-lg text-foreground"
                  >
                    {doc}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Procedure */}
          {service.procedure && (
            <div>
              <h4 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-2">
                <ListChecks className="w-4 h-4 text-primary" />
                Procédure détaillée
              </h4>
              <div className="bg-white rounded-xl border border-border p-4">
                <div className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
                  {service.procedure}
                </div>
              </div>
            </div>
          )}

          {/* Conditions */}
          {service.conditionsParticulieres && (
            <div>
              <h4 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                Conditions particulières
              </h4>
              <p className="text-sm text-muted-foreground bg-amber-50 rounded-xl border border-amber-100 p-4">
                {service.conditionsParticulieres}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap gap-3 pt-2">
            {service.lieuId && (
              <Link
                href={`/lieux/${service.lieuId}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-primary bg-primary/5 hover:bg-primary/10 px-4 py-2 rounded-xl transition-colors"
              >
                <MapPin className="w-4 h-4" /> Voir le lieu
              </Link>
            )}
            <Link
              href={`/simulateur?service=${encodeURIComponent(service.nomService)}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-4 py-2 rounded-xl transition-colors"
            >
              <ListChecks className="w-4 h-4" /> Simuler ma démarche
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── FAQ ITEM COMPONENT ────────────────────────────────────────────────────
function FaqItem({ faq }: { faq: { question: string; reponse: string } }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="font-medium text-sm text-foreground pr-3">
          {faq.question}
        </span>
        {open ? (
          <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        )}
      </button>
      {open && (
        <div className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed border-t border-border pt-3 bg-gray-50/50">
          {faq.reponse}
        </div>
      )}
    </div>
  );
}

// ─── MAIN PAGE ─────────────────────────────────────────────────────────────
export default function ServiceCategoryPage() {
  const params = useParams();
  const categorie = (params.categorie as string)?.toUpperCase();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<ServiceTab>("services");

  const meta = CATEGORY_META[categorie];
  const Icon = meta?.icon || HelpCircle;

  const { data, isLoading } = trpc.services.getCategoryDetails.useQuery(
    { categorie: categorie as any },
    { enabled: !!categorie && !!meta },
  );

  const { data: documents } = trpc.documents.getAll.useQuery(
    { categorie: categorie as any },
    { enabled: !!categorie && !!meta },
  );

  const { data: faqs } = trpc.faq.getAll.useQuery(
    { categorie: categorie as any },
    { enabled: !!categorie && !!meta },
  );

  if (!meta) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Catégorie non trouvée</h1>
            <Link href="/services" className="text-primary hover:underline">
              ← Retour aux services
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const allServices = data?.allServices || [];
  const filteredServices = searchQuery
    ? allServices.filter(
        (s) =>
          s.nomService.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.lieuNom?.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : allServices;

  const filteredDocuments = searchQuery
    ? documents?.filter(
        (d) =>
          d.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
          d.description?.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : documents;

  const tabs: { id: ServiceTab; label: string; icon: any; count?: number }[] = [
    {
      id: "services",
      label: "Démarches",
      icon: ListChecks,
      count: allServices.length,
    },
    {
      id: "documents",
      label: "Documents",
      icon: ScrollText,
      count: documents?.length || 0,
    },
    { id: "plus", label: "Plus d'infos", icon: Info },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section
          className={`relative bg-gradient-to-br ${meta.gradient} text-white overflow-hidden`}
        >
          <div className="absolute inset-0 hero-pattern opacity-20" />
          <div className="relative max-w-6xl mx-auto px-4 py-14">
            <Link
              href="/services"
              className="inline-flex items-center gap-1 text-white/60 hover:text-white/90 text-sm mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Tous les services
            </Link>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                <Icon className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold">
                  {meta.title}
                </h1>
                <p className="text-white/80 mt-1">{meta.subtitle}</p>
              </div>
            </div>
            {data && (
              <div className="flex flex-wrap gap-3 mt-8">
                <div className="bg-white/15 backdrop-blur-sm rounded-xl px-4 py-2.5 border border-white/10">
                  <span className="text-2xl font-bold">
                    {allServices.length}
                  </span>
                  <span className="text-white/70 text-sm ml-2">démarches</span>
                </div>
                <div className="bg-white/15 backdrop-blur-sm rounded-xl px-4 py-2.5 border border-white/10">
                  <span className="text-2xl font-bold">{data.totalLieux}</span>
                  <span className="text-white/70 text-sm ml-2">lieux</span>
                </div>
                {documents && documents.length > 0 && (
                  <div className="bg-white/15 backdrop-blur-sm rounded-xl px-4 py-2.5 border border-white/10">
                    <span className="text-2xl font-bold">
                      {documents.length}
                    </span>
                    <span className="text-white/70 text-sm ml-2">
                      documents
                    </span>
                  </div>
                )}
                <div className="bg-white/15 backdrop-blur-sm rounded-xl px-4 py-2.5 border border-white/10">
                  <span className="text-2xl font-bold">
                    {data.totalCommunes}
                  </span>
                  <span className="text-white/70 text-sm ml-2">communes</span>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Tab navigation */}
        <div className="sticky top-16 z-20 bg-white/95 backdrop-blur-lg border-b border-border">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex gap-1 overflow-x-auto py-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setSearchQuery("");
                  }}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? "bg-primary text-white shadow-md"
                      : "text-muted-foreground hover:bg-gray-100"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                  {tab.count !== undefined && (
                    <span
                      className={`text-xs px-1.5 py-0.5 rounded-full ${activeTab === tab.id ? "bg-white/20" : "bg-gray-200"}`}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto px-4 py-10">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            </div>
          ) : (
            <>
              {/* ═══ TAB 1: DÉMARCHES (DEFAULT) ═══ */}
              {activeTab === "services" && (
                <div className="space-y-6">
                  <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Rechercher une démarche..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>

                  {filteredServices.length > 0 ? (
                    <div className="space-y-4">
                      {filteredServices.map((s) => (
                        <ServiceCard key={s.id} service={s} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-20">
                      <ListChecks className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-foreground">
                        {searchQuery
                          ? "Aucune démarche trouvée"
                          : "Aucune démarche enregistrée"}
                      </h3>
                      <p className="text-muted-foreground mt-1">
                        {searchQuery
                          ? "Essayez avec d'autres mots-clés."
                          : "Les démarches seront ajoutées prochainement."}
                      </p>
                    </div>
                  )}

                  {/* CTA: Simulateur */}
                  <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl border border-primary/20 p-6 flex flex-col sm:flex-row items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <ListChecks className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="font-bold text-foreground">
                        Simulateur de démarches
                      </h3>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        Sélectionnez ce que vous voulez faire et obtenez un
                        guide personnalisé étape par étape.
                      </p>
                    </div>
                    <Link
                      href="/simulateur"
                      className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors flex-shrink-0"
                    >
                      Lancer le simulateur <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              )}

              {/* ═══ TAB 2: DOCUMENTS ═══ */}
              {activeTab === "documents" && (
                <div className="space-y-6">
                  <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Rechercher un document..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>

                  {filteredDocuments && filteredDocuments.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filteredDocuments.map((doc) => (
                        <Link
                          key={doc.id}
                          href={`/documents/${doc.slug}`}
                          className="block"
                        >
                          <div className="bg-white rounded-2xl border border-border p-5 hover:shadow-lg transition-shadow h-full">
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <ScrollText className="w-5 h-5 text-primary" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-foreground text-sm">
                                  {doc.nom}
                                </h4>
                                {doc.description && (
                                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                    {doc.description}
                                  </p>
                                )}
                                <div className="flex flex-wrap gap-2 mt-3">
                                  {doc.prixEstimatif && (
                                    <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md flex items-center gap-1">
                                      <DollarSign className="w-3 h-3" />
                                      {String(doc.prixEstimatif)}{" "}
                                      {doc.devise || "FC"}
                                    </span>
                                  )}
                                  {doc.delaiEstimatif && (
                                    <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md flex items-center gap-1">
                                      <Clock className="w-3 h-3" />
                                      {String(doc.delaiEstimatif)}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" />
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-20">
                      <ScrollText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-foreground">
                        {searchQuery
                          ? "Aucun document trouvé"
                          : "Aucun document enregistré"}
                      </h3>
                      <p className="text-muted-foreground mt-1">
                        {searchQuery
                          ? "Essayez avec d'autres mots-clés."
                          : "Les documents seront ajoutés prochainement."}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* ═══ TAB 3: PLUS D'INFOS ═══ */}
              {activeTab === "plus" && (
                <div className="space-y-8">
                  {/* À propos */}
                  <div className="bg-white rounded-2xl border border-border p-6">
                    <h2 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-primary" />À propos
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                      {meta.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-3">
                      <span className="inline-flex items-center gap-2 text-sm bg-primary/5 text-primary px-3 py-1.5 rounded-lg">
                        <Landmark className="w-4 h-4" />
                        Tutelle: {meta.ministreTutelle}
                      </span>
                    </div>
                    {meta.legalBasis && (
                      <p className="text-xs text-muted-foreground mt-3 italic">
                        Base légale: {meta.legalBasis}
                      </p>
                    )}
                  </div>

                  {/* Indicateurs clés */}
                  {meta.keyInfo.length > 0 && (
                    <div className="bg-white rounded-2xl border border-border p-6">
                      <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                        <Activity className="w-5 h-5 text-amber-500" />
                        Indicateurs clés
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {meta.keyInfo.map((info, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl"
                          >
                            <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-foreground">
                              {info}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Conseils pratiques */}
                  {meta.tips.length > 0 && (
                    <div className="bg-amber-50 rounded-2xl border border-amber-200 p-6">
                      <h2 className="text-lg font-bold text-amber-800 mb-4 flex items-center gap-2">
                        <Lightbulb className="w-5 h-5" />
                        Conseils pratiques
                      </h2>
                      <div className="space-y-3">
                        {meta.tips.map((tip, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-3 p-3 bg-white/60 rounded-xl"
                          >
                            <Lightbulb className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-amber-900">
                              {tip}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* FAQ */}
                  {faqs && faqs.length > 0 && (
                    <div className="bg-white rounded-2xl border border-border p-6">
                      <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                        <MessageCircle className="w-5 h-5 text-primary" />
                        Questions fréquentes
                      </h2>
                      <div className="space-y-2">
                        {faqs.map((faq) => (
                          <FaqItem key={faq.id} faq={faq} />
                        ))}
                      </div>
                      <Link
                        href="/faq"
                        className="inline-flex items-center gap-1 mt-4 text-sm text-primary font-medium hover:underline"
                      >
                        Voir toutes les FAQ <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  )}

                  {/* Lieux + useful links */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white rounded-2xl border border-border p-5">
                      <h3 className="font-bold text-foreground mb-3 flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-primary" />
                        Lieux ({data?.lieux.length || 0})
                      </h3>
                      <div className="space-y-2 max-h-[400px] overflow-y-auto">
                        {data?.lieux.slice(0, 20).map((l) => (
                          <Link
                            key={l.id}
                            href={`/lieux/${l.id}`}
                            className="block"
                          >
                            <div className="flex items-center gap-2.5 p-2.5 rounded-lg hover:bg-gray-50 transition-colors">
                              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <MapPin className="w-4 h-4 text-primary" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-semibold text-foreground truncate">
                                  {l.nom}
                                </p>
                                {l.commune && (
                                  <p className="text-[10px] text-muted-foreground">
                                    {l.commune}
                                  </p>
                                )}
                              </div>
                              {l.verified && (
                                <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                              )}
                            </div>
                          </Link>
                        ))}
                        {(!data?.lieux || data.lieux.length === 0) && (
                          <p className="text-xs text-muted-foreground text-center py-4">
                            Aucun lieu enregistré
                          </p>
                        )}
                      </div>
                      {data && data.lieux.length > 0 && (
                        <Link
                          href={`/carte?categorie=${categorie}`}
                          className="flex items-center justify-center gap-1 mt-3 text-xs text-primary font-medium hover:underline"
                        >
                          Voir sur la carte <ExternalLink className="w-3 h-3" />
                        </Link>
                      )}
                    </div>

                    <div className="space-y-4">
                      <Link href="/signaler" className="block">
                        <div className="bg-red-50 rounded-2xl border border-red-200 p-5 hover:shadow-md transition-shadow">
                          <h3 className="font-bold text-red-800 mb-1 text-sm flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4" />
                            Signaler un problème
                          </h3>
                          <p className="text-xs text-red-700">
                            Prix incorrect, corruption, information erronée ?
                            Signalez-le.
                          </p>
                        </div>
                      </Link>
                      <Link href="/statistiques" className="block">
                        <div className="bg-blue-50 rounded-2xl border border-blue-200 p-5 hover:shadow-md transition-shadow">
                          <h3 className="font-bold text-blue-800 mb-1 text-sm flex items-center gap-2">
                            <Activity className="w-4 h-4" />
                            Statistiques de la ville
                          </h3>
                          <p className="text-xs text-blue-700">
                            Consultez les données et indicateurs publics de
                            Kinshasa.
                          </p>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
