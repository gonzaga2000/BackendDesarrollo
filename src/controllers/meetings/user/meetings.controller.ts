import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getMeetings = async (req: Request, res: Response) => {
    try {
        const meetings = await prisma.meeting.findMany(
            {where: {ownerId: req.body.requestUser.id}
        });
        console.log(meetings);
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
            where: { id: parseInt(id) }
        });
        if (!meeting) throw new Error("El Meeting con el ID señalado no existe.");
        return res.status(200).json(meeting);
    } catch (error: any) {
        console.error("Error al intentar obtener una meeting ->", error.message);
        return res.status(500).json({ message: error.message });
    }
};

export const createMeeting = async (req: Request, res: Response) => {
    try {
      const { description, fechaCreacion, fechaReunion, clientMail, tamanoEmpresa, clientName, externalName } = req.body;
      const client = await prisma.client.findUnique({
        where: { email: clientMail }
    });

    console.log(tamanoEmpresa);

        
      if (client){  
        const meeting = await prisma.meeting.create({
        data: {
            fechaCreacion: fechaCreacion,
            fechaReunion: fechaReunion,
            tamanoEmpresa: tamanoEmpresa,
            clientName: clientName,
            externalName: externalName,

          description: description,
          owner: { connect: { id: req.body.requestUser.id } },
          clientMail: clientMail,
          client: { connect: { id: client?.id } }
        }
      }); 
      return res.status(200).json(meeting);
    }
    else{
        console.log("error, cliente no esta!");
        return res.status(500).json("cliente3 no existe");
    }
      
      
    } catch (error: any) {
      console.error("Error al intentar crear una nueva meeting ->", error.message);
      return res.status(500).json({ message: error.message });
    }
  };
  
// poner update


export const deleteMeeting = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedMeeting = await prisma.meeting.delete({
            where: { id: parseInt(id) },
        });
        if (!deletedMeeting) throw new Error("El meeting con el ID señalado no existe.");
        return res.status(200).json({ message: "meeting eliminada correctamente" });
    } catch (error: any) {
        console.error("Error al intentar eliminar una meeting ->", error.message);
        return res.status(500).json({ message: error.message });
    }
};