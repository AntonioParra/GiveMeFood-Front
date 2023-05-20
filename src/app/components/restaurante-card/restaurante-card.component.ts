import { Component, Input } from '@angular/core';
import { RatingsService } from 'src/app/services/ratings.service';
import { Restaurante } from 'src/app/types/types';

@Component({
  selector: 'app-restaurante-card',
  templateUrl: './restaurante-card.component.html',
  styleUrls: ['./restaurante-card.component.scss']
})
export class RestauranteCardComponent {

  @Input()
  public restaurante: Restaurante | undefined;

  constructor(
    protected ratingsService: RatingsService
  ) {}


  getPrecios(): string {
    if(!this.restaurante) {
      return '';
    }

    if(this.restaurante.rangoPrecioMin && this.restaurante.rangoPrecioMax) {
      return '';
    } else if(this.restaurante.rangoPrecioMin) {
      return `${this.restaurante.rangoPrecioMin}€`;
    } else if(this.restaurante.rangoPrecioMax) {
      return `${this.restaurante.rangoPrecioMax}€`;
    } else {
      return '?';
    }
  }


  openGoogleMaps(): void {
    if(this.restaurante?.googleMapLink) {
      window.open(this.restaurante?.googleMapLink, '_blank');
    } else {
      window.open('http://maps.google.com/?q=' + this.restaurante?.direccion, '_blank');
    }
    
  }

  openCarta(): void {
    window.open(this.restaurante?.cartaLink, '_blank');
  }
}
