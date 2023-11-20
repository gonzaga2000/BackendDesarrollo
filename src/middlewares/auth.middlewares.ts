import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "secret";

export const userMustBeLogged = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("Ejecutando middleware verifica que usuario exista y lo agrega al req.body");
    if (!req.headers.authorization) throw new Error("El token no fue enviado");
    const userToken = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(userToken, JWT_SECRET) as { user: { id: string } };
    
    const user = await prisma.user.findUnique({
      where: { id: decodedToken.user.id },
    });

    console.log(user)

    const client = await prisma.client.findUnique({
        where: { id: decodedToken.user.id },
      });

    
    console.log(client)
    if (!user && !client) throw new Error("El usuario del token recibido no existe.");

    if (user){
        req.body.requestUser = user;
        console.log("es usuario");
    }

    if (client){
        req.body.requestUser = client;
        console.log("es cliente");

    }
    
    next();
    return;
  } catch (error: any) {
    console.error("Error al verificar que el usuario esté loggeado ->", error.message);
    return res.status(401).json({ message: error.message });
  }
};

export const userMustBeAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Se debe ejecutar posterior a userMustBeLogged, pues este agrega el usuario al req.body
    console.log("Ejecutando middleware verifica que el usuario sea administrador");
    const user = req.body.requestUser;
    console.log("El rol del usuario es ->", user.role);
    if (user.role !== "ADMIN") throw new Error("El usuario del token no es administrador");
    next();
    return;
  } catch (error: any) {
    console.error("Error al verificar que el usuario sea administrador ->", error.message);
    return res.status(401).json({ message: error.message });
  }
};

export const userMustBeEmployee = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Se debe ejecutar posterior a userMustBeLogged, pues este agrega el usuario al req.body
      console.log("Ejecutando middleware verifica que el usuario sea empleado");
      const user = req.body.requestUser;
      console.log("El rol del usuario es ->", user.role);
      if (user.role !== "EMPLOYEE") throw new Error("El usuario del token no es EMPLEADO");
      next();
      return;
    } catch (error: any) {
      console.error("Error al verificar que el usuario sea EMPLEADO ->", error.message);
      return res.status(401).json({ message: error.message });
    }
  };

export const userMustBeClient = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Se debe ejecutar posterior a userMustBeLogged, pues este agrega el usuario al req.body
    console.log("Ejecutando middleware verifica que el usuario sea cliente");
    const user = req.body.requestUser;
    console.log("El rol del usuario es ->", user.role);
    if (user.role !== "CLIENT") throw new Error("El usuario del token no es CLIENTE");
    next();
    return;
  } catch (error: any) {
    console.error("Error al verificar que el usuario sea CLIENTE ->", error.message);
    return res.status(401).json({ message: error.message });
  }
};