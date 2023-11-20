import express from "express";
import morgan from "morgan";
//import { noCorsRequired } from "./middlewares/nocors.middlewares";
import router from "./routes";

const app = express(); //nuestra app

app.use(express.json()); //middleware para que express entienda json
app.use(morgan("dev")); // Para que el servidor muestre en consola las peticiones que recibe.
//app.use(noCorsRequired); // Para que el servidor acepte peticiones de cualquier origen.

app.use(router);

export default app;