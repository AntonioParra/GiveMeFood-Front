import { Injectable } from '@angular/core';
import { Restaurante } from '../types/types';
import { Observable, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RatingsService {

  constructor(private http: HttpClient) { }

  public getValoracionIconName(valoracion: number) {
    if (valoracion === 0) {
      return 'sentiment_very_dissatisfied';
    } else if (valoracion < 1.5) {
      return 'sentiment_dissatisfied';
    } else if(valoracion < 2.5) {
      return 'sentiment_satisfied';
    } else {
      return 'sentiment_very_satisfied';
    }
  }

  public checkColor(colorNumber: number, valoracion: number) {
    if (valoracion === 0) {
      return colorNumber === 0;
    } else if (valoracion < 1.5) {
      return colorNumber === 1;
    } else if(valoracion < 2.5) {
      return colorNumber === 2;
    } else {
      return colorNumber === 3;
    }
  }

  public checkValoracionSelected(colorNumber: number, restaurante: Restaurante) {
    const valoracionMedia = this.getValoracionMedia(restaurante);
    if (restaurante.valoracionUsuario === 0) {
      return colorNumber === 0;
    } else if (restaurante.valoracionUsuario < 1.5) {
      return colorNumber === 1;
    } else if(restaurante.valoracionUsuario < 2.5) {
      return colorNumber === 2;
    } else {
      return colorNumber === 3;
    }
  }

  public rate(rating: number, restaurante: Restaurante): Observable<any> {
    return this.http.post(environment.baseUrl + '/givemefood/restaurantes/valoracion', {
      valoracion: rating,
      IDRestauranteFK: {
        IDRestaurante: restaurante.IDRestaurante
      }
    });
  }

  public getValoracionMedia(restaurante: Restaurante): number {
    if(restaurante.GMFValoracionesCollection.length) {
      return restaurante.GMFValoracionesCollection.reduce((acc, cur) => acc + cur.valoracion, 0) / restaurante.GMFValoracionesCollection.length;
    } else {
      return 0;
    }
    
  }
}
