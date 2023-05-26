import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { RestaurantsService } from 'src/app/services/restaurants.service';
import { Restaurante, Usuario } from 'src/app/types/types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public user: Usuario | undefined;
  public restaurantes: Restaurante[] = [];

  constructor(
    private authService: AuthService,
    private restaurantsService: RestaurantsService
  ) {}


  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.loadRestaurants();
    
  }


  loadRestaurants() {
    this.restaurantsService.getRestaurantes().subscribe(data => {
      this.restaurantes = data;
    });
  }


  salir(): void {
    this.authService.logout();
  }




}
