import { z } from "zod";
import { router, publicProcedure } from "../trpc";

export const quartierRouter = router({
  // Get quartiers by commune
  getByCommune: publicProcedure
    .input(z.object({ communeId: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.quartier.findMany({
        where: { communeId: input.communeId },
        include: {
          _count: {
            select: { lieux: true },
          },
        },
        orderBy: { name: "asc" },
      });
    }),

  // Get single quartier
  getById: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.quartier.findUnique({
        where: { id: input.id },
        include: {
          commune: true,
          lieux: {
            where: { verified: true },
            include: {
              servicesProposed: true,
            },
            take: 20,
          },
        },
      });
    }),

  // Search quartiers
  search: publicProcedure
    .input(z.object({ query: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.quartier.findMany({
        where: {
          name: {
            contains: input.query,
            mode: "insensitive",
          },
        },
        include: {
          commune: {
            select: { name: true },
          },
        },
        orderBy: { name: "asc" },
      });
    }),
});
