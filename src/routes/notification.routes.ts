import express, { Router } from 'express';
import { listNotifications } from '../controllers/notifications/listNotifications';

const router: Router = express.Router();

router.route('/').get(listNotifications);

export default router;
