import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
        username: new FormControl('', [Validators.required, Validators.minLength(3)]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        age: new FormControl('', [Validators.required, Validators.min(18), Validators.max(99)]),
        role: new FormControl('', [Validators.required])
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: (response) => {
          this.authService.saveToken(response.token);
          console.log('Registration successful:', response);
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error('Registration failed:', error);
        },
      })
    }
  }
}
