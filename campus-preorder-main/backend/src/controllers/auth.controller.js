import bcrypt from "bcrypt";
import { prisma } from "../lib/prisma.js";
import { generateToken } from "../utils/jwt.js";

const isCampusEmail = (email, domain) => {
  const normalizedDomain = domain.startsWith("@") ? domain : `@${domain}`;
  return email.toLowerCase().endsWith(normalizedDomain.toLowerCase());
};

// REGISTER
export const register = async (req, res) => {
  const { name, email, password, campusId } = req.body;

  if (!name || !email || !password || !campusId) {
    return res.status(400).json({ message: "Name, email, password and campus are required" });
  }

  const campus = await prisma.campus.findUnique({
    where: { id: campusId }
  });

  if (!campus || !isCampusEmail(email, campus.domain)) {
    return res.status(400).json({ message: "Invalid campus email" });
  }

  const normalizedEmail = email.toLowerCase();

  const existingUser = await prisma.user.findUnique({
    where: { email: normalizedEmail }
  });

  if (existingUser) {
    return res.status(409).json({ message: "Email is already registered" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name,
      email: normalizedEmail,
      password: hashedPassword,
      role: "USER",
      campusId
    }
  });

  res.json({ message: "User registered successfully" });
};

// LOGIN
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const user = await prisma.user.findUnique({
    where: { email: email.toLowerCase() }
  });

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = generateToken(user);

  res.json({ token });
};
