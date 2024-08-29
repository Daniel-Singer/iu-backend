interface IUserBase {
  id?: number;
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  email: string;
  role?: string;
  active?: boolean;
}

interface IUserReceive extends IUserBase {
  refresh_token: string | null;
}

interface IUserStudent extends IUserBase {
  matrikel_nr: number | null;
}
