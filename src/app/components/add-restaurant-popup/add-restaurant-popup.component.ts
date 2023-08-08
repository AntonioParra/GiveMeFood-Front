import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { latLng, tileLayer } from 'leaflet';
import * as L from 'leaflet';
import { Restaurante, TipoTag } from 'src/app/types/types';

@Component({
  selector: 'app-add-restaurant-popup',
  templateUrl: './add-restaurant-popup.component.html',
  styleUrls: ['./add-restaurant-popup.component.scss']
})
export class AddRestaurantPopupComponent implements OnInit{

  public restaurante: Restaurante;
  public tags: any[]; 

  public map: any = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { tags: TipoTag[] }
  ) {
    data.tags.sort((a1, a2) => a1.nombre.toUpperCase() < a2.nombre.toUpperCase() ? -1 : 1);
    this.tags = data.tags.map(item => ({
      IDTipoTag: item.IDTipoTag,
      nombre: item.nombre,
      GMFTagsCollection: item.GMFTagsCollection?.map(item2 => ({
        tag: item2,
        selected: false
      })).sort((a1, a2) => a1.tag.nombreTag.toUpperCase() < a2.tag.nombreTag.toUpperCase() ? -1 : 1)
    }));

    this.restaurante = {
      IDRestaurante: -1,
      cartaLink: '',
      coordenadaX: null,
      coordenadaY: null,
      direccion: '',
      googleMapLink: '',
      nombre: '',
      rangoPrecioMax: 20,
      rangoPrecioMin: 5,
      valoracionUsuario: null,
      GMFRestaurantesTagsCollection: [],
      GMFValoracionesCollection: []
    };
  }

  ngOnInit(): void {
    this.restaurante = {
      IDRestaurante: -1,
      cartaLink: '',
      coordenadaX: null,
      coordenadaY: null,
      direccion: '',
      googleMapLink: '',
      nombre: '',
      rangoPrecioMax: 20,
      rangoPrecioMin: 5,
      valoracionUsuario: null,
      GMFRestaurantesTagsCollection: [],
      GMFValoracionesCollection: []
    };

    let mapOptions = {
      layers: [
        tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '' })
      ],
      zoom: 11,
      center: latLng(37.3862124, -5.9419465),
      zoomControl: true,
      scrollWheelZoom: false
    };

    this.map = L.map('map', mapOptions);
    const markersGroup = L.layerGroup();
    this.map.addLayer(markersGroup);
    this.map.on('click', (evt: L.LeafletMouseEvent) => this.setMarker(evt, markersGroup))
  }

  setMarker(event: L.LeafletMouseEvent, markersGroup: L.LayerGroup<any>) {
    this.restaurante.coordenadaX = event.latlng.lng;
    this.restaurante.coordenadaY = event.latlng.lat;

    L.marker(event.latlng).addTo(markersGroup);
  }

  addRestaurant() {
    this.restaurante.GMFRestaurantesTagsCollection = this.tags.reduce((acc, cur) => acc.concat(cur.GMFTagsCollection.filter((item: { selected: any; }) => item.selected).map((item: { tag: any; }) => item.tag)), []);
    debugger
  }


}
