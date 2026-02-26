/**
 * GeoJSON boundaries for the 24 communes of Kinshasa
 * Simplified polygons based on geographic data
 * Coordinates: [longitude, latitude] format
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

export const communeBoundaries: CommuneBoundaries = {
  type: "FeatureCollection",
  features: [
    // === RIVER-FRONT COMMUNES (West to East) ===
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
            [15.192, -4.285],
            [15.22, -4.28],
            [15.247, -4.29],
            [15.247, -4.33],
            [15.247, -4.37],
            [15.247, -4.4],
            [15.225, -4.418],
            [15.192, -4.405],
            [15.192, -4.285],
          ],
        ],
      },
    },
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
            [15.247, -4.29],
            [15.278, -4.293],
            [15.278, -4.33],
            [15.278, -4.352],
            [15.247, -4.352],
            [15.247, -4.33],
            [15.247, -4.29],
          ],
        ],
      },
    },
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
            [15.278, -4.293],
            [15.31, -4.293],
            [15.313, -4.308],
            [15.31, -4.33],
            [15.278, -4.33],
            [15.278, -4.293],
          ],
        ],
      },
    },
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
            [15.31, -4.293],
            [15.338, -4.296],
            [15.338, -4.335],
            [15.31, -4.34],
            [15.31, -4.33],
            [15.31, -4.293],
          ],
        ],
      },
    },
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
            [15.338, -4.296],
            [15.358, -4.298],
            [15.358, -4.348],
            [15.338, -4.348],
            [15.338, -4.335],
            [15.338, -4.296],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Limete",
        district: "Funa",
        color: COMMUNE_COLORS["Limete"],
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [15.358, -4.298],
            [15.395, -4.296],
            [15.395, -4.345],
            [15.375, -4.355],
            [15.358, -4.348],
            [15.358, -4.298],
          ],
        ],
      },
    },
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
            [15.395, -4.296],
            [15.448, -4.293],
            [15.45, -4.355],
            [15.42, -4.365],
            [15.395, -4.355],
            [15.395, -4.345],
            [15.395, -4.296],
          ],
        ],
      },
    },

    // === SECOND ROW (South of river-front) ===
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
            [15.278, -4.33],
            [15.31, -4.33],
            [15.31, -4.352],
            [15.278, -4.352],
            [15.278, -4.33],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Kasa-Vubu",
        district: "Lukunga",
        color: COMMUNE_COLORS["Kasa-Vubu"],
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [15.31, -4.34],
            [15.338, -4.335],
            [15.338, -4.348],
            [15.34, -4.375],
            [15.31, -4.375],
            [15.31, -4.352],
            [15.31, -4.34],
          ],
        ],
      },
    },
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
            [15.338, -4.348],
            [15.37, -4.35],
            [15.37, -4.38],
            [15.34, -4.38],
            [15.34, -4.375],
            [15.338, -4.348],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Matete",
        district: "Funa",
        color: COMMUNE_COLORS["Matete"],
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [15.37, -4.35],
            [15.395, -4.345],
            [15.395, -4.355],
            [15.398, -4.385],
            [15.37, -4.385],
            [15.37, -4.38],
            [15.37, -4.35],
          ],
        ],
      },
    },

    // === THIRD ROW ===
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
            [15.247, -4.352],
            [15.278, -4.352],
            [15.31, -4.352],
            [15.31, -4.375],
            [15.278, -4.382],
            [15.247, -4.382],
            [15.247, -4.352],
          ],
        ],
      },
    },
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
            [15.31, -4.375],
            [15.34, -4.375],
            [15.34, -4.395],
            [15.31, -4.395],
            [15.31, -4.375],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Ngaba",
        district: "Funa",
        color: COMMUNE_COLORS["Ngaba"],
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [15.34, -4.38],
            [15.37, -4.38],
            [15.37, -4.41],
            [15.34, -4.41],
            [15.34, -4.395],
            [15.34, -4.38],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Lemba",
        district: "Funa",
        color: COMMUNE_COLORS["Lemba"],
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [15.37, -4.385],
            [15.398, -4.385],
            [15.4, -4.42],
            [15.37, -4.42],
            [15.37, -4.41],
            [15.37, -4.385],
          ],
        ],
      },
    },

    // === FOURTH ROW (Far south, larger) ===
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
            [15.247, -4.382],
            [15.278, -4.382],
            [15.31, -4.395],
            [15.31, -4.418],
            [15.278, -4.418],
            [15.247, -4.418],
            [15.247, -4.382],
          ],
        ],
      },
    },
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
            [15.31, -4.395],
            [15.34, -4.395],
            [15.34, -4.41],
            [15.34, -4.425],
            [15.31, -4.425],
            [15.31, -4.418],
            [15.31, -4.395],
          ],
        ],
      },
    },
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
            [15.225, -4.418],
            [15.247, -4.4],
            [15.247, -4.418],
            [15.278, -4.418],
            [15.278, -4.45],
            [15.25, -4.462],
            [15.225, -4.455],
            [15.225, -4.418],
          ],
        ],
      },
    },

    // === EAST COMMUNES ===
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
            [15.395, -4.355],
            [15.42, -4.365],
            [15.438, -4.37],
            [15.438, -4.408],
            [15.4, -4.42],
            [15.398, -4.385],
            [15.395, -4.355],
          ],
        ],
      },
    },
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
            [15.438, -4.37],
            [15.475, -4.36],
            [15.48, -4.415],
            [15.45, -4.43],
            [15.438, -4.408],
            [15.438, -4.37],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Kisenso",
        district: "Funa",
        color: COMMUNE_COLORS["Kisenso"],
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [15.37, -4.41],
            [15.37, -4.42],
            [15.4, -4.42],
            [15.41, -4.445],
            [15.375, -4.455],
            [15.345, -4.445],
            [15.34, -4.425],
            [15.34, -4.41],
            [15.37, -4.41],
          ],
        ],
      },
    },
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
            [15.192, -4.405],
            [15.225, -4.418],
            [15.225, -4.455],
            [15.25, -4.462],
            [15.278, -4.45],
            [15.31, -4.425],
            [15.345, -4.445],
            [15.34, -4.48],
            [15.3, -4.51],
            [15.25, -4.52],
            [15.2, -4.5],
            [15.192, -4.47],
            [15.192, -4.405],
          ],
        ],
      },
    },

    // === FAR EAST COMMUNES ===
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
            [15.52, -4.288],
            [15.58, -4.285],
            [15.6, -4.31],
            [15.58, -4.38],
            [15.52, -4.41],
            [15.48, -4.415],
            [15.475, -4.36],
            [15.45, -4.355],
            [15.448, -4.293],
          ],
        ],
      },
    },
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
            [15.58, -4.285],
            [15.65, -4.27],
            [15.75, -4.26],
            [15.85, -4.255],
            [15.9, -4.28],
            [15.88, -4.37],
            [15.8, -4.4],
            [15.7, -4.42],
            [15.62, -4.4],
            [15.58, -4.38],
            [15.6, -4.31],
            [15.58, -4.285],
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
