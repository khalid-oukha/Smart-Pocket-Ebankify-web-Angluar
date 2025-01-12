import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {BankAccount} from "../../../models/bankAccount.model";
import {BankAccountsService} from "../../../core/services/bankAccounts/bank-accounts.service";
import {AccountService} from "../../../core/services/bankAccounts/account.service";


@Component({
  selector: 'app-front-sidebar',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './front-sidebar.component.html',
  styleUrl: './front-sidebar.component.css',
})
export class FrontSidebarComponent implements OnInit {
  userAccounts: BankAccount[] = []; // List of user accounts
  selectedAccountId: number | null = null; // Currently selected account ID

  constructor(
    private bankAccountsService: BankAccountsService,
    private accountService: AccountService // Service to manage the selected account
  ) {}

  ngOnInit(): void {
    this.fetchUserAccounts();
  }

  // Fetch user accounts
  fetchUserAccounts(): void {
    this.bankAccountsService.connectedUserBankAccounts().subscribe({
      next: (accounts) => {
        this.userAccounts = accounts;
        if (accounts.length > 0) {
          this.selectedAccountId = accounts[0].id; // Select the first account by default
          this.onAccountChange(); // Trigger the change event
        }
      },
      error: (error) => {
        console.error('Failed to fetch bank accounts:', error);
      },
    });
  }

  // Handle account selection change
  onAccountChange(): void {
    if (this.selectedAccountId !== null) {
      this.accountService.setSelectedAccountId(this.selectedAccountId); // Update the selected account in the service
    }
  }
}
