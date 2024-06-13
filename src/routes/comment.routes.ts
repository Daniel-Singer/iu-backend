import exress, { Router } from 'express';
import { listComments } from '../controllers/comments/listComments';
import { createComment } from '../controllers/comments/createComment';
import { deleteComment } from '../controllers/comments/deleteComment';

const router: Router = exress.Router();

router.route('/:issue_id').get(listComments).post(createComment);
router.route('/:comment_id').get().delete(deleteComment).put();

export default router;
