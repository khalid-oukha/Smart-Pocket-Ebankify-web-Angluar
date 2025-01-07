import { Routes } from '@angular/router';
import {AuthLayoutComponent} from "./layouts/auth-layout/auth-layout.component";
import {DashboardLayoutComponent} from "./layouts/dashboard-layout/dashboard-layout.component";

export const routes: Routes = [

  {
    path:'auth',
    component:AuthLayoutComponent,
    loadChildren: () => import('./account/account-routing.module').then(m => m.AccountRoutingModule),
  },
  {
    path:'admin',
    component:DashboardLayoutComponent,
    loadChildren:() => import('./backoffice/dashboard-routing.module').then(m => m.DashboardRoutingModule),
  },

  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },

];

