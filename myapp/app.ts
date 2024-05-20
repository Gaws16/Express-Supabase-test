import dotenv from "dotenv";
const express = require("express");
const expressConfig = require("./configs/expressConfig");
const routes = require("./routes");

const app = express();
expressConfig(app);

dotenv.config();
const port = process.env.PORT || 3001;

app.use(routes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
