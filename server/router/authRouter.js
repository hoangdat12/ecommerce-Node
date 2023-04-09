import { Router } from 'express';
import authController from '../controller/authController.js';

const router = Router();

router.post('/register', authController.register);
router.get('/activate/:activationToken', authController.activeAccount);
router.post('/login', authController.login);

export default router;
