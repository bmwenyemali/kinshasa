import { PrismaClient, LieuType, ServiceCategorie } from "@prisma/client";

const prisma = new PrismaClient();

// Les 24 communes de Kinshasa avec coordonnées approximatives
const communes = [
  {
    name: "Bandalungwa",
    latitude: -4.3317,
    longitude: 15.2908,
    superficie: 6.82,
    population: 200000,
  },
  {
    name: "Barumbu",
    latitude: -4.3194,
    longitude: 15.3069,
    superficie: 4.72,
    population: 110000,
  },
  {
    name: "Bumbu",
    latitude: -4.3667,
    longitude: 15.3,
    superficie: 5.3,
    population: 340000,
  },
  {
    name: "Gombe",
    latitude: -4.3,
    longitude: 15.3,
    superficie: 3.0,
    population: 35000,
  },
  {
    name: "Kalamu",
    latitude: -4.35,
    longitude: 15.3167,
    superficie: 6.64,
    population: 260000,
  },
  {
    name: "Kasa-Vubu",
    latitude: -4.3333,
    longitude: 15.3,
    superficie: 5.04,
    population: 125000,
  },
  {
    name: "Kimbanseke",
    latitude: -4.4333,
    longitude: 15.35,
    superficie: 237.78,
    population: 1200000,
  },
  {
    name: "Kinshasa (Commune)",
    latitude: -4.3269,
    longitude: 15.3119,
    superficie: 2.87,
    population: 105000,
  },
  {
    name: "Kintambo",
    latitude: -4.3167,
    longitude: 15.2667,
    superficie: 2.72,
    population: 95000,
  },
  {
    name: "Kisenso",
    latitude: -4.4167,
    longitude: 15.3333,
    superficie: 16.6,
    population: 450000,
  },
  {
    name: "Lemba",
    latitude: -4.3833,
    longitude: 15.3167,
    superficie: 23.7,
    population: 410000,
  },
  {
    name: "Limete",
    latitude: -4.3667,
    longitude: 15.3333,
    superficie: 27.94,
    population: 380000,
  },
  {
    name: "Lingwala",
    latitude: -4.3167,
    longitude: 15.2833,
    superficie: 2.89,
    population: 80000,
  },
  {
    name: "Makala",
    latitude: -4.3833,
    longitude: 15.2833,
    superficie: 5.88,
    population: 270000,
  },
  {
    name: "Maluku",
    latitude: -4.05,
    longitude: 15.5833,
    superficie: 7948.8,
    population: 250000,
  },
  {
    name: "Masina",
    latitude: -4.3833,
    longitude: 15.3833,
    superficie: 71.34,
    population: 850000,
  },
  {
    name: "Matete",
    latitude: -4.3667,
    longitude: 15.3333,
    superficie: 4.87,
    population: 295000,
  },
  {
    name: "Mont-Ngafula",
    latitude: -4.45,
    longitude: 15.2167,
    superficie: 358.9,
    population: 420000,
  },
  {
    name: "Ndjili",
    latitude: -4.4,
    longitude: 15.3667,
    superficie: 11.4,
    population: 440000,
  },
  {
    name: "Ngaba",
    latitude: -4.3833,
    longitude: 15.3167,
    superficie: 3.95,
    population: 180000,
  },
  {
    name: "Ngaliema",
    latitude: -4.3333,
    longitude: 15.2333,
    superficie: 222.0,
    population: 850000,
  },
  {
    name: "Ngiri-Ngiri",
    latitude: -4.35,
    longitude: 15.2833,
    superficie: 3.3,
    population: 190000,
  },
  {
    name: "Nsele",
    latitude: -4.3167,
    longitude: 15.45,
    superficie: 898.79,
    population: 280000,
  },
  {
    name: "Selembao",
    latitude: -4.3833,
    longitude: 15.25,
    superficie: 23.2,
    population: 380000,
  },
];

// Les 35 zones de santé de Kinshasa
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
    name: "Biyela",
    communeResponsable: "Maluku",
    population: 85000,
    nombreAiresSante: 6,
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
    name: "Kikimi",
    communeResponsable: "Mont-Ngafula",
    population: 120000,
    nombreAiresSante: 10,
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
    name: "Kingasani",
    communeResponsable: "Kimbanseke",
    population: 350000,
    nombreAiresSante: 22,
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
    name: "Kokolo",
    communeResponsable: "Ngiri-Ngiri",
    population: 160000,
    nombreAiresSante: 11,
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
    name: "Maluku I",
    communeResponsable: "Maluku",
    population: 130000,
    nombreAiresSante: 8,
  },
  {
    name: "Maluku II",
    communeResponsable: "Maluku",
    population: 120000,
    nombreAiresSante: 7,
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
    name: "Police",
    communeResponsable: "Gombe",
    population: 25000,
    nombreAiresSante: 3,
  },
  {
    name: "Selembao",
    communeResponsable: "Selembao",
    population: 380000,
    nombreAiresSante: 23,
  },
  {
    name: "Camp militaire",
    communeResponsable: "Ngaliema",
    population: 45000,
    nombreAiresSante: 4,
  },
];

// Exemples de lieux (hôpitaux, administrations, etc.)
const lieuxExemples = [
  {
    nom: "Hôpital Général de Kinshasa",
    type: LieuType.HOPITAL,
    communeName: "Gombe",
    adresse: "Avenue des Huileries, Gombe",
    reperes: "Près du boulevard du 30 juin",
    telephone: "+243 81 234 5678",
    latitude: -4.3058,
    longitude: 15.3097,
    horaires: {
      lundi: "24h/24",
      mardi: "24h/24",
      mercredi: "24h/24",
      jeudi: "24h/24",
      vendredi: "24h/24",
      samedi: "24h/24",
      dimanche: "24h/24",
    },
    verified: true,
    featured: true,
    services: [
      {
        categorie: ServiceCategorie.SANTE,
        nomService: "Consultation générale",
        prixOfficiel: 5000,
        delai: "Immédiat",
        procedure:
          "1. Se présenter à l'accueil\n2. S'enregistrer\n3. Payer les frais\n4. Attendre son tour",
      },
      {
        categorie: ServiceCategorie.SANTE,
        nomService: "Urgences",
        prixOfficiel: 10000,
        delai: "Immédiat",
        procedure: "Se présenter directement au service des urgences",
      },
      {
        categorie: ServiceCategorie.SANTE,
        nomService: "Vaccination",
        prixOfficiel: 2500,
        delai: "Immédiat",
        documentsRequis: ["Carnet de vaccination", "Pièce d'identité"],
      },
    ],
  },
  {
    nom: "Hôtel de Ville de Kinshasa",
    type: LieuType.MAIRIE,
    communeName: "Gombe",
    adresse: "Boulevard du 30 juin, Gombe",
    reperes: "En face de la Banque Centrale",
    telephone: "+243 81 987 6543",
    latitude: -4.31,
    longitude: 15.315,
    horaires: {
      lundi: "8h-16h",
      mardi: "8h-16h",
      mercredi: "8h-16h",
      jeudi: "8h-16h",
      vendredi: "8h-16h",
      samedi: "Fermé",
      dimanche: "Fermé",
    },
    verified: true,
    featured: true,
    services: [
      {
        categorie: ServiceCategorie.ETAT_CIVIL,
        nomService: "Acte de naissance",
        prixOfficiel: 5000,
        delai: "48h",
        documentsRequis: [
          "Attestation de naissance de l'hôpital",
          "Pièce d'identité des parents",
          "2 photos passeport",
        ],
        procedure:
          "1. Se présenter au guichet état civil\n2. Remplir le formulaire\n3. Déposer les documents\n4. Payer les frais\n5. Retirer l'acte après 48h",
      },
      {
        categorie: ServiceCategorie.ETAT_CIVIL,
        nomService: "Carte d'identité",
        prixOfficiel: 25000,
        delai: "30 jours",
        documentsRequis: [
          "Acte de naissance",
          "4 photos passeport",
          "Certificat de résidence",
        ],
        procedure:
          "1. Remplir le formulaire de demande\n2. Déposer les documents\n3. Prise d'empreintes digitales\n4. Payer les frais\n5. Retirer après 30 jours",
      },
      {
        categorie: ServiceCategorie.ETAT_CIVIL,
        nomService: "Certificat de résidence",
        prixOfficiel: 2000,
        delai: "24h",
        documentsRequis: [
          "Pièce d'identité",
          "Attestation du chef de quartier",
        ],
      },
    ],
  },
  {
    nom: "Bureau de la Commune de Bandalungwa",
    type: LieuType.ADMINISTRATION,
    communeName: "Bandalungwa",
    adresse: "Avenue de la Libération, Bandalungwa",
    telephone: "+243 82 345 6789",
    latitude: -4.3317,
    longitude: 15.2908,
    horaires: {
      lundi: "8h-15h",
      mardi: "8h-15h",
      mercredi: "8h-15h",
      jeudi: "8h-15h",
      vendredi: "8h-12h",
      samedi: "Fermé",
      dimanche: "Fermé",
    },
    verified: true,
    services: [
      {
        categorie: ServiceCategorie.ETAT_CIVIL,
        nomService: "Acte de naissance",
        prixOfficiel: 3500,
        delai: "24h",
        documentsRequis: [
          "Attestation de naissance",
          "Pièce d'identité parent",
        ],
      },
      {
        categorie: ServiceCategorie.ETAT_CIVIL,
        nomService: "Attestation de célibat",
        prixOfficiel: 2000,
        delai: "24h",
        documentsRequis: ["Pièce d'identité", "Acte de naissance"],
      },
      {
        categorie: ServiceCategorie.ETAT_CIVIL,
        nomService: "Casier judiciaire",
        prixOfficiel: 5000,
        delai: "72h",
        documentsRequis: ["Pièce d'identité", "2 photos passeport"],
      },
    ],
  },
  {
    nom: "Centre de Santé Mama Yemo",
    type: LieuType.CENTRE_SANTE,
    communeName: "Kalamu",
    zoneSanteName: "Kalamu I",
    adresse: "Avenue Kabinda, Kalamu",
    telephone: "+243 81 111 2222",
    latitude: -4.35,
    longitude: 15.3167,
    horaires: {
      lundi: "7h-18h",
      mardi: "7h-18h",
      mercredi: "7h-18h",
      jeudi: "7h-18h",
      vendredi: "7h-18h",
      samedi: "8h-14h",
      dimanche: "Fermé",
    },
    verified: true,
    services: [
      {
        categorie: ServiceCategorie.SANTE,
        nomService: "Consultation prénatale",
        prixOfficiel: 3000,
        delai: "Immédiat",
      },
      {
        categorie: ServiceCategorie.SANTE,
        nomService: "Vaccination enfants",
        prixOfficiel: 0,
        delai: "Immédiat",
        procedure: "Gratuit pour les enfants de 0 à 5 ans",
      },
      {
        categorie: ServiceCategorie.SANTE,
        nomService: "Dépistage VIH",
        prixOfficiel: 0,
        delai: "1h",
        procedure: "Gratuit. Se présenter au laboratoire du centre.",
      },
      {
        categorie: ServiceCategorie.SANTE,
        nomService: "Distribution moustiquaires",
        prixOfficiel: 0,
        delai: "Immédiat",
        procedure:
          "Gratuit pour les femmes enceintes et enfants de moins de 5 ans",
      },
    ],
  },
  {
    nom: "Commissariat Central de Kinshasa",
    type: LieuType.COMMISSARIAT,
    communeName: "Gombe",
    adresse: "Avenue Colonel Ebeya, Gombe",
    telephone: "+243 81 333 4444",
    latitude: -4.305,
    longitude: 15.312,
    horaires: {
      lundi: "24h/24",
      mardi: "24h/24",
      mercredi: "24h/24",
      jeudi: "24h/24",
      vendredi: "24h/24",
      samedi: "24h/24",
      dimanche: "24h/24",
    },
    verified: true,
    services: [
      {
        categorie: ServiceCategorie.JUSTICE,
        nomService: "Déclaration de perte",
        prixOfficiel: 2000,
        delai: "Immédiat",
        documentsRequis: ["Attestation de perte du chef de quartier"],
      },
      {
        categorie: ServiceCategorie.JUSTICE,
        nomService: "Attestation de bonne conduite",
        prixOfficiel: 5000,
        delai: "48h",
        documentsRequis: ["Pièce d'identité", "2 photos passeport"],
      },
    ],
  },
];

async function main() {
  console.log("🌱 Démarrage du seeding...");

  // Supprimer les données existantes
  console.log("🗑️  Nettoyage des données existantes...");
  await prisma.signalement.deleteMany();
  await prisma.avis.deleteMany();
  await prisma.favori.deleteMany();
  await prisma.servicePropose.deleteMany();
  await prisma.lieu.deleteMany();
  await prisma.zoneSante.deleteMany();
  await prisma.quartier.deleteMany();
  await prisma.commune.deleteMany();

  // Créer les communes
  console.log("🏘️  Création des 24 communes...");
  const createdCommunes = new Map<string, string>();
  for (const commune of communes) {
    const created = await prisma.commune.create({
      data: {
        name: commune.name,
        latitude: commune.latitude,
        longitude: commune.longitude,
        superficie: commune.superficie,
        population: commune.population,
        description: `Commune de ${commune.name}, l'une des 24 communes de la ville de Kinshasa.`,
      },
    });
    createdCommunes.set(commune.name, created.id);
  }
  console.log(`✅ ${communes.length} communes créées`);

  // Créer les zones de santé
  console.log("🏥 Création des 35 zones de santé...");
  const createdZones = new Map<string, string>();
  for (const zone of zonesSante) {
    const created = await prisma.zoneSante.create({
      data: {
        name: zone.name,
        communeResponsable: zone.communeResponsable,
        population: zone.population,
        nombreAiresSante: zone.nombreAiresSante,
        description: `Zone de santé de ${zone.name}, couvrant environ ${zone.population?.toLocaleString()} habitants.`,
      },
    });
    createdZones.set(zone.name, created.id);
  }
  console.log(`✅ ${zonesSante.length} zones de santé créées`);

  // Créer quelques quartiers par commune
  console.log("🏠 Création des quartiers...");
  const quartiersByCommune: Record<string, string[]> = {
    Gombe: ["Centre-ville", "Socimat", "Huilerie", "Batetela"],
    Bandalungwa: ["Makelele", "Adoula", "Bisengo", "Livulu"],
    Kalamu: ["Ngiri-Ngiri", "Yolo-Nord", "Yolo-Sud", "Matonge"],
    Limete: ["Résidentiel", "Industriel", "Kingabwa", "Mombele"],
    Ngaliema: [
      "Binza UPN",
      "Binza Météo",
      "Binza Ozone",
      "Ma Campagne",
      "Joli Parc",
    ],
    Kimbanseke: ["Kingasani", "Saio", "Mikondo", "Mbanza-Lemba"],
    Masina: ["Petro-Congo", "Tshangu", "Nzadi", "Mapela"],
  };

  for (const [communeName, quartiers] of Object.entries(quartiersByCommune)) {
    const communeId = createdCommunes.get(communeName);
    if (communeId) {
      for (const quartierName of quartiers) {
        await prisma.quartier.create({
          data: {
            communeId,
            name: quartierName,
          },
        });
      }
    }
  }
  console.log(`✅ Quartiers créés`);

  // Créer les lieux exemples avec services
  console.log("📍 Création des lieux et services...");
  for (const lieu of lieuxExemples) {
    const communeId = createdCommunes.get(lieu.communeName);
    const zoneSanteId = lieu.zoneSanteName
      ? createdZones.get(lieu.zoneSanteName)
      : undefined;

    const createdLieu = await prisma.lieu.create({
      data: {
        nom: lieu.nom,
        type: lieu.type,
        communeId,
        zoneSanteId,
        adresse: lieu.adresse,
        reperes: lieu.reperes,
        telephone: lieu.telephone,
        latitude: lieu.latitude,
        longitude: lieu.longitude,
        horaires: lieu.horaires,
        verified: lieu.verified,
        featured: lieu.featured,
      },
    });

    // Créer les services pour ce lieu
    for (const service of lieu.services) {
      await prisma.servicePropose.create({
        data: {
          lieuId: createdLieu.id,
          categorie: service.categorie,
          nomService: service.nomService,
          prixOfficiel: service.prixOfficiel,
          delai: service.delai,
          documentsRequis: service.documentsRequis || [],
          procedure: service.procedure,
        },
      });
    }
  }
  console.log(`✅ ${lieuxExemples.length} lieux créés avec leurs services`);

  // Créer quelques avis exemples
  console.log("⭐ Création des avis exemples...");
  const lieux = await prisma.lieu.findMany({ take: 3 });
  const avisExemples = [
    {
      note: 5,
      commentaire: "Excellent service, personnel très accueillant",
      userName: "Jean M.",
    },
    {
      note: 4,
      commentaire: "Bon service, mais temps d'attente un peu long",
      userName: "Marie K.",
    },
    {
      note: 4,
      commentaire: "Prix corrects et personnel compétent",
      userName: "Pierre N.",
    },
    {
      note: 3,
      commentaire: "Service correct mais pourrait être amélioré",
      userName: "Sophie L.",
    },
  ];

  for (let i = 0; i < lieux.length; i++) {
    for (let j = 0; j < 2; j++) {
      const avis = avisExemples[(i + j) % avisExemples.length];
      await prisma.avis.create({
        data: {
          lieuId: lieux[i].id,
          note: avis.note,
          commentaire: avis.commentaire,
          userName: avis.userName,
          approved: true,
        },
      });
    }
  }
  console.log(`✅ Avis créés`);

  // Créer une alerte exemple
  console.log("🔔 Création d'une alerte exemple...");
  await prisma.alerte.create({
    data: {
      titre: "Campagne de vaccination gratuite",
      message:
        "Du 1er au 15 mars 2026, campagne de vaccination gratuite contre la rougeole dans tous les centres de santé de Kinshasa. Amenez vos enfants de 0 à 5 ans.",
      type: "info",
      actif: true,
      dateDebut: new Date(),
      dateFin: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
  });
  console.log(`✅ Alerte créée`);

  console.log("\n🎉 Seeding terminé avec succès!");
}

main()
  .catch((e) => {
    console.error("❌ Erreur lors du seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
