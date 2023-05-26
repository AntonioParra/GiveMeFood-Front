import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { RestaurantsService } from 'src/app/services/restaurants.service';
import { UsersService } from 'src/app/services/users.service';
import { Restaurante, Tag, Usuario } from 'src/app/types/types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public user: Usuario | undefined;
  public restaurantes: Restaurante[] = [];
  public tags: Tag[] = [];
  public users: Usuario[] = [];

  constructor(
    private authService: AuthService,
    private restaurantsService: RestaurantsService,
    private usersService: UsersService
  ) {}


  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.loadRestaurants();
    this.loadTags();
    this.loadUsers();
  }


  loadRestaurants() {
    this.restaurantsService.getRestaurantes().subscribe(data => {
      this.restaurantes = data;
    });
  }

  loadTags() {
    this.restaurantsService.getTags().subscribe(data => {
      this.tags = data;
    });
  }

  loadUsers() {
    this.usersService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  salir(): void {
    this.authService.logout();
  }




}
