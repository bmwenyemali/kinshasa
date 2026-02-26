import { prisma, type PrismaClient } from "@kinservices/database";

export interface Context {
  prisma: PrismaClient;
  userId?: string;
}

export const createContext = (): Context => {
  return {
    prisma,
  };
};

export const createContextWithUser = (userId?: string): Context => {
  return {
    prisma,
    userId,
  };
};
