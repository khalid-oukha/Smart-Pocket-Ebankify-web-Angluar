import {Component, Input} from '@angular/core';
import {BankAccount} from "../../../models/bankAccount.model";

@Component({
  selector: 'app-account-information-card',
  standalone: true,
  imports: [],
  templateUrl: './account-information-card.component.html',
  styleUrl: './account-information-card.component.css'
})
export class AccountInformationCardComponent {
  @Input() account!: BankAccount;
}
