import { Component } from '@angular/core';
import {DashboardHeaderComponent} from "../../shared/back-office/dashboard-header/dashboard-header.component";
import {DashboardSideBarComponent} from "../../shared/back-office/dashboard-side-bar/dashboard-side-bar.component";
import {RouterOutlet} from "@angular/router";
import {FrontHeaderComponent} from "../../shared/front-office/front-header/front-header.component";
import {FrontSidebarComponent} from "../../shared/front-office/front-sidebar/front-sidebar.component";

@Component({
  selector: 'app-front-office-layout',
  standalone: true,
  imports: [
    DashboardHeaderComponent,
    DashboardSideBarComponent,
    RouterOutlet,
    FrontHeaderComponent,
    FrontSidebarComponent
  ],
  templateUrl: './front-office-layout.component.html',
  styleUrl: './front-office-layout.component.css'
})
export class FrontOfficeLayoutComponent {

}
