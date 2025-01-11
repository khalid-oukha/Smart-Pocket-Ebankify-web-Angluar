import {Component, OnInit} from '@angular/core';
import {BankAccount} from "../../models/bankAccount.model";
import {ActivatedRoute} from "@angular/router";
import {BankAccountsService} from "../../core/services/bankAccounts/bank-accounts.service";
import {Transaction} from "../../models/Transaction.model";
import {NgClass, NgForOf} from "@angular/common";
import {TransactionsComponent} from "../transactions/transactions.component";
import {
  AccountInformationCardComponent
} from "../../shared/components/account-information-card/account-information-card.component";
import {TransactionCardComponent} from "../../shared/components/transaction-card/transaction-card.component";

@Component({
  selector: 'app-account-details',
  standalone: true,
  imports: [
    NgClass,
    NgForOf,
    TransactionsComponent,
    AccountInformationCardComponent,
    TransactionCardComponent
  ],
  templateUrl: './account-details.component.html',
  styleUrl: './account-details.component.css'
})
export class AccountDetailsComponent implements OnInit {
  account!: BankAccount;
  transactions: Transaction[] = [];

  constructor(
    private route: ActivatedRoute,
    private bankAccountService: BankAccountsService
  ) {}

  ngOnInit(): void {
    const accountId = this.route.snapshot.paramMap.get('id');
    if (accountId) {
      this.loadAccountDetails(+accountId);
    }
  }

  private loadAccountDetails(accountId: number): void {
    this.bankAccountService.accountDetails(accountId).subscribe({
      next: (account) => {
        this.account = account;
        // Assign transactions from the account response
        this.transactions = account.recentTransactionsTo || [];
      },
      error: (error) => {
        console.error('Error fetching account details:', error);
      }
    });
  }
}
