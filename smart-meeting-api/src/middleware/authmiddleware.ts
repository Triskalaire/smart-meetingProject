// src/middleware/authmiddleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const isAuthenticated = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
        res.status(401).json({ message: "Unauthorized: No token provided" });
        return
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
            userId: number;
            role: string;
        };

        req.user = { userId: decoded.userId, role: decoded.role };
        next();
    } catch (err) {
        res.status(401).json({ message: "Unauthorized: Invalid token" });
        return
    }
};

export const isAdmin = (req: Request, res: Response, next: NextFunction): void => {
    if (req.user?.role !== "ADMIN") {
        res.status(403).json({ message: "Forbidden: Admins only" });
        return
    }
    next();
};
