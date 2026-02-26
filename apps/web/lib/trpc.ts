import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@kinservices/api";
import type { inferRouterOutputs } from "@trpc/server";

export const trpc = createTRPCReact<AppRouter>();

// Export inferred types for use in components
export type RouterOutputs = inferRouterOutputs<AppRouter>;

// Specific type aliases for common queries
export type CommuneWithStats =
  RouterOutputs["communes"]["getAllWithStats"][number];
export type ZoneSanteWithStats =
  RouterOutputs["zonesSante"]["getAllWithStats"][number];
export type ZoneSanteDetail = NonNullable<
  RouterOutputs["zonesSante"]["getById"]
>;
export type ZoneSanteLieu = NonNullable<ZoneSanteDetail["lieux"]>[number];
export type LieuSearchResult =
  RouterOutputs["lieux"]["search"]["items"][number];
export type LieuDetail = NonNullable<RouterOutputs["lieux"]["getById"]>;
export type LieuService = LieuDetail["servicesProposed"][number];
export type LieuAvis = NonNullable<LieuDetail["avis"]>[number];
export type SearchResult = RouterOutputs["search"]["advanced"]["items"][number];
export type FeaturedLieu = RouterOutputs["lieux"]["getFeatured"][number];
export type PopularSearch =
  RouterOutputs["search"]["getPopularSearches"][number];

// Ville types
export type GouvernoratData = RouterOutputs["ville"]["getGouvernorat"];
export type DeputeData = NonNullable<
  RouterOutputs["ville"]["getDeputes"]
>["items"][number];
export type ProjetData = NonNullable<
  RouterOutputs["ville"]["getProjets"]
>["items"][number];

// Admin types
export type AdminStats = RouterOutputs["admin"]["getStats"];
export type AdminUser = RouterOutputs["admin"]["getUsers"]["items"][number];

// Auth types
export type UserProfile = RouterOutputs["auth"]["getProfile"];
