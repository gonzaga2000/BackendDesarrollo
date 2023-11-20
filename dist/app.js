"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
//import { noCorsRequired } from "./middlewares/nocors.middlewares";
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)(); //nuestra app
app.use(express_1.default.json()); //middleware para que express entienda json
app.use((0, morgan_1.default)("dev")); // Para que el servidor muestre en consola las peticiones que recibe.
//app.use(noCorsRequired); // Para que el servidor acepte peticiones de cualquier origen.
app.use(routes_1.default);
exports.default = app;
