import exress, { Router } from 'express';
import { listIssues } from '../controllers/issues/listIssues';
import { createIssue } from '../controllers/issues/createIssue';
import { deleteIssue } from '../controllers/issues/deleteIssue';
import { isAdmin } from '../middleware/auth/isAdmin';
import { listUserIssues } from '../controllers/issues/listUserIssues';
import { getIssue } from '../controllers/issues/getIssue';
import { updateIssue } from '../controllers/issues/updateIssue';
import { getIssuesStatus } from '../controllers/issues/getIssuesStatus';
import { listIssuesByCourse } from '../controllers/issues/listIssuesByCourse';
import upload from '../config/upload';

const router: Router = exress.Router();

router.route('/').post(upload.single('attached_file'), createIssue);
router.route('/admin').get(isAdmin, listIssues);
router.route('/user').get(listUserIssues);
router.route('/status/:id').get(getIssuesStatus);
router.route('/course/:id').get(listIssuesByCourse);
router.route('/:id').get(getIssue).delete(deleteIssue).put(updateIssue);

export default router;
