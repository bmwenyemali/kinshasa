import { z } from "zod";
import { router, publicProcedure } from "../trpc";

export const authRouter = router({
  // Register a new user
  register: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(6).optional(),
        provider: z.enum(["EMAIL", "GOOGLE", "FACEBOOK"]).default("EMAIL"),
        providerId: z.string().optional(),
        prenom: z.string().optional(),
        nom: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Check if user exists
      const existing = await ctx.prisma.user.findUnique({
        where: { email: input.email },
      });
      if (existing) {
        throw new Error("Un compte avec cet email existe déjà");
      }

      // Simple hash for demo (in production, use bcrypt)
      let passwordHash: string | null = null;
      if (input.password) {
        // Simple Base64 encoding for demo purposes
        passwordHash = Buffer.from(input.password).toString("base64");
      }

      const user = await ctx.prisma.user.create({
        data: {
          email: input.email,
          passwordHash,
          provider: input.provider as any,
          providerId: input.providerId,
          prenom: input.prenom,
          nom: input.nom,
          role: "VISITEUR" as any,
          active: true,
        },
      });

      return {
        id: user.id,
        email: user.email,
        prenom: user.prenom,
        nom: user.nom,
        role: user.role,
      };
    }),

  // Login
  login: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: { email: input.email },
      });
      if (!user || !user.active) {
        throw new Error("Email ou mot de passe incorrect");
      }

      const passwordHash = Buffer.from(input.password).toString("base64");
      if (user.passwordHash !== passwordHash) {
        throw new Error("Email ou mot de passe incorrect");
      }

      return {
        id: user.id,
        email: user.email,
        prenom: user.prenom,
        nom: user.nom,
        role: user.role,
        photoUrl: user.photoUrl,
      };
    }),

  // Social login / register
  socialAuth: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        provider: z.enum(["GOOGLE", "FACEBOOK"]),
        providerId: z.string(),
        prenom: z.string().optional(),
        nom: z.string().optional(),
        photoUrl: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Find or create user
      let user = await ctx.prisma.user.findUnique({
        where: { email: input.email },
      });

      if (!user) {
        user = await ctx.prisma.user.create({
          data: {
            email: input.email,
            provider: input.provider as any,
            providerId: input.providerId,
            prenom: input.prenom,
            nom: input.nom,
            photoUrl: input.photoUrl,
            role: "VISITEUR" as any,
            active: true,
          },
        });
      }

      return {
        id: user.id,
        email: user.email,
        prenom: user.prenom,
        nom: user.nom,
        role: user.role,
        photoUrl: user.photoUrl,
      };
    }),

  // Get user profile
  getProfile: publicProcedure
    .input(z.object({ userId: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.user.findUnique({
        where: { id: input.userId },
        select: {
          id: true,
          email: true,
          prenom: true,
          nom: true,
          phone: true,
          sexe: true,
          trancheAge: true,
          photoUrl: true,
          role: true,
          createdAt: true,
        },
      });
    }),

  // Update profile
  updateProfile: publicProcedure
    .input(
      z.object({
        userId: z.string().uuid(),
        prenom: z.string().optional(),
        nom: z.string().optional(),
        phone: z.string().optional(),
        sexe: z.string().optional(),
        trancheAge: z.string().optional(),
        photoUrl: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { userId, ...data } = input;
      return ctx.prisma.user.update({
        where: { id: userId },
        data,
        select: {
          id: true,
          email: true,
          prenom: true,
          nom: true,
          phone: true,
          sexe: true,
          trancheAge: true,
          photoUrl: true,
          role: true,
        },
      });
    }),
});
