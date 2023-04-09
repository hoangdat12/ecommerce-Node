import { Router } from "express";
import userController from "../controller/userController.js";
import tokenService from "../service/tokenService.js";

const router = Router();

router.get("/:userId", userController.getUser);
router.get("/", userController.getAllUser);

export default router;
