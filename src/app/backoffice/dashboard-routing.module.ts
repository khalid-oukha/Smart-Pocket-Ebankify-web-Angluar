import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProfileComponent} from "./profile/profile.component";
import {UsersComponent} from "./users/users.component";
import {BankaccountsComponent} from "./bankaccounts/bankaccounts.component";
import {AccountDetailsComponent} from "./account-details/account-details.component";
import {TransactionsComponent} from "./transactions/transactions.component";

const routes: Routes = [
  {path:'profile',component:ProfileComponent},
  {path:'users',component:UsersComponent},
  {path:'bank-accounts/account/:id',component:AccountDetailsComponent},
  {path:'bank-accounts',component:BankaccountsComponent},
  {path:'transactions',component:TransactionsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
