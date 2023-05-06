import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginModule } from './login/login.module';
import { HomeModule } from './home/home.module';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path:'login', loadChildren: () => LoginModule},
  {path:'', loadChildren: () => HomeModule, canActivate: [AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
