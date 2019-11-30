export interface Curso {
  id: number;
  nome: string;
}

export interface CursoList {
  rows: Curso[];
  count: number;
}
