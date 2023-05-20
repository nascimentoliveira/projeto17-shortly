import { Router } from "express";

import { signUpSchemaValid, signUpValid } from "../middlewares/signUp.middleware.js";
import { postSignUp } from "../controllers/signUp.controller.js";

export const users = Router();

users.post("/", signUpSchemaValid, signUpValid, postSignUp);

export default users;
//
