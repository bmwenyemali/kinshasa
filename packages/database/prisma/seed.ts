import { PrismaClient, LieuType, ServiceCategorie } from "@prisma/client";

const prisma = new PrismaClient();

// ============================================================
// LES 24 COMMUNES DE KINSHASA — données réalistes
// ============================================================
const communes = [
  {
    name: "Bandalungwa",
    latitude: -4.3317,
    longitude: 15.2908,
    superficie: 6.82,
    population: 200000,
    bourgmestre: "Jean-Pierre Basosila",
    quartiers: [
      "Makelele",
      "Adoula",
      "Bisengo",
      "Livulu",
      "ONATRA",
      "Lingwala-PLZ",
    ],
  },
  {
    name: "Barumbu",
    latitude: -4.3194,
    longitude: 15.3069,
    superficie: 4.72,
    population: 110000,
    bourgmestre: "Dady Landu",
    quartiers: [
      "Lufungula I",
      "Lufungula II",
      "Ngiri",
      "Mongo",
      "Territoire",
      "Kauka",
    ],
  },
  {
    name: "Bumbu",
    latitude: -4.3667,
    longitude: 15.3,
    superficie: 5.3,
    population: 340000,
    bourgmestre: "Patrick Molisho",
    quartiers: [
      "Camp Kabila",
      "Mikala",
      "Véranda",
      "Mbudi",
      "Camp Kauka",
      "Lubudi",
    ],
  },
  {
    name: "Gombe",
    latitude: -4.3,
    longitude: 15.3,
    superficie: 3.0,
    population: 35000,
    bourgmestre: "Raphaël Buhendwa",
    quartiers: [
      "Centre-ville",
      "Socimat",
      "Huilerie",
      "Batetela",
      "Royal",
      "Cliniques",
    ],
  },
  {
    name: "Kalamu",
    latitude: -4.35,
    longitude: 15.3167,
    superficie: 6.64,
    population: 260000,
    bourgmestre: "Gaston Tshilombo",
    quartiers: [
      "Matonge",
      "Yolo-Nord",
      "Yolo-Sud",
      "Bongolo",
      "Kauka",
      "Pinzi",
    ],
  },
  {
    name: "Kasa-Vubu",
    latitude: -4.3333,
    longitude: 15.3,
    superficie: 5.04,
    population: 125000,
    bourgmestre: "Joseph Nsimba",
    quartiers: ["Kwango", "Baya", "Kinshasa", "Mare", "Nguiri", "Lubuala"],
  },
  {
    name: "Kimbanseke",
    latitude: -4.4333,
    longitude: 15.35,
    superficie: 237.78,
    population: 1200000,
    bourgmestre: "Pierre Mbemba",
    quartiers: [
      "Kingasani",
      "Saio",
      "Mikondo",
      "Mbanza-Lemba",
      "Pétro-Congo",
      "Nsanga",
      "Kinkole",
    ],
  },
  {
    name: "Kinshasa (Commune)",
    latitude: -4.3269,
    longitude: 15.3119,
    superficie: 2.87,
    population: 105000,
    bourgmestre: "André Lukusa",
    quartiers: ["Météo", "Poudrière", "Magasin", "Camp-Militaire", "Ndolo"],
  },
  {
    name: "Kintambo",
    latitude: -4.3167,
    longitude: 15.2667,
    superficie: 2.72,
    population: 95000,
    bourgmestre: "Clément Tshisuaka",
    quartiers: ["Village", "Résidentiel", "Magasin", "Lukunga", "Kauka"],
  },
  {
    name: "Kisenso",
    latitude: -4.4167,
    longitude: 15.3333,
    superficie: 16.6,
    population: 450000,
    bourgmestre: "Robert Wangata",
    quartiers: [
      "Dingi-Dingi",
      "BFSA",
      "Congo",
      "Mission",
      "Kabila",
      "Révolution",
    ],
  },
  {
    name: "Lemba",
    latitude: -4.3833,
    longitude: 15.3167,
    superficie: 23.7,
    population: 410000,
    bourgmestre: "José Bangala",
    quartiers: [
      "Livulu",
      "Salongo",
      "Gombele",
      "Echangeur",
      "Camp Kabila",
      "Righini",
    ],
  },
  {
    name: "Limete",
    latitude: -4.3667,
    longitude: 15.3333,
    superficie: 27.94,
    population: 380000,
    bourgmestre: "Papy Mantezolo",
    quartiers: [
      "Résidentiel",
      "Industriel",
      "Kingabwa",
      "Mombele",
      "Funa",
      "Mososo",
    ],
  },
  {
    name: "Lingwala",
    latitude: -4.3167,
    longitude: 15.2833,
    superficie: 2.89,
    population: 80000,
    bourgmestre: "Marie-Claire Bilolo",
    quartiers: ["Lingwala I", "Lingwala II", "Armée", "20 Mai", "Delvaux"],
  },
  {
    name: "Makala",
    latitude: -4.3833,
    longitude: 15.2833,
    superficie: 5.88,
    population: 270000,
    bourgmestre: "François Kimbembe",
    quartiers: [
      "Makala-Centre",
      "Prison",
      "Mayi-Mayi",
      "Lubudi",
      "Nsimba",
      "Route de Matadi",
    ],
  },
  {
    name: "Maluku",
    latitude: -4.05,
    longitude: 15.5833,
    superficie: 7948.8,
    population: 250000,
    bourgmestre: "Simon Nsumbu",
    quartiers: [
      "Maluku-Centre",
      "Kinkole",
      "Mongafula",
      "Mpasa",
      "Bibwa",
      "Mangengenge",
    ],
  },
  {
    name: "Masina",
    latitude: -4.3833,
    longitude: 15.3833,
    superficie: 71.34,
    population: 850000,
    bourgmestre: "Jean Musodio",
    quartiers: [
      "Pétro-Congo",
      "Tshangu",
      "Nzadi",
      "Mapela",
      "Sans-Fil",
      "Abattoir",
      "Véranda",
    ],
  },
  {
    name: "Matete",
    latitude: -4.3667,
    longitude: 15.3333,
    superficie: 4.87,
    population: 295000,
    bourgmestre: "Gabriel Tembo",
    quartiers: [
      "Matete-Centre",
      "Tomba",
      "Nzadi",
      "Herady",
      "Kapinga",
      "Vélodrome",
    ],
  },
  {
    name: "Mont-Ngafula",
    latitude: -4.45,
    longitude: 15.2167,
    superficie: 358.9,
    population: 420000,
    bourgmestre: "Alphonse Kikimi",
    quartiers: [
      "Kindele",
      "UPN",
      "Lutendele",
      "Kibuaya",
      "Lukunga",
      "Mama Mobutu",
      "Ngansele",
    ],
  },
  {
    name: "Ndjili",
    latitude: -4.4,
    longitude: 15.3667,
    superficie: 11.4,
    population: 440000,
    bourgmestre: "Pierre Ndombasi",
    quartiers: [
      "Ndjili-Centre",
      "CECOMAF",
      "Manzanza",
      "Saio",
      "Mpasa",
      "Aviation",
    ],
  },
  {
    name: "Ngaba",
    latitude: -4.3833,
    longitude: 15.3167,
    superficie: 3.95,
    population: 180000,
    bourgmestre: "Thérèse Makiese",
    quartiers: ["Ngaba-Centre", "Byela", "Masikita", "Kinshasa", "Ngafani"],
  },
  {
    name: "Ngaliema",
    latitude: -4.3333,
    longitude: 15.2333,
    superficie: 222.0,
    population: 850000,
    bourgmestre: "Bavon Muenge",
    quartiers: [
      "Binza UPN",
      "Binza Météo",
      "Binza Ozone",
      "Ma Campagne",
      "Joli Parc",
      "Pigeon",
      "Kinsuka",
      "Djelo-Binza",
    ],
  },
  {
    name: "Ngiri-Ngiri",
    latitude: -4.35,
    longitude: 15.2833,
    superficie: 3.3,
    population: 190000,
    bourgmestre: "Josué Mongo",
    quartiers: [
      "Ngiri-Ngiri I",
      "Ngiri-Ngiri II",
      "Kokolo",
      "Camp Kokolo",
      "Bayaka",
    ],
  },
  {
    name: "Nsele",
    latitude: -4.3167,
    longitude: 15.45,
    superficie: 898.79,
    population: 280000,
    bourgmestre: "Charles Mbala",
    quartiers: [
      "Nsele-Centre",
      "Mpasa I",
      "Mpasa II",
      "Mikonga",
      "Dingi-Dingi",
      "Kinkole",
    ],
  },
  {
    name: "Selembao",
    latitude: -4.3833,
    longitude: 15.25,
    superficie: 23.2,
    population: 380000,
    bourgmestre: "Albert Nzimba",
    quartiers: [
      "Selembao-Centre",
      "CETA",
      "Madiata",
      "Kimpwanza",
      "Molukumbi",
      "Lubudi",
    ],
  },
];

// ============================================================
// LIEUX : bureaux communaux - services administratifs par commune
// ============================================================
function generateCommuneLieux(communeName: string) {
  return [
    {
      nom: `Bureau de la Commune de ${communeName}`,
      type: LieuType.ADMINISTRATION,
      adresse: `Avenue Principale, ${communeName}`,
      reperes: `Bâtiment administratif principal de ${communeName}`,
      telephone: "+243 81 000 0000",
      verified: true,
      featured: false,
      services: [
        {
          categorie: ServiceCategorie.ETAT_CIVIL,
          nomService: "Acte de naissance",
          description:
            "Délivrance d'acte de naissance pour les nouveau-nés et copies conformes",
          prixOfficiel: 3500,
          delai: "24-48h",
          documentsRequis: [
            "Attestation de naissance de l'hôpital/maternité",
            "Pièce d'identité des parents",
            "2 photos passeport",
          ],
          procedure:
            "1. Se présenter au guichet état civil\n2. Remplir le formulaire de déclaration\n3. Déposer les documents requis\n4. Payer les frais\n5. Retirer l'acte après le délai indiqué",
        },
        {
          categorie: ServiceCategorie.ETAT_CIVIL,
          nomService: "Acte de mariage",
          description:
            "Célébration de mariage civil et délivrance d'acte de mariage",
          prixOfficiel: 25000,
          delai: "7 jours (après publication des bans)",
          documentsRequis: [
            "Actes de naissance des deux époux",
            "Pièces d'identité",
            "Certificats de célibat",
            "4 photos passeport chacun",
            "Certificat médical prénuptial",
          ],
          procedure:
            "1. Déposer le dossier complet\n2. Publication des bans (15 jours)\n3. Célébration du mariage\n4. Retrait de l'acte",
        },
        {
          categorie: ServiceCategorie.ETAT_CIVIL,
          nomService: "Acte de décès",
          description: "Déclaration de décès et délivrance de l'acte de décès",
          prixOfficiel: 2000,
          delai: "24h",
          documentsRequis: [
            "Certificat médical de décès",
            "Pièce d'identité du décédé",
            "Pièce d'identité du déclarant",
          ],
          procedure:
            "1. Se présenter avec le certificat médical\n2. Remplir la déclaration\n3. Payer les frais\n4. Retirer l'acte",
        },
        {
          categorie: ServiceCategorie.ETAT_CIVIL,
          nomService: "Certificat de résidence",
          description: "Attestation de domicile dans la commune",
          prixOfficiel: 2000,
          delai: "Immédiat à 24h",
          documentsRequis: [
            "Pièce d'identité",
            "Attestation du chef de quartier",
          ],
          procedure:
            "1. Obtenir l'attestation du chef de quartier\n2. Se présenter au bureau communal\n3. Payer les frais\n4. Retirer le certificat",
        },
        {
          categorie: ServiceCategorie.ETAT_CIVIL,
          nomService: "Attestation de célibat",
          description: "Certificat attestant le statut de célibataire",
          prixOfficiel: 2000,
          delai: "24h",
          documentsRequis: ["Pièce d'identité", "Acte de naissance"],
        },
        {
          categorie: ServiceCategorie.ETAT_CIVIL,
          nomService: "Certificat de bonne conduite, vie et mœurs",
          description: "Attestation de bonne conduite délivrée par la commune",
          prixOfficiel: 5000,
          delai: "48-72h",
          documentsRequis: [
            "Pièce d'identité",
            "2 photos passeport",
            "Attestation du chef de quartier",
          ],
        },
        {
          categorie: ServiceCategorie.ETAT_CIVIL,
          nomService: "Légalisation de documents",
          description:
            "Authentification et légalisation de copies de documents",
          prixOfficiel: 1000,
          delai: "Immédiat",
          documentsRequis: [
            "Document original",
            "Copie à légaliser",
            "Pièce d'identité",
          ],
        },
      ],
    },
  ];
}

// Lieux spéciaux (hôpitaux, tribunaux, universités, etc.)
const lieuxSpeciaux = [
  // === GOMBE ===
  {
    nom: "Hôpital Général de Kinshasa (Ex Mama Yemo)",
    type: LieuType.HOPITAL,
    communeName: "Gombe",
    adresse: "Avenue des Huileries, Gombe",
    reperes: "Près du boulevard du 30 juin",
    telephone: "+243 81 234 5678",
    latitude: -4.3058,
    longitude: 15.3097,
    verified: true,
    featured: true,
    services: [
      {
        categorie: ServiceCategorie.SANTE,
        nomService: "Consultation générale",
        prixOfficiel: 5000,
        delai: "Immédiat",
        documentsRequis: [] as string[],
        procedure:
          "1. Se présenter à l'accueil\n2. S'enregistrer\n3. Payer les frais\n4. Attendre son tour",
      },
      {
        categorie: ServiceCategorie.SANTE,
        nomService: "Urgences 24h/24",
        prixOfficiel: 10000,
        delai: "Immédiat",
        documentsRequis: [] as string[],
      },
      {
        categorie: ServiceCategorie.SANTE,
        nomService: "Chirurgie",
        prixOfficiel: 150000,
        delai: "Sur rendez-vous",
        documentsRequis: ["Ordonnance médicale", "Résultats d'analyses"],
      },
      {
        categorie: ServiceCategorie.SANTE,
        nomService: "Maternité",
        prixOfficiel: 80000,
        delai: "Immédiat",
        documentsRequis: ["Carte prénatale"],
      },
      {
        categorie: ServiceCategorie.SANTE,
        nomService: "Vaccination",
        prixOfficiel: 2500,
        delai: "Immédiat",
        documentsRequis: ["Carnet de vaccination"],
      },
      {
        categorie: ServiceCategorie.SANTE,
        nomService: "Analyses de laboratoire",
        prixOfficiel: 15000,
        delai: "24-48h",
        documentsRequis: ["Ordonnance médicale"],
      },
    ],
  },
  {
    nom: "Hôtel de Ville de Kinshasa",
    type: LieuType.MAIRIE,
    communeName: "Gombe",
    adresse: "Boulevard du 30 juin, Gombe",
    reperes: "En face de la Banque Centrale du Congo",
    telephone: "+243 81 987 6543",
    latitude: -4.31,
    longitude: 15.315,
    verified: true,
    featured: true,
    services: [
      {
        categorie: ServiceCategorie.ETAT_CIVIL,
        nomService: "Carte d'identité nationale",
        prixOfficiel: 25000,
        delai: "30 jours",
        documentsRequis: [
          "Acte de naissance",
          "4 photos passeport",
          "Certificat de résidence",
        ],
      },
      {
        categorie: ServiceCategorie.ETAT_CIVIL,
        nomService: "Passeport biométrique",
        prixOfficiel: 185000,
        delai: "15-30 jours",
        documentsRequis: [
          "Carte d'identité",
          "Acte de naissance",
          "6 photos passeport",
        ],
      },
      {
        categorie: ServiceCategorie.IMPOTS,
        nomService: "Patente commerciale",
        prixOfficiel: 50000,
        delai: "7 jours",
        documentsRequis: ["RCCM", "NIF", "Statut de l'entreprise"],
      },
    ],
  },
  {
    nom: "Tribunal de Grande Instance de Kinshasa/Gombe",
    type: LieuType.TRIBUNAL,
    communeName: "Gombe",
    adresse: "Avenue de la Justice, Gombe",
    reperes: "Près du Palais de Justice",
    telephone: "+243 81 555 6666",
    latitude: -4.308,
    longitude: 15.313,
    verified: true,
    featured: true,
    services: [
      {
        categorie: ServiceCategorie.JUSTICE,
        nomService: "Casier judiciaire",
        prixOfficiel: 10000,
        delai: "72h",
        documentsRequis: ["Pièce d'identité", "2 photos passeport"],
      },
      {
        categorie: ServiceCategorie.JUSTICE,
        nomService: "Dépôt de plainte civile",
        prixOfficiel: 15000,
        delai: "Variable",
        documentsRequis: ["Pièce d'identité", "Preuves à l'appui"],
      },
      {
        categorie: ServiceCategorie.JUSTICE,
        nomService: "Certification de documents",
        prixOfficiel: 5000,
        delai: "24-48h",
        documentsRequis: ["Document original", "Copies"],
      },
    ],
  },
  {
    nom: "Commissariat Central de Kinshasa",
    type: LieuType.COMMISSARIAT,
    communeName: "Gombe",
    adresse: "Avenue Colonel Ebeya, Gombe",
    reperes: null,
    telephone: "+243 81 333 4444",
    latitude: -4.305,
    longitude: 15.312,
    verified: true,
    featured: false,
    services: [
      {
        categorie: ServiceCategorie.JUSTICE,
        nomService: "Déclaration de perte",
        prixOfficiel: 2000,
        delai: "Immédiat",
        documentsRequis: ["Attestation du chef de quartier"],
      },
      {
        categorie: ServiceCategorie.JUSTICE,
        nomService: "Attestation de bonne conduite",
        prixOfficiel: 5000,
        delai: "48h",
        documentsRequis: ["Pièce d'identité", "2 photos passeport"],
      },
      {
        categorie: ServiceCategorie.JUSTICE,
        nomService: "Dépôt de plainte",
        prixOfficiel: 0,
        delai: "Immédiat",
        documentsRequis: ["Pièce d'identité"],
      },
    ],
  },
  // === KALAMU ===
  {
    nom: "Centre de Santé Mama Yemo",
    type: LieuType.CENTRE_SANTE,
    communeName: "Kalamu",
    adresse: "Avenue Kabinda, Kalamu",
    reperes: null,
    telephone: "+243 81 111 2222",
    latitude: -4.35,
    longitude: 15.3167,
    verified: true,
    featured: false,
    services: [
      {
        categorie: ServiceCategorie.SANTE,
        nomService: "Consultation prénatale",
        prixOfficiel: 3000,
        delai: "Immédiat",
        documentsRequis: ["Carte de suivi prénatal"],
      },
      {
        categorie: ServiceCategorie.SANTE,
        nomService: "Vaccination enfants (0-5 ans)",
        prixOfficiel: 0,
        delai: "Immédiat",
        documentsRequis: ["Carnet de vaccination"],
      },
      {
        categorie: ServiceCategorie.SANTE,
        nomService: "Dépistage VIH",
        prixOfficiel: 0,
        delai: "1h",
        documentsRequis: [] as string[],
      },
      {
        categorie: ServiceCategorie.SANTE,
        nomService: "Distribution moustiquaires",
        prixOfficiel: 0,
        delai: "Immédiat",
        documentsRequis: [] as string[],
      },
    ],
  },
  {
    nom: "Tribunal de Paix de Kalamu",
    type: LieuType.TRIBUNAL,
    communeName: "Kalamu",
    adresse: "Avenue Flambeau, Kalamu",
    reperes: null,
    telephone: "+243 81 222 3333",
    latitude: -4.349,
    longitude: 15.316,
    verified: true,
    featured: false,
    services: [
      {
        categorie: ServiceCategorie.JUSTICE,
        nomService: "Casier judiciaire",
        prixOfficiel: 5000,
        delai: "48h",
        documentsRequis: ["Pièce d'identité", "2 photos passeport"],
      },
      {
        categorie: ServiceCategorie.JUSTICE,
        nomService: "Jugement supplétif (acte de naissance tardif)",
        prixOfficiel: 15000,
        delai: "7-14 jours",
        documentsRequis: [
          "Attestation de naissance",
          "Témoins (2)",
          "Pièce d'identité",
        ],
      },
    ],
  },
  // === BANDALUNGWA ===
  {
    nom: "Centre Hospitalier de Bandalungwa",
    type: LieuType.CENTRE_SANTE,
    communeName: "Bandalungwa",
    adresse: "Avenue de la Libération, Bandalungwa",
    reperes: null,
    telephone: "+243 81 444 5555",
    latitude: -4.332,
    longitude: 15.291,
    verified: true,
    featured: false,
    services: [
      {
        categorie: ServiceCategorie.SANTE,
        nomService: "Consultation générale",
        prixOfficiel: 3000,
        delai: "Immédiat",
        documentsRequis: [] as string[],
      },
      {
        categorie: ServiceCategorie.SANTE,
        nomService: "Pharmacie",
        prixOfficiel: 0,
        delai: "Immédiat",
        documentsRequis: ["Ordonnance médicale"],
      },
      {
        categorie: ServiceCategorie.SANTE,
        nomService: "Maternité",
        prixOfficiel: 50000,
        delai: "Immédiat",
        documentsRequis: ["Carte prénatale"],
      },
    ],
  },
  // === LEMBA ===
  {
    nom: "Université de Kinshasa (UNIKIN)",
    type: LieuType.UNIVERSITE,
    communeName: "Lemba",
    adresse: "Campus de Lemba, Mont Amba",
    reperes: "Mont Amba",
    telephone: "+243 81 666 7777",
    latitude: -4.4,
    longitude: 15.3,
    verified: true,
    featured: true,
    services: [
      {
        categorie: ServiceCategorie.EDUCATION,
        nomService: "Inscription universitaire",
        prixOfficiel: 250000,
        delai: "Variable",
        documentsRequis: [
          "Diplôme d'État",
          "Relevé de notes",
          "Photos passeport",
          "Frais académiques",
        ],
      },
      {
        categorie: ServiceCategorie.EDUCATION,
        nomService: "Relevé de notes",
        prixOfficiel: 10000,
        delai: "7 jours",
        documentsRequis: ["Carte d'étudiant"],
      },
      {
        categorie: ServiceCategorie.EDUCATION,
        nomService: "Attestation de réussite",
        prixOfficiel: 15000,
        delai: "14 jours",
        documentsRequis: ["Carte d'étudiant", "Quittance de paiement"],
      },
    ],
  },
  {
    nom: "Cliniques Universitaires de Kinshasa",
    type: LieuType.HOPITAL,
    communeName: "Lemba",
    adresse: "Avenue Kasa-Vubu, Campus UNIKIN",
    reperes: "Dans le campus de l'UNIKIN",
    telephone: "+243 81 888 9999",
    latitude: -4.398,
    longitude: 15.302,
    verified: true,
    featured: true,
    services: [
      {
        categorie: ServiceCategorie.SANTE,
        nomService: "Consultation spécialisée",
        prixOfficiel: 15000,
        delai: "Sur rendez-vous",
        documentsRequis: ["Lettre de référence"],
      },
      {
        categorie: ServiceCategorie.SANTE,
        nomService: "Imagerie médicale (Radiologie)",
        prixOfficiel: 30000,
        delai: "24-48h",
        documentsRequis: ["Ordonnance médicale"],
      },
      {
        categorie: ServiceCategorie.SANTE,
        nomService: "Analyses de laboratoire",
        prixOfficiel: 20000,
        delai: "24-72h",
        documentsRequis: ["Ordonnance médicale"],
      },
    ],
  },
  // === NGALIEMA ===
  {
    nom: "Centre de Santé de Ngaliema",
    type: LieuType.CENTRE_SANTE,
    communeName: "Ngaliema",
    adresse: "Avenue du Commerce, Ngaliema",
    reperes: null,
    telephone: "+243 81 000 1111",
    latitude: -4.334,
    longitude: 15.234,
    verified: true,
    featured: false,
    services: [
      {
        categorie: ServiceCategorie.SANTE,
        nomService: "Consultation générale",
        prixOfficiel: 4000,
        delai: "Immédiat",
        documentsRequis: [] as string[],
      },
      {
        categorie: ServiceCategorie.SANTE,
        nomService: "Pédiatrie",
        prixOfficiel: 5000,
        delai: "Immédiat",
        documentsRequis: ["Carnet de santé de l'enfant"],
      },
    ],
  },
  // === MASINA ===
  {
    nom: "Tribunal de Paix de Masina",
    type: LieuType.TRIBUNAL,
    communeName: "Masina",
    adresse: "Avenue de la Paix, Masina",
    reperes: null,
    telephone: "+243 81 777 8888",
    latitude: -4.384,
    longitude: 15.384,
    verified: true,
    featured: false,
    services: [
      {
        categorie: ServiceCategorie.JUSTICE,
        nomService: "Casier judiciaire",
        prixOfficiel: 5000,
        delai: "48h",
        documentsRequis: ["Pièce d'identité", "2 photos passeport"],
      },
      {
        categorie: ServiceCategorie.JUSTICE,
        nomService: "Règlement de litiges",
        prixOfficiel: 10000,
        delai: "Variable",
        documentsRequis: ["Pièce d'identité", "Documents du litige"],
      },
    ],
  },
  {
    nom: "Centre de Santé de Masina",
    type: LieuType.CENTRE_SANTE,
    communeName: "Masina",
    adresse: "Avenue du Progrès, Masina",
    reperes: null,
    telephone: "+243 81 999 0000",
    latitude: -4.385,
    longitude: 15.382,
    verified: true,
    featured: false,
    services: [
      {
        categorie: ServiceCategorie.SANTE,
        nomService: "Consultation générale",
        prixOfficiel: 2500,
        delai: "Immédiat",
        documentsRequis: [] as string[],
      },
      {
        categorie: ServiceCategorie.SANTE,
        nomService: "Vaccination",
        prixOfficiel: 0,
        delai: "Immédiat",
        documentsRequis: ["Carnet de vaccination"],
      },
    ],
  },
  // === NDJILI ===
  {
    nom: "Hôpital Général de Ndjili",
    type: LieuType.HOPITAL,
    communeName: "Ndjili",
    adresse: "Avenue Lumumba, Ndjili",
    reperes: null,
    telephone: "+243 81 123 4567",
    latitude: -4.401,
    longitude: 15.367,
    verified: true,
    featured: true,
    services: [
      {
        categorie: ServiceCategorie.SANTE,
        nomService: "Urgences",
        prixOfficiel: 8000,
        delai: "Immédiat",
        documentsRequis: [] as string[],
      },
      {
        categorie: ServiceCategorie.SANTE,
        nomService: "Consultation générale",
        prixOfficiel: 4000,
        delai: "Immédiat",
        documentsRequis: [] as string[],
      },
      {
        categorie: ServiceCategorie.SANTE,
        nomService: "Chirurgie générale",
        prixOfficiel: 100000,
        delai: "Sur rendez-vous",
        documentsRequis: ["Ordonnance médicale", "Résultats d'analyses"],
      },
    ],
  },
  // === KIMBANSEKE ===
  {
    nom: "Centre de Santé de Kimbanseke",
    type: LieuType.CENTRE_SANTE,
    communeName: "Kimbanseke",
    adresse: "Avenue Principale, Kimbanseke",
    reperes: null,
    telephone: "+243 81 234 5678",
    latitude: -4.434,
    longitude: 15.351,
    verified: true,
    featured: false,
    services: [
      {
        categorie: ServiceCategorie.SANTE,
        nomService: "Consultation générale",
        prixOfficiel: 2000,
        delai: "Immédiat",
        documentsRequis: [] as string[],
      },
      {
        categorie: ServiceCategorie.SANTE,
        nomService: "Dépistage paludisme",
        prixOfficiel: 3000,
        delai: "1h",
        documentsRequis: [] as string[],
      },
    ],
  },
  {
    nom: "Commissariat de Kimbanseke",
    type: LieuType.COMMISSARIAT,
    communeName: "Kimbanseke",
    adresse: "Avenue Kasa-Vubu, Kimbanseke",
    reperes: null,
    telephone: "+243 81 345 6789",
    latitude: -4.433,
    longitude: 15.349,
    verified: true,
    featured: false,
    services: [
      {
        categorie: ServiceCategorie.JUSTICE,
        nomService: "Déclaration de vol",
        prixOfficiel: 0,
        delai: "Immédiat",
        documentsRequis: ["Pièce d'identité"],
      },
      {
        categorie: ServiceCategorie.JUSTICE,
        nomService: "Attestation de perte",
        prixOfficiel: 2000,
        delai: "Immédiat",
        documentsRequis: [] as string[],
      },
    ],
  },
  // === MATETE ===
  {
    nom: "Direction Générale des Impôts (DGI) - Matete",
    type: LieuType.ADMINISTRATION,
    communeName: "Matete",
    adresse: "Avenue Vélodrome, Matete",
    reperes: null,
    telephone: "+243 81 456 7890",
    latitude: -4.367,
    longitude: 15.334,
    verified: true,
    featured: false,
    services: [
      {
        categorie: ServiceCategorie.IMPOTS,
        nomService: "Numéro Impôt (NIF)",
        prixOfficiel: 15000,
        delai: "7 jours",
        documentsRequis: ["Pièce d'identité", "RCCM (pour entreprises)"],
      },
      {
        categorie: ServiceCategorie.IMPOTS,
        nomService: "Déclaration fiscale annuelle",
        prixOfficiel: 0,
        delai: "Variable",
        documentsRequis: ["NIF", "Bilan comptable"],
      },
      {
        categorie: ServiceCategorie.IMPOTS,
        nomService: "Attestation fiscale",
        prixOfficiel: 10000,
        delai: "5 jours",
        documentsRequis: ["NIF", "Quittances de paiement des impôts"],
      },
    ],
  },
  // === MONT-NGAFULA ===
  {
    nom: "Institut National de Préparation Professionnelle (INPP)",
    type: LieuType.ECOLE,
    communeName: "Mont-Ngafula",
    adresse: "Avenue Université, Mont-Ngafula",
    reperes: null,
    telephone: "+243 81 567 8901",
    latitude: -4.451,
    longitude: 15.217,
    verified: true,
    featured: false,
    services: [
      {
        categorie: ServiceCategorie.EDUCATION,
        nomService: "Formation professionnelle",
        prixOfficiel: 50000,
        delai: "3-6 mois",
        documentsRequis: ["Diplôme", "CV", "Photos passeport"],
      },
      {
        categorie: ServiceCategorie.EDUCATION,
        nomService: "Certificat de fin de formation",
        prixOfficiel: 10000,
        delai: "14 jours",
        documentsRequis: ["Attestation de stage"],
      },
    ],
  },
  // === BUMBU ===
  {
    nom: "Centre de Santé de Bumbu",
    type: LieuType.CENTRE_SANTE,
    communeName: "Bumbu",
    adresse: "Avenue de la Santé, Bumbu",
    reperes: null,
    telephone: "+243 81 678 9012",
    latitude: -4.367,
    longitude: 15.301,
    verified: true,
    featured: false,
    services: [
      {
        categorie: ServiceCategorie.SANTE,
        nomService: "Consultation générale",
        prixOfficiel: 2500,
        delai: "Immédiat",
        documentsRequis: [] as string[],
      },
      {
        categorie: ServiceCategorie.SANTE,
        nomService: "Maternité",
        prixOfficiel: 40000,
        delai: "Immédiat",
        documentsRequis: ["Carte prénatale"],
      },
    ],
  },
  // === SELEMBAO ===
  {
    nom: "Tribunal de Paix de Selembao",
    type: LieuType.TRIBUNAL,
    communeName: "Selembao",
    adresse: "Avenue CETA, Selembao",
    reperes: null,
    telephone: "+243 81 789 0123",
    latitude: -4.384,
    longitude: 15.251,
    verified: true,
    featured: false,
    services: [
      {
        categorie: ServiceCategorie.JUSTICE,
        nomService: "Casier judiciaire",
        prixOfficiel: 5000,
        delai: "48h",
        documentsRequis: ["Pièce d'identité", "2 photos passeport"],
      },
    ],
  },
  // === LIMETE ===
  {
    nom: "Direction Générale de Migration (DGM)",
    type: LieuType.ADMINISTRATION,
    communeName: "Limete",
    adresse: "Boulevard Lumumba, Limete",
    reperes: "Quartier Industriel",
    telephone: "+243 81 890 1234",
    latitude: -4.367,
    longitude: 15.334,
    verified: true,
    featured: true,
    services: [
      {
        categorie: ServiceCategorie.ETAT_CIVIL,
        nomService: "Visa de sortie",
        prixOfficiel: 55000,
        delai: "3-5 jours",
        documentsRequis: [
          "Passeport valide",
          "Billet d'avion",
          "Photo passeport",
        ],
      },
      {
        categorie: ServiceCategorie.ETAT_CIVIL,
        nomService: "Permis de séjour",
        prixOfficiel: 200000,
        delai: "30 jours",
        documentsRequis: [
          "Passeport",
          "Lettre d'invitation",
          "Certificat médical",
          "4 photos passeport",
        ],
      },
    ],
  },
  // === BARUMBU ===
  {
    nom: "Office Notarial de Barumbu",
    type: LieuType.ADMINISTRATION,
    communeName: "Barumbu",
    adresse: "Avenue Lufungula, Barumbu",
    reperes: null,
    telephone: "+243 81 901 2345",
    latitude: -4.32,
    longitude: 15.307,
    verified: true,
    featured: false,
    services: [
      {
        categorie: ServiceCategorie.JUSTICE,
        nomService: "Acte notarié",
        prixOfficiel: 30000,
        delai: "5-7 jours",
        documentsRequis: ["Pièce d'identité", "Documents à notarier"],
      },
      {
        categorie: ServiceCategorie.JUSTICE,
        nomService: "Authentification de contrats",
        prixOfficiel: 25000,
        delai: "3-5 jours",
        documentsRequis: [
          "Contrat en 3 exemplaires",
          "Pièces d'identité des parties",
        ],
      },
    ],
  },
];

// ============================================================
// MAIN SEED FUNCTION
// ============================================================
async function main() {
  console.log("🌱 Démarrage du seeding complet de Kin Services...\n");

  // === CLEANUP ===
  console.log("🗑️  Nettoyage des données existantes...");
  await prisma.searchHistory.deleteMany();
  await prisma.alerte.deleteMany();
  await prisma.signalement.deleteMany();
  await prisma.avis.deleteMany();
  await prisma.favori.deleteMany();
  await prisma.servicePropose.deleteMany();
  await prisma.lieu.deleteMany();
  await prisma.zoneSante.deleteMany();
  await prisma.quartier.deleteMany();
  await prisma.commune.deleteMany();
  console.log("✅ Base nettoyée\n");

  // === COMMUNES + QUARTIERS ===
  console.log("🏘️  Création des 24 communes avec quartiers...");
  const createdCommunes = new Map<string, string>();

  for (const commune of communes) {
    const created = await prisma.commune.create({
      data: {
        name: commune.name,
        latitude: commune.latitude,
        longitude: commune.longitude,
        superficie: commune.superficie,
        population: commune.population,
        bourgmestre: commune.bourgmestre,
        description: `La commune de ${commune.name} est l'une des 24 communes de la ville-province de Kinshasa. Elle couvre une superficie de ${commune.superficie} km² et compte environ ${commune.population.toLocaleString()} habitants.`,
      },
    });
    createdCommunes.set(commune.name, created.id);

    for (const qName of commune.quartiers) {
      await prisma.quartier.create({
        data: {
          communeId: created.id,
          name: qName,
        },
      });
    }
  }
  console.log(`✅ ${communes.length} communes + quartiers créés\n`);

  // === ZONES DE SANTÉ ===
  console.log("🏥 Création des zones de santé...");
  const zonesSante = [
    {
      name: "Bandalungwa",
      communeResponsable: "Bandalungwa",
      population: 200000,
      nombreAiresSante: 12,
    },
    {
      name: "Barumbu",
      communeResponsable: "Barumbu",
      population: 110000,
      nombreAiresSante: 8,
    },
    {
      name: "Binza Météo",
      communeResponsable: "Ngaliema",
      population: 180000,
      nombreAiresSante: 15,
    },
    {
      name: "Binza Ozone",
      communeResponsable: "Ngaliema",
      population: 250000,
      nombreAiresSante: 18,
    },
    {
      name: "Bumbu",
      communeResponsable: "Bumbu",
      population: 340000,
      nombreAiresSante: 20,
    },
    {
      name: "Gombe",
      communeResponsable: "Gombe",
      population: 35000,
      nombreAiresSante: 5,
    },
    {
      name: "Kalamu I",
      communeResponsable: "Kalamu",
      population: 130000,
      nombreAiresSante: 10,
    },
    {
      name: "Kalamu II",
      communeResponsable: "Kalamu",
      population: 130000,
      nombreAiresSante: 9,
    },
    {
      name: "Kasa-Vubu",
      communeResponsable: "Kasa-Vubu",
      population: 125000,
      nombreAiresSante: 8,
    },
    {
      name: "Kimbanseke",
      communeResponsable: "Kimbanseke",
      population: 400000,
      nombreAiresSante: 25,
    },
    {
      name: "Kingabwa",
      communeResponsable: "Limete",
      population: 200000,
      nombreAiresSante: 14,
    },
    {
      name: "Kinshasa",
      communeResponsable: "Kinshasa (Commune)",
      population: 105000,
      nombreAiresSante: 7,
    },
    {
      name: "Kintambo",
      communeResponsable: "Kintambo",
      population: 95000,
      nombreAiresSante: 6,
    },
    {
      name: "Kisenso",
      communeResponsable: "Kisenso",
      population: 450000,
      nombreAiresSante: 28,
    },
    {
      name: "Lemba",
      communeResponsable: "Lemba",
      population: 410000,
      nombreAiresSante: 24,
    },
    {
      name: "Limete",
      communeResponsable: "Limete",
      population: 180000,
      nombreAiresSante: 13,
    },
    {
      name: "Lingwala",
      communeResponsable: "Lingwala",
      population: 80000,
      nombreAiresSante: 5,
    },
    {
      name: "Makala",
      communeResponsable: "Makala",
      population: 270000,
      nombreAiresSante: 16,
    },
    {
      name: "Masina I",
      communeResponsable: "Masina",
      population: 420000,
      nombreAiresSante: 26,
    },
    {
      name: "Masina II",
      communeResponsable: "Masina",
      population: 430000,
      nombreAiresSante: 27,
    },
    {
      name: "Matete",
      communeResponsable: "Matete",
      population: 295000,
      nombreAiresSante: 18,
    },
    {
      name: "Mont-Ngafula",
      communeResponsable: "Mont-Ngafula",
      population: 300000,
      nombreAiresSante: 19,
    },
    {
      name: "Ndjili",
      communeResponsable: "Ndjili",
      population: 440000,
      nombreAiresSante: 28,
    },
    {
      name: "Ngaba",
      communeResponsable: "Ngaba",
      population: 180000,
      nombreAiresSante: 11,
    },
    {
      name: "Ngiri-Ngiri",
      communeResponsable: "Ngiri-Ngiri",
      population: 190000,
      nombreAiresSante: 12,
    },
    {
      name: "Nsele",
      communeResponsable: "Nsele",
      population: 280000,
      nombreAiresSante: 17,
    },
    {
      name: "Selembao",
      communeResponsable: "Selembao",
      population: 380000,
      nombreAiresSante: 23,
    },
  ];

  for (const zone of zonesSante) {
    await prisma.zoneSante.create({
      data: {
        name: zone.name,
        communeResponsable: zone.communeResponsable,
        population: zone.population,
        nombreAiresSante: zone.nombreAiresSante,
        description: `Zone de santé de ${zone.name}, couvrant environ ${zone.population?.toLocaleString()} habitants avec ${zone.nombreAiresSante} aires de santé.`,
      },
    });
  }
  console.log(`✅ ${zonesSante.length} zones de santé créées\n`);

  // === BUREAUX COMMUNAUX (1 par commune - services état civil) ===
  console.log("🏛️  Création des bureaux communaux...");
  for (const commune of communes) {
    const communeId = createdCommunes.get(commune.name);
    if (!communeId) continue;

    const lieuxData = generateCommuneLieux(commune.name);
    for (const lieuData of lieuxData) {
      const createdLieu = await prisma.lieu.create({
        data: {
          nom: lieuData.nom,
          type: lieuData.type,
          communeId,
          adresse: lieuData.adresse,
          reperes: lieuData.reperes,
          telephone: lieuData.telephone,
          latitude: commune.latitude,
          longitude: commune.longitude,
          verified: lieuData.verified,
          featured: lieuData.featured,
          horaires: {
            lundi: "8h-15h",
            mardi: "8h-15h",
            mercredi: "8h-15h",
            jeudi: "8h-15h",
            vendredi: "8h-12h",
            samedi: "Fermé",
            dimanche: "Fermé",
          },
        },
      });

      for (const svc of lieuData.services) {
        await prisma.servicePropose.create({
          data: {
            lieuId: createdLieu.id,
            categorie: svc.categorie,
            nomService: svc.nomService,
            description: svc.description || null,
            prixOfficiel: svc.prixOfficiel,
            delai: svc.delai || null,
            documentsRequis: svc.documentsRequis || [],
            procedure: svc.procedure || null,
          },
        });
      }
    }
  }
  console.log("✅ 24 bureaux communaux créés\n");

  // === LIEUX SPÉCIAUX ===
  console.log("📍 Création des lieux spéciaux...");
  for (const lieu of lieuxSpeciaux) {
    const communeId = createdCommunes.get(lieu.communeName);
    if (!communeId) {
      console.warn(`  ⚠️ Commune ${lieu.communeName} non trouvée`);
      continue;
    }

    const is24h =
      lieu.type === LieuType.HOPITAL || lieu.type === LieuType.COMMISSARIAT;
    const createdLieu = await prisma.lieu.create({
      data: {
        nom: lieu.nom,
        type: lieu.type,
        communeId,
        adresse: lieu.adresse,
        reperes: lieu.reperes || null,
        telephone: lieu.telephone,
        latitude: lieu.latitude,
        longitude: lieu.longitude,
        verified: lieu.verified,
        featured: lieu.featured,
        horaires: {
          lundi: is24h ? "24h/24" : "8h-16h",
          mardi: is24h ? "24h/24" : "8h-16h",
          mercredi: is24h ? "24h/24" : "8h-16h",
          jeudi: is24h ? "24h/24" : "8h-16h",
          vendredi: is24h ? "24h/24" : "8h-16h",
          samedi: is24h ? "24h/24" : "Fermé",
          dimanche: is24h ? "24h/24" : "Fermé",
        },
      },
    });

    for (const svc of lieu.services) {
      await prisma.servicePropose.create({
        data: {
          lieuId: createdLieu.id,
          categorie: svc.categorie,
          nomService: svc.nomService,
          prixOfficiel: svc.prixOfficiel,
          delai: svc.delai || null,
          documentsRequis: svc.documentsRequis || [],
          procedure: (svc as any).procedure || null,
        },
      });
    }
  }
  console.log(`✅ ${lieuxSpeciaux.length} lieux spéciaux créés\n`);

  // === AVIS ===
  console.log("⭐ Création d'avis...");
  const allLieux = await prisma.lieu.findMany({ take: 15 });
  const avisData = [
    {
      note: 5,
      commentaire:
        "Excellent service, personnel très accueillant et professionnel",
      userName: "Jean M.",
    },
    {
      note: 4,
      commentaire: "Bon service, mais temps d'attente un peu long",
      userName: "Marie K.",
    },
    {
      note: 4,
      commentaire: "Prix corrects et personnel compétent. Je recommande.",
      userName: "Pierre N.",
    },
    {
      note: 3,
      commentaire: "Service correct mais pourrait être amélioré",
      userName: "Sophie L.",
    },
    {
      note: 5,
      commentaire: "Très satisfait, personnel à l'écoute et efficace",
      userName: "David M.",
    },
    {
      note: 2,
      commentaire: "Longue attente et peu d'informations affichées",
      userName: "Grace T.",
    },
    {
      note: 4,
      commentaire: "Rapide et efficace. Les prix sont clairs.",
      userName: "Paul K.",
    },
  ];
  for (let i = 0; i < allLieux.length; i++) {
    for (let j = 0; j < 2 + (i % 3); j++) {
      const a = avisData[(i + j) % avisData.length];
      await prisma.avis.create({
        data: {
          lieuId: allLieux[i].id,
          note: a.note,
          commentaire: a.commentaire,
          userName: a.userName,
          approved: true,
        },
      });
    }
  }
  console.log("✅ Avis créés\n");

  // === ALERTES ===
  console.log("🔔 Création d'alertes...");
  await prisma.alerte.create({
    data: {
      titre: "Campagne de vaccination gratuite",
      message:
        "Du 1er au 15 mars 2026, campagne de vaccination gratuite contre la rougeole dans tous les centres de santé. Amenez vos enfants de 0 à 5 ans.",
      type: "info",
      actif: true,
      dateDebut: new Date(),
      dateFin: new Date(Date.now() + 30 * 86400000),
    },
  });
  await prisma.alerte.create({
    data: {
      titre: "Nouveaux tarifs état civil",
      message:
        "Mise à jour des tarifs des actes d'état civil dans toutes les communes à compter du 1er avril 2026.",
      type: "warning",
      actif: true,
      dateDebut: new Date(),
      dateFin: new Date(Date.now() + 60 * 86400000),
    },
  });
  console.log("✅ Alertes créées\n");

  // === RÉSUMÉ ===
  const c = await prisma.commune.count();
  const q = await prisma.quartier.count();
  const z = await prisma.zoneSante.count();
  const l = await prisma.lieu.count();
  const s = await prisma.servicePropose.count();
  const av = await prisma.avis.count();
  console.log("📊 Résumé:");
  console.log(`   ${c} communes, ${q} quartiers, ${z} zones de santé`);
  console.log(`   ${l} lieux, ${s} services, ${av} avis`);
  console.log("\n🎉 Seeding terminé!");
}

main()
  .catch((e) => {
    console.error("❌ Erreur:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
