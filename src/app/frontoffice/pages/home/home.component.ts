import { Component, OnInit } from '@angular/core';
import { UserdetailsComponent } from '../../components/userdetails/userdetails.component';
import { AuthService } from '../../../core/services/auth/auth.service';
import { AccountCardComponent } from '../../components/account-card/account-card.component';
import { BankAccount } from '../../../models/bankAccount.model';
import { BankAccountsService } from '../../../core/services/bankAccounts/bank-accounts.service';
import { CommonModule } from '@angular/common';
import { TransactionsTableComponent } from '../../components/transactions-table/transactions-table.component';
import { TransactionsService } from '../../../core/services/transactions/transactions.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    UserdetailsComponent,
    AccountCardComponent,
    CommonModule,
    TransactionsTableComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  userDetails: any = null;
  userAccounts: BankAccount[] = [];
  selectedAccount: BankAccount | null = null;
  transactions: any[] = [];

  constructor(
    private authService: AuthService,
    private bankAccountsService: BankAccountsService,
    private transactionsService: TransactionsService
  ) {}

  ngOnInit(): void {
    this.fetchUserDetails();
    this.fetchUserAccounts();
  }

  fetchUserDetails(): void {
    this.authService.getUserDetails().subscribe((user) => {
      this.userDetails = user;
    });
  }

  fetchUserAccounts(): void {
    this.bankAccountsService.connectedUserBankAccounts().subscribe({
      next: (accounts) => {
        this.userAccounts = accounts;
        this.selectedAccount = accounts[0] || null;
        if (this.selectedAccount) {
          this.fetchTransactions(this.selectedAccount.id);
        }
      },
      error: (error) => {
        console.error('Failed to fetch bank accounts:', error);
      },
    });
  }

  selectAccount(account: BankAccount): void {
    this.selectedAccount = account;
    this.fetchTransactions(account.id);
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
