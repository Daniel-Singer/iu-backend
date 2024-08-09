import express, { Router } from 'express';
import { getCommentStatusByUserIssues } from '../controllers/analytics/getCommentStatusByUserIssues';
import { markCommentsAsSeenByUser } from '../controllers/analytics/markCommentsAsSeenByUser';

const router: Router = express.Router();

router.route('/comments/seen').get(getCommentStatusByUserIssues);
router.route('/comments/seen/:issue_id').post(markCommentsAsSeenByUser);

export default router;
