import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProfileComponent} from "./profile/profile.component";
import {UsersComponent} from "./users/users.component";

const routes: Routes = [
  {path:'profile',component:ProfileComponent},
  {path:'users',component:UsersComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
