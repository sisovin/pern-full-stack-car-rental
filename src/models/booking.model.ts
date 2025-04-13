import { Prisma } from '@prisma/client';

export const Booking = Prisma.defineModel({
  name: 'Booking',
  fields: {
    id: { type: 'Int', id: true, default: { autoincrement: true } },
    startDate: { type: 'DateTime' },
    endDate: { type: 'DateTime' },
    userId: { type: 'Int' },
    user: { type: 'User', relation: { fields: ['userId'], references: ['id'] } },
    vehicleId: { type: 'Int' },
    vehicle: { type: 'Vehicle', relation: { fields: ['vehicleId'], references: ['id'] } },
    createdAt: { type: 'DateTime', default: { now: true } },
    updatedAt: { type: 'DateTime', default: { now: true }, updatedAt: true },
    deletedAt: { type: 'DateTime', optional: true, map: 'deleted_at' },
  },
  map: 'bookings',
});
