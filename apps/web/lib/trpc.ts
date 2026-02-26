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
