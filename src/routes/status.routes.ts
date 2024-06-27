import exress, { Router } from 'express';
import { listStatus } from '../controllers/status/listStatus';
import { isAdmin } from '../middleware/auth/isAdmin';
import { createStatus } from '../controllers/status/createStatus';

const router: Router = exress.Router();

router.route('/').get(listStatus).post(isAdmin, createStatus);
router.route('/:_id').get().delete().put();

export default router;
