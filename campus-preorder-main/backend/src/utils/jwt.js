import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export const generateToken = (user) => {
  return jwt.sign(
    {
      userId: user.id,
      role: user.role,
      campusId: user.campusId
    },
    env.jwtSecret,
    { expiresIn: "7d" }
  );
};
