import { z } from "zod";
import { router, publicProcedure } from "../trpc";

export const adminRouter = router({
  // Dashboard stats
  getStats: publicProcedure.query(async ({ ctx }) => {
    const [
      totalUsers,
      totalLieux,
      totalServices,
      totalAvis,
      totalCommunes,
      totalQuartiers,
      totalZonesSante,
      totalDeputes,
      totalProjets,
      totalSignalements,
    ] = await Promise.all([
      ctx.prisma.user.count(),
      ctx.prisma.lieu.count(),
      ctx.prisma.servicePropose.count(),
      ctx.prisma.avis.count(),
      ctx.prisma.commune.count(),
      ctx.prisma.quartier.count(),
      ctx.prisma.zoneSante.count(),
      ctx.prisma.depute.count(),
      ctx.prisma.projet.count(),
      ctx.prisma.signalement.count(),
    ]);

    // Lieux by type
    const lieuxByType = await ctx.prisma.lieu.groupBy({
      by: ["type"],
      _count: { id: true },
    });

    // Recent users
    const recentUsers = await ctx.prisma.user.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        email: true,
        prenom: true,
        nom: true,
        role: true,
        active: true,
        createdAt: true,
      },
    });

    return {
      totalUsers,
      totalLieux,
      totalServices,
      totalAvis,
      totalCommunes,
      totalQuartiers,
      totalZonesSante,
      totalDeputes,
      totalProjets,
      totalSignalements,
      lieuxByType: lieuxByType.map((l) => ({
        type: l.type,
        count: l._count.id,
      })),
      recentUsers,
    };
  }),

  // List users
  getUsers: publicProcedure
    .input(
      z
        .object({
          search: z.string().optional(),
          role: z.string().optional(),
          limit: z.number().min(1).max(100).default(20),
          offset: z.number().min(0).default(0),
        })
        .optional(),
    )
    .query(async ({ ctx, input }) => {
      const where: any = {};
      if (input?.search) {
        where.OR = [
          { email: { contains: input.search, mode: "insensitive" } },
          { prenom: { contains: input.search, mode: "insensitive" } },
          { nom: { contains: input.search, mode: "insensitive" } },
        ];
      }
      if (input?.role) {
        where.role = input.role;
      }

      const [users, total] = await Promise.all([
        ctx.prisma.user.findMany({
          where,
          take: input?.limit ?? 20,
          skip: input?.offset ?? 0,
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            email: true,
            prenom: true,
            nom: true,
            phone: true,
            role: true,
            active: true,
            provider: true,
            createdAt: true,
          },
        }),
        ctx.prisma.user.count({ where }),
      ]);

      return { items: users, total };
    }),

  // Update user role
  updateUserRole: publicProcedure
    .input(
      z.object({
        userId: z.string().uuid(),
        role: z.enum(["VISITEUR", "GESTIONNAIRE", "ADMINISTRATEUR"]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.user.update({
        where: { id: input.userId },
        data: { role: input.role as any },
        select: {
          id: true,
          email: true,
          role: true,
        },
      });
    }),

  // Toggle user active status
  toggleUserActive: publicProcedure
    .input(z.object({ userId: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: { id: input.userId },
      });
      if (!user) throw new Error("Utilisateur introuvable");

      return ctx.prisma.user.update({
        where: { id: input.userId },
        data: { active: !user.active },
        select: { id: true, email: true, active: true },
      });
    }),

  // CRUD for lieux
  createLieu: publicProcedure
    .input(
      z.object({
        nom: z.string().min(1),
        type: z.string(),
        communeId: z.string().uuid().optional(),
        adresse: z.string().optional(),
        telephone: z.string().optional(),
        email: z.string().optional(),
        latitude: z.number().optional(),
        longitude: z.number().optional(),
        responsable: z.string().optional(),
        verified: z.boolean().default(false),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.lieu.create({
        data: {
          nom: input.nom,
          type: input.type as any,
          communeId: input.communeId,
          adresse: input.adresse,
          telephone: input.telephone,
          email: input.email,
          latitude: input.latitude,
          longitude: input.longitude,
          responsable: input.responsable,
          verified: input.verified,
        },
      });
    }),

  // Update lieu
  updateLieu: publicProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        nom: z.string().optional(),
        type: z.string().optional(),
        adresse: z.string().optional(),
        telephone: z.string().optional(),
        email: z.string().optional(),
        latitude: z.number().optional(),
        longitude: z.number().optional(),
        responsable: z.string().optional(),
        verified: z.boolean().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return ctx.prisma.lieu.update({
        where: { id },
        data: data as any,
      });
    }),

  // Delete lieu
  deleteLieu: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.lieu.delete({ where: { id: input.id } });
    }),

  // CRUD for gouvernorat
  upsertGouvernorat: publicProcedure
    .input(
      z.object({
        id: z.string().uuid().optional(),
        gouverneur: z.string(),
        photoUrl: z.string().optional(),
        adresse: z.string().optional(),
        telephone: z.string().optional(),
        email: z.string().optional(),
        siteWeb: z.string().optional(),
        description: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (input.id) {
        return ctx.prisma.gouvernorat.update({
          where: { id: input.id },
          data: input,
        });
      }
      return ctx.prisma.gouvernorat.create({ data: input });
    }),

  // CRUD for ministres
  createMinistre: publicProcedure
    .input(
      z.object({
        gouvernoratId: z.string().uuid(),
        nom: z.string(),
        portefeuille: z.string(),
        photoUrl: z.string().optional(),
        telephone: z.string().optional(),
        email: z.string().optional(),
        ordre: z.number().default(0),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.ministre.create({ data: input });
    }),

  // CRUD for deputes
  createDepute: publicProcedure
    .input(
      z.object({
        nom: z.string(),
        parti: z.string().optional(),
        circonscription: z.string().optional(),
        photoUrl: z.string().optional(),
        telephone: z.string().optional(),
        email: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.depute.create({ data: input });
    }),

  // CRUD for projets
  createProjet: publicProcedure
    .input(
      z.object({
        titre: z.string(),
        description: z.string().optional(),
        statut: z.string().default("PLANIFIE"),
        budget: z.number().optional(),
        devise: z.string().default("USD"),
        dateDebut: z.string().optional(),
        dateFin: z.string().optional(),
        localisation: z.string().optional(),
        maitreDoeuvre: z.string().optional(),
        categorie: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.projet.create({
        data: {
          ...input,
          dateDebut: input.dateDebut ? new Date(input.dateDebut) : null,
          dateFin: input.dateFin ? new Date(input.dateFin) : null,
        } as any,
      });
    }),

  updateProjet: publicProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        titre: z.string().optional(),
        description: z.string().optional(),
        statut: z.string().optional(),
        budget: z.number().optional(),
        localisation: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return ctx.prisma.projet.update({ where: { id }, data: data as any });
    }),

  deleteProjet: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.projet.delete({ where: { id: input.id } });
    }),
});
