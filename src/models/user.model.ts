import { Prisma } from '@prisma/client';

export const User = Prisma.defineModel({
  name: 'User',
  fields: {
    id: { type: 'Int', id: true, default: { autoincrement: true } },
    email: { type: 'String', unique: true },
    password: { type: 'String' },
    firstName: { type: 'String', optional: true },
    lastName: { type: 'String', optional: true },
    refreshTokens: { type: 'RefreshToken[]' },
    bookings: { type: 'Booking[]' },
    createdAt: { type: 'DateTime', default: { now: true } },
    updatedAt: { type: 'DateTime', default: { now: true }, updatedAt: true },
    deletedAt: { type: 'DateTime', optional: true, map: 'deleted_at' },
  },
  map: 'users',
});
