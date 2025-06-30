import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // 🔐 Crée un admin
  const adminPassword = await bcrypt.hash('123456', 10);
  await prisma.user.upsert({
    where: { email: 'admin@we.com' },
    update: {},
    create: {
      email: 'admin@we.com',
      password: adminPassword,
      role: 'admin'
    }
  });

  // 👤 Crée un employee
  const userPassword = await bcrypt.hash('userpass', 10);
  await prisma.user.upsert({
    where: { email: 'user@we.com' },
    update: {},
    create: {
      email: 'user@we.com',
      password: userPassword,
      role: 'employee'
    }
  });

  // 🏢 Crée une salle de réunion
  await prisma.room.create({
    data: {
      name: 'Salle A',
      capacity: 10,
      features: ['TV', 'Tableau blanc'],
      rules: {
        maxDurationMinutes: 120,
        allowWeekends: false,
        minAdvanceHours: 2
      }
    }
  });
}

main()
  .then(() => {
    console.log('✅ Seed terminé');
  })
  .catch((e) => {
    console.error('❌ Erreur de seed :', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
