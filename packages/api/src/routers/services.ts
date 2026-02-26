import { z } from "zod";
import { ServiceCategorie } from "@kinservices/database";
import { router, publicProcedure, protectedProcedure } from "../trpc";

const serviceCategorieEnum = z.nativeEnum(ServiceCategorie);

export const serviceRouter = router({
  // Get services by lieu
  getByLieu: publicProcedure
    .input(z.object({ lieuId: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.servicePropose.findMany({
        where: {
          lieuId: input.lieuId,
          actif: true,
        },
        orderBy: [{ categorie: "asc" }, { nomService: "asc" }],
      });
    }),

  // Get services grouped by category for a lieu
  getByLieuGrouped: publicProcedure
    .input(z.object({ lieuId: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const services = await ctx.prisma.servicePropose.findMany({
        where: {
          lieuId: input.lieuId,
          actif: true,
        },
        orderBy: { nomService: "asc" },
      });

      // Group by category
      const grouped: Record<string, typeof services> = {};
      for (const service of services) {
        if (!grouped[service.categorie]) {
          grouped[service.categorie] = [];
        }
        grouped[service.categorie].push(service);
      }

      return grouped;
    }),

  // Get service details
  getById: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.servicePropose.findUnique({
        where: { id: input.id },
        include: {
          lieu: {
            include: {
              commune: { select: { name: true } },
              quartier: { select: { name: true } },
            },
          },
        },
      });
    }),

  // Search services across all lieux
  search: publicProcedure
    .input(
      z.object({
        query: z.string().min(1),
        categorie: serviceCategorieEnum.optional(),
        communeId: z.string().uuid().optional(),
        limit: z.number().min(1).max(50).default(20),
      }),
    )
    .query(async ({ ctx, input }) => {
      const where: any = {
        actif: true,
        OR: [
          { nomService: { contains: input.query, mode: "insensitive" } },
          { description: { contains: input.query, mode: "insensitive" } },
        ],
      };

      if (input.categorie) {
        where.categorie = input.categorie;
      }

      if (input.communeId) {
        where.lieu = {
          communeId: input.communeId,
          verified: true,
        };
      } else {
        where.lieu = {
          verified: true,
        };
      }

      const services = await ctx.prisma.servicePropose.findMany({
        where,
        include: {
          lieu: {
            include: {
              commune: { select: { name: true } },
              quartier: { select: { name: true } },
            },
          },
        },
        take: input.limit,
        orderBy: { nomService: "asc" },
      });

      return services;
    }),

  // Get all services by category
  getByCategory: publicProcedure
    .input(
      z.object({
        categorie: serviceCategorieEnum,
        limit: z.number().min(1).max(50).default(20),
      }),
    )
    .query(async ({ ctx, input }) => {
      return ctx.prisma.servicePropose.findMany({
        where: {
          categorie: input.categorie,
          actif: true,
          lieu: {
            verified: true,
          },
        },
        include: {
          lieu: {
            include: {
              commune: { select: { name: true } },
            },
          },
        },
        take: input.limit,
        orderBy: { nomService: "asc" },
      });
    }),

  // Get count of services per category
  getCategoryCounts: publicProcedure.query(async ({ ctx }) => {
    const counts = await ctx.prisma.servicePropose.groupBy({
      by: ["categorie"],
      _count: { id: true },
      where: { actif: true },
    });
    const result: Record<string, number> = {};
    for (const c of counts) {
      result[c.categorie] = c._count.id;
    }
    return result;
  }),

  // Get popular/common services
  getPopular: publicProcedure.query(async ({ ctx }) => {
    // Get the most common services by count
    const services = await ctx.prisma.servicePropose.groupBy({
      by: ["nomService"],
      _count: {
        nomService: true,
      },
      where: {
        actif: true,
        lieu: {
          verified: true,
        },
      },
      orderBy: {
        _count: {
          nomService: "desc",
        },
      },
      take: 10,
    });

    return services.map((s) => ({
      name: s.nomService,
      count: s._count.nomService,
    }));
  }),

  // Create service (for admin)
  create: protectedProcedure
    .input(
      z.object({
        lieuId: z.string().uuid(),
        categorie: serviceCategorieEnum,
        nomService: z.string().min(2).max(200),
        description: z.string().optional(),
        documentsRequis: z.array(z.string()).optional(),
        prixOfficiel: z.number().min(0).optional(),
        devise: z.string().default("FC"),
        delai: z.string().optional(),
        procedure: z.string().optional(),
        conditionsParticulieres: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.servicePropose.create({
        data: {
          ...input,
          documentsRequis: input.documentsRequis || [],
        },
      });
    }),

  // Update service
  update: protectedProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        nomService: z.string().min(2).max(200).optional(),
        description: z.string().optional(),
        documentsRequis: z.array(z.string()).optional(),
        prixOfficiel: z.number().min(0).optional(),
        devise: z.string().optional(),
        delai: z.string().optional(),
        procedure: z.string().optional(),
        conditionsParticulieres: z.string().optional(),
        actif: z.boolean().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return ctx.prisma.servicePropose.update({
        where: { id },
        data,
      });
    }),

  // Delete service
  delete: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.servicePropose.delete({
        where: { id: input.id },
      });
    }),
});
