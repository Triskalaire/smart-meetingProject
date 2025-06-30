import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getRooms = async (_req: Request, res: Response) => {
    const rooms = await prisma.room.findMany();
    res.json(rooms);
};

export const getRoomById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const room = await prisma.room.findUnique({
        where: { id: parseInt(id) },
    });
    if (!room) res.status(404).json({ message: "Room not found" });
    res.json(room);
};

export const createRoom = async (req: Request, res: Response) => {
    const { name, capacity, features, rules } = req.body;

    const room = await prisma.room.create({
        data: { name, capacity, features, rules },
    });

    res.status(201).json(room);
};
