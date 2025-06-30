import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getBookings = async (req: Request, res: Response) => {
    const userId = req.user.userId;
    const role = req.user.role;

    const bookings = await prisma.booking.findMany({
        where: role === "ADMIN" ? {} : { userId },
        include: { room: true },
    });

    res.json(bookings);
};

export const createBooking = async (req: Request, res: Response) => {
    const { start, end, roomId } = req.body;
    const userId = req.user.userId;

    const booking = await prisma.booking.create({
        data: {
            start: new Date(start),
            end: new Date(end),
            roomId,
            userId,
        },
    });

    res.status(201).json(booking);
};
