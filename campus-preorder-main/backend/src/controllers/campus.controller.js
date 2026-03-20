import { prisma } from "../lib/prisma.js";

export const listCampuses = async (_req, res) => {
  const campuses = await prisma.campus.findMany({
    select: {
      id: true,
      name: true,
      domain: true,
    },
    orderBy: { name: "asc" },
  });

  res.json(campuses);
};
