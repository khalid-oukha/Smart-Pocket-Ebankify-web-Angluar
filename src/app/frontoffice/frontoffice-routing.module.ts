import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {TransactionsComponent} from "./pages/transactions/transactions.component";

const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'transactions',component:TransactionsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontofficeRoutingModule { }
