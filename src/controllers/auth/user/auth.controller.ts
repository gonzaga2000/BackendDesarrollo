import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

import { jwtDecode } from "jwt-decode";

dotenv.config();

const prisma = new PrismaClient();

export const loginUser = async (req: Request, res: Response) => {
  try {
    console.log('Authorization Header:', req.headers.authorization);
    const userId = req.headers.authorization; 
    const email = req.body.email;
    const firstname = req.body.name;
    const role = req.body.role;
    console.log("Imprimiendo el ID del usuario:", userId);
    
    const user = await prisma.user.findFirst({ where: { id:userId } });
    console.log(user)

    const client = await prisma.client.findFirst({ where: { id:userId } });
    console.log(client)


    if (!user && !client && userId){
      if(role === "CLIENT"){
        const client = await prisma.client.create({
          data: {
            id: userId,
            role: role,
            email: email,
            firstName: firstname
          }
        });
        console.log("se agrego el usuario tipo ", client.role)
      }else{
        const user = await prisma.user.create({
          data: {
            id: userId,
            role: role,
            email: email,
            firstName: firstname
          }
        });
        console.log("se agrego el usuario tipo", user.role)
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