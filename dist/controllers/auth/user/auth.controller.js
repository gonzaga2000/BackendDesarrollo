"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const client_1 = require("@prisma/client");
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
dotenv_1.default.config();
const prisma = new client_1.PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "secret";
const jwt = require('express-jwt');
// Configuración del middleware para validar el token JWT
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (user.role == "CLIENT") {
            let newUser = yield prisma.client.create({
                data: { email, password: hashedPassword, firstName, lastName, role, company, country },
            });
            // Es admin o empleado
        }
        else {
            let newUser = yield prisma.user.create({
                data: { email, password: hashedPassword, firstName, lastName, role },
            });
        }
        //const token = jwt.sign({ user: payloadSanitizedUser }, JWT_SECRET, { expiresIn: "12h" });
        return res.json("registrado");
    }
    catch (error) {
        console.error("Error al intentar registrar un nuevo usuario ->", error.message);
        return res.status(500).json({ message: error.message });
    }
    finally {
        yield prisma.$disconnect();
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            throw new Error("El email y la contraseña son obligatorios.");
        const user = yield prisma.user.findFirst({ where: { email } });
        console.log(user);
        const client = yield prisma.client.findFirst({ where: { email } });
        console.log(client);
        if (!user && !client)
            throw new Error("El usuario con las credenciales señaladas no existe.");
        // Veo si es user o cliente
        let payloadSanitizedUser = null;
        if (user) {
            const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
            if (!passwordMatch)
                throw new Error("El usuario con las credenciales señaladas no existe.");
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
        if (client) {
            const passwordMatch = yield bcrypt_1.default.compare(password, client.password);
            if (!passwordMatch)
                throw new Error("El usuario con las credenciales señaladas no existe.");
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
    }
    catch (error) {
        console.error("Error al intentar iniciar sesión ->", error.message);
        return res.status(500).json({ message: error.message });
    }
    finally {
        yield prisma.$disconnect();
    }
});
exports.loginUser = loginUser;
