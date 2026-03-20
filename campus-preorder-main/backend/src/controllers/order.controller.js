import { prisma } from "../lib/prisma.js";

// CREATE ORDER
export const createOrder = async (req, res) => {
  const { vendorId, items } = req.body;

  if (!vendorId || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: "vendorId and at least one item are required" });
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

  const sanitizedItems = items.map(item => ({
    name: item.name,
    price: Number(item.price),
    qty: Number(item.qty)
  }));

  const hasInvalidItems = sanitizedItems.some(
    item =>
      !item.name ||
      Number.isNaN(item.price) ||
      Number.isNaN(item.qty) ||
      item.price < 0 ||
      item.qty <= 0
  );

  if (hasInvalidItems) {
    return res.status(400).json({ message: "Each item must include a valid name, price, and qty" });
  }

  let total = 0;
  sanitizedItems.forEach(item => {
    total += item.price * item.qty;
  });

  const order = await prisma.order.create({
    data: {
      userId: req.user.userId,
      vendorId,
      campusId: req.user.campusId,
      status: "CREATED",
      total,
      items: {
        create: sanitizedItems
      }
    },
    include: { items: true }
  });

  res.status(201).json(order);
};
