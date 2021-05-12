import { tap, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class StatsService {
  private endpoint = `${environment.apiBaseUrl}/stats`;

  constructor(private http: HttpClient) {}

  consumption(startDate: any, endDate: any, ccid?: any): Observable<any[]> {
    const params = new HttpParams()
      .append('startDate', startDate)
      .append('endDate', endDate);

    if (ccid) {
      params.append('ccid', ccid);
    }
    return this.http
      .get<any[]>(this.endpoint + '/consumption', { params })
      .pipe(
        tap(() => {}),
        catchError((error: any) => {
          return throwError(error);
        })
      );
  }

  consumptionDay(startDate: any, endDate: any, ccid?: any): Observable<any[]> {
    const params = new HttpParams()
      .append('startDate', startDate)
      .append('endDate', endDate);
    if (ccid) {
      params.append('ccid', ccid);
    }
    return this.http
      .get<any[]>(this.endpoint + '/consumption/day', { params })
      .pipe(
        tap(() => {}),
        catchError((error: any) => {
          return throwError(error);
        })
      );
  }

  consumptionDayHour(
    startDate: any,
    endDate: any,
    ccid?: any
  ): Observable<any[]> {
    const params = new HttpParams()
      .append('startDate', startDate)
      .append('endDate', endDate)
      .append('ccid', ccid);

    return this.http
      .get<any[]>(this.endpoint + '/consumption/day/hour', { params })
      .pipe(
        tap(() => {}),
        catchError((error: any) => {
          return throwError(error);
        })
      );
  }

  consumptionMonth(
    startDate: any,
    endDate: any,
    ccid?: any
  ): Observable<any[]> {
    const params = new HttpParams()
      .append('startDate', startDate)
      .append('endDate', endDate);
    if (ccid) {
      params.append('ccid', ccid);
    }
    return this.http
      .get<any[]>(this.endpoint + '/consumption/month', { params })
      .pipe(
        tap(() => {}),
        catchError((error: any) => {
          return throwError(error);
        })
      );
  }

  counter(): Observable<any[]> {
    return this.http.get<any[]>(this.endpoint + '/counter').pipe(
      tap(() => {}),
      catchError((error: any) => {
        return throwError(error);
      })
    );
  }
}
