import { Router } from 'express';
import InventoryController from '../../controller/ecommerceController/InventoryController.js';

const router = Router();

router.put('/increment', InventoryController.increment);
router.post('/quantity', InventoryController.getQuantity);
router.post('/', InventoryController.add);
router.delete('/', InventoryController.delete);

export default router;
