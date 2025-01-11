import { Component } from '@angular/core';
import {AuthService} from "../../../core/services/auth/auth.service";
import {NgIf} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard-header',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './dashboard-header.component.html',
  styleUrl: './dashboard-header.component.css'
})
export class DashboardHeaderComponent {
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService,private router:Router) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['auth/login']).then(r => r);
  }
}
