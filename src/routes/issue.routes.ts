import exress, { Router } from 'express';
import { listIssues } from '../controllers/issues/listIssues';

const router: Router = exress.Router();

router.route('/').get(listIssues).post();
router.route('/:_id').get().delete().put();

export default router;
