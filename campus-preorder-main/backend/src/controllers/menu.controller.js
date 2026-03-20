import { prisma } from "../lib/prisma.js";

// ADD MENU ITEM
export const addMenuItem = async (req, res) => {
  const { name, price, vendorId } = req.body;

  if (!name || !vendorId || typeof price !== "number") {
    return res.status(400).json({ message: "Name, numeric price, and vendorId are required" });
  }

  const vendor = await prisma.vendor.findFirst({
    where: {
      id: vendorId,
      campusId: req.user.campusId
    }
  });

  if (!vendor) {
    return res.status(404).json({ message: "Vendor not found for this campus" });
  }

  const menu = await prisma.menu.create({
    data: {
      name,
      price,
      vendorId
    }
  });

  res.json(menu);
};

// GET MENU FOR VENDOR
export const getVendorMenu = async (req, res) => {
  const vendor = await prisma.vendor.findFirst({
    where: {
      id: req.params.vendorId,
      campusId: req.user.campusId
    }
  });

  if (!vendor) {
    return res.status(404).json({ message: "Vendor not found for this campus" });
  }

  const menu = await prisma.menu.findMany({
    where: {
      vendorId: req.params.vendorId,
      isActive: true
    },
    orderBy: { name: "asc" }
  });

  res.json(menu);
};
