import express, { Router } from 'express';
import { refresh } from '../controllers/auth/refresh';

const router: Router = express.Router();

router.route('/').get(refresh);

export default router;
