import exress, { Router } from 'express';
import { downloadMedia } from '../controllers/media/downloadMedia';
import { isUserRelatedOrAdmin } from '../middleware/media/isUserRelatedOrAdmin';
import { deleteMediaFile } from '../controllers/media/deleteMediaFile';
import { uploadMedia } from '../controllers/media/uploadMedia';
import upload from '../config/upload';
import { protect } from '../middleware/auth/protect';
import { getFileInfo } from '../controllers/media/getFileInfo';

const router: Router = exress.Router();

router.route('/').get().post();
router
  .route('/issue/:id')
  .post(upload.single('attached_file'), protect, uploadMedia);
router.route('/information/:id').get(getFileInfo);
router
  .route('/:id')
  .get(isUserRelatedOrAdmin, downloadMedia)
  .delete(isUserRelatedOrAdmin, deleteMediaFile)
  .put();

export default router;
