import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc";

export const avisRouter = router({
  // Get avis by lieu
  getByLieu: publicProcedure
    .input(
      z.object({
        lieuId: z.string().uuid(),
        limit: z.number().min(1).max(50).default(20),
        offset: z.number().min(0).default(0),
      }),
    )
    .query(async ({ ctx, input }) => {
      const [avis, total] = await Promise.all([
        ctx.prisma.avis.findMany({
          where: {
            lieuId: input.lieuId,
            approved: true,
          },
          orderBy: { createdAt: "desc" },
          take: input.limit,
          skip: input.offset,
        }),
        ctx.prisma.avis.count({
          where: {
            lieuId: input.lieuId,
            approved: true,
          },
        }),
      ]);

      return {
        items: avis,
        total,
        hasMore: input.offset + input.limit < total,
      };
    }),

  // Get average rating for a lieu
  getAverageRating: publicProcedure
    .input(z.object({ lieuId: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const result = await ctx.prisma.avis.aggregate({
        where: {
          lieuId: input.lieuId,
          approved: true,
        },
        _avg: { note: true },
        _count: { note: true },
      });

      return {
        average: result._avg.note,
        count: result._count.note,
      };
    }),

  // Get rating distribution
  getRatingDistribution: publicProcedure
    .input(z.object({ lieuId: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const distribution = await ctx.prisma.avis.groupBy({
        by: ["note"],
        where: {
          lieuId: input.lieuId,
          approved: true,
        },
        _count: { note: true },
      });

      // Transform to map of note -> count
      const result: Record<number, number> = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
      };
      for (const d of distribution) {
        result[d.note] = d._count.note;
      }

      return result;
    }),

  // Create avis
  create: publicProcedure
    .input(
      z.object({
        lieuId: z.string().uuid(),
        note: z.number().min(1).max(5),
        commentaire: z.string().min(10).max(1000).optional(),
        userName: z.string().min(2).max(100).optional(),
        dateExperience: z.date().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.avis.create({
        data: {
          lieuId: input.lieuId,
          note: input.note,
          commentaire: input.commentaire,
          userName: input.userName,
          dateExperience: input.dateExperience,
          userId: ctx.userId,
          approved: true, // Auto-approve for now
        },
      });
    }),

  // Update avis (by owner)
  update: protectedProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        note: z.number().min(1).max(5).optional(),
        commentaire: z.string().min(10).max(1000).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;

      // Check ownership
      const existing = await ctx.prisma.avis.findUnique({
        where: { id },
      });

      if (!existing || existing.userId !== ctx.userId) {
        throw new Error("Non autorisé");
      }

      return ctx.prisma.avis.update({
        where: { id },
        data,
      });
    }),

  // Delete avis (by owner or admin)
  delete: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      const existing = await ctx.prisma.avis.findUnique({
        where: { id: input.id },
      });

      if (!existing || existing.userId !== ctx.userId) {
        throw new Error("Non autorisé");
      }

      return ctx.prisma.avis.delete({
        where: { id: input.id },
      });
    }),

  // Get user's avis
  getMyAvis: protectedProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(50).default(20),
      }),
    )
    .query(async ({ ctx, input }) => {
      if (!ctx.userId) {
        return [];
      }

      return ctx.prisma.avis.findMany({
        where: {
          userId: ctx.userId,
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
        orderBy: { createdAt: "desc" },
        take: input.limit,
      });
    }),
});
