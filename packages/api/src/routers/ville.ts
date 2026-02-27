import { z } from "zod";
import { router, publicProcedure } from "../trpc";

export const villeRouter = router({
  // Get gouvernorat info
  getGouvernorat: publicProcedure.query(async ({ ctx }) => {
    const gouvernorat = await ctx.prisma.gouvernorat.findFirst({
      include: {
        ministres: {
          orderBy: { ordre: "asc" },
        },
      },
    });
    if (!gouvernorat) return null;

    // Separate ministers and commissaires généraux
    const ministres = gouvernorat.ministres.filter(
      (m) => (m as any).type !== "COMMISSAIRE_GENERAL",
    );
    const commissaires = gouvernorat.ministres.filter(
      (m) => (m as any).type === "COMMISSAIRE_GENERAL",
    );

    return {
      ...gouvernorat,
      ministres,
      commissaires,
    };
  }),

  // Get all deputes
  getDeputes: publicProcedure
    .input(
      z
        .object({
          search: z.string().optional(),
          parti: z.string().optional(),
          limit: z.number().min(1).max(100).default(50),
          offset: z.number().min(0).default(0),
        })
        .optional(),
    )
    .query(async ({ ctx, input }) => {
      const where: any = {};
      if (input?.search) {
        where.OR = [
          { nom: { contains: input.search, mode: "insensitive" } },
          { parti: { contains: input.search, mode: "insensitive" } },
          { circonscription: { contains: input.search, mode: "insensitive" } },
        ];
      }
      if (input?.parti) {
        where.parti = input.parti;
      }
      const [deputes, total] = await Promise.all([
        ctx.prisma.depute.findMany({
          where,
          take: input?.limit ?? 50,
          skip: input?.offset ?? 0,
          orderBy: { nom: "asc" },
        }),
        ctx.prisma.depute.count({ where }),
      ]);
      return { items: deputes, total };
    }),

  // Get all projets
  getProjets: publicProcedure
    .input(
      z
        .object({
          statut: z.string().optional(),
          categorie: z.string().optional(),
          limit: z.number().min(1).max(100).default(20),
          offset: z.number().min(0).default(0),
        })
        .optional(),
    )
    .query(async ({ ctx, input }) => {
      const where: any = {};
      if (input?.statut) {
        where.statut = input.statut;
      }
      if (input?.categorie) {
        where.categorie = input.categorie;
      }
      const [projets, total] = await Promise.all([
        ctx.prisma.projet.findMany({
          where,
          take: input?.limit ?? 20,
          skip: input?.offset ?? 0,
          orderBy: { dateDebut: "desc" },
        }),
        ctx.prisma.projet.count({ where }),
      ]);
      return { items: projets, total };
    }),

  // Get single projet
  getProjet: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.projet.findUnique({
        where: { id: input.id },
      });
    }),

  // Get historical governors
  getGouverneursHistoriques: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.gouverneurHistorique.findMany({
      orderBy: { ordre: "asc" },
    });
  }),

  // Get single ministre by id
  getMinistreById: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.ministre.findUnique({
        where: { id: input.id },
        include: { gouvernorat: true },
      });
    }),

  // Get single depute by id
  getDeputeById: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.depute.findUnique({
        where: { id: input.id },
      });
    }),
});
