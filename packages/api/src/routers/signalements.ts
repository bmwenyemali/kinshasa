import { z } from "zod";
import { SignalementType } from "@kinservices/database";
import { router, publicProcedure, protectedProcedure } from "../trpc";

const signalementTypeEnum = z.nativeEnum(SignalementType);

export const signalementRouter = router({
  // Create signalement (anyone can report)
  create: publicProcedure
    .input(
      z.object({
        lieuId: z.string().uuid().optional(),
        serviceId: z.string().uuid().optional(),
        type: signalementTypeEnum,
        description: z.string().min(10).max(1000),
        email: z.string().email().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.signalement.create({
        data: {
          lieuId: input.lieuId,
          serviceId: input.serviceId,
          type: input.type,
          description: input.description,
          email: input.email,
          userId: ctx.userId,
        },
      });
    }),

  // Get signalements for a lieu (admin)
  getByLieu: protectedProcedure
    .input(z.object({ lieuId: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.signalement.findMany({
        where: {
          lieuId: input.lieuId,
        },
        orderBy: { createdAt: "desc" },
      });
    }),

  // Get all pending signalements (admin)
  getPending: protectedProcedure.query(async ({ ctx }) => {
    return ctx.prisma.signalement.findMany({
      where: {
        traite: false,
      },
      include: {
        lieu: {
          select: { id: true, nom: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }),

  // Mark signalement as treated (admin)
  markAsTraited: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.signalement.update({
        where: { id: input.id },
        data: { traite: true },
      });
    }),

  // Get signalement stats (admin)
  getStats: protectedProcedure.query(async ({ ctx }) => {
    const [total, pending, byType] = await Promise.all([
      ctx.prisma.signalement.count(),
      ctx.prisma.signalement.count({ where: { traite: false } }),
      ctx.prisma.signalement.groupBy({
        by: ["type"],
        _count: { type: true },
      }),
    ]);

    return {
      total,
      pending,
      byType: byType.reduce(
        (acc, item) => {
          acc[item.type] = item._count.type;
          return acc;
        },
        {} as Record<string, number>,
      ),
    };
  }),
});
