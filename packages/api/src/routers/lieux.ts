import { z } from "zod";
import { LieuType, ServiceCategorie } from "@kinservices/database";
import { router, publicProcedure, protectedProcedure } from "../trpc";

const lieuTypeEnum = z.nativeEnum(LieuType);
const serviceCategorieEnum = z.nativeEnum(ServiceCategorie);

export const lieuRouter = router({
  // Get featured lieux for homepage
  getFeatured: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.lieu.findMany({
      where: {
        featured: true,
        verified: true,
      },
      include: {
        commune: {
          select: { name: true },
        },
        servicesProposed: {
          take: 3,
        },
        _count: {
          select: { avis: true },
        },
      },
      take: 10,
    });
  }),

  // Search lieux with filters
  search: publicProcedure
    .input(
      z.object({
        query: z.string().optional(),
        type: lieuTypeEnum.optional(),
        types: z.array(lieuTypeEnum).optional(),
        categorie: serviceCategorieEnum.optional(),
        communeId: z.string().uuid().optional(),
        zoneSanteId: z.string().uuid().optional(),
        verified: z.boolean().optional(),
        limit: z.number().min(1).max(500).default(20),
        offset: z.number().min(0).default(0),
      }),
    )
    .query(async ({ ctx, input }) => {
      const where: any = {};

      if (input.verified !== undefined) {
        where.verified = input.verified;
      }

      if (input.types && input.types.length > 0) {
        where.type = { in: input.types };
      } else if (input.type) {
        where.type = input.type;
      }

      if (input.communeId) {
        where.communeId = input.communeId;
      }

      if (input.zoneSanteId) {
        where.zoneSanteId = input.zoneSanteId;
      }

      if (input.query) {
        where.OR = [
          { nom: { contains: input.query, mode: "insensitive" } },
          { adresse: { contains: input.query, mode: "insensitive" } },
          {
            servicesProposed: {
              some: {
                nomService: { contains: input.query, mode: "insensitive" },
              },
            },
          },
        ];
      }

      if (input.categorie) {
        where.servicesProposed = {
          some: {
            categorie: input.categorie,
          },
        };
      }

      const [lieux, total] = await Promise.all([
        ctx.prisma.lieu.findMany({
          where,
          include: {
            commune: {
              select: { name: true },
            },
            quartier: {
              select: { name: true },
            },
            zoneSante: {
              select: { name: true },
            },
            servicesProposed: {
              take: 5,
            },
            _count: {
              select: { avis: true },
            },
          },
          take: input.limit,
          skip: input.offset,
          orderBy: [{ featured: "desc" }, { nom: "asc" }],
        }),
        ctx.prisma.lieu.count({ where }),
      ]);

      // Calculate average rating for each lieu
      const lieuxWithRatings = await Promise.all(
        lieux.map(async (lieu) => {
          const avgRating = await ctx.prisma.avis.aggregate({
            where: { lieuId: lieu.id },
            _avg: { note: true },
          });
          return {
            ...lieu,
            averageRating: avgRating._avg.note || null,
          };
        }),
      );

      return {
        items: lieuxWithRatings,
        total,
        hasMore: input.offset + input.limit < total,
      };
    }),

  // Get lieux by commune
  getByCommune: publicProcedure
    .input(
      z.object({
        communeId: z.string().uuid(),
        type: lieuTypeEnum.optional(),
        limit: z.number().min(1).max(50).default(20),
      }),
    )
    .query(async ({ ctx, input }) => {
      const where: any = {
        communeId: input.communeId,
        verified: true,
      };
      if (input.type) {
        where.type = input.type;
      }

      return ctx.prisma.lieu.findMany({
        where,
        include: {
          commune: { select: { name: true } },
          servicesProposed: { take: 3 },
          _count: { select: { avis: true } },
        },
        take: input.limit,
        orderBy: { nom: "asc" },
      });
    }),

  // Get lieux by zone de santé
  getByZoneSante: publicProcedure
    .input(
      z.object({
        zoneSanteId: z.string().uuid(),
        limit: z.number().min(1).max(50).default(20),
      }),
    )
    .query(async ({ ctx, input }) => {
      return ctx.prisma.lieu.findMany({
        where: {
          zoneSanteId: input.zoneSanteId,
          verified: true,
        },
        include: {
          commune: { select: { name: true } },
          zoneSante: { select: { name: true } },
          servicesProposed: {
            where: { categorie: "SANTE" },
            take: 5,
          },
          _count: { select: { avis: true } },
        },
        take: input.limit,
        orderBy: { nom: "asc" },
      });
    }),

  // Get nearby lieux (basic distance calculation)
  getNearby: publicProcedure
    .input(
      z.object({
        latitude: z.number().min(-90).max(90),
        longitude: z.number().min(-180).max(180),
        radiusKm: z.number().min(0.1).max(50).default(5),
        type: lieuTypeEnum.optional(),
        limit: z.number().min(1).max(50).default(20),
      }),
    )
    .query(async ({ ctx, input }) => {
      // Get all lieux with coordinates
      const allLieux = await ctx.prisma.lieu.findMany({
        where: {
          verified: true,
          latitude: { not: null },
          longitude: { not: null },
          ...(input.type ? { type: input.type } : {}),
        },
        include: {
          commune: { select: { name: true } },
          servicesProposed: { take: 3 },
          _count: { select: { avis: true } },
        },
      });

      // Calculate distance and filter
      const lieuxWithDistance = allLieux
        .map((lieu) => {
          const lat = Number(lieu.latitude);
          const lng = Number(lieu.longitude);
          const distance = calculateDistance(
            input.latitude,
            input.longitude,
            lat,
            lng,
          );
          return { ...lieu, distance };
        })
        .filter((lieu) => lieu.distance <= input.radiusKm)
        .sort((a, b) => a.distance - b.distance)
        .slice(0, input.limit);

      return lieuxWithDistance;
    }),

  // Get single lieu by ID with full details
  getById: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const lieu = await ctx.prisma.lieu.findUnique({
        where: { id: input.id },
        include: {
          commune: true,
          quartier: true,
          zoneSante: true,
          servicesProposed: {
            orderBy: { categorie: "asc" },
          },
          avis: {
            where: { approved: true },
            orderBy: { createdAt: "desc" },
            take: 10,
          },
          _count: {
            select: { avis: true, favoris: true },
          },
        },
      });

      if (!lieu) return null;

      // Calculate average rating
      const avgRating = await ctx.prisma.avis.aggregate({
        where: { lieuId: lieu.id, approved: true },
        _avg: { note: true },
      });

      return {
        ...lieu,
        averageRating: avgRating._avg.note || null,
      };
    }),

  // Get all lieux for map
  getAllForMap: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.lieu.findMany({
      where: {
        verified: true,
        latitude: { not: null },
        longitude: { not: null },
      },
      select: {
        id: true,
        nom: true,
        type: true,
        latitude: true,
        longitude: true,
        commune: {
          select: { name: true },
        },
      },
    });
  }),

  // Create a new lieu (for admin)
  create: protectedProcedure
    .input(
      z.object({
        nom: z.string().min(2).max(200),
        type: lieuTypeEnum,
        communeId: z.string().uuid().optional(),
        quartierId: z.string().uuid().optional(),
        zoneSanteId: z.string().uuid().optional(),
        adresse: z.string().optional(),
        reperes: z.string().optional(),
        telephone: z.string().optional(),
        telephone2: z.string().optional(),
        email: z.string().email().optional(),
        siteWeb: z.string().url().optional(),
        horaires: z.record(z.string()).optional(),
        latitude: z.number().min(-90).max(90).optional(),
        longitude: z.number().min(-180).max(180).optional(),
        photos: z.array(z.string().url()).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.lieu.create({
        data: {
          ...input,
          horaires: input.horaires,
          photos: input.photos || [],
          createdBy: ctx.userId,
        },
      });
    }),

  // Update lieu
  update: protectedProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        nom: z.string().min(2).max(200).optional(),
        type: lieuTypeEnum.optional(),
        adresse: z.string().optional(),
        reperes: z.string().optional(),
        telephone: z.string().optional(),
        telephone2: z.string().optional(),
        email: z.string().email().optional(),
        siteWeb: z.string().url().optional(),
        horaires: z.record(z.string()).optional(),
        latitude: z.number().min(-90).max(90).optional(),
        longitude: z.number().min(-180).max(180).optional(),
        photos: z.array(z.string().url()).optional(),
        verified: z.boolean().optional(),
        featured: z.boolean().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return ctx.prisma.lieu.update({
        where: { id },
        data,
      });
    }),
});

// Haversine formula to calculate distance between two coordinates
function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(deg: number): number {
  return deg * (Math.PI / 180);
}
