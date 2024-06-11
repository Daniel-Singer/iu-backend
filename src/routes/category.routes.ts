import exress, { Router } from 'express';
import { listCategories } from '../controllers/categories/listCategories';
import { createCategory } from '../controllers/categories/createCategory';
import { deleteCategory } from '../controllers/categories/deleteCategory';

const router: Router = exress.Router();

router.route('/').get(listCategories).post(createCategory);
router.route('/:id').get().delete(deleteCategory).put();

export default router;
