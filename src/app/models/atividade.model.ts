import { Usuario } from './user.model';

export interface Atividade {
  id: number;
  nome: string;
  usuarios: Usuario[];
}

export interface AtividadeList {
  count: number;
  rows: Atividade[];
}
