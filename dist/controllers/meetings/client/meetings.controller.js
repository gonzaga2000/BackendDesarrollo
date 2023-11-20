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
exports.getMeeting = exports.getMeetings = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getMeetings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const meetings = yield prisma.meeting.findMany({ where: { clientId: req.body.requestUser.id }
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
            where: { id: parseInt(id), clientId: req.body.requestUser.id }
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
