import path from 'path';

// document directories
export const MEDIA_DIR = 'uploads';
export const DOCUMENT_DIR_DEV = './documents';
export const DOCUMENT_DIR = path.join('/', 'home', 'iu', 'documents');

// user query constants
export const USER_SELECTS = [
  'users.id',
  'users.first_name',
  'users.last_name',
  'users.matrikel_nr',
  'users.role',
  'users.email',
  'users.active',
];
