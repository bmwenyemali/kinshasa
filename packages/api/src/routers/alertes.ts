import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc";

export const alerteRouter = router({
  // Get active alerts
  getActive: publicProcedure
    .input(
      z.object({
        communeId: z.string().uuid().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const now = new Date();

      return ctx.prisma.alerte.findMany({
        where: {
          actif: true,
          dateDebut: { lte: now },
          OR: [{ dateFin: null }, { dateFin: { gte: now } }],
          ...(input.communeId ? { communeId: input.communeId } : {}),
        },
        orderBy: [{ type: "desc" }, { dateDebut: "desc" }],
      });
    }),

  // Get all alerts (admin)
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return ctx.prisma.alerte.findMany({
      orderBy: { createdAt: "desc" },
    });
  }),

  // Create alert (admin)
  create: protectedProcedure
    .input(
      z.object({
        titre: z.string().min(5).max(200),
        message: z.string().min(10),
        type: z.enum(["info", "warning", "urgent"]),
        communeId: z.string().uuid().optional(),
        dateDebut: z.date(),
        dateFin: z.date().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.alerte.create({
        data: input,
      });
    }),

  // Update alert (admin)
  update: protectedProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        titre: z.string().min(5).max(200).optional(),
        message: z.string().min(10).optional(),
        type: z.enum(["info", "warning", "urgent"]).optional(),
        actif: z.boolean().optional(),
        dateFin: z.date().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return ctx.prisma.alerte.update({
        where: { id },
        data,
      });
    }),

  // Delete alert (admin)
  delete: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.alerte.delete({
        where: { id: input.id },
      });
    }),
});
