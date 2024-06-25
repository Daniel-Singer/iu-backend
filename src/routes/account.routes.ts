import express, { Router } from 'express';
import { getMyAccount } from '../controllers/accounts/getMyAccount';

const router: Router = express.Router();

router.route('/').get(getMyAccount);

export default router;
