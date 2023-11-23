import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import jwksClient from 'jwks-rsa';
import jwt from 'jsonwebtoken';
dotenv.config();

const prisma = new PrismaClient();
// Configuración del cliente JWKS

export const userMustBeLogged = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("Ejecutando middleware verifica que usuario exista y lo agrega al req.body");
    const userId = req.body.userId;
    console.log("Imprimiendo el ID del usuario:", userId);

    const user = await prisma.user.findFirst({ where: { id:userId } });
    console.log(user)
    const client = await prisma.client.findFirst({ where: { id:userId } });
    console.log(client)

    if (user){
      req.body.requestUser= user;
    }
    if (client){
      req.body.requestUser= client;

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
      if (user.role !== "WORKER") throw new Error("El usuario del token no es EMPLEADO");
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