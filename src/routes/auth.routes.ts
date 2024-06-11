import exress, { Router } from 'express';
import { login } from '../controllers/auth/login';

const router: Router = exress.Router();

router.route('/login').post(login);

export default router;
