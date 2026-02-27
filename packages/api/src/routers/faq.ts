import { z } from "zod";
import { ServiceCategorie } from "@kinservices/database";
import { router, publicProcedure } from "../trpc";

export const faqRouter = router({
  // Get all FAQs, optionally filtered by category
  getAll: publicProcedure
    .input(
      z
        .object({
          categorie: z.nativeEnum(ServiceCategorie).optional(),
        })
        .optional(),
    )
    .query(async ({ ctx, input }) => {
      const where: any = { actif: true };
      if (input?.categorie) where.categorie = input.categorie;
      return ctx.prisma.faq.findMany({
        where,
        orderBy: [{ categorie: "asc" }, { ordre: "asc" }],
      });
    }),

  // Get FAQs grouped by category
  getGrouped: publicProcedure.query(async ({ ctx }) => {
    const faqs = await ctx.prisma.faq.findMany({
      where: { actif: true },
      orderBy: [{ categorie: "asc" }, { ordre: "asc" }],
    });

    const grouped: Record<string, typeof faqs> = { GENERAL: [] };
    for (const faq of faqs) {
      const key = faq.categorie || "GENERAL";
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(faq);
    }
    return grouped;
  }),

  // Search FAQs
  search: publicProcedure
    .input(z.object({ query: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.faq.findMany({
        where: {
          actif: true,
          OR: [
            { question: { contains: input.query, mode: "insensitive" } },
            { reponse: { contains: input.query, mode: "insensitive" } },
          ],
        },
        orderBy: { ordre: "asc" },
      });
    }),
});
