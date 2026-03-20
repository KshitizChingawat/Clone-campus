import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const campuses = [
  { name: "Medi-Caps University", domain: "medicaps.ac.in" },
  { name: "Campus Demo University", domain: "campus.edu" },
];

async function main() {
  for (const campus of campuses) {
    await prisma.campus.upsert({
      where: { domain: campus.domain },
      update: { name: campus.name },
      create: campus,
    });
  }

  console.log("Seeded campuses");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
