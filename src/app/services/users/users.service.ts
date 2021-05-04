import { tap, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Users, UsersList } from '../../models/users.model';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UsersService {
  private endpoint = `${environment.apiBaseUrl}/users`;

  constructor(private http: HttpClient) {}

  userAddUpdate(user: Users): Observable<Users> {
    if (user.id) {
      return this.update(user);
    }
    return this.store(user);
  }

  store(user: Users): Observable<Users> {
    return this.http.post<Users>(this.endpoint, user).pipe(
      tap(() => {}),
      catchError((error: any) => {
        return throwError(error);
      })
    );
  }

  update(user: Users): Observable<Users> {
    return this.http.put<Users>(`${this.endpoint}`, user).pipe(
      tap(() => {}),
      catchError((error: any) => {
        return throwError(error);
      })
    );
  }

  index(page?: number, size?: number): Observable<UsersList[]> {
    const params = new HttpParams()
      .append('page', (page + 1).toString())
      .append('size', size.toString());
    return this.http
      .get<UsersList[]>(this.endpoint, { params })
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
