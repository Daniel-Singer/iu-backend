import exress, { Router } from 'express';
import { listCourses } from '../controllers/courses/listCourses';
import { isAdmin } from '../middleware/auth/isAdmin';
import { updateCourse } from '../controllers/courses/updateCourse';
import { getCourse } from '../controllers/courses/getCourse';
import { deleteCourse } from '../controllers/courses/deleteCourse';
import { hasRequiredData } from '../middleware/validation/course/hasRequiredData';
import { createCourse } from '../controllers/courses/createCourse';
import { isAdminOrTutor } from '../middleware/auth/isAdminOrTutor';

const router: Router = exress.Router();

router
  .route('/')
  .get(listCourses)
  .post(isAdminOrTutor, hasRequiredData, createCourse);
router
  .route('/:id')
  .get(getCourse)
  .put(isAdminOrTutor, updateCourse)
  .delete(isAdmin, deleteCourse);

export default router;
