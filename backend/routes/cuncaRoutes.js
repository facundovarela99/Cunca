import { Router } from "express";
import { PreSalaController } from "../controllers/presala.js";

export const CuncaRouter = Router();

CuncaRouter.use('/presalas', PreSalaController.presalaPage);

CuncaRouter.use('/presala/:id', PreSalaController.presala)