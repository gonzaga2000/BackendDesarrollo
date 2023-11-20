import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getMeetings = async (req: Request, res: Response) => {
    try {
        const meetings = await prisma.meeting.findMany(
            {where: {clientId: req.body.requestUser.id}
        });
        return res.status(200).json(meetings);
    } catch (error: any) {
        console.error("Error al intentar obtener todas las reuniones ->", error.message);
        return res.status(500).json({ message: error.message });
    }
};

export const getMeeting = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const meeting = await prisma.meeting.findUnique({
            where: { id: parseInt(id), clientId: req.body.requestUser.id }
        });
        if (!meeting) throw new Error("El Meeting con el ID señalado no existe.");
        return res.status(200).json(meeting);
    } catch (error: any) {
        console.error("Error al intentar obtener una meeting ->", error.message);
        return res.status(500).json({ message: error.message });
    }
};

