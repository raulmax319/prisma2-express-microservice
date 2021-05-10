import { PrismaClient } from '@prisma/client';

class Database extends PrismaClient {}

export const database: PrismaClient = new Database();
