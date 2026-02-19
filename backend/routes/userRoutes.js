import { Router } from "express";
import { UserController } from "../controllers/user.js";

export const UserRouter = Router();

UserRouter.use('/inicio', UserController.index);

UserRouter.use('/home', UserController.home);

UserRouter.use('/registro', UserController.pageRegistro);

UserRouter.use('/usuario/api/registro', UserController.register);

UserRouter.use('/login', UserController.login);

UserRouter.use('/logout', UserController.logout);