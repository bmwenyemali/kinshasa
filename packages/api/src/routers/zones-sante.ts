import { z } from "zod";
import { router, publicProcedure } from "../trpc";

export const zoneSanteRouter = router({
  // Get all zones de santé
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.zoneSante.findMany({
      orderBy: { name: "asc" },
    });
  }),

  // Get all zones with stats
  getAllWithStats: publicProcedure.query(async ({ ctx }) => {
    const zones = await ctx.prisma.zoneSante.findMany({
      include: {
        _count: {
          select: { lieux: true },
        },
      },
      orderBy: { name: "asc" },
    });
    return zones.map((zone) => ({
      ...zone,
      lieuxCount: zone._count.lieux,
    }));
  }),

  // Get single zone by ID
  getById: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.zoneSante.findUnique({
        where: { id: input.id },
        include: {
          lieux: {
            where: { verified: true },
            include: {
              servicesProposed: {
                where: {
                  categorie: "SANTE",
                },
              },
              _count: {
                select: { avis: true },
              },
            },
          },
        },
      });
    }),

  // Search zones
  search: publicProcedure
    .input(z.object({ query: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.zoneSante.findMany({
        where: {
          OR: [
            {
              name: {
                contains: input.query,
                mode: "insensitive",
              },
            },
            {
              communeResponsable: {
                contains: input.query,
                mode: "insensitive",
              },
            },
          ],
        },
        orderBy: { name: "asc" },
      });
    }),
});
