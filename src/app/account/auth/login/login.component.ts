import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {CommonModule} from "@angular/common";
import {AuthService} from "../../../core/services/auth/auth.service";

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
          this.fetchUserDetailsAndRedirect();
        },
        error: (error) => {
          console.error('Login failed:', error);
        },
      });
    }
  }


  private fetchUserDetailsAndRedirect() {
    this.authService.getUserDetails().subscribe({
      next: (user) => {
        this.redirectBasedOnRole(user.role);
      },
      error: (error) => {
        console.error('Failed to fetch user details:', error);
      },
    });
  }

  private redirectBasedOnRole(role: string) {
    if (role === 'ADMIN') {
      this.router.navigate(['admin/profile']).then(() => {});
    } else if (role === 'USER') {
      this.router.navigate(['/user/profile']).then(() => {});
    } else {
      console.error('Unknown role:', role);
    }
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }
}
