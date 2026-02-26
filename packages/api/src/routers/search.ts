import { z } from "zod";
import { LieuType, ServiceCategorie } from "@kinservices/database";
import { router, publicProcedure } from "../trpc";

const lieuTypeEnum = z.nativeEnum(LieuType);
const serviceCategorieEnum = z.nativeEnum(ServiceCategorie);

export const searchRouter = router({
  // Global search across all entities
  global: publicProcedure
    .input(
      z.object({
        query: z.string().min(1),
        limit: z.number().min(1).max(20).default(10),
      }),
    )
    .query(async ({ ctx, input }) => {
      const queryLower = input.query.toLowerCase();

      // Search in parallel
      const [communes, lieux, services, zonesSante] = await Promise.all([
        // Search communes
        ctx.prisma.commune.findMany({
          where: {
            name: { contains: input.query, mode: "insensitive" },
          },
          take: input.limit,
        }),

        // Search lieux
        ctx.prisma.lieu.findMany({
          where: {
            verified: true,
            OR: [
              { nom: { contains: input.query, mode: "insensitive" } },
              { adresse: { contains: input.query, mode: "insensitive" } },
            ],
          },
          include: {
            commune: { select: { name: true } },
          },
          take: input.limit,
        }),

        // Search services
        ctx.prisma.servicePropose.findMany({
          where: {
            actif: true,
            lieu: { verified: true },
            OR: [
              { nomService: { contains: input.query, mode: "insensitive" } },
              { description: { contains: input.query, mode: "insensitive" } },
            ],
          },
          include: {
            lieu: {
              select: {
                id: true,
                nom: true,
                commune: { select: { name: true } },
              },
            },
          },
          take: input.limit,
        }),

        // Search zones de santé
        ctx.prisma.zoneSante.findMany({
          where: {
            name: { contains: input.query, mode: "insensitive" },
          },
          take: input.limit,
        }),
      ]);

      return {
        communes: communes.map((c) => ({
          type: "commune" as const,
          id: c.id,
          name: c.name,
          description: c.description,
        })),
        lieux: lieux.map((l) => ({
          type: "lieu" as const,
          id: l.id,
          name: l.nom,
          lieuType: l.type,
          commune: l.commune?.name,
        })),
        services: services.map((s) => ({
          type: "service" as const,
          id: s.id,
          name: s.nomService,
          categorie: s.categorie,
          lieuId: s.lieu.id,
          lieuName: s.lieu.nom,
          commune: s.lieu.commune?.name,
        })),
        zonesSante: zonesSante.map((z) => ({
          type: "zone_sante" as const,
          id: z.id,
          name: z.name,
        })),
      };
    }),

  // Search suggestions (autocomplete)
  suggestions: publicProcedure
    .input(
      z.object({
        query: z.string().min(1),
        limit: z.number().min(1).max(10).default(5),
      }),
    )
    .query(async ({ ctx, input }) => {
      const suggestions: Array<{ text: string; type: string; id?: string }> =
        [];

      // Get service names (most common searches)
      const services = await ctx.prisma.servicePropose.findMany({
        where: {
          nomService: { contains: input.query, mode: "insensitive" },
          actif: true,
        },
        select: { nomService: true },
        distinct: ["nomService"],
        take: input.limit,
      });
      services.forEach((s) =>
        suggestions.push({ text: s.nomService, type: "service" }),
      );

      // Get lieu names
      const lieux = await ctx.prisma.lieu.findMany({
        where: {
          nom: { contains: input.query, mode: "insensitive" },
          verified: true,
        },
        select: { id: true, nom: true },
        take: input.limit,
      });
      lieux.forEach((l) =>
        suggestions.push({ text: l.nom, type: "lieu", id: l.id }),
      );

      // Get commune names
      const communes = await ctx.prisma.commune.findMany({
        where: {
          name: { contains: input.query, mode: "insensitive" },
        },
        select: { id: true, name: true },
        take: input.limit,
      });
      communes.forEach((c) =>
        suggestions.push({ text: c.name, type: "commune", id: c.id }),
      );

      return suggestions.slice(0, input.limit);
    }),

  // Save search history
  saveHistory: publicProcedure
    .input(
      z.object({
        query: z.string().min(1),
        filters: z.record(z.any()).optional(),
        resultCount: z.number().optional(),
        userId: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.searchHistory.create({
        data: {
          query: input.query,
          filters: input.filters,
          resultCount: input.resultCount,
          userId: input.userId || ctx.userId,
        },
      });
    }),

  // Get recent searches (for user)
  getRecentSearches: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        limit: z.number().min(1).max(20).default(10),
      }),
    )
    .query(async ({ ctx, input }) => {
      return ctx.prisma.searchHistory.findMany({
        where: {
          userId: input.userId,
        },
        orderBy: { createdAt: "desc" },
        take: input.limit,
        distinct: ["query"],
      });
    }),

  // Get popular searches (trending)
  getPopularSearches: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(20).default(10),
      }),
    )
    .query(async ({ ctx, input }) => {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

      const searches = await ctx.prisma.searchHistory.groupBy({
        by: ["query"],
        where: {
          createdAt: { gte: oneWeekAgo },
        },
        _count: { query: true },
        orderBy: { _count: { query: "desc" } },
        take: input.limit,
      });

      return searches.map((s) => ({
        query: s.query,
        count: s._count.query,
      }));
    }),

  // Advanced search with filters
  advanced: publicProcedure
    .input(
      z.object({
        query: z.string().optional(),
        types: z.array(lieuTypeEnum).optional(),
        categories: z.array(serviceCategorieEnum).optional(),
        communeIds: z.array(z.string().uuid()).optional(),
        zoneSanteIds: z.array(z.string().uuid()).optional(),
        verified: z.boolean().optional(),
        hasCoordinates: z.boolean().optional(),
        limit: z.number().min(1).max(50).default(20),
        offset: z.number().min(0).default(0),
      }),
    )
    .query(async ({ ctx, input }) => {
      const where: any = {};

      if (input.verified !== undefined) {
        where.verified = input.verified;
      }

      if (input.hasCoordinates) {
        where.latitude = { not: null };
        where.longitude = { not: null };
      }

      if (input.types && input.types.length > 0) {
        where.type = { in: input.types };
      }

      if (input.communeIds && input.communeIds.length > 0) {
        where.communeId = { in: input.communeIds };
      }

      if (input.zoneSanteIds && input.zoneSanteIds.length > 0) {
        where.zoneSanteId = { in: input.zoneSanteIds };
      }

      if (input.query) {
        where.OR = [
          { nom: { contains: input.query, mode: "insensitive" } },
          { adresse: { contains: input.query, mode: "insensitive" } },
          {
            servicesProposed: {
              some: {
                nomService: { contains: input.query, mode: "insensitive" },
              },
            },
          },
        ];
      }

      if (input.categories && input.categories.length > 0) {
        where.servicesProposed = {
          some: {
            categorie: { in: input.categories },
          },
        };
      }

      const [lieux, total] = await Promise.all([
        ctx.prisma.lieu.findMany({
          where,
          include: {
            commune: { select: { name: true } },
            quartier: { select: { name: true } },
            zoneSante: { select: { name: true } },
            servicesProposed: { take: 5 },
            _count: { select: { avis: true } },
          },
          take: input.limit,
          skip: input.offset,
          orderBy: [{ featured: "desc" }, { nom: "asc" }],
        }),
        ctx.prisma.lieu.count({ where }),
      ]);

      return {
        items: lieux,
        total,
        hasMore: input.offset + input.limit < total,
      };
    }),
});
