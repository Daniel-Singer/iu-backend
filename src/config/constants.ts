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

export const NOTIFICATION_HEAD: { [key: string]: string } = {
  student: 'Liebe/r Studierende/r',
  tutor: 'Liebe/r Tutor/in',
  admin: 'Liebe/r Administrator/in',
};

export const MEDIA_UPLOAD_BODY = (role: string, title: string) => {
  switch (role) {
    case 'student':
      return `Deiner Fehlermeldung zum Thema <strong>${title}</strong> wurde eine neue Datei hinzugefügt `;
    case 'tutor':
      return `Ihrer zugewiesenen Fehlermeldung zum Thema <strong>${title}</strong> wurde eine neue Datei hinzugefügt `;
  }
};
