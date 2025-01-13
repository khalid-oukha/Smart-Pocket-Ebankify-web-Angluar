import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BankAccount } from '../../../models/bankAccount.model';
import { BankAccountsService } from '../../../core/services/bankAccounts/bank-accounts.service';
import { TransactionsService } from '../../../core/services/transactions/transactions.service';
import { NgForOf, NgIf } from '@angular/common';
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-transaction',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './create-transaction.component.html',
  styleUrls: ['./create-transaction.component.css']
})
export class CreateTransactionComponent implements OnInit {
  transactionForm: FormGroup;
  accounts: BankAccount[] = [];
  transactionTypes = [
    { label: 'Classic', value: 'CLASSIC' },
    { label: 'Instant', value: 'INSTANT' },
    { label: 'Scheduled', value: 'SCHEDULED' }
  ];
  backendError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private bankAccountsService: BankAccountsService,
    private transactionsService: TransactionsService,
    private router: Router
  ) {
    this.transactionForm = this.fb.group({
      type: ['CLASSIC', Validators.required],
      amount: [0, [Validators.required, Validators.min(0.01)]],
      accountFromNumber: [null, Validators.required],
      accountToNumber: [null, [Validators.required, Validators.pattern(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/)]]
    });
  }

  ngOnInit(): void {
    this.loadUserAccounts();
  }

  loadUserAccounts(): void {
    this.bankAccountsService.connectedUserBankAccounts().subscribe(accounts => {
      this.accounts = accounts;
    });
  }

  onSubmit(): void {
    if (this.transactionForm.invalid) {
      return;
    }

    const transactionData = this.transactionForm.value;

    if (transactionData.accountFromNumber === transactionData.accountToNumber) {
      this.backendError = 'Source and destination accounts cannot be the same.';
      return;
    }

    this.backendError = null;

    this.transactionsService.createTransaction(transactionData).subscribe({
      next: (response) => {
        this.router.navigate(['user/transactions', response.id]);
      },
      error: (error) => {
        if (error.error) {
          this.backendError = error.error.message || 'An error occurred while creating the transaction.';
        } else {
          this.backendError = 'An unexpected error occurred. Please try again.';
        }
      }
    });
  }
}
