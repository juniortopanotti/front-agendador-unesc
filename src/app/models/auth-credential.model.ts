import { Users } from './users.model';
export interface AuthCredential {
  usuario: Users;
  token: string;
}
