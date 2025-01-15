import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { NgIf } from '@angular/common';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // Create spy objects for AuthService and Router
    authService = jasmine.createSpyObj('AuthService', ['register', 'saveToken']);
    router = jasmine.createSpyObj('Router', ['navigate']);

    // Configure the navigate method to return a resolved Promise
    router.navigate.and.returnValue(Promise.resolve(true));

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, NgIf, RegisterComponent],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values', () => {
    expect(component.registerForm.value).toEqual({
      username: '',
      email: '',
      password: '',
      age: '',
      role: '',
    });
  });

  it('should validate the username field', () => {
    const usernameControl = component.registerForm.get('username');

    // Test required validation
    usernameControl?.setValue('');
    expect(usernameControl?.hasError('required')).toBeTrue();

    // Test minLength validation
    usernameControl?.setValue('ab');
    expect(usernameControl?.hasError('minlength')).toBeTrue();

    // Test valid username
    usernameControl?.setValue('validUsername');
    expect(usernameControl?.valid).toBeTrue();
  });

  it('should validate the email field', () => {
    const emailControl = component.registerForm.get('email');

    emailControl?.setValue('');
    expect(emailControl?.hasError('required')).toBeTrue();

    emailControl?.setValue('invalid-email');
    expect(emailControl?.hasError('email')).toBeTrue();

    emailControl?.setValue('valid@example.com');
    expect(emailControl?.valid).toBeTrue();
  });

  it('should validate the password field', () => {
    const passwordControl = component.registerForm.get('password');

    passwordControl?.setValue('');
    expect(passwordControl?.hasError('required')).toBeTrue();

    passwordControl?.setValue('12345');
    expect(passwordControl?.hasError('minlength')).toBeTrue();

    passwordControl?.setValue('123456');
    expect(passwordControl?.valid).toBeTrue();
  });

  it('should validate the age field', () => {
    const ageControl = component.registerForm.get('age');

    ageControl?.setValue('');
    expect(ageControl?.hasError('required')).toBeTrue();

    ageControl?.setValue('17');
    expect(ageControl?.hasError('min')).toBeTrue();

    ageControl?.setValue('100');
    expect(ageControl?.hasError('max')).toBeTrue();

    ageControl?.setValue('25');
    expect(ageControl?.valid).toBeTrue();
  });

  it('should validate the role field', () => {
    const roleControl = component.registerForm.get('role');

    roleControl?.setValue('');
    expect(roleControl?.hasError('required')).toBeTrue();

    roleControl?.setValue('USER');
    expect(roleControl?.valid).toBeTrue();
  });

  it('should call AuthService.register and navigate on successful registration', () => {
    const mockResponse = { token: 'mock-token' };

    authService.register.and.returnValue(of(mockResponse));

    component.registerForm.setValue({
      username: 'testUser',
      email: 'test@example.com',
      password: 'password',
      age: '25',
      role: 'USER',
    });

    component.onSubmit();


    expect(authService.saveToken).toHaveBeenCalledWith('mock-token');

    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should handle registration error', () => {
    const consoleSpy = spyOn(console, 'error');

    // Mock AuthService.register to return an error
    authService.register.and.returnValue(throwError(() => new Error('Registration failed')));

    // Set form values
    component.registerForm.setValue({
      username: 'testUser',
      email: 'test@example.com',
      password: 'password',
      age: '25',
      role: 'USER',
    });

    // Trigger form submission
    component.onSubmit();

    // Verify error handling
    expect(consoleSpy).toHaveBeenCalledWith('Registration failed:', jasmine.any(Error));
  });
});
