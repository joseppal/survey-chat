import express from "express";
import bodyParser from "body-parser";
import path from "path";

import config from "./config";

import * as clientController from "./controllers/client-controller";


const app = express();

app.use(bodyParser.json());

app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");

app.get("/", clientController.get);

app.use(express.static(path.join(__dirname, config.publicDir)));

app.listen(config.PORT, function () {
  console.log("running on port", config.PORT);
});
