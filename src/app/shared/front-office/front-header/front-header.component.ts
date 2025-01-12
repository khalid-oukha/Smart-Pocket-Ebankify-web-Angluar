import { Component } from '@angular/core';
import {NgIf} from "@angular/common";
import {AuthService} from "../../../core/services/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-front-header',
  standalone: true,
    imports: [
        NgIf
    ],
  templateUrl: './front-header.component.html',
  styleUrl: './front-header.component.css'
})
export class FrontHeaderComponent {
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
