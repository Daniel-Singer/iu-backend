import express, { Router } from 'express';
import { listNotifications } from '../controllers/notifications/listNotifications';
import { getNotification } from '../controllers/notifications/getNotification';

const router: Router = express.Router();

router.route('/').get(listNotifications);
router.route('/:id').get(getNotification);

export default router;
