interface IUserBase {
  id?: number;
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  email: string;
}

interface IUserStudent extends IUserBase {
  matrikel_nr: number | null;
}
