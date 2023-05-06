import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public mensaje: string = '';

  public username: string = '';
  public password: string = '';
  public remember: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  public ngOnInit(): void {
    this.username = localStorage.getItem('login/username') || '';
    this.password = localStorage.getItem('login/password') || '';
    this.remember = JSON.parse(localStorage.getItem('login/remember') || 'false') as boolean || false;
  }

  public doLogin() {
    this.mensaje = '';

    this.authService.login(this.username, this.password).subscribe(result => {
      if (result) {
        if (this.remember) {
          localStorage.setItem('login/username', this.username);
          localStorage.setItem('login/password', this.password);
          localStorage.setItem('login/remember', JSON.stringify(this.remember));
        }
        this.router.navigate(['']);
      } else {
        this.password = '';
        this.mensaje = 'Usuario o contraseña incorrectos';
      }
    });
  }

  onChangeRemember(event: MatCheckboxChange) {
    if (!event.checked) {
      localStorage.setItem('login/username', '');
      localStorage.setItem('login/password', '');
      localStorage.setItem('login/remember', 'false');
    }
  }

}
