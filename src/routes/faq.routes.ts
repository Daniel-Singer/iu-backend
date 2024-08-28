import express, { Router } from 'express';
import { listFaqs } from '../controllers/faq/listFaqs';

const router: Router = express.Router();

router.route('/').get(listFaqs);

export default router;
