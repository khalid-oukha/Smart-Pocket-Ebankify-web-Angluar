import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TransactionsService} from "../../../core/services/transactions/transactions.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-transaction-details',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './transaction-details.component.html',
  styleUrl: './transaction-details.component.css'
})
export class TransactionDetailsComponent implements OnInit {
  transaction: any = null;
  transactionId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private transactionsService: TransactionsService
  ) {
  }

  ngOnInit(): void {
    this.transactionId = +this.route.snapshot.paramMap.get('id')!;

    if (this.transactionId) {
      this.transactionsService.findById(this.transactionId).subscribe({
        next: (data) => {
          this.transaction = data;
        },
        error: (error) => {
          console.error('Error fetching transaction details:', error);
        }
      });
    }
  }

  downloadReceipt(): void {
    window.print();
  }

}
