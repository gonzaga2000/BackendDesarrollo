import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
dotenv.config();

const prisma = new PrismaClient();

export const loginUser = async (req: Request, res: Response) => {
  try {

    const userId = req.body.userId;
    const role = "CLIENT";
    console.log("Imprimiendo el ID del usuario:", userId);

    const user = await prisma.user.findFirst({ where: { id:userId } });
    console.log(user)
    const client = await prisma.client.findFirst({ where: { id:userId } });
    console.log(client)

    if (!user && !client){
      if(role === "CLIENT"){
        const client = await prisma.client.create({
          data: {
            id: userId,
            role: "CLIENT"
          }
        
        }); 
        console.log("se agrego el usuario tipo cliente", client)
      }else{
        const user = await prisma.user.create({
          data: {
            id: userId,
            role: "ADMIN"
          }
        });
      }
    }else{
      console.log("el usuario ya existe de antes", user, client);
    }
    
  } catch (error: any) {
    console.error("Error al intentar registrar un nuevo usuario ->", error.message);
    return res.status(500).json({ message: error.message });
  } finally {
    await prisma.$disconnect();
  }
};

