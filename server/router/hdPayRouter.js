import { Router } from "express";
import hdPayController from "../controller/hdPayController.js";

const router = Router();

router.post("/", hdPayController.createHdPayOfUser);
router.post("/add", hdPayController.addMoneyToAccount);
router.post("/transfer", hdPayController.transferMoney);

export default router;
