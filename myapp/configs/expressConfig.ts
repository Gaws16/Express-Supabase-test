import { Express } from "express";
import bodyParser from "body-parser";
import cors from "cors";
function expressConfig(app: Express): void {
  app.use(cors({ origin: "*" }));
  app.use(bodyParser.json());
}
module.exports = expressConfig;
