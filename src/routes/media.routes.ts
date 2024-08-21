import exress, { Router } from 'express';
import { downloadMedia } from '../controllers/media/downloadMedia';
import { isUserRelatedOrAdmin } from '../middleware/media/isUserRelatedOrAdmin';
import { deleteMediaFile } from '../controllers/media/deleteMediaFile';

const router: Router = exress.Router();

router.route('/').get().post();
router
  .route('/:id')
  .get(isUserRelatedOrAdmin, downloadMedia)
  .delete(isUserRelatedOrAdmin, deleteMediaFile)
  .put();

export default router;
