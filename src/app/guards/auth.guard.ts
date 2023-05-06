import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  canActivate(): Observable<boolean> {
    return this.authService.checkSession().pipe(
      tap(data => {
        if(!data) {
          this.router.navigate(['login']);
        }
      })
    )
  }
  
}
