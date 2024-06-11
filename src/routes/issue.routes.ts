import exress, { Router } from 'express';
import { listIssues } from '../controllers/issues/listIssues';
import { createIssue } from '../controllers/issues/createIssue';
import { deleteIssue } from '../controllers/issues/deleteIssue';
import { isAdmin } from '../middleware/auth/isAdmin';
import { listUserIssues } from '../controllers/issues/listUserIssues';

const router: Router = exress.Router();

router.route('/').post(createIssue);
router.route('/admin').get(isAdmin, listIssues);
router.route('/user/:id').get(listUserIssues);
router.route('/:id').get().delete(deleteIssue).put();

export default router;
