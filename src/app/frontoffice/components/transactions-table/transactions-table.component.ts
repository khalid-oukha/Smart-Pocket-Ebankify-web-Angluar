import {Component, Input} from '@angular/core';
import {CommonModule, NgClass} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-transactions-table',
  standalone: true,
  imports: [
    NgClass,
    CommonModule,
    RouterLink
  ],
  templateUrl: './transactions-table.component.html',
  styleUrl: './transactions-table.component.css'
})
export class TransactionsTableComponent {
  @Input() transactions: any[] = [];
}
