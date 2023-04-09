import { Router } from 'express';
import { ProductController } from '../../controller/ecommerceController/ProductController.js';

const router = Router();

router.get('/:productId', ProductController.get);
router.post('/', ProductController.create);
router.put('/productId', ProductController.update);
router.delete('/productId', ProductController.delete);
router.get('/', ProductController.gets);

export default router;
