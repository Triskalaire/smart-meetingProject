// src/types/express/index.d.ts
import { UserRole } from "@prisma/client";

// 👇 ATTENTION à bien exporter quelque chose pour que ce fichier soit pris en compte
export {};

declare global {
    namespace Express {
        interface Request {
            user?: {
                userId: number;
                role: UserRole;
            };
        }
    }
}

export {};
