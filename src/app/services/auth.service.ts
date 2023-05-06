import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, from, map, Observable, tap } from 'rxjs';

import { of } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { HTTPLogin, Usuario } from '../types/types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _authSub$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public get isAuthenticated$(): Observable<boolean> {
    return this._authSub$.asObservable();
  }

  constructor(private router: Router, private http: HttpClient) {
  }

  public login(username: string, password: string): Observable<boolean> {
    return this.http.post(environment.baseUrl + '/singlesignon/login/', null, {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + btoa(username + ':' + password)
      })
    }).pipe(
      tap(response => this.storeData(response as HTTPLogin)),
      map(response => true),
      catchError(error => {
        this.clearData();
        return of(false);
      })
    );
  }

  public logout(): Observable<void> {
    this.clearData();
    this.router.navigate(['login']);
    return of();
  }

  public checkSession(): Observable<boolean> {
    return this.http.post(environment.baseUrl + '/singlesignon/checkSesion/', null).pipe(
      map(response => true),
      catchError(error => {
        this.clearData();
        return of(false);
      })
    );
  }



  public storeData(data: HTTPLogin): void {
    localStorage.setItem('session/token', data.TOKEN);
    localStorage.setItem('session/user', JSON.stringify(data.USUARIO));
  }

  public clearData(): void {
    localStorage.removeItem('session/token');
    localStorage.removeItem('session/user');
  }

  public getToken(): string {
    return localStorage.getItem('session/token') || '';
  }

  public getUser(): Usuario | undefined {
    return (JSON.parse(localStorage.getItem('session/user') || '') as unknown as Usuario) || undefined;
  }
}