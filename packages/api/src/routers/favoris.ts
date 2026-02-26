import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc";

export const favorisRouter = router({
  // Get user's favorites
  getMyFavoris: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.userId) {
      return [];
    }

    return ctx.prisma.favori.findMany({
      where: {
        userId: ctx.userId,
      },
      include: {
        lieu: {
          include: {
            commune: { select: { name: true } },
            servicesProposed: { take: 3 },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }),

  // Check if lieu is favorited
  isFavorited: publicProcedure
    .input(
      z.object({
        lieuId: z.string().uuid(),
        userId: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const userId = input.userId || ctx.userId;
      if (!userId) {
        return false;
      }

      const favori = await ctx.prisma.favori.findUnique({
        where: {
          userId_lieuId: {
            userId,
            lieuId: input.lieuId,
          },
        },
      });

      return !!favori;
    }),

  // Add to favorites
  add: publicProcedure
    .input(
      z.object({
        lieuId: z.string().uuid(),
        userId: z.string(), // Can be device ID for anonymous users
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Check if already exists
      const existing = await ctx.prisma.favori.findUnique({
        where: {
          userId_lieuId: {
            userId: input.userId,
            lieuId: input.lieuId,
          },
        },
      });

      if (existing) {
        return existing;
      }

      return ctx.prisma.favori.create({
        data: {
          userId: input.userId,
          lieuId: input.lieuId,
        },
      });
    }),

  // Remove from favorites
  remove: publicProcedure
    .input(
      z.object({
        lieuId: z.string().uuid(),
        userId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.favori.delete({
        where: {
          userId_lieuId: {
            userId: input.userId,
            lieuId: input.lieuId,
          },
        },
      });
    }),

  // Toggle favorite
  toggle: publicProcedure
    .input(
      z.object({
        lieuId: z.string().uuid(),
        userId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const existing = await ctx.prisma.favori.findUnique({
        where: {
          userId_lieuId: {
            userId: input.userId,
            lieuId: input.lieuId,
          },
        },
      });

      if (existing) {
        await ctx.prisma.favori.delete({
          where: { id: existing.id },
        });
        return { favorited: false };
      }

      await ctx.prisma.favori.create({
        data: {
          userId: input.userId,
          lieuId: input.lieuId,
        },
      });
      return { favorited: true };
    }),

  // Get favorites count for a lieu
  getCount: publicProcedure
    .input(z.object({ lieuId: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.favori.count({
        where: { lieuId: input.lieuId },
      });
    }),
});
