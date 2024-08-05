import exress, { Router } from 'express';
import { listStatus } from '../controllers/status/listStatus';
import { isAdmin } from '../middleware/auth/isAdmin';
import { createStatus } from '../controllers/status/createStatus';
import { createIssueStatus } from '../controllers/status/createIssueStatus';
import { isAdminOrTutor } from '../middleware/auth/isAdminOrTutor';

const router: Router = exress.Router();

router.route('/').get(listStatus).post(isAdmin, createStatus);
router.route('/:id').get().delete().put();
router.route('/issue/:id').post(isAdminOrTutor, createIssueStatus);

export default router;
