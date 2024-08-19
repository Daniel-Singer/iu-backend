import exress, { Router } from 'express';
import { listUsers } from '../controllers/users/listUsers';
import { createUser } from '../controllers/users/createUser';
import { isAdmin } from '../middleware/auth/isAdmin';
import { getUser } from '../controllers/users/getUser';
import { updateUser } from '../controllers/users/updateUser';
import { isUserOrAdmin } from '../middleware/validation/account/isUserOrAdmin';
import { updateDataProvided } from '../middleware/validation/account/updateDataProvided';
import { doesUserAlreadyExist } from '../middleware/users/doesUserAlreadyExist';
import { canAccessUserData } from '../middleware/users/canAccessUserData';

const router: Router = exress.Router();

router
  .route('/')
  .get(isAdmin, listUsers)
  .post(isAdmin, doesUserAlreadyExist, createUser);
router
  .route('/:id')
  .get(canAccessUserData, getUser)
  .delete()
  .put(isUserOrAdmin, updateDataProvided, updateUser);

export default router;
