import { Component, OnInit } from '@angular/core';
import {TransactionsService} from "../../core/services/transactions/transactions.service";
import {CommonModule, CurrencyPipe, DatePipe, NgClass} from "@angular/common";
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
  imports: [
    DatePipe,
    CurrencyPipe,
    NgClass,
    CommonModule,
    ToastModule
  ],
  providers: [MessageService],
  standalone: true
})
export class TransactionsComponent implements OnInit {
  transactions: any[] = [];

  constructor(private transactionsService: TransactionsService,    private messageService: MessageService) {}

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
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Transaction approved successfully!'
        });
        this.loadTransactions();
      },
      error: (error) => {
        console.error('Error approving transaction:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to approve transaction. Please try again.'
        });
      }
    });
  }

  rejectTransaction(id: number): void {
    this.transactionsService.rejectTransaction(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Transaction rejected successfully!'
        });
        this.loadTransactions();
      },
      error: (error) => {
        console.error('Error rejecting transaction:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to reject transaction. Please try again.'
        });
      }
    });
  }
}
