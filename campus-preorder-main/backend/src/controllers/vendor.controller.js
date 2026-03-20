import { prisma } from "../lib/prisma.js";

// CREATE VENDOR
export const createVendor = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Vendor name is required" });
  }

  const vendor = await prisma.vendor.create({
    data: {
      name,
      campusId: req.user.campusId
    }
  });

  res.json(vendor);
};

// GET VENDORS FOR CAMPUS
export const getCampusVendors = async (req, res) => {
  const vendors = await prisma.vendor.findMany({
    where: {
      campusId: req.user.campusId
    },
    orderBy: { name: "asc" }
  });

  res.json(vendors);
};
