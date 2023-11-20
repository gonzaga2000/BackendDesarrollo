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
exports.userMustBeClient = exports.userMustBeEmployee = exports.userMustBeAdmin = exports.userMustBeLogged = exports.checkJwt = void 0;
const client_1 = require("@prisma/client");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const prisma = new client_1.PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "secret";
const express_jwt_1 = __importDefault(require("express-jwt"));
const jwks_rsa_1 = __importDefault(require("jwks-rsa"));
exports.checkJwt = (0, express_jwt_1.default)({
    secret: jwks_rsa_1.default.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
    }),
    audience: process.env.AUTH0_AUDIENCE,
    issuer: `https://${process.env.AUTH0_DOMAIN}/`,
    algorithms: ['RS256']
});
const userMustBeLogged = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Ejecutando middleware verifica que usuario exista y lo agrega al req.body");
        if (!req.headers.authorization)
            throw new Error("El token no fue enviado");
        const userToken = req.headers.authorization.split(" ")[1];
        const decodedToken = express_jwt_1.default.verify(userToken, JWT_SECRET);
        const user = yield prisma.user.findUnique({
            where: { id: decodedToken.user.id },
        });
        console.log(user);
        const client = yield prisma.client.findUnique({
            where: { id: decodedToken.user.id },
        });
        console.log(client);
        if (!user && !client)
            throw new Error("El usuario del token recibido no existe.");
        if (user) {
            req.body.requestUser = user;
            console.log("es usuario");
        }
        if (client) {
            req.body.requestUser = client;
            console.log("es cliente");
        }
        next();
        return;
    }
    catch (error) {
        console.error("Error al verificar que el usuario esté loggeado ->", error.message);
        return res.status(401).json({ message: error.message });
    }
});
exports.userMustBeLogged = userMustBeLogged;
const userMustBeAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Se debe ejecutar posterior a userMustBeLogged, pues este agrega el usuario al req.body
        console.log("Ejecutando middleware verifica que el usuario sea administrador");
        const user = req.body.requestUser;
        console.log("El rol del usuario es ->", user.role);
        if (user.role !== "ADMIN")
            throw new Error("El usuario del token no es administrador");
        next();
        return;
    }
    catch (error) {
        console.error("Error al verificar que el usuario sea administrador ->", error.message);
        return res.status(401).json({ message: error.message });
    }
});
exports.userMustBeAdmin = userMustBeAdmin;
const userMustBeEmployee = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Se debe ejecutar posterior a userMustBeLogged, pues este agrega el usuario al req.body
        console.log("Ejecutando middleware verifica que el usuario sea empleado");
        const user = req.body.requestUser;
        console.log("El rol del usuario es ->", user.role);
        if (user.role !== "EMPLOYEE")
            throw new Error("El usuario del token no es EMPLEADO");
        next();
        return;
    }
    catch (error) {
        console.error("Error al verificar que el usuario sea EMPLEADO ->", error.message);
        return res.status(401).json({ message: error.message });
    }
});
exports.userMustBeEmployee = userMustBeEmployee;
const userMustBeClient = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Se debe ejecutar posterior a userMustBeLogged, pues este agrega el usuario al req.body
        console.log("Ejecutando middleware verifica que el usuario sea cliente");
        const user = req.body.requestUser;
        console.log("El rol del usuario es ->", user.role);
        if (user.role !== "CLIENT")
            throw new Error("El usuario del token no es CLIENTE");
        next();
        return;
    }
    catch (error) {
        console.error("Error al verificar que el usuario sea CLIENTE ->", error.message);
        return res.status(401).json({ message: error.message });
    }
});
exports.userMustBeClient = userMustBeClient;
