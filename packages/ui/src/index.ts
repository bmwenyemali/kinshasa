// Components
export { Button, type ButtonProps } from "./components/Button";
export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  type CardProps,
} from "./components/Card";
export { Input, type InputProps } from "./components/Input";
export { Badge, type BadgeProps } from "./components/Badge";
export {
  Spinner,
  Skeleton,
  CardSkeleton,
  ListSkeleton,
  type SpinnerProps,
  type SkeletonProps,
} from "./components/Loading";

// Utilities
export { cn } from "./lib/utils";

// Types
export type LieuTypeLabel = {
  [key: string]: string;
};

export const LIEU_TYPE_LABELS: LieuTypeLabel = {
  HOPITAL: "Hôpital",
  CLINIQUE: "Clinique",
  CENTRE_SANTE: "Centre de Santé",
  ADMINISTRATION: "Administration",
  MAISON_COMMUNALE: "Maison Communale",
  COMMISSARIAT: "Commissariat",
  POLICE: "Police",
  TRIBUNAL: "Tribunal",
  ECOLE: "École",
  UNIVERSITE: "Université",
  GOUVERNORAT: "Gouvernorat",
  AUTRE: "Autre",
};

export type ServiceCategorieLabel = {
  [key: string]: string;
};

export const SERVICE_CATEGORIE_LABELS: ServiceCategorieLabel = {
  ETAT_CIVIL: "État Civil",
  SANTE: "Santé",
  JUSTICE: "Justice",
  EDUCATION: "Éducation",
  IMPOTS: "Impôts",
  URGENCE: "Urgence",
  SOCIAL: "Social",
  TRANSPORT: "Transport",
  SECURITE: "Sécurité",
  AUTRE: "Autre",
};

export const LIEU_TYPE_ICONS: { [key: string]: string } = {
  HOPITAL: "🏥",
  CLINIQUE: "🏨",
  CENTRE_SANTE: "🏪",
  ADMINISTRATION: "🏛️",
  MAISON_COMMUNALE: "🏛️",
  COMMISSARIAT: "👮",
  POLICE: "🚔",
  TRIBUNAL: "⚖️",
  ECOLE: "🏫",
  UNIVERSITE: "🎓",
  GOUVERNORAT: "🏛️",
  AUTRE: "📍",
};

export const SERVICE_CATEGORIE_ICONS: { [key: string]: string } = {
  ETAT_CIVIL: "📄",
  SANTE: "💊",
  JUSTICE: "⚖️",
  EDUCATION: "📚",
  IMPOTS: "💰",
  URGENCE: "🚨",
  SOCIAL: "🤝",
  TRANSPORT: "🚌",
  SECURITE: "🔒",
  AUTRE: "📋",
};

// Format price in Francs Congolais
export function formatPrice(
  price: number | null | undefined,
  devise = "FC",
): string {
  if (price === null || price === undefined) return "Non spécifié";
  if (price === 0) return "Gratuit";
  return `${price.toLocaleString("fr-CD")} ${devise}`;
}

// Format distance
export function formatDistance(distanceKm: number): string {
  if (distanceKm < 1) {
    return `${Math.round(distanceKm * 1000)} m`;
  }
  return `${distanceKm.toFixed(1)} km`;
}

// Format rating
export function formatRating(rating: number | null): string {
  if (rating === null) return "Pas d'avis";
  return rating.toFixed(1);
}
