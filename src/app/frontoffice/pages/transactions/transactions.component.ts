import {Component, OnInit} from '@angular/core';
import {AccountCardComponent} from "../../components/account-card/account-card.component";
import {NgForOf, NgIf} from "@angular/common";
import {TransactionsTableComponent} from "../../components/transactions-table/transactions-table.component";
import {UserdetailsComponent} from "../../components/userdetails/userdetails.component";
import {TransactionsService} from "../../../core/services/transactions/transactions.service";
import {AccountService} from "../../../core/services/bankAccounts/account.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [
    AccountCardComponent,
    NgForOf,
    NgIf,
    TransactionsTableComponent,
    UserdetailsComponent,
    RouterLink
  ],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css'
})
export class TransactionsComponent implements OnInit {
  transactions: any[] = [];

  constructor(
    private transactionsService: TransactionsService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.accountService.selectedAccountId$.subscribe((accountId) => {
      if (accountId !== null) {
        this.fetchTransactions(accountId);
      }
    });
  }

  fetchTransactions(accountId: number): void {
    this.transactionsService.getTransactionsByAccount(accountId).subscribe({
      next: (data) => {
        this.transactions = [
          ...data.from.map((t) => ({ ...t, direction: 'from' })),
          ...data.to.map((t) => ({ ...t, direction: 'to' })),
        ];
      },
      error: (error) => {
        console.error('Failed to fetch transactions:', error);
      },
    });
  }
}
