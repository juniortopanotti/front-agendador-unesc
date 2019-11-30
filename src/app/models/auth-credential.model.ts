import { Usuario } from './user.model';
export interface AuthCredential {
  usuario: Usuario;
  token: string;
}
