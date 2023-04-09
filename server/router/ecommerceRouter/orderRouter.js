import { Router } from "express";
import OrderController from "../../controller/ecommerceController/OrderController.js";

const router = Router();

router.post("/", OrderController.order);
router.delete("/", OrderController.cancelOrder);
router.post("/confirm", OrderController.confirmOrder);

export default router;
