import express, { Router } from 'express';
import { listDocuments } from '../controllers/documents/listDocuments';

const router: Router = express.Router();

router.route('/').get(listDocuments);

export default router;
