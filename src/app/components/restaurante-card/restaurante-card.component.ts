import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { latLng, marker, tileLayer, icon, Icon } from 'leaflet';
import { RatingsService } from 'src/app/services/ratings.service';
import { Restaurante } from 'src/app/types/types';
import { RestaurantsService } from 'src/app/services/restaurants.service';

@Component({
  selector: 'app-restaurante-card',
  templateUrl: './restaurante-card.component.html',
  styleUrls: ['./restaurante-card.component.scss']
})
export class RestauranteCardComponent implements OnChanges{

  @Input()
  public restaurante: Restaurante | undefined;

  public showMap: boolean = false;
  public mapOptions: any = null;
  public mapLayers: any = null;

  constructor(
    protected ratingsService: RatingsService,
    private restaurantsService: RestaurantsService
  ) {}

  ngOnChanges(): void {
    if(!this.restaurante?.coordenadaX || !this.restaurante?.coordenadaY) {
      return;
    }

    this.showMap = true;
    this.mapOptions = {
      layers: [
        tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '' })
      ],
      zoom: 16,
      center: latLng(this.restaurante?.coordenadaX!, this.restaurante?.coordenadaY!),
      zoomControl: true,
      scrollWheelZoom: false
      
    };
    this.mapLayers = [
      marker([ this.restaurante?.coordenadaX!, this.restaurante?.coordenadaY! ], {
        icon: icon({
          ...Icon.Default.prototype.options,
          iconUrl: 'assets/marker-icon.png',
          iconRetinaUrl: 'assets/marker-icon-2x.png',
          shadowUrl: 'assets/marker-shadow.png'
        })})
    ]
  }

  reload(): void {
    this.restaurantsService.getRestaurante(this.restaurante!).subscribe(data => this.restaurante = data);
  }


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

  rate(rate: number): void {
    // this.restaurante.valoracionPropia = rate;
    this.ratingsService.rate(rate, this.restaurante!).subscribe(() => this.reload());
  }
}
