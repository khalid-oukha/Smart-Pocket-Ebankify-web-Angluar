import { Component } from '@angular/core';
import {DashboardHeaderComponent} from "../../shared/back-office/dashboard-header/dashboard-header.component";
import {DashboardSideBarComponent} from "../../shared/back-office/dashboard-side-bar/dashboard-side-bar.component";
import {ProfileComponent} from "../../backoffice/profile/profile.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [
    DashboardHeaderComponent,
    DashboardSideBarComponent,
    ProfileComponent,
    RouterOutlet
  ],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css'
})
export class DashboardLayoutComponent {

}
