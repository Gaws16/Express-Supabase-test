import { signUpNewUser, signInUser } from "../services/authService";
import { Request, Response } from "express";
import { registerSchema, loginSchema } from "../utils/validationSchemas";
import { LoginRequest } from "../types/types";
const router = require("express").Router();

router.post("/register", async (req: Request, res: Response) => {
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
router.post(
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
module.exports = router;
