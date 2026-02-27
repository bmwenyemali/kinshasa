import { z } from "zod";
import { ServiceCategorie } from "@kinservices/database";
import { router, publicProcedure } from "../trpc";

const serviceCategorieEnum = z.nativeEnum(ServiceCategorie);

// Normalize text: remove accents, lowercase
function normalize(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export const documentRouter = router({
  // Get all documents
  getAll: publicProcedure
    .input(
      z
        .object({
          categorie: serviceCategorieEnum.optional(),
          limit: z.number().min(1).max(100).default(50),
        })
        .optional(),
    )
    .query(async ({ ctx, input }) => {
      const where: any = { actif: true };
      if (input?.categorie) {
        where.categorie = input.categorie;
      }
      return ctx.prisma.document.findMany({
        where,
        orderBy: { nom: "asc" },
        take: input?.limit ?? 50,
      });
    }),

  // Get document by id
  getById: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.document.findUnique({
        where: { id: input.id },
      });
    }),

  // Get document by slug
  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.document.findUnique({
        where: { slug: input.slug },
      });
    }),

  // Search documents with accent-insensitive matching
  search: publicProcedure
    .input(
      z.object({
        query: z.string().min(1),
        categorie: serviceCategorieEnum.optional(),
        limit: z.number().min(1).max(50).default(20),
      }),
    )
    .query(async ({ ctx, input }) => {
      const normalizedQuery = normalize(input.query);

      // First: try standard DB search (case-insensitive via Prisma)
      const where: any = {
        actif: true,
        OR: [
          { nom: { contains: input.query, mode: "insensitive" } },
          { description: { contains: input.query, mode: "insensitive" } },
          { definition: { contains: input.query, mode: "insensitive" } },
          { aliases: { has: normalizedQuery } },
        ],
      };

      if (input.categorie) {
        where.categorie = input.categorie;
      }

      let results = await ctx.prisma.document.findMany({
        where,
        take: input.limit,
        orderBy: { nom: "asc" },
      });

      // If no results, try fuzzy alias matching
      if (results.length === 0) {
        const allDocs = await ctx.prisma.document.findMany({
          where: {
            actif: true,
            ...(input.categorie ? { categorie: input.categorie } : {}),
          },
        });

        results = allDocs.filter((doc) => {
          // Check if any alias contains the normalized query
          const matchAlias = doc.aliases.some(
            (alias) =>
              normalize(alias).includes(normalizedQuery) ||
              normalizedQuery.includes(normalize(alias)),
          );
          // Check if name contains the normalized query
          const matchName = normalize(doc.nom).includes(normalizedQuery);
          return matchAlias || matchName;
        });

        results = results.slice(0, input.limit);
      }

      return results;
    }),

  // Get documents by category with counts
  getCategoryCounts: publicProcedure.query(async ({ ctx }) => {
    const counts = await ctx.prisma.document.groupBy({
      by: ["categorie"],
      _count: { id: true },
      where: { actif: true },
    });
    const result: Record<string, number> = {};
    for (const c of counts) {
      result[c.categorie] = c._count.id;
    }
    return result;
  }),

  // Get documents for a category
  getByCategory: publicProcedure
    .input(
      z.object({
        categorie: serviceCategorieEnum,
        limit: z.number().min(1).max(50).default(30),
      }),
    )
    .query(async ({ ctx, input }) => {
      return ctx.prisma.document.findMany({
        where: {
          categorie: input.categorie,
          actif: true,
        },
        orderBy: { nom: "asc" },
        take: input.limit,
      });
    }),
});
