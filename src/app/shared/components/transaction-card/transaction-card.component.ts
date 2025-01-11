import {Component, Input} from '@angular/core';
import {Transaction} from "../../../models/Transaction.model";
import {NgClass, NgForOf} from "@angular/common";

@Component({
  selector: 'app-transaction-card',
  standalone: true,
  imports: [
    NgClass,
    NgForOf
  ],
  templateUrl: './transaction-card.component.html',
  styleUrl: './transaction-card.component.css'
})
export class TransactionCardComponent {
  @Input() transaction!: Transaction;
}
