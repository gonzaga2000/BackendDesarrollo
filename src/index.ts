import app from './app';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const API_PORT = process.env.PORT || 3001;

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.$connect();
    console.log('Conexión a la base de datos establecida');
    
    app.listen(API_PORT, () => {
      console.log(`Aplicación web escuchando en el puerto: ${API_PORT}`);
    });
  } catch (error) {
    console.error('Error al conectar y sincronizar la base de datos:', error);
  }
}
main();