import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, from, map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { CuberiteHTTPResponse, Restaurante, Tag, TipoTag, Usuario } from '../types/types';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {

  constructor(private http: HttpClient) { }

  public getRestaurantes(filter: {users: Usuario[], tags: Tag[]}): Observable<Restaurante[]> {

    const params: any = {};
    if(filter?.users?.length) {
      params.UserIds = filter.users.map(item => item.IDUsuario).join(',');
    }
    if(filter?.tags?.length) {
      params.TagIds = filter.tags.map(item => item.IDTag).join(',');
    }

    let httpParams = new HttpParams();
    for(let key in params) {
      httpParams = httpParams.set(key, params[key]);
    }

    return this.http.get(environment.baseUrl + '/givemefood/restaurantes/find', {
      params: httpParams
    }).pipe(
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
      map(data => (data.DATA as any).TAGS)
    );
  }

  public getTiposTag(): Observable<TipoTag[]> {
    return this.http.get(environment.baseUrl + '/givemefood/restaurantes/getAllTags').pipe(
      map(data => data as CuberiteHTTPResponse<TipoTag[]>),
      map(data => (data.DATA as any).TAGS_BY_TIPO_TAG)
    );
  }
}
