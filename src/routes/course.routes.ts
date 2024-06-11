import exress, { Router } from 'express';
import { listCourses } from '../controllers/courses/listCourses';

const router: Router = exress.Router();

router.route('/').get(listCourses).post();
router.route('/:_id').get().delete().put();

export default router;
