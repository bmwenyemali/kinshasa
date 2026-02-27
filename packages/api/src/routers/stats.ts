import { z } from "zod";
import { ServiceCategorie } from "@kinservices/database";
import { router, publicProcedure } from "../trpc";

export const statsRouter = router({
  // Global public stats dashboard
  getPublicStats: publicProcedure.query(async ({ ctx }) => {
    const [
      totalCommunes,
      totalLieux,
      totalServices,
      totalDocuments,
      totalZonesSante,
      totalQuartiers,
      totalFaqs,
      totalAvis,
      totalSignalements,
    ] = await Promise.all([
      ctx.prisma.commune.count(),
      ctx.prisma.lieu.count({ where: { verified: true } }),
      ctx.prisma.servicePropose.count({ where: { actif: true } }),
      ctx.prisma.document.count({ where: { actif: true } }),
      ctx.prisma.zoneSante.count(),
      ctx.prisma.quartier.count(),
      ctx.prisma.faq.count({ where: { actif: true } }),
      ctx.prisma.avis.count(),
      ctx.prisma.signalement.count(),
    ]);

    return {
      totalCommunes,
      totalLieux,
      totalServices,
      totalDocuments,
      totalZonesSante,
      totalQuartiers,
      totalFaqs,
      totalAvis,
      totalSignalements,
    };
  }),

  // Service counts by category
  servicesByCategory: publicProcedure.query(async ({ ctx }) => {
    const counts = await ctx.prisma.servicePropose.groupBy({
      by: ["categorie"],
      _count: { id: true },
      where: { actif: true },
    });
    return counts.map((c) => ({
      categorie: c.categorie,
      count: c._count.id,
    }));
  }),

  // Documents by category
  documentsByCategory: publicProcedure.query(async ({ ctx }) => {
    const counts = await ctx.prisma.document.groupBy({
      by: ["categorie"],
      _count: { id: true },
      where: { actif: true },
    });
    return counts.map((c) => ({
      categorie: c.categorie,
      count: c._count.id,
    }));
  }),

  // Lieux by type
  lieuxByType: publicProcedure.query(async ({ ctx }) => {
    const counts = await ctx.prisma.lieu.groupBy({
      by: ["type"],
      _count: { id: true },
      where: { verified: true },
    });
    return counts.map((c) => ({
      type: c.type,
      count: c._count.id,
    }));
  }),

  // Lieux by commune
  lieuxByCommune: publicProcedure.query(async ({ ctx }) => {
    const communes = await ctx.prisma.commune.findMany({
      select: {
        id: true,
        name: true,
        _count: { select: { lieux: true } },
      },
      orderBy: { name: "asc" },
    });
    return communes.map((c) => ({
      id: c.id,
      name: c.name,
      count: c._count.lieux,
    }));
  }),

  // Top searched queries
  topSearches: publicProcedure.query(async ({ ctx }) => {
    const searches = await ctx.prisma.searchHistory.groupBy({
      by: ["query"],
      _count: { id: true },
      orderBy: { _count: { id: "desc" } },
      take: 20,
    });
    return searches.map((s) => ({
      query: s.query,
      count: s._count.id,
    }));
  }),

  // Price reports summary
  priceReports: publicProcedure.query(async ({ ctx }) => {
    const reports = await ctx.prisma.prixSignale.groupBy({
      by: ["serviceNom"],
      _count: { id: true },
      _avg: { prixPaye: true },
      _min: { prixPaye: true },
      _max: { prixPaye: true },
      orderBy: { _count: { id: "desc" } },
      take: 20,
    });
    return reports.map((r) => ({
      serviceNom: r.serviceNom,
      count: r._count.id,
      avgPrice: r._avg.prixPaye ? Number(r._avg.prixPaye) : null,
      minPrice: r._min.prixPaye ? Number(r._min.prixPaye) : null,
      maxPrice: r._max.prixPaye ? Number(r._max.prixPaye) : null,
    }));
  }),

  // Signalements by type
  signalementsByType: publicProcedure.query(async ({ ctx }) => {
    const counts = await ctx.prisma.signalement.groupBy({
      by: ["type"],
      _count: { id: true },
    });
    return counts.map((c) => ({
      type: c.type,
      count: c._count.id,
    }));
  }),
});
