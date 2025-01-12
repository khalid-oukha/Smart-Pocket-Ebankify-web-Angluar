import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-account-card',
  standalone: true,
  imports: [],
  templateUrl: './account-card.component.html',
  styleUrl: './account-card.component.css'
})
export class AccountCardComponent {
  @Input() account:any = null;
}
