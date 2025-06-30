// src/middleware/rulesmiddleware.ts
import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const checkBookingValidity = async (req: Request, res: Response, next: NextFunction) => {
    const { roomId, start, end } = req.body;

    const room = await prisma.room.findUnique({ where: { id: roomId } });
    if (!room) return res.status(404).json({ message: "Room not found" });

    const rules = room.rules as any || {};
    const startTime = new Date(start);
    const endTime = new Date(end);
    const now = new Date();

    // Règle 1 : pas de réservation le weekend
    if (rules.allowWeekends === false) {
        const isWeekend = [0, 6].includes(startTime.getDay()) || [0, 6].includes(endTime.getDay());
        if (isWeekend) {
            return res.status(400).json({ message: "La salle n'autorise pas les réservations le week-end." });
        }
    }

    // Règle 2 : durée max
    if (rules.maxDurationMinutes) {
        const duration = (endTime.getTime() - startTime.getTime()) / (1000 * 60);
        if (duration > rules.maxDurationMinutes) {
            return res.status(400).json({ message: `Durée max autorisée : ${rules.maxDurationMinutes} minutes.` });
        }
    }

    // Règle 3 : délai minimum avant réservation
    if (rules.minAdvanceHours) {
        const advance = (startTime.getTime() - now.getTime()) / (1000 * 60 * 60);
        if (advance < rules.minAdvanceHours) {
            return res.status(400).json({ message: `Réservation requise au moins ${rules.minAdvanceHours}h à l'avance.` });
        }
    }

    // Règle 4 : conflit de réservation
    const overlapping = await prisma.booking.findFirst({
        where: {
            roomId,
            OR: [
                {
                    start: { lt: endTime },
                    end: { gt: startTime }
                }
            ]
        }
    });

    if (overlapping) {
        return res.status(409).json({ message: "Il y a déjà une réservation pour ce créneau." });
    }

    next();
};
