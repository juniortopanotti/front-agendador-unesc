import { tap, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Hydrometers, HydrometersList } from '../../models/hydrometers.model';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class HydrometersService {
  private endpoint = `${environment.apiBaseUrl}/hydrometers`;

  constructor(private http: HttpClient) {}

  hydrometerAddUpdate(hydrometer: Hydrometers): Observable<Hydrometers> {
    if (hydrometer.id) {
      return this.update(hydrometer);
    }
    return this.store(hydrometer);
  }

  private store(hydrometer: Hydrometers): Observable<Hydrometers> {
    return this.http.post<Hydrometers>(this.endpoint, hydrometer).pipe(
      tap(() => {}),
      catchError((error: any) => {
        return throwError(error);
      })
    );
  }

  private update(hydrometer: Hydrometers): Observable<Hydrometers> {
    return this.http.put<Hydrometers>(`${this.endpoint}`, hydrometer).pipe(
      tap(() => {}),
      catchError((error: any) => {
        return throwError(error);
      })
    );
  }

  index(page?: number, size?: number): Observable<HydrometersList[]> {
    const params = new HttpParams()
      .append('page', (page + 1).toString())
      .append('size', size.toString());
    return this.http
      .get<HydrometersList[]>(this.endpoint, { params })
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
