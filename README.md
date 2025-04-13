# PERN Full Stack Car Rental

## Project Structure

```
pern-full-stack-car-rental/
├── .next/                   # Next.js build output
├── public/
│   ├── assets/              # Static assets
│   │   ├── images/          # All image assets
│   │   └── favicon.ico
│   └── robots.txt
├── src/
│   ├── app/                 # App router directory
│   │   ├── (auth)/          # Authentication routes
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   ├── register/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   ├── (public)/        # Public routes
│   │   │   ├── about/
│   │   │   │   └── page.tsx
│   │   │   ├── contact/
│   │   │   │   └── page.tsx
│   │   │   ├── vehicles/
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx
│   │   │   └── layout.tsx
│   │   ├── api/             # API routes
│   │   │   ├── auth/
│   │   │   │   ├── route.ts
│   │   │   │   └── [...nextauth]/
│   │   │   │       └── route.ts
│   │   │   ├── vehicles/
│   │   │   │   └── route.ts
│   │   │   └── ...
│   │   ├── dashboard/       # Authenticated user dashboard
│   │   │   ├── bookings/
│   │   │   │   └── page.tsx
│   │   │   ├── profile/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Home page
│   ├── components/
│   │   ├── auth/
│   │   │   ├── LoginForm.tsx
│   │   │   └── RegisterForm.tsx
│   │   ├── common/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Navbar.tsx
│   │   ├── vehicles/
│   │   │   ├── VehicleCard.tsx
│   │   │   └── VehicleFilter.tsx
│   │   └── ui/              # UI components
│   │       ├── buttons/
│   │       ├── forms/
│   │       └── ...
│   ├── config/
│   │   ├── auth.ts          # Auth configuration
│   │   ├── database.ts      # DB connection
│   │   └── redis.ts         # Redis client
│   ├── constants/
│   │   ├── endpoints.ts
│   │   └── ...
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useCache.ts
│   │   └── ...
│   ├── lib/
│   │   ├── auth/            # Auth utilities
│   │   │   ├── hashing.ts   # Argon2 implementation
│   │   │   └── jwt.ts
│   │   ├── cache/           # Redis utilities
│   │   ├── db/              # Prisma utilities
│   │   └── ...
│   ├── middleware.ts        # Authentication middleware
│   ├── models/
│   │   ├── base.model.ts    # Soft delete mixin
│   │   ├── user.model.ts
│   │   ├── vehicle.model.ts
│   │   ├── booking.model.ts
│   │   └── ...
│   ├── providers/
│   │   ├── AuthProvider.tsx
│   │   └── ...
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── vehicle.service.ts
│   │   └── ...
│   ├── styles/
│   │   ├── globals.css
│   │   ├── theme.ts         # If using styled-components
│   │   └── ...
│   ├── types/
│   │   ├── auth.d.ts
│   │   ├── database.d.ts
│   │   └── ...
│   └── utils/
│       ├── api.ts           # API client
│       ├── helpers.ts
│       └── ...
├── .env                     # Environment variables
├── .env.local               # Local environment variables
├── .eslintrc.json
├── .gitignore
├── next.config.js
├── package.json
├── prisma/
│   ├── schema.prisma        # Prisma schema with soft delete
│   └── migrations/
├── tsconfig.json
└── README.md
```

## Key Implementation Details (Without Coding)

1. **Authentication System**:
   - JWT with refresh tokens stored in HTTP-only cookies
   - Password hashing with Argon2
   - Protected routes using middleware

2. **Database**:
   - PostgreSQL with Prisma ORM
   - Soft-delete design using a `deletedAt` field in models
   - Prisma middleware to handle soft deletes

3. **Caching**:
   - Redis client for caching frequently accessed data
   - Cache invalidation strategies for vehicle listings

4. **Security**:
   - CSRF protection
   - Rate limiting for API routes
   - Input validation on all forms

5. **Frontend**:
   - Responsive design from original template
   - Client-side form validation
   - Optimized image loading

6. **API Design**:
   - RESTful endpoints with consistent response formats
   - Proper error handling
   - Rate limiting on sensitive endpoints

## Prisma Schema Example (Conceptual)

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model BaseModel {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  deletedAt DateTime? @map("deleted_at")
  
  @@map("_base")
}

model User extends BaseModel {
  email     String   @unique
  password  String   // Will be hashed with Argon2
  firstName String?
  lastName  String?
  refreshTokens RefreshToken[]
  bookings  Booking[]
  
  @@map("users")
}

model RefreshToken {
  id        Int      @id @default(autoincrement())
  token     String   @unique
  userId    Int
  user      User     @relation(fields: [userId], references: [id])
  expiresAt DateTime
  createdAt DateTime @default(now())
  
  @@map("refresh_tokens")
}

model Vehicle extends BaseModel {
  make      String
  model     String
  year      Int
  // ... other vehicle fields
  bookings  Booking[]
  
  @@map("vehicles")
}

model Booking extends BaseModel {
  startDate DateTime
  endDate   DateTime
  userId    Int
  user      User     @relation(fields: [userId], references: [id])
  vehicleId Int
  vehicle   Vehicle  @relation(fields: [vehicleId], references: [id])
  
  @@map("bookings")
}
```
