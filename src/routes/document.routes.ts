import express, { Router } from 'express';
import { listDocuments } from '../controllers/documents/listDocuments';
import { downloadDocument } from '../controllers/documents/downloadDocument';

const router: Router = express.Router();

router.route('/').get(listDocuments);
router.route('/pdf').get(downloadDocument);

export default router;
