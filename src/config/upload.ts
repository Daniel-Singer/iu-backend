import multer from 'multer';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const DEV_PATH = './uploads';
const PROD_PATH = path.join('/', 'home', 'iu', 'uploads');

const PATH = process.env.NODE_ENV === 'development' ? DEV_PATH : PROD_PATH;

console.log(PATH);
const upload = multer({ dest: PATH });

export default upload;
