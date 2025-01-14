import {Component, Input} from '@angular/core';
import {CommonModule, NgClass} from "@angular/common";

@Component({
  selector: 'app-account-card',
  standalone: true,
  imports: [
    NgClass,
    CommonModule
  ],
  templateUrl: './account-card.component.html',
  styleUrl: './account-card.component.css'
})
export class AccountCardComponent {
  @Input() account: any = null;

}
