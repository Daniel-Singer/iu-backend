import exress, { Router } from 'express';
import { listIssues } from '../controllers/issues/listIssues';
import { createIssue } from '../controllers/issues/createIssue';

const router: Router = exress.Router();

router.route('/').get(listIssues).post(createIssue);
router.route('/:_id').get().delete().put();

export default router;
