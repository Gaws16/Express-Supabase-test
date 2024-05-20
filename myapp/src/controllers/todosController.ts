import { Request, Response } from "express";
import { getTodos } from "../services/todosService";
const router = require("express").Router();

router.get("/", async (req: Request, res: Response) => {
  const todos = await getTodos();
  if (todos) {
    res.send(todos);
  } else {
    res.send("Error fetching todos");
  }
});
module.exports = router;
