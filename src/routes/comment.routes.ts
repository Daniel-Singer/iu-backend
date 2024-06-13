import exress, { Router } from 'express';
import { listComments } from '../controllers/comments/listComments';
import { createComment } from '../controllers/comments/createComment';

const router: Router = exress.Router();

router.route('/:issue_id').get(listComments).post(createComment);
router.route('/:id').get().delete().put();

export default router;
