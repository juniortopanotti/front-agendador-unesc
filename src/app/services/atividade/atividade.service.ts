import { tap, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AtividadeList, Atividade } from 'src/app/models/atividade.model';

@Injectable()
export class AtividadeService {
  private endpoint = `${environment.apiBaseUrl}/atividades`;

  constructor(private http: HttpClient) {}

  index(page?: number, size?: number): Observable<AtividadeList> {
    const params = new HttpParams()
      .append('page', (page + 1).toString())
      .append('size', size.toString());
    return this.http
      .get<AtividadeList>(this.endpoint, { params })
      .pipe(
        tap(() => {}),
        catchError((error: any) => {
          return throwError(error);
        })
      );
  }

  atividadeAddUpdate(atividade: Atividade): Observable<Atividade> {
    if (atividade.id) {
      return this.update(atividade);
    }
    return this.store(atividade);
  }

  private store(atividade: Atividade): Observable<Atividade> {
    return this.http.post<Atividade>(this.endpoint, atividade).pipe(
      tap(() => {}),
      catchError((error: any) => {
        return throwError(error);
      })
    );
  }

  private update(atividade: Atividade): Observable<Atividade> {
    return this.http
      .put<Atividade>(`${this.endpoint}/${atividade.id}`, atividade)
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
