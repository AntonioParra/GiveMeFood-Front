import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from 'src/app/types/types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public user: Usuario | undefined;

  constructor(
    private authService: AuthService
  ) {}


  ngOnInit(): void {
    this.user = this.authService.getUser();
  }


  salir(): void {
    this.authService.logout();
  }




}
