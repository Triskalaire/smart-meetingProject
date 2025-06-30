import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();
const prisma = new PrismaClient();

export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    console.log("[LOGIN] Tentative pour :", email);

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
        console.log("[LOGIN] Utilisateur non trouvé :", email);
        res.status(401).json({ message: "Invalid credentials (user not found)" });
        return;
    }

    console.log("[LOGIN] Utilisateur trouvé :", user.email, " | Rôle :", user.role);

    const isValid = await bcrypt.compare(password, user.password);
    console.log("[LOGIN] Mot de passe valide ?", isValid);

    if (!isValid) {
        res.status(401).json({ message: "Invalid credentials (wrong password)" });
        return;
    }

    const token = jwt.sign(
        { userId: user.id, role: user.role },
        process.env.JWT_SECRET!,
        { expiresIn: "1h" }
    );

    console.log("[LOGIN] Connexion réussie. Token généré.");
    res.json({ token });
};
