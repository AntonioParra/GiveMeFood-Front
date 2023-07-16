import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';
import { RestaurantFilterPopupComponent } from 'src/app/components/restaurant-filter-popup/restaurant-filter-popup.component';
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

  public filter: {
    users: Usuario[],
    tags: Tag[]
  } = {
    users: [],
    tags: []
  };

  constructor(
    private authService: AuthService,
    private restaurantsService: RestaurantsService,
    private usersService: UsersService,
    public dialog: MatDialog
  ) {}


  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.loadRestaurants();
  }


  loadRestaurants() {
    this.restaurantsService.getRestaurantes(this.filter).subscribe(data => {
      this.restaurantes = data;
    });
  }

  openFilterDialog() {
    forkJoin([
      this.usersService.getUsers(),
      this.restaurantsService.getTiposTag()
    ]).subscribe(datas => {
      const popup = this.dialog.open(RestaurantFilterPopupComponent, {
        data: {
          users: datas[0],
          tags: datas[1]
        }
      });
  
      popup.afterClosed().subscribe(selected => {
        this.filter = selected;
        this.loadRestaurants();
      });
    });
  }

  salir(): void {
    this.authService.logout();
  }




}
