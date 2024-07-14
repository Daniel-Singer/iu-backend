import exress, { Router } from 'express';
import { listComments } from '../controllers/comments/listComments';
import { createComment } from '../controllers/comments/createComment';
import { deleteComment } from '../controllers/comments/deleteComment';
import { setSeenByUser } from '../controllers/comments/setSeenByUser';

const router: Router = exress.Router();

router.route('/').post(createComment);
router.route('/seen/:issue_id').post(setSeenByUser);
router.route('/:issue_id').get(listComments);
router.route('/:comment_id').get().delete(deleteComment).put();

export default router;
