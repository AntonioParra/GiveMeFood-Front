import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, from, map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { HTTPFind, Restaurante } from '../types/types';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {

  constructor(private http: HttpClient) { }

  public getRestaurantes(): Observable<Restaurante[]> {
    return this.http.get(environment.baseUrl + '/givemefood/restaurantes/find').pipe(
      map(data => data as HTTPFind),
      map(data => data.RESTAURANTES)
    );
  }
}
