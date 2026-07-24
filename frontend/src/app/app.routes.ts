import { Routes } from '@angular/router';
import { Main } from './main/main';
import { Register } from './register/register';
import { Login } from './login/login';
import { authGuard } from './guards/auth-guard';
import { guestGuard } from './guards/guest-guard';

export const routes: Routes = [

  {path: "register", component:Register , canActivate: [guestGuard]},
  {path: "login", component:Login , canActivate: [guestGuard]},

  {path: "main" , component: Main , canActivate: [authGuard]},
];
