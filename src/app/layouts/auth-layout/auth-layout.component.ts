import { Component } from '@angular/core';
import {HeaderComponent} from "../../shared/components/header/header.component";
import {RouterOutlet} from "@angular/router";
import {FooterComponent} from "../../shared/components/footer/footer.component";

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [
    HeaderComponent,
    RouterOutlet,
    FooterComponent
  ],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.css'
})
export class AuthLayoutComponent {

}
