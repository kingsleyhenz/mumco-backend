import { PrismaClient } from '@prisma/client';
import { generalLogger } from '../lib/logger';

const prisma = new PrismaClient();

export async function connectDB() {
  await prisma.$connect();
  generalLogger.info('🔥 connected to db');
}

export async function disconnectDB() {
  await prisma.$disconnect();
  generalLogger.info('🧊 disconnected from db');
}

export default prisma;
