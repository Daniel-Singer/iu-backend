interface IUserBase {
  id: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  matrikel_nr?: number;
  role: 'student' | 'tutor' | 'admin';
}
