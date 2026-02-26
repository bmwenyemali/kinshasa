// API package exports
export { appRouter, type AppRouter } from "./routers";
export { createContext, createContextWithUser, type Context } from "./context";
export { router, publicProcedure, protectedProcedure } from "./trpc";

// Re-export useful types
export {
  LieuType,
  ServiceCategorie,
  SignalementType,
  type Commune,
  type Quartier,
  type ZoneSante,
  type Lieu,
  type ServicePropose,
  type Avis,
  type Signalement,
  type Favori,
  type SearchHistory,
  type Alerte,
} from "@kinservices/database";
