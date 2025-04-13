export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    REFRESH_TOKEN: '/api/auth/refresh-token',
  },
  VEHICLES: {
    LIST: '/api/vehicles',
    DETAILS: (id: string) => `/api/vehicles/${id}`,
  },
  BOOKINGS: {
    LIST: '/api/bookings',
    DETAILS: (id: string) => `/api/bookings/${id}`,
  },
};
