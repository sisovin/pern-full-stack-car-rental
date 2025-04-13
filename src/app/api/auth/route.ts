import { NextApiRequest, NextApiResponse } from 'next';
import { hashPassword, verifyPassword } from '@/lib/auth/hashing';
import { generateToken, verifyToken } from '@/lib/auth/jwt';
import { prisma } from '@/lib/db/prisma';
import { setCookie } from 'nookies';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isValid = await verifyPassword(password, user.password);

    if (!isValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const accessToken = generateToken({ userId: user.id });
    const refreshToken = generateToken({ userId: user.id }, '7d');

    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    setCookie({ res }, 'accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60,
      path: '/',
    });

    setCookie({ res }, 'refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    });

    return res.status(200).json({ message: 'Login successful' });
  }

  return res.status(405).json({ message: 'Method not allowed' });
};

export default handler;
