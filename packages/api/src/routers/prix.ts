import { z } from "zod";
import { ServiceCategorie } from "@kinservices/database";
import { router, publicProcedure } from "../trpc";

export const prixRouter = router({
  // Report a price (signaler un prix payé)
  report: publicProcedure
    .input(
      z.object({
        serviceNom: z.string().min(1).max(300),
        documentSlug: z.string().optional(),
        categorie: z.nativeEnum(ServiceCategorie).optional(),
        prixPaye: z.number().min(0),
        devise: z.string().default("FC"),
        lieuNom: z.string().optional(),
        communeNom: z.string().optional(),
        commentaire: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.prixSignale.create({
        data: input,
      });
    }),

  // Get price comparison for a service
  getComparison: publicProcedure
    .input(z.object({ serviceNom: z.string() }))
    .query(async ({ ctx, input }) => {
      const reports = await ctx.prisma.prixSignale.findMany({
        where: {
          serviceNom: { contains: input.serviceNom, mode: "insensitive" },
        },
        orderBy: { createdAt: "desc" },
        take: 50,
      });

      if (reports.length === 0) return null;

      const prices = reports.map((r) => Number(r.prixPaye));
      const avg = prices.reduce((a, b) => a + b, 0) / prices.length;
      const min = Math.min(...prices);
      const max = Math.max(...prices);

      return {
        serviceNom: input.serviceNom,
        count: reports.length,
        avgPrice: Math.round(avg),
        minPrice: min,
        maxPrice: max,
        devise: reports[0].devise,
        recentReports: reports.slice(0, 10).map((r) => ({
          prixPaye: Number(r.prixPaye),
          devise: r.devise,
          lieuNom: r.lieuNom,
          communeNom: r.communeNom,
          commentaire: r.commentaire,
          createdAt: r.createdAt,
        })),
      };
    }),

  // Get all comparisons grouped by category
  getTopComparisons: publicProcedure.query(async ({ ctx }) => {
    const grouped = await ctx.prisma.prixSignale.groupBy({
      by: ["serviceNom", "devise"],
      _count: { id: true },
      _avg: { prixPaye: true },
      _min: { prixPaye: true },
      _max: { prixPaye: true },
      orderBy: { _count: { id: "desc" } },
      take: 30,
    });

    return grouped.map((g) => ({
      serviceNom: g.serviceNom,
      devise: g.devise,
      count: g._count.id,
      avgPrice: g._avg.prixPaye ? Math.round(Number(g._avg.prixPaye)) : null,
      minPrice: g._min.prixPaye ? Number(g._min.prixPaye) : null,
      maxPrice: g._max.prixPaye ? Number(g._max.prixPaye) : null,
    }));
  }),
});
