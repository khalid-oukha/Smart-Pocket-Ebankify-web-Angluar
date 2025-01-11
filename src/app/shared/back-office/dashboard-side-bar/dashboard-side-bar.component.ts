import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-dashboard-side-bar',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './dashboard-side-bar.component.html',
  styleUrl: './dashboard-side-bar.component.css'
})
export class DashboardSideBarComponent {

}
