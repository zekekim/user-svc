// Create routes for the user controller functions

import { Router } from 'express';
import { register, login } from '../controllers/user.controller.js';
import authenticateToken from '../middleware/authenticate.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', authenticateToken, logout);
router.delete('/delete', authenticateToken, deleteUser);

export default router;


