import express, { Router } from 'express';

const router: Router = express.Router();

router.route('/').get();

export default router;
