import { Routes } from '@angular/router';
import {LayoutComponent} from "./pages/layout/layout.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {adminGuard} from "./core/guards/admin.guard";
import {authGuard} from "./core/guards/auth.guard";

export const routes: Routes = [
  {
    path: '',component: LayoutComponent,
    children: [
      {path:'',redirectTo: 'dashboard',pathMatch: 'full'},
      {path:'dashboard',component: DashboardComponent,canActivate: [adminGuard]},
      {path:'login',component: LoginComponent,canActivate: [authGuard]},
      {path:'register',component: RegisterComponent, canActivate: [authGuard]},
    ]
  }
];
