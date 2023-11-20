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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMeeting = exports.createMeeting = exports.getMeeting = exports.getMeetings = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getMeetings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const meetings = yield prisma.meeting.findMany({ where: { ownerId: req.body.requestUser.id }
        });
        return res.status(200).json(meetings);
    }
    catch (error) {
        console.error("Error al intentar obtener todas las reuniones ->", error.message);
        return res.status(500).json({ message: error.message });
    }
});
exports.getMeetings = getMeetings;
const getMeeting = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const meeting = yield prisma.meeting.findUnique({
            where: { id: parseInt(id) }
        });
        if (!meeting)
            throw new Error("El Meeting con el ID señalado no existe.");
        return res.status(200).json(meeting);
    }
    catch (error) {
        console.error("Error al intentar obtener una meeting ->", error.message);
        return res.status(500).json({ message: error.message });
    }
});
exports.getMeeting = getMeeting;
const createMeeting = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { description, fecha, clientMail, externalMail } = req.body;
        const client = yield prisma.client.findUnique({
            where: { email: clientMail }
        });
        const meeting = yield prisma.meeting.create({
            data: {
                fecha: fecha,
                description: description,
                owner: { connect: { id: req.body.requestUser.id } },
                clientMail: clientMail,
                client: { connect: { id: client === null || client === void 0 ? void 0 : client.id } },
                externalMail: externalMail
            }
        }); // Corrección aquí: se elimina un paréntesis adicional.
        return res.status(200).json(meeting);
    }
    catch (error) {
        console.error("Error al intentar crear una nueva meeting ->", error.message);
        return res.status(500).json({ message: error.message });
    }
});
exports.createMeeting = createMeeting;
// poner update
const deleteMeeting = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedMeeting = yield prisma.meeting.delete({
            where: { id: parseInt(id) },
        });
        if (!deletedMeeting)
            throw new Error("El meeting con el ID señalado no existe.");
        return res.status(200).json({ message: "meeting eliminada correctamente" });
    }
    catch (error) {
        console.error("Error al intentar eliminar una meeting ->", error.message);
        return res.status(500).json({ message: error.message });
    }
});
exports.deleteMeeting = deleteMeeting;
