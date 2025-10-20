import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("adminpass", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      password,
      role: "admin"
    }
  });

  await prisma.item.createMany({
    data: [
      { name: "Boston Fern", description: "Green and lush", quantity: 12, price: 9.99 },
      { name: "Monstera Deliciosa", description: "Classic split leaf", quantity: 5, price: 29.99 },
      { name: "Snake Plant", description: "Hardy, low light", quantity: 20, price: 14.5 }
    ],
    skipDuplicates: true
  });

  console.log("Seeded admin:", admin.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
