import exress, { Router } from 'express';

const router: Router = exress.Router();

router.route('/').get().post();
router.route('/:_id').get().delete().put();

export default router;
