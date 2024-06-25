import exress, { Router } from 'express';
import { listCourses } from '../controllers/courses/listCourses';
import { isAdmin } from '../middleware/auth/isAdmin';
import { updateCourse } from '../controllers/courses/updateCourse';

const router: Router = exress.Router();

router.route('/').get(listCourses).post();
router.route('/:id').get().delete().put(isAdmin, updateCourse);

export default router;
