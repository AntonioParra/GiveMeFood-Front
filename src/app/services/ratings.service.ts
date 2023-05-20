import { Injectable } from '@angular/core';
import { Restaurante } from '../types/types';

@Injectable({
  providedIn: 'root'
})
export class RatingsService {

  constructor() { }

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
    if (restaurante.valoracionMedia === 0) {
      return colorNumber === 0;
    } else if (restaurante.valoracionMedia < 1.5) {
      return colorNumber === 1;
    } else if(restaurante.valoracionMedia < 2.5) {
      return colorNumber === 2;
    } else {
      return colorNumber === 3;
    }
  }
}
