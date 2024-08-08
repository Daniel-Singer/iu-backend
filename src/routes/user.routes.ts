import exress, { Router } from 'express';
import { listUsers } from '../controllers/users/listUsers';
import { createUser } from '../controllers/users/createUser';
import { isAdmin } from '../middleware/auth/isAdmin';
import { getUser } from '../controllers/users/getUser';
import { updateUser } from '../controllers/users/updateUser';
import { isUserOrAdmin } from '../middleware/validation/account/isUserOrAdmin';

const router: Router = exress.Router();

router.route('/').get(isAdmin, listUsers).post(isAdmin, createUser);
router.route('/:id').get(getUser).delete().put(isUserOrAdmin, updateUser);

export default router;
