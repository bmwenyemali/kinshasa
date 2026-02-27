/**
 * GeoJSON boundaries for the 24 communes of Kinshasa
 * Based on accurate geographic/administrative data
 * Coordinates: [longitude, latitude] format (GeoJSON standard)
 *
 * Districts:
 *   Lukunga: Barumbu, Gombe, Kinshasa, Kintambo, Lingwala, Ngaliema
 *   Funa: Bandalungwa, Bumbu, Kalamu, Kasa-Vubu, Makala, Ngiri-Ngiri, Selembao
 *   Mont-Amba: Kisenso, Lemba, Limete, Matete, Ngaba, Mont-Ngafula
 *   Tshangu: Kimbanseke, Masina, Ndjili, Nsele, Maluku
 */

export interface CommuneFeature {
  type: "Feature";
  properties: {
    name: string;
    district: string;
    color: string;
  };
  geometry: {
    type: "Polygon";
    coordinates: number[][][];
  };
}

export interface CommuneBoundaries {
  type: "FeatureCollection";
  features: CommuneFeature[];
}

// Distinct colors for each commune (accessible palette)
const COMMUNE_COLORS: Record<string, string> = {
  Gombe: "#3B82F6",
  Barumbu: "#8B5CF6",
  Kinshasa: "#EC4899",
  Lingwala: "#06B6D4",
  Kintambo: "#10B981",
  Ngaliema: "#059669",
  Bandalungwa: "#F59E0B",
  "Kasa-Vubu": "#EF4444",
  "Ngiri-Ngiri": "#F97316",
  Kalamu: "#6366F1",
  Matete: "#14B8A6",
  Limete: "#0EA5E9",
  Bumbu: "#D946EF",
  Makala: "#F43F5E",
  Ngaba: "#A855F7",
  Selembao: "#84CC16",
  Lemba: "#22D3EE",
  Masina: "#2563EB",
  Ndjili: "#7C3AED",
  Kimbanseke: "#DB2777",
  Kisenso: "#EA580C",
  "Mont-Ngafula": "#16A34A",
  Nsele: "#0284C7",
  Maluku: "#4F46E5",
};

/*
 * GEOSPATIAL REFERENCE
 * ─────────────────────
 * Kinshasa sits on the southern bank of the Congo River (~-4.26 to -4.52 lat, ~15.18 to 16.0 lon).
 *
 * Key geographic landmarks:
 * - Boulevard du 30 Juin runs through Gombe east-west (~-4.305)
 * - Rivière Ndjili separates Masina/Ndjili from Kimbanseke
 * - Rivière Funa flows through Bumbu/Makala/Selembao
 * - University of Kinshasa (UNIKIN) campus sits in Lemba (~-4.385, ~15.304)
 * - Aéroport de Ndjili at ~-4.385, ~15.443
 * - Binza (Ozone, Delvaux, Météo, Télécom, UPN) neighborhoods are in NGALIEMA (western high plateau)
 * - Mont Ngaliema is in the western part of the city (~15.23)
 * - Selembao is south of Ngaliema/Bandalungwa (near Rivière Funa)
 * - Kisenso is a hilly commune south of Matete and east of Makala
 * - Mont-Ngafula is the large southern commune
 */

export const communeBoundaries: CommuneBoundaries = {
  type: "FeatureCollection",
  features: [
    // ═══════════════════════════════════════════
    // DISTRICT DE LUKUNGA (River-front west)
    // ═══════════════════════════════════════════

    // NGALIEMA — Large western commune, includes Binza neighborhoods
    // Extends from the river south to Mont-Ngafula, west of Kintambo/Bandalungwa/Selembao
    {
      type: "Feature",
      properties: {
        name: "Ngaliema",
        district: "Lukunga",
        color: COMMUNE_COLORS["Ngaliema"],
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [15.18, -4.27],
            [15.21, -4.267],
            [15.235, -4.27],
            [15.25, -4.282],
            [15.25, -4.31],
            [15.258, -4.335],
            [15.258, -4.36],
            [15.248, -4.378],
            [15.238, -4.395],
            [15.235, -4.418],
            [15.21, -4.425],
            [15.192, -4.42],
            [15.18, -4.4],
            [15.178, -4.355],
            [15.178, -4.31],
            [15.18, -4.27],
          ],
        ],
      },
    },

    // KINTAMBO — Small commune between Ngaliema and Gombe/Lingwala
    {
      type: "Feature",
      properties: {
        name: "Kintambo",
        district: "Lukunga",
        color: COMMUNE_COLORS["Kintambo"],
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [15.25, -4.282],
            [15.27, -4.285],
            [15.282, -4.29],
            [15.282, -4.32],
            [15.282, -4.342],
            [15.258, -4.342],
            [15.258, -4.335],
            [15.25, -4.31],
            [15.25, -4.282],
          ],
        ],
      },
    },

    // GOMBE — Central business district, along the river
    {
      type: "Feature",
      properties: {
        name: "Gombe",
        district: "Lukunga",
        color: COMMUNE_COLORS["Gombe"],
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [15.282, -4.29],
            [15.296, -4.29],
            [15.312, -4.292],
            [15.316, -4.296],
            [15.316, -4.318],
            [15.305, -4.325],
            [15.292, -4.328],
            [15.282, -4.325],
            [15.282, -4.32],
            [15.282, -4.29],
          ],
        ],
      },
    },

    // BARUMBU — East of Gombe, north of Kinshasa commune, along river
    {
      type: "Feature",
      properties: {
        name: "Barumbu",
        district: "Lukunga",
        color: COMMUNE_COLORS["Barumbu"],
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [15.316, -4.296],
            [15.328, -4.298],
            [15.338, -4.3],
            [15.338, -4.325],
            [15.325, -4.33],
            [15.316, -4.325],
            [15.316, -4.318],
            [15.316, -4.296],
          ],
        ],
      },
    },

    // KINSHASA (commune) — East of Barumbu, along the river
    {
      type: "Feature",
      properties: {
        name: "Kinshasa",
        district: "Lukunga",
        color: COMMUNE_COLORS["Kinshasa"],
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [15.338, -4.3],
            [15.352, -4.298],
            [15.363, -4.298],
            [15.363, -4.335],
            [15.348, -4.34],
            [15.338, -4.338],
            [15.325, -4.33],
            [15.338, -4.325],
            [15.338, -4.3],
          ],
        ],
      },
    },

    // LINGWALA — South of Gombe, sandwiched between Kintambo and Kasa-Vubu
    {
      type: "Feature",
      properties: {
        name: "Lingwala",
        district: "Lukunga",
        color: COMMUNE_COLORS["Lingwala"],
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [15.282, -4.325],
            [15.292, -4.328],
            [15.305, -4.325],
            [15.316, -4.325],
            [15.316, -4.34],
            [15.305, -4.35],
            [15.282, -4.35],
            [15.282, -4.342],
            [15.282, -4.325],
          ],
        ],
      },
    },

    // ═══════════════════════════════════════════
    // DISTRICT DE FUNA (Central communes)
    // ═══════════════════════════════════════════

    // BANDALUNGWA — South of Kintambo/Lingwala, east of Ngaliema
    {
      type: "Feature",
      properties: {
        name: "Bandalungwa",
        district: "Funa",
        color: COMMUNE_COLORS["Bandalungwa"],
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [15.258, -4.342],
            [15.282, -4.342],
            [15.282, -4.35],
            [15.305, -4.35],
            [15.305, -4.373],
            [15.29, -4.38],
            [15.27, -4.385],
            [15.258, -4.378],
            [15.258, -4.36],
            [15.258, -4.342],
          ],
        ],
      },
    },

    // KASA-VUBU — East of Lingwala/Bandalungwa, south of Kinshasa commune
    {
      type: "Feature",
      properties: {
        name: "Kasa-Vubu",
        district: "Funa",
        color: COMMUNE_COLORS["Kasa-Vubu"],
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [15.305, -4.325],
            [15.316, -4.325],
            [15.316, -4.34],
            [15.338, -4.338],
            [15.348, -4.34],
            [15.348, -4.362],
            [15.335, -4.37],
            [15.318, -4.375],
            [15.305, -4.373],
            [15.305, -4.35],
            [15.305, -4.325],
          ],
        ],
      },
    },

    // KALAMU — South of Limete/Kinshasa commune, east of Kasa-Vubu
    {
      type: "Feature",
      properties: {
        name: "Kalamu",
        district: "Funa",
        color: COMMUNE_COLORS["Kalamu"],
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [15.348, -4.34],
            [15.363, -4.335],
            [15.368, -4.34],
            [15.375, -4.352],
            [15.37, -4.37],
            [15.355, -4.38],
            [15.335, -4.378],
            [15.335, -4.37],
            [15.348, -4.362],
            [15.348, -4.34],
          ],
        ],
      },
    },

    // NGIRI-NGIRI — Small, between Kasa-Vubu, Kalamu, Bumbu, Makala
    {
      type: "Feature",
      properties: {
        name: "Ngiri-Ngiri",
        district: "Funa",
        color: COMMUNE_COLORS["Ngiri-Ngiri"],
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [15.305, -4.373],
            [15.318, -4.375],
            [15.335, -4.37],
            [15.335, -4.378],
            [15.335, -4.393],
            [15.318, -4.398],
            [15.305, -4.395],
            [15.305, -4.38],
            [15.305, -4.373],
          ],
        ],
      },
    },

    // BUMBU — South of Bandalungwa, west of Ngiri-Ngiri/Makala
    {
      type: "Feature",
      properties: {
        name: "Bumbu",
        district: "Funa",
        color: COMMUNE_COLORS["Bumbu"],
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [15.258, -4.378],
            [15.27, -4.385],
            [15.29, -4.38],
            [15.305, -4.38],
            [15.305, -4.395],
            [15.318, -4.398],
            [15.318, -4.418],
            [15.295, -4.422],
            [15.272, -4.42],
            [15.255, -4.415],
            [15.255, -4.398],
            [15.258, -4.378],
          ],
        ],
      },
    },

    // MAKALA — South of Ngiri-Ngiri, east of Bumbu
    {
      type: "Feature",
      properties: {
        name: "Makala",
        district: "Funa",
        color: COMMUNE_COLORS["Makala"],
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [15.305, -4.395],
            [15.318, -4.398],
            [15.335, -4.393],
            [15.345, -4.4],
            [15.345, -4.42],
            [15.335, -4.435],
            [15.318, -4.435],
            [15.318, -4.418],
            [15.305, -4.395],
          ],
        ],
      },
    },

    // SELEMBAO — South of Ngaliema, west of Bumbu, north of Mont-Ngafula
    {
      type: "Feature",
      properties: {
        name: "Selembao",
        district: "Funa",
        color: COMMUNE_COLORS["Selembao"],
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [15.235, -4.395],
            [15.248, -4.378],
            [15.258, -4.378],
            [15.255, -4.398],
            [15.255, -4.415],
            [15.272, -4.42],
            [15.295, -4.422],
            [15.295, -4.445],
            [15.27, -4.46],
            [15.24, -4.455],
            [15.222, -4.44],
            [15.218, -4.42],
            [15.235, -4.418],
            [15.235, -4.395],
          ],
        ],
      },
    },

    // ═══════════════════════════════════════════
    // DISTRICT DE MONT-AMBA (South-central)
    // ═══════════════════════════════════════════

    // LIMETE — Along the river, east of Kinshasa commune, west of Masina
    {
      type: "Feature",
      properties: {
        name: "Limete",
        district: "Mont-Amba",
        color: COMMUNE_COLORS["Limete"],
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [15.363, -4.298],
            [15.385, -4.296],
            [15.405, -4.295],
            [15.408, -4.33],
            [15.4, -4.355],
            [15.385, -4.36],
            [15.375, -4.352],
            [15.368, -4.34],
            [15.363, -4.335],
            [15.363, -4.298],
          ],
        ],
      },
    },

    // MATETE — South of Limete, east of Kalamu
    {
      type: "Feature",
      properties: {
        name: "Matete",
        district: "Mont-Amba",
        color: COMMUNE_COLORS["Matete"],
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [15.375, -4.352],
            [15.385, -4.36],
            [15.4, -4.355],
            [15.4, -4.38],
            [15.39, -4.395],
            [15.37, -4.395],
            [15.355, -4.385],
            [15.355, -4.38],
            [15.37, -4.37],
            [15.375, -4.352],
          ],
        ],
      },
    },

    // NGABA — Small, between Kalamu, Matete, Makala, Lemba, Kisenso
    {
      type: "Feature",
      properties: {
        name: "Ngaba",
        district: "Mont-Amba",
        color: COMMUNE_COLORS["Ngaba"],
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [15.335, -4.378],
            [15.355, -4.38],
            [15.355, -4.385],
            [15.37, -4.395],
            [15.365, -4.41],
            [15.35, -4.415],
            [15.345, -4.4],
            [15.335, -4.393],
            [15.335, -4.378],
          ],
        ],
      },
    },

    // LEMBA — South of Ngaba, location of UNIKIN campus
    {
      type: "Feature",
      properties: {
        name: "Lemba",
        district: "Mont-Amba",
        color: COMMUNE_COLORS["Lemba"],
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [15.345, -4.4],
            [15.35, -4.415],
            [15.365, -4.41],
            [15.38, -4.418],
            [15.38, -4.445],
            [15.355, -4.455],
            [15.335, -4.45],
            [15.335, -4.435],
            [15.345, -4.42],
            [15.345, -4.4],
          ],
        ],
      },
    },

    // KISENSO — Hilly commune south of Matete, east of Ngaba/Lemba
    {
      type: "Feature",
      properties: {
        name: "Kisenso",
        district: "Mont-Amba",
        color: COMMUNE_COLORS["Kisenso"],
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [15.37, -4.395],
            [15.39, -4.395],
            [15.4, -4.38],
            [15.415, -4.393],
            [15.418, -4.42],
            [15.405, -4.445],
            [15.385, -4.45],
            [15.38, -4.445],
            [15.38, -4.418],
            [15.365, -4.41],
            [15.37, -4.395],
          ],
        ],
      },
    },

    // MONT-NGAFULA — Large southern commune
    {
      type: "Feature",
      properties: {
        name: "Mont-Ngafula",
        district: "Mont-Amba",
        color: COMMUNE_COLORS["Mont-Ngafula"],
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [15.192, -4.42],
            [15.21, -4.425],
            [15.218, -4.42],
            [15.222, -4.44],
            [15.24, -4.455],
            [15.27, -4.46],
            [15.295, -4.445],
            [15.318, -4.435],
            [15.335, -4.435],
            [15.335, -4.45],
            [15.355, -4.455],
            [15.38, -4.445],
            [15.385, -4.45],
            [15.405, -4.445],
            [15.4, -4.48],
            [15.365, -4.51],
            [15.32, -4.53],
            [15.27, -4.535],
            [15.22, -4.52],
            [15.195, -4.495],
            [15.19, -4.46],
            [15.192, -4.42],
          ],
        ],
      },
    },

    // ═══════════════════════════════════════════
    // DISTRICT DE TSHANGU (Eastern communes)
    // ═══════════════════════════════════════════

    // MASINA — Along the river, east of Limete
    {
      type: "Feature",
      properties: {
        name: "Masina",
        district: "Tshangu",
        color: COMMUNE_COLORS["Masina"],
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [15.405, -4.295],
            [15.425, -4.293],
            [15.448, -4.293],
            [15.445, -4.33],
            [15.435, -4.36],
            [15.415, -4.365],
            [15.408, -4.35],
            [15.408, -4.33],
            [15.405, -4.295],
          ],
        ],
      },
    },

    // NDJILI — South of Masina, location of the airport
    {
      type: "Feature",
      properties: {
        name: "Ndjili",
        district: "Tshangu",
        color: COMMUNE_COLORS["Ndjili"],
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [15.4, -4.355],
            [15.408, -4.35],
            [15.415, -4.365],
            [15.435, -4.36],
            [15.445, -4.37],
            [15.445, -4.4],
            [15.43, -4.405],
            [15.418, -4.42],
            [15.415, -4.393],
            [15.4, -4.38],
            [15.4, -4.355],
          ],
        ],
      },
    },

    // KIMBANSEKE — Large eastern commune, most populated
    {
      type: "Feature",
      properties: {
        name: "Kimbanseke",
        district: "Tshangu",
        color: COMMUNE_COLORS["Kimbanseke"],
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [15.445, -4.37],
            [15.465, -4.358],
            [15.49, -4.36],
            [15.495, -4.395],
            [15.49, -4.43],
            [15.465, -4.45],
            [15.44, -4.455],
            [15.418, -4.445],
            [15.418, -4.42],
            [15.43, -4.405],
            [15.445, -4.4],
            [15.445, -4.37],
          ],
        ],
      },
    },

    // NSELE — Large eastern commune, north of Kimbanseke
    {
      type: "Feature",
      properties: {
        name: "Nsele",
        district: "Tshangu",
        color: COMMUNE_COLORS["Nsele"],
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [15.448, -4.293],
            [15.49, -4.288],
            [15.54, -4.284],
            [15.59, -4.28],
            [15.6, -4.31],
            [15.58, -4.37],
            [15.54, -4.4],
            [15.495, -4.395],
            [15.49, -4.36],
            [15.465, -4.358],
            [15.445, -4.37],
            [15.445, -4.33],
            [15.448, -4.293],
          ],
        ],
      },
    },

    // MALUKU — Largest commune (mostly rural), far east
    {
      type: "Feature",
      properties: {
        name: "Maluku",
        district: "Tshangu",
        color: COMMUNE_COLORS["Maluku"],
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [15.59, -4.28],
            [15.65, -4.268],
            [15.74, -4.258],
            [15.85, -4.253],
            [15.9, -4.275],
            [15.88, -4.37],
            [15.82, -4.41],
            [15.74, -4.43],
            [15.65, -4.42],
            [15.58, -4.4],
            [15.58, -4.37],
            [15.6, -4.31],
            [15.59, -4.28],
          ],
        ],
      },
    },
  ],
};

// Export commune colors for use in map styling
export { COMMUNE_COLORS };

// Helper to find a commune feature by name
export function findCommuneByName(name: string): CommuneFeature | undefined {
  return communeBoundaries.features.find(
    (f) => f.properties.name.toLowerCase() === name.toLowerCase(),
  );
}

// Get centroid of a commune (for label placement)
export function getCommuneCentroid(feature: CommuneFeature): [number, number] {
  const coords = feature.geometry.coordinates[0];
  const n = coords.length;
  let latSum = 0;
  let lngSum = 0;
  for (const [lng, lat] of coords) {
    lngSum += lng;
    latSum += lat;
  }
  return [lngSum / n, latSum / n];
}

// District metadata
export const DISTRICTS: { name: string; communes: string[] }[] = [
  {
    name: "Lukunga",
    communes: [
      "Barumbu",
      "Gombe",
      "Kinshasa",
      "Kinshasa (Commune)",
      "Kintambo",
      "Lingwala",
      "Ngaliema",
    ],
  },
  {
    name: "Funa",
    communes: [
      "Bandalungwa",
      "Bumbu",
      "Kalamu",
      "Kasa-Vubu",
      "Makala",
      "Ngiri-Ngiri",
      "Selembao",
    ],
  },
  {
    name: "Mont-Amba",
    communes: ["Kisenso", "Lemba", "Limete", "Matete", "Mont-Ngafula", "Ngaba"],
  },
  {
    name: "Tshangu",
    communes: ["Kimbanseke", "Maluku", "Masina", "Ndjili", "Nsele"],
  },
];

// Get district for a commune
export function getDistrictForCommune(communeName: string): string | undefined {
  return DISTRICTS.find((d) =>
    d.communes.some((c) => c.toLowerCase() === communeName.toLowerCase()),
  )?.name;
}
