import multer from 'multer';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const DEV_PATH = './uploads';
const PROD_PATH = path.join('/', 'home', 'iu', 'uploads');

const PATH =
  process.env.IU_DOCUMENT_PATH === 'development' ? DEV_PATH : PROD_PATH;

const upload = multer({ dest: PATH });

export default upload;
