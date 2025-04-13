import { Prisma } from '@prisma/client';

export const Vehicle = Prisma.defineModel({
  name: 'Vehicle',
  fields: {
    id: { type: 'Int', id: true, default: { autoincrement: true } },
    make: { type: 'String' },
    model: { type: 'String' },
    year: { type: 'Int' },
    bookings: { type: 'Booking[]' },
    createdAt: { type: 'DateTime', default: { now: true } },
    updatedAt: { type: 'DateTime', default: { now: true }, updatedAt: true },
    deletedAt: { type: 'DateTime', optional: true, map: 'deleted_at' },
  },
  map: 'vehicles',
});
