import { tap, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Curso, CursoList } from './../../models/curso.model';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CursoService {
  private endpoint = `${environment.apiBaseUrl}/cursos`;

  constructor(private http: HttpClient) {}

  cursoAddUpdate(curso: Curso): Observable<Curso> {
    if (curso.id) {
      return this.update(curso);
    }
    return this.store(curso);
  }

  private store(curso: Curso): Observable<Curso> {
    return this.http.post<Curso>(this.endpoint, curso).pipe(
      tap(() => {}),
      catchError((error: any) => {
        return throwError(error);
      })
    );
  }

  private update(curso: Curso): Observable<Curso> {
    return this.http.put<Curso>(`${this.endpoint}/${curso.id}`, curso).pipe(
      tap(() => {}),
      catchError((error: any) => {
        return throwError(error);
      })
    );
  }

  index(page?: number, size?: number): Observable<CursoList[]> {
    const params = new HttpParams()
      .append('page', (page + 1).toString())
      .append('size', size.toString());
    return this.http
      .get<CursoList[]>(this.endpoint, { params })
      .pipe(
        tap(() => {}),
        catchError((error: any) => {
          return throwError(error);
        })
      );
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.endpoint}/${id}`).pipe(
      tap(() => {}),
      catchError((error: any) => {
        return throwError(error);
      })
    );
  }
}
