import exress, { Router } from 'express';
import { listCategories } from '../controllers/categories/listCategories';

const router: Router = exress.Router();

router.route('/').get(listCategories).post();
router.route('/:_id').get().delete().put();

export default router;
