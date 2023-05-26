import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, from, map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { CuberiteHTTPResponse, Restaurante, Tag } from '../types/types';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {

  constructor(private http: HttpClient) { }

  public getRestaurantes(): Observable<Restaurante[]> {
    return this.http.get(environment.baseUrl + '/givemefood/restaurantes/find').pipe(
      map(data => data as CuberiteHTTPResponse<Restaurante[]>),
      map(data => data.DATA)
    );
  }

  public getRestaurante(restaurante: Restaurante): Observable<Restaurante> {
    return this.http.get(environment.baseUrl + '/givemefood/restaurantes/get?' + `IDRestaurante=${restaurante.IDRestaurante}`).pipe(
      map(data => data as CuberiteHTTPResponse<Restaurante>),
      map(data => data.DATA)
    );
  }

  public getTags(): Observable<Tag[]> {
    return this.http.get(environment.baseUrl + '/givemefood/restaurantes/getAllTags').pipe(
      map(data => data as CuberiteHTTPResponse<Tag[]>),
      map(data => data.DATA)
    );
  }
}
