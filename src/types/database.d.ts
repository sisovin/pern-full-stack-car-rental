export interface BaseModel {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export interface User extends BaseModel {
  email: string;
  password: string;
  firstName?: string | null;
  lastName?: string | null;
  refreshTokens: RefreshToken[];
  bookings: Booking[];
}

export interface RefreshToken {
  id: number;
  token: string;
  userId: number;
  user: User;
  expiresAt: Date;
  createdAt: Date;
}

export interface Vehicle extends BaseModel {
  make: string;
  model: string;
  year: number;
  bookings: Booking[];
}

export interface Booking extends BaseModel {
  startDate: Date;
  endDate: Date;
  userId: number;
  user: User;
  vehicleId: number;
  vehicle: Vehicle;
}
