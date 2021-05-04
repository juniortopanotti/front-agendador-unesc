export interface IUser {
  id: number;
  username: string;
  email: string;
}

export interface Users extends IUser {
  nome: string;
  dt_nascimento: any;
  celular: string;
  sexo: string;
  id_curso: number;
  fase: number;
  orientador: string;
  trabalho: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface UsersList {
  rows: UsersList[];
  count: number;
}
