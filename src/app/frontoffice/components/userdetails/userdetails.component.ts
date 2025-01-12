import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-userdetails',
  standalone: true,
  imports: [],
  templateUrl: './userdetails.component.html',
  styleUrl: './userdetails.component.css'
})
export class UserdetailsComponent {
  @Input() userDetails: any;
}
