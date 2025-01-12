import { Routes } from '@angular/router';
import {AuthLayoutComponent} from "./layouts/auth-layout/auth-layout.component";
import {DashboardLayoutComponent} from "./layouts/dashboard-layout/dashboard-layout.component";
import {loggedInGuard} from "./core/guards/AuthGuard/logged-in.guard";
import {adminGuard} from "./core/guards/AdminGuard/admin.guard";
import {HomeComponent} from "./frontoffice/pages/home/home.component";
import {FrontOfficeLayoutComponent} from "./layouts/front-office-layout/front-office-layout.component";

export const routes: Routes = [

  {
    path:'auth',
    component:AuthLayoutComponent,
    canActivate: [loggedInGuard],
    loadChildren: () => import('./account/account-routing.module').then(m => m.AccountRoutingModule),
  },
  {
    path:'admin',
    component:DashboardLayoutComponent,
    canActivate: [adminGuard],
    loadChildren:() => import('./backoffice/dashboard-routing.module').then(m => m.DashboardRoutingModule),
  },
  {
    path:'user',
    component:FrontOfficeLayoutComponent,
    loadChildren:() => import('./frontoffice/frontoffice-routing.module').then(m => m.FrontofficeRoutingModule),
  },
  {
    path: '',redirectTo: '/user/home',pathMatch: 'full'
  }

];

