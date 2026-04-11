import { PrismaClient } from '../generated/prisma/index.js';

const globalForPrisma = globalThis;

export const prisma =
  globalForPrisma.__factoryMapPrisma ??
  new PrismaClient({
    log: ['error', 'warn'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.__factoryMapPrisma = prisma;
}
