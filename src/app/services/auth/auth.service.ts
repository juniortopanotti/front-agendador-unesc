import { AuthCredential } from './../../models/auth-credential.model';
import { Login } from './../../models/login.model';
import { environment } from './../../../environments/environment';
import { IUser, Usuario } from './../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';

import { tap, catchError, map } from 'rxjs/operators';

const tokenName = 'token';

@Injectable()
export class AuthService {
  private isLogged$ = new BehaviorSubject(false);
  private endpoint = `${environment.apiBaseUrl}/sessions`;
  private user;

  constructor(private http: HttpClient) {}

  public isAuthenticated(): boolean {
    return !!localStorage.getItem(tokenName);
  }

  login(credentials: Login): Observable<AuthCredential> {
    return this.http.post<AuthCredential>(this.endpoint, credentials).pipe(
      map((authCredential: AuthCredential) => {
        this.user = authCredential.usuario;
        this.isLogged$.next(true);
        localStorage.setItem(tokenName, authCredential.token);
        console.log(`fiz o que tinha q fazer aqui`);
        return authCredential;
      }),
      catchError((err: any) => {
        return throwError(err);
      })
    );
  }

  public logout() {
    localStorage.clear();
    this.user = null;
    this.isLogged$.next(false);
    return of(false);
  }

  public get authToken(): string {
    return localStorage.getItem(tokenName);
  }

  public get userData(): Observable<any> {
    return this.loadUser();
  }

  private loadUser(): Observable<Usuario> {
    if (this.isAuthenticated()) {
      return this.http.get<Usuario>(`${this.endpoint}/current`).pipe(
        tap((usuario: Usuario) => {
          this.user = usuario;
          this.isLogged$.next(true);
          // return this.user;
        })
      );
    }
    return of(null);
  }
}
