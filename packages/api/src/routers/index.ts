import { router } from "../trpc";
import { communeRouter } from "./communes";
import { quartierRouter } from "./quartiers";
import { zoneSanteRouter } from "./zones-sante";
import { lieuRouter } from "./lieux";
import { serviceRouter } from "./services";
import { avisRouter } from "./avis";
import { signalementRouter } from "./signalements";
import { favorisRouter } from "./favoris";
import { alerteRouter } from "./alertes";
import { searchRouter } from "./search";

export const appRouter = router({
  communes: communeRouter,
  quartiers: quartierRouter,
  zonesSante: zoneSanteRouter,
  lieux: lieuRouter,
  services: serviceRouter,
  avis: avisRouter,
  signalements: signalementRouter,
  favoris: favorisRouter,
  alertes: alerteRouter,
  search: searchRouter,
});

export type AppRouter = typeof appRouter;
