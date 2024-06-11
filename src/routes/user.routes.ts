import exress, { Router } from 'express';
import { listUsers } from '../controllers/users/listUsers';

const router: Router = exress.Router();

router.route('/').get(listUsers).post();
router.route('/:_id').get().delete().put();

export default router;
