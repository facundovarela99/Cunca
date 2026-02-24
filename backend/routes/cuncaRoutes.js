import { Router } from "express";
import { PreSalaController } from "../controllers/presala.js";

export const CuncaRouter = Router();

CuncaRouter.use('/presalas', PreSalaController.presalasPage);

CuncaRouter.use('/presala/:id', PreSalaController.presala)

CuncaRouter.use('/salir/presala/:id', PreSalaController.salirPresala)