import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {TransactionsComponent} from "./pages/transactions/transactions.component";
import {CreateTransactionComponent} from "./pages/create-transaction/create-transaction.component";
import {TransactionDetailsComponent} from "./pages/transaction-details/transaction-details.component";

const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'transactions',component:TransactionsComponent},
  {path:'transactions/create',component:CreateTransactionComponent},
  {path:'transactions/:id',component:TransactionDetailsComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontofficeRoutingModule { }
