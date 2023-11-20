import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
dotenv.config();

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "secret";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password, firstName, lastName, role, company, country } = req.body;

    if (!email || !password || !firstName || !lastName) throw new Error("Todos los campos son obligatorios.");

    const hashedPassword = await bcrypt.hash(password, 10);

    let payloadSanitizedUser: {}
    if (role == "CLIENT"){
      let newUser = await prisma.client.create({
        data: { email, password: hashedPassword, firstName, lastName, role, company, country },
      });
      payloadSanitizedUser = {
        id: newUser.id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        role: newUser.role,
        company: newUser.company,
        country: newUser.country,
        updatedAt: newUser.updatedAt,
        createdAt: newUser.createdAt,
      };
      // Es admin o empleado
    }else{
      let newUser = await prisma.user.create({
        data: { email, password: hashedPassword, firstName, lastName, role},
      });
      payloadSanitizedUser = {
        id: newUser.id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        role: newUser.role,
        updatedAt: newUser.updatedAt,
        createdAt: newUser.createdAt,
      };

    }
    const token = jwt.sign({ user: payloadSanitizedUser }, JWT_SECRET, { expiresIn: "12h" });
    return res.json({ user: payloadSanitizedUser, token });
  } catch (error: any) {
    console.error("Error al intentar registrar un nuevo usuario ->", error.message);
    return res.status(500).json({ message: error.message });
  } finally {
    await prisma.$disconnect();
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) throw new Error("El email y la contraseña son obligatorios.");

    const user = await prisma.user.findFirst({ where: { email } });
    console.log(user)
    const client = await prisma.client.findFirst({ where: { email } });
    console.log(client)
    if (!user && !client) throw new Error("El usuario con las credenciales señaladas no existe.");
    // Veo si es user o cliente
    let payloadSanitizedUser: { [key: string]: any } | null = null;

    if (user){
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) throw new Error("El usuario con las credenciales señaladas no existe.");
      payloadSanitizedUser = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        updatedAt: user.updatedAt,
        createdAt: user.createdAt,
      };
    }
    if (client){
      const passwordMatch = await bcrypt.compare(password, client.password);
      if (!passwordMatch) throw new Error("El usuario con las credenciales señaladas no existe.");
      payloadSanitizedUser = {
        id: client.id,
        firstName: client.firstName,
        lastName: client.lastName,
        email: client.email,
        role: client.role,
        updatedAt: client.updatedAt,
        createdAt: client.createdAt,
      };

    }
    const token = jwt.sign({ user: payloadSanitizedUser }, JWT_SECRET, { expiresIn: "12h" });
    return res.json({ user: payloadSanitizedUser, token });
  } catch (error: any) {
    console.error("Error al intentar iniciar sesión ->", error.message);
    return res.status(500).json({ message: error.message });
  } finally {
    await prisma.$disconnect();
  }
};