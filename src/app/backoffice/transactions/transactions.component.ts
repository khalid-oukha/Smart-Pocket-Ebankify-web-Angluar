import { Component, OnInit } from '@angular/core';
import {TransactionsService} from "../../core/services/transactions/transactions.service";
import {CommonModule, CurrencyPipe, DatePipe, NgClass} from "@angular/common";

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
  imports: [
    DatePipe,
    CurrencyPipe,
    NgClass,
    CommonModule
  ],
  standalone: true
})
export class TransactionsComponent implements OnInit {
  transactions: any[] = [];

  constructor(private transactionsService: TransactionsService) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions(): void {
    this.transactionsService.findAll().subscribe({
      next: (data) => (this.transactions = data),
      error: (error) => console.error('Error loading transactions:', error),
    });
  }

  approveTransaction(id: number): void {
    this.transactionsService.approveTransaction(id).subscribe({
      next: () => {
        alert('Transaction approved successfully!');
        this.loadTransactions(); // Refresh the list
      },
      error: (error) => console.error('Error approving transaction:', error),
    });
  }

  rejectTransaction(id: number): void {
    this.transactionsService.rejectTransaction(id).subscribe({
      next: () => {
        alert('Transaction rejected successfully!');
        this.loadTransactions(); // Refresh the list
      },
      error: (error) => console.error('Error rejecting transaction:', error),
    });
  }
}
