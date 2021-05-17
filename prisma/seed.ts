import { PrismaClient } from '@prisma/client';
import { Logger } from 'tslog';

const prisma = new PrismaClient();
const logger = new Logger();

async function main() {
  const admin = await prisma.user.upsert({
    where: { email: 'raulmax@mail.com' },
    update: {},
    create: {
      email: 'raulmax@mail.com',
      username: 'admin',
      password: '1234', // @TODO encrypt
      createdAt: new Date(),
      role: 'ADMIN',
    },
  });

  const user = await prisma.user.upsert({
    create: {
      email: 'user@mail.com',
      username: 'user',
      password: '4321', // @TODO encrypt
      createdAt: new Date(),
      role: 'USER',
    },
    where: {},
    update: {},
  });
}

main()
  .catch((error) => {
    logger.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
