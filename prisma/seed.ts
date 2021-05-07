import { PrismaClient } from '@prisma/client';
import formatDate from '../src/helpers/format-date';

const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.upsert({
    where: { email: 'raulmax@mail.com' },
    update: {},
    create: {
      email: 'raulmax@mail.com',
      username: 'admin',
      password: '1234', // @TODO encrypt
      createdAt: new Date(),
    },
  });

  const user = await prisma.user.upsert({
    create: {
      email: 'user@mail.com',
      username: 'user',
      password: '4321', // @TODO encrypt
      createdAt: new Date(),
    },
    where: {},
    update: {},
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });