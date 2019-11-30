import { tap, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Usuario } from './../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable()
export class UsuarioService {
  private endpoint = `${environment.apiBaseUrl}/usuarios`;

  constructor(private http: HttpClient) {}

  store(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.endpoint, usuario).pipe(
      tap(() => {}),
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
