import { Router } from "express";

import { signInSchemaValid, signInValid } from "../middlewares/signIn.middleware.js";
import { postSignIn } from "../controllers/signIn.controller.js";

export const auth = Router();

auth.post("/", signInSchemaValid, signInValid, postSignIn);

export default auth;
//