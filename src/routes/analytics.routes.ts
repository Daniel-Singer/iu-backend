import express, { Router } from 'express';
import { getCommentStatusByUserIssues } from '../controllers/commentsSeenByUser/getCommentStatusByUserIssues';

const router: Router = express.Router();

router.route('/comments/seen').get(getCommentStatusByUserIssues);

export default router;
