import { Role } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: String;
        role: Role;
      };
    }
  }
}

export {};
