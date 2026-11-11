import express from "express";
import * as userController from "../controllers/userController.js";

const userRoutes = express.Router();

userRoutes.post("/new", userController.createAccount);
userRoutes.post("/login", userController.login);

export default userRoutes;
