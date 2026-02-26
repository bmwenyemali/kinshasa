import { z } from "zod";
import { router, publicProcedure } from "../trpc";

export const communeRouter = router({
  // Get all communes
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.commune.findMany({
      orderBy: { name: "asc" },
    });
  }),

  // Get communes with stats (count of lieux + quartiers)
  getAllWithStats: publicProcedure.query(async ({ ctx }) => {
    const communes = await ctx.prisma.commune.findMany({
      include: {
        _count: {
          select: { lieux: true, quartiers: true },
        },
      },
      orderBy: { name: "asc" },
    });
    return communes.map((commune) => ({
      ...commune,
      lieuxCount: commune._count.lieux,
      quartiersCount: commune._count.quartiers,
    }));
  }),

  // Get single commune by ID
  getById: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.commune.findUnique({
        where: { id: input.id },
        include: {
          quartiers: {
            orderBy: { name: "asc" },
            include: {
              _count: {
                select: { lieux: true },
              },
            },
          },
          lieux: {
            include: {
              quartier: {
                select: { id: true, name: true },
              },
              servicesProposed: true,
              _count: {
                select: { avis: true },
              },
            },
            orderBy: [{ featured: "desc" }, { nom: "asc" }],
          },
          _count: {
            select: { lieux: true, quartiers: true },
          },
        },
      });
    }),

  // Get commune by name
  getByName: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.commune.findUnique({
        where: { name: input.name },
        include: {
          quartiers: {
            orderBy: { name: "asc" },
          },
          _count: {
            select: { lieux: true },
          },
        },
      });
    }),

  // Search communes
  search: publicProcedure
    .input(z.object({ query: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.commune.findMany({
        where: {
          name: {
            contains: input.query,
            mode: "insensitive",
          },
        },
        orderBy: { name: "asc" },
      });
    }),
});
