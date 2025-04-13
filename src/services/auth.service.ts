import prisma from "@/lib/db/prisma";
import { hashPassword, verifyPassword } from "@/lib/auth/hashing";
import { generateToken, verifyToken } from "@/lib/auth/jwt";

export const registerUser = async (email: string, password: string, firstName?: string, lastName?: string) => {
  const hashedPassword = await hashPassword(password);
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      firstName,
      lastName,
    },
  });
  return user;
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || !(await verifyPassword(password, user.password))) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken({ userId: user.id });
  return { user, token };
};

export const refreshToken = async (token: string) => {
  const payload = verifyToken(token);
  if (!payload) {
    throw new Error("Invalid token");
  }

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const newToken = generateToken({ userId: user.id });
  return { user, newToken };
};
