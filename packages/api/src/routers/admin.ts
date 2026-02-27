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
      totalDocuments,
      totalDistricts,
      totalMinistres,
      totalAlertes,
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
      ctx.prisma.document.count(),
      ctx.prisma.district.count(),
      ctx.prisma.ministre.count(),
      ctx.prisma.alerte.count(),
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
      totalDocuments,
      totalDistricts,
      totalMinistres,
      totalAlertes,
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

  // Update ministre
  updateMinistre: publicProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        nom: z.string().optional(),
        portefeuille: z.string().optional(),
        photoUrl: z.string().optional(),
        telephone: z.string().optional(),
        email: z.string().optional(),
        ordre: z.number().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return ctx.prisma.ministre.update({ where: { id }, data: data as any });
    }),

  // Delete ministre
  deleteMinistre: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.ministre.delete({ where: { id: input.id } });
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

  // Update depute
  updateDepute: publicProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        nom: z.string().optional(),
        parti: z.string().optional(),
        circonscription: z.string().optional(),
        photoUrl: z.string().optional(),
        telephone: z.string().optional(),
        email: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return ctx.prisma.depute.update({ where: { id }, data: data as any });
    }),

  // Delete depute
  deleteDepute: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.depute.delete({ where: { id: input.id } });
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

  // ============ CRUD for Documents ============
  getDocuments: publicProcedure
    .input(
      z
        .object({
          search: z.string().optional(),
          categorie: z.string().optional(),
          limit: z.number().min(1).max(100).default(50),
          offset: z.number().min(0).default(0),
        })
        .optional(),
    )
    .query(async ({ ctx, input }) => {
      const where: any = {};
      if (input?.search) {
        where.OR = [
          { nom: { contains: input.search, mode: "insensitive" } },
          { description: { contains: input.search, mode: "insensitive" } },
        ];
      }
      if (input?.categorie) where.categorie = input.categorie;
      const [items, total] = await Promise.all([
        ctx.prisma.document.findMany({
          where,
          take: input?.limit ?? 50,
          skip: input?.offset ?? 0,
          orderBy: { nom: "asc" },
        }),
        ctx.prisma.document.count({ where }),
      ]);
      return { items, total };
    }),

  createDocument: publicProcedure
    .input(
      z.object({
        nom: z.string().min(1),
        slug: z.string().min(1),
        categorie: z.string(),
        description: z.string().optional(),
        definition: z.string().optional(),
        role: z.string().optional(),
        prixEstimatif: z.string().optional(),
        devise: z.string().optional(),
        delaiEstimatif: z.string().optional(),
        documentsRequis: z.array(z.string()).optional(),
        procedure: z.string().optional(),
        ouObtenir: z.string().optional(),
        conseils: z.string().optional(),
        baseJuridique: z.string().optional(),
        aliases: z.array(z.string()).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.document.create({ data: input as any });
    }),

  updateDocument: publicProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        nom: z.string().optional(),
        slug: z.string().optional(),
        categorie: z.string().optional(),
        description: z.string().optional(),
        definition: z.string().optional(),
        role: z.string().optional(),
        prixEstimatif: z.string().optional(),
        devise: z.string().optional(),
        delaiEstimatif: z.string().optional(),
        documentsRequis: z.array(z.string()).optional(),
        procedure: z.string().optional(),
        ouObtenir: z.string().optional(),
        conseils: z.string().optional(),
        baseJuridique: z.string().optional(),
        aliases: z.array(z.string()).optional(),
        commentaire: z.string().nullable().optional(),
        actif: z.boolean().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return ctx.prisma.document.update({ where: { id }, data: data as any });
    }),

  deleteDocument: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.document.delete({ where: { id: input.id } });
    }),

  // ============ CRUD for Communes ============
  getCommunes: publicProcedure
    .input(
      z
        .object({
          search: z.string().optional(),
          districtId: z.string().optional(),
          limit: z.number().min(1).max(100).default(50),
          offset: z.number().min(0).default(0),
        })
        .optional(),
    )
    .query(async ({ ctx, input }) => {
      const where: any = {};
      if (input?.search) {
        where.name = { contains: input.search, mode: "insensitive" };
      }
      if (input?.districtId) where.districtId = input.districtId;
      const [items, total] = await Promise.all([
        ctx.prisma.commune.findMany({
          where,
          include: { district: { select: { name: true } } },
          take: input?.limit ?? 50,
          skip: input?.offset ?? 0,
          orderBy: { name: "asc" },
        }),
        ctx.prisma.commune.count({ where }),
      ]);
      return { items, total };
    }),

  createCommune: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        description: z.string().optional(),
        population: z.number().optional(),
        superficie: z.number().optional(),
        bourgmestre: z.string().optional(),
        districtId: z.string().uuid().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.commune.create({ data: input as any });
    }),

  updateCommune: publicProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        name: z.string().optional(),
        description: z.string().optional(),
        population: z.number().optional(),
        superficie: z.number().optional(),
        bourgmestre: z.string().optional(),
        districtId: z.string().uuid().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return ctx.prisma.commune.update({ where: { id }, data: data as any });
    }),

  deleteCommune: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.commune.delete({ where: { id: input.id } });
    }),

  // ============ CRUD for Districts ============
  getDistricts: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.district.findMany({
      include: { _count: { select: { communes: true } } },
      orderBy: { name: "asc" },
    });
  }),

  createDistrict: publicProcedure
    .input(
      z.object({ name: z.string().min(1), description: z.string().optional() }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.district.create({ data: input });
    }),

  updateDistrict: publicProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        name: z.string().optional(),
        description: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return ctx.prisma.district.update({ where: { id }, data });
    }),

  deleteDistrict: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.district.delete({ where: { id: input.id } });
    }),

  // ============ CRUD for Services ============
  getServices: publicProcedure
    .input(
      z
        .object({
          search: z.string().optional(),
          categorie: z.string().optional(),
          limit: z.number().min(1).max(100).default(50),
          offset: z.number().min(0).default(0),
        })
        .optional(),
    )
    .query(async ({ ctx, input }) => {
      const where: any = {};
      if (input?.search) {
        where.OR = [
          { nomService: { contains: input.search, mode: "insensitive" } },
          { description: { contains: input.search, mode: "insensitive" } },
        ];
      }
      if (input?.categorie) where.categorie = input.categorie;
      const [items, total] = await Promise.all([
        ctx.prisma.servicePropose.findMany({
          where,
          include: { lieu: { select: { id: true, nom: true } } },
          take: input?.limit ?? 50,
          skip: input?.offset ?? 0,
          orderBy: { nomService: "asc" },
        }),
        ctx.prisma.servicePropose.count({ where }),
      ]);
      return { items, total };
    }),

  createService: publicProcedure
    .input(
      z.object({
        lieuId: z.string().uuid(),
        nomService: z.string().min(1),
        categorie: z.string(),
        description: z.string().optional(),
        prixOfficiel: z.number().optional(),
        devise: z.string().default("FC"),
        delai: z.string().optional(),
        documentsRequis: z.array(z.string()).optional(),
        procedure: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.servicePropose.create({ data: input as any });
    }),

  updateService: publicProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        nomService: z.string().optional(),
        categorie: z.string().optional(),
        description: z.string().optional(),
        prixOfficiel: z.number().optional(),
        devise: z.string().optional(),
        delai: z.string().optional(),
        documentsRequis: z.array(z.string()).optional(),
        procedure: z.string().optional(),
        conditionsParticulieres: z.string().optional(),
        commentaire: z.string().nullable().optional(),
        actif: z.boolean().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return ctx.prisma.servicePropose.update({
        where: { id },
        data: data as any,
      });
    }),

  deleteService: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.servicePropose.delete({ where: { id: input.id } });
    }),

  // ============ Signalements ============
  getSignalements: publicProcedure
    .input(
      z
        .object({
          statut: z.string().optional(),
          limit: z.number().min(1).max(100).default(50),
          offset: z.number().min(0).default(0),
        })
        .optional(),
    )
    .query(async ({ ctx, input }) => {
      const where: any = {};
      if (input?.statut) where.statut = input.statut;
      const [items, total] = await Promise.all([
        ctx.prisma.signalement.findMany({
          where,
          include: {
            lieu: { select: { id: true, nom: true } },
          },
          take: input?.limit ?? 50,
          skip: input?.offset ?? 0,
          orderBy: { createdAt: "desc" },
        }),
        ctx.prisma.signalement.count({ where }),
      ]);
      return { items, total };
    }),

  updateSignalement: publicProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        statut: z.string().optional(),
        reponseAdmin: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return ctx.prisma.signalement.update({
        where: { id },
        data: data as any,
      });
    }),

  deleteSignalement: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.signalement.delete({ where: { id: input.id } });
    }),

  // ============ Alertes ============
  getAlertes: publicProcedure
    .input(
      z
        .object({
          limit: z.number().min(1).max(100).default(50),
          offset: z.number().min(0).default(0),
        })
        .optional(),
    )
    .query(async ({ ctx, input }) => {
      const [items, total] = await Promise.all([
        ctx.prisma.alerte.findMany({
          take: input?.limit ?? 50,
          skip: input?.offset ?? 0,
          orderBy: { createdAt: "desc" },
        }),
        ctx.prisma.alerte.count(),
      ]);
      return { items, total };
    }),

  createAlerte: publicProcedure
    .input(
      z.object({
        titre: z.string().min(1),
        message: z.string().min(1),
        type: z.string().default("INFO"),
        communeId: z.string().uuid().optional(),
        active: z.boolean().default(true),
        dateExpiration: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.alerte.create({
        data: {
          ...input,
          dateExpiration: input.dateExpiration
            ? new Date(input.dateExpiration)
            : null,
        } as any,
      });
    }),

  updateAlerte: publicProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        titre: z.string().optional(),
        message: z.string().optional(),
        type: z.string().optional(),
        active: z.boolean().optional(),
        dateExpiration: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, dateExpiration, ...rest } = input;
      return ctx.prisma.alerte.update({
        where: { id },
        data: {
          ...rest,
          ...(dateExpiration !== undefined
            ? {
                dateExpiration: dateExpiration
                  ? new Date(dateExpiration)
                  : null,
              }
            : {}),
        } as any,
      });
    }),

  deleteAlerte: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.alerte.delete({ where: { id: input.id } });
    }),

  // ============ Zones de Santé ============
  getZonesSante: publicProcedure
    .input(
      z
        .object({
          search: z.string().optional(),
          limit: z.number().min(1).max(100).default(50),
          offset: z.number().min(0).default(0),
        })
        .optional(),
    )
    .query(async ({ ctx, input }) => {
      const where: any = {};
      if (input?.search) {
        where.name = { contains: input.search, mode: "insensitive" };
      }
      const [items, total] = await Promise.all([
        ctx.prisma.zoneSante.findMany({
          where,
          take: input?.limit ?? 50,
          skip: input?.offset ?? 0,
          orderBy: { name: "asc" },
        }),
        ctx.prisma.zoneSante.count({ where }),
      ]);
      return { items, total };
    }),

  createZoneSante: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        communeId: z.string().uuid().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.zoneSante.create({ data: input as any });
    }),

  updateZoneSante: publicProcedure
    .input(z.object({ id: z.string().uuid(), name: z.string().optional() }))
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return ctx.prisma.zoneSante.update({ where: { id }, data });
    }),

  deleteZoneSante: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.zoneSante.delete({ where: { id: input.id } });
    }),

  // ============ Quartiers ============
  getQuartiers: publicProcedure
    .input(
      z
        .object({
          search: z.string().optional(),
          communeId: z.string().optional(),
          limit: z.number().min(1).max(200).default(50),
          offset: z.number().min(0).default(0),
        })
        .optional(),
    )
    .query(async ({ ctx, input }) => {
      const where: any = {};
      if (input?.search) {
        where.name = { contains: input.search, mode: "insensitive" };
      }
      if (input?.communeId) where.communeId = input.communeId;
      const [items, total] = await Promise.all([
        ctx.prisma.quartier.findMany({
          where,
          include: { commune: { select: { name: true } } },
          take: input?.limit ?? 50,
          skip: input?.offset ?? 0,
          orderBy: { name: "asc" },
        }),
        ctx.prisma.quartier.count({ where }),
      ]);
      return { items, total };
    }),
});
