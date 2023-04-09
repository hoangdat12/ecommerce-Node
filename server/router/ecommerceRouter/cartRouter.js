import { Router } from 'express';
import CartController from '../../controller/ecommerceController/CartController.js';

const router = Router();

router.post('/', CartController.add);
router.delete('/', CartController.delete);
router.get('/:userId', CartController.create);

export default router;
