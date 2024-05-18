import { Request, Response } from "express";
import { getTodos } from "./src/services/todosService";
import { signUpNewUser, signInUser } from "./src/services/authService";
import { LoginRequest, LoginResponse } from "./src/types/types";
import Joi from "joi";
import dotenv from "dotenv";
import { User, AuthResponse } from "@supabase/supabase-js";
dotenv.config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3001;
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.get("/", (req: Request, res: Response) => {
  res.send("Hello from server");
});
app.get("/todos", async (req: Request, res: Response) => {
  const todos = await getTodos();
  if (todos) {
    res.send(todos);
  } else {
    res.send("Error fetching todos");
  }
});
const registerSchema = Joi.object<LoginRequest>({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});
app.post("/register", async (req: Request, res: Response) => {
  console.log("Reg endpoint hit");
  const { email, password } = req?.body;
  const { error } = registerSchema.validate({ email, password });
  if (error) {
    const errorMessages = error?.details.map((error) => error.message);
    return res.status(400).json({ error: errorMessages });
  }
  try {
    const signUpResponse = await signUpNewUser(email, password);
    console.log("Sign up response", signUpResponse);
  } catch (error) {
    console.error("Unexpected error", error);
    return res.status(500).json({ error: "An unexpected error occured" });
  }
});

const loginSchema = Joi.object<LoginRequest>({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

app.post(
  "/login",
  async (req: Request<{}, {}, LoginRequest>, res: Response) => {
    console.log("Login endpoint hit");

    const { email, password }: { email: string; password: string } = req?.body;
    const { error } = loginSchema.validate({ email, password });

    if (error) {
      const errorMessages = error?.details.map((error) => error.message);
      console.log("Error", errorMessages);
      console.log(error);
      return res.status(400).json({ error: errorMessages });
    }

    try {
      const loginResponse = await signInUser(email, password);

      if (loginResponse === "Invalid login credentials") {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      //TODO: do not return everything
      return res
        .status(200)
        .json({ message: "Login succesfull", data: loginResponse });
    } catch (error) {
      console.error("Unexpected error", error);
      return res.status(500).json({ error: "An unexpected error occured" });
    }
  }
);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
