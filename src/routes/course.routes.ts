import exress, { Router } from 'express';
import { listCourses } from '../controllers/courses/listCourses';
import { isAdmin } from '../middleware/auth/isAdmin';
import { updateCourse } from '../controllers/courses/updateCourse';
import { getCourse } from '../controllers/courses/getCourse';
import { deleteCourse } from '../controllers/courses/deleteCourse';

const router: Router = exress.Router();

router.route('/').get(listCourses).post();
router
  .route('/:id')
  .get(getCourse)
  .put(isAdmin, updateCourse)
  .delete(isAdmin, deleteCourse);

export default router;
