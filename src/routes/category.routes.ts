import exress, { Router } from 'express';
import { listCategories } from '../controllers/categories/listCategories';
import { createCategory } from '../controllers/categories/createCategory';
import { deleteCategory } from '../controllers/categories/deleteCategory';
import { updateCategory } from '../controllers/categories/updateCategory';
import { isAdmin } from '../middleware/auth/isAdmin';

const router: Router = exress.Router();

router.route('/').get(listCategories).post(createCategory);
router
  .route('/:id')
  .get()
  .delete(isAdmin, deleteCategory)
  .put(isAdmin, updateCategory);

export default router;
