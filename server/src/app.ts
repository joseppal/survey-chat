import express from "express";
import bodyParser from "body-parser";
import path from "path";

import config from "./config";

import * as clientController from "./controllers/client.controller";
import * as dialogueController from "./controllers/dialogue.controller";


const app = express();

app.use(bodyParser.json());

app.set("port", config.PORT);
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");

app.get("/", clientController.get);
app.get("/api/dialogue/:dialogueId/node/:nodeId", dialogueController.get);

app.use(express.static(path.join(__dirname, config.publicDir)));

export default app;
