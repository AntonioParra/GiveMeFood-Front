import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { CuberiteHTTPResponse, Usuario } from '../types/types';
import { BehaviorSubject, catchError, from, map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<Usuario[]> {
    return this.http.get(environment.baseUrl + '/singlesignon/getAll/').pipe(
      map(data => data as CuberiteHTTPResponse<Usuario[]>),
      map(data => data.DATA)
    );
  }
}
