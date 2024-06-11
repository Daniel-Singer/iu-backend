import exress, { Router } from 'express';
import { listUsers } from '../controllers/users/listUsers';
import { createUser } from '../controllers/users/createUser';

const router: Router = exress.Router();

router.route('/').get(listUsers).post(createUser);
router.route('/:_id').get().delete().put();

export default router;
