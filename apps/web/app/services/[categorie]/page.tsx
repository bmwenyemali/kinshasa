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
  Phone,
  ChevronRight,
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
} from "lucide-react";

// Category metadata — rich descriptions, tips, key info
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
    usefulLinks?: { label: string; url: string }[];
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
      "La sécurité à Kinshasa est assurée par la Police Nationale Congolaise (PNC), les Forces Armées et les services de renseignement. Chaque commune dispose d'un ou plusieurs commissariats et sous-commissariats. La police de proximité œuvre pour la sécurité des quartiers.",
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
      "Les services d'urgence de Kinshasa comprennent les urgences hospitalières, les pompiers, la protection civile et les services de secours. En cas d'urgence médicale, les hôpitaux généraux de référence disposent de services d'urgence 24h/24.",
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
      "Kinshasa dispose d'un réseau de transport urbain comprenant les bus Transco, les taxis, les taxi-bus (Spirit) et les motos-taxis. Le permis de conduire et la carte grise sont délivrés par les services compétents.",
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
    description:
      "Cette catégorie regroupe les services administratifs divers qui ne rentrent pas dans les catégories principales. Consultez les lieux et services disponibles ci-dessous.",
    keyInfo: [],
    tips: [],
    ministreTutelle: "Divers ministères",
  },
};

export default function ServiceCategoryPage() {
  const params = useParams();
  const categorie = (params.categorie as string)?.toUpperCase();
  const [searchQuery, setSearchQuery] = useState("");

  const meta = CATEGORY_META[categorie];
  const Icon = meta?.icon || HelpCircle;

  const { data, isLoading } = trpc.services.getCategoryDetails.useQuery(
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

  const filteredServices = data?.allServices.filter(
    (s) =>
      !searchQuery ||
      s.nomService.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.lieuNom?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

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

            {/* Stats */}
            {data && (
              <div className="flex flex-wrap gap-4 mt-8">
                <div className="bg-white/15 backdrop-blur-sm rounded-xl px-4 py-2.5 border border-white/10">
                  <span className="text-2xl font-bold">{data.totalLieux}</span>
                  <span className="text-white/70 text-sm ml-2">lieux</span>
                </div>
                <div className="bg-white/15 backdrop-blur-sm rounded-xl px-4 py-2.5 border border-white/10">
                  <span className="text-2xl font-bold">
                    {data.totalServices}
                  </span>
                  <span className="text-white/70 text-sm ml-2">services</span>
                </div>
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

        <div className="max-w-6xl mx-auto px-4 py-10">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Description */}
                <div className="bg-white rounded-2xl border border-border p-6">
                  <h2 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-primary" />À propos
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {meta.description}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-2 text-sm bg-primary/5 text-primary px-3 py-1.5 rounded-lg">
                    <Landmark className="w-4 h-4" />
                    Tutelle: {meta.ministreTutelle}
                  </div>
                  {meta.legalBasis && (
                    <p className="text-xs text-muted-foreground mt-3 italic">
                      Base légale: {meta.legalBasis}
                    </p>
                  )}
                </div>

                {/* Key info */}
                {meta.keyInfo.length > 0 && (
                  <div className="bg-white rounded-2xl border border-border p-6">
                    <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                      <Activity className="w-5 h-5 text-amber-500" />
                      Indicateurs & informations clés
                    </h2>
                    <div className="space-y-3">
                      {meta.keyInfo.map((info, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-foreground">
                            {info}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Services list */}
                <div className="bg-white rounded-2xl border border-border p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                      <FileText className="w-5 h-5 text-primary" />
                      Services disponibles
                    </h2>
                    <span className="text-sm text-muted-foreground">
                      {data?.services.length || 0} types de services
                    </span>
                  </div>

                  {/* Search */}
                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Rechercher un service..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>

                  <div className="space-y-3">
                    {(searchQuery ? filteredServices : data?.allServices)
                      ?.slice(0, 30)
                      .map((s) => (
                        <div
                          key={s.id}
                          className="border border-border rounded-xl p-4 hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-semibold text-foreground text-sm">
                                {s.nomService}
                              </h4>
                              {s.lieuNom && (
                                <Link
                                  href={`/lieux/${s.lieuId}`}
                                  className="text-xs text-primary hover:underline flex items-center gap-1 mt-0.5"
                                >
                                  <MapPin className="w-3 h-3" /> {s.lieuNom}
                                  {s.commune && (
                                    <span className="text-muted-foreground">
                                      {" "}
                                      — {s.commune}
                                    </span>
                                  )}
                                </Link>
                              )}
                              {s.description && (
                                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                  {s.description}
                                </p>
                              )}
                            </div>
                            <div className="flex flex-col items-end gap-1 ml-4">
                              {s.prixOfficiel !== null && (
                                <span className="text-sm font-bold text-emerald-600">
                                  {s.prixOfficiel.toLocaleString()} {s.devise}
                                </span>
                              )}
                              {s.delai && (
                                <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                                  <Clock className="w-3 h-3" /> {s.delai}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Documents */}
                          {s.documentsRequis &&
                            s.documentsRequis.length > 0 && (
                              <div className="mt-2 flex flex-wrap gap-1">
                                {s.documentsRequis.map(
                                  (doc: string, i: number) => (
                                    <span
                                      key={i}
                                      className="text-[10px] px-2 py-0.5 bg-gray-100 text-muted-foreground rounded-md"
                                    >
                                      📄 {doc}
                                    </span>
                                  ),
                                )}
                              </div>
                            )}

                          {/* Procedure */}
                          {s.procedure && (
                            <details className="mt-2">
                              <summary className="text-xs text-primary cursor-pointer hover:underline">
                                Voir la procédure
                              </summary>
                              <p className="text-xs text-muted-foreground mt-1 whitespace-pre-line bg-gray-50 rounded-lg p-3">
                                {s.procedure}
                              </p>
                            </details>
                          )}
                        </div>
                      ))}
                    {(!data?.allServices || data.allServices.length === 0) && (
                      <p className="text-sm text-muted-foreground text-center py-8">
                        Aucun service enregistré pour cette catégorie. Les
                        données seront ajoutées prochainement.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Conseils */}
                {meta.tips.length > 0 && (
                  <div className="bg-amber-50 rounded-2xl border border-amber-200 p-5">
                    <h3 className="font-bold text-amber-800 mb-3 flex items-center gap-2 text-sm">
                      <AlertTriangle className="w-4 h-4" />
                      Conseils pratiques
                    </h3>
                    <ul className="space-y-2.5">
                      {meta.tips.map((tip, i) => (
                        <li
                          key={i}
                          className="text-xs text-amber-900 flex items-start gap-2"
                        >
                          <span className="text-amber-500 mt-0.5">💡</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Lieux */}
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

                {/* Quick service names */}
                {data && data.services.length > 0 && (
                  <div className="bg-white rounded-2xl border border-border p-5">
                    <h3 className="font-bold text-foreground mb-3 text-sm">
                      Services les plus offerts
                    </h3>
                    <div className="space-y-2">
                      {data.services.slice(0, 10).map((s, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between"
                        >
                          <span className="text-xs text-foreground">
                            {s.name}
                          </span>
                          <div className="flex items-center gap-2">
                            {s.avgPrice && (
                              <span className="text-[10px] text-emerald-600 font-medium">
                                ~{Math.round(s.avgPrice).toLocaleString()} FC
                              </span>
                            )}
                            <span className="text-[10px] bg-gray-100 text-muted-foreground px-1.5 py-0.5 rounded">
                              {s.count}x
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
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
                      Prix incorrect, corruption, information erronée ?
                      Signalez-le.
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
