import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {CommonModule, NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  onsubmit() {
    if (this.form.valid) {
      this.authService.login(this.form.value).subscribe({
        next: (response) => {
          this.authService.saveToken(response.token);
          console.log('Login successful:', response);
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error('Login failed:', error);
          alert('Invalid email or password. Please try again.');
        },
      });
    }
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }
}
