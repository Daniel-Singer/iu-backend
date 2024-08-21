import exress, { Router } from 'express';
import { downloadMedia } from '../controllers/media/downloadMedia';
import { isUserRelatedOrAdmin } from '../middleware/media/isUserRelatedOrAdmin';

const router: Router = exress.Router();

router.route('/').get().post();
router.route('/:id').get(isUserRelatedOrAdmin, downloadMedia).delete().put();

export default router;
