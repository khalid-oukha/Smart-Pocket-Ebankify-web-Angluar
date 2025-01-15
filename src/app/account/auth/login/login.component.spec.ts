import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { LoginResponse } from '../../../models/LoginResponse';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // Create spy objects for AuthService and Router
    authService = jasmine.createSpyObj('AuthService', ['login', 'saveToken', 'fetchUserDetails']);
    router = jasmine.createSpyObj('Router', ['navigate']);

    // Configure the navigate method to return a resolved Promise
    router.navigate.and.returnValue(Promise.resolve(true));

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, LoginComponent],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values', () => {
    expect(component.form.value).toEqual({ email: '', password: '' });
  });

  it('should validate the email field', () => {
    const emailControl = component.form.get('email');

    // Test required validation
    emailControl?.setValue('');
    expect(emailControl?.hasError('required')).toBeTrue();

    // Test email format validation
    emailControl?.setValue('invalid-email');
    expect(emailControl?.hasError('email')).toBeTrue();

    // Test valid email
    emailControl?.setValue('valid@example.com');
    expect(emailControl?.valid).toBeTrue();
  });

  it('should validate the password field', () => {
    const passwordControl = component.form.get('password');

    // Test required validation
    passwordControl?.setValue('');
    expect(passwordControl?.hasError('required')).toBeTrue();

    // Test minlength validation
    passwordControl?.setValue('12345');
    expect(passwordControl?.hasError('minlength')).toBeTrue();

    // Test valid password
    passwordControl?.setValue('123456');
    expect(passwordControl?.valid).toBeTrue();
  });

  it('should call AuthService.login and navigate on successful login', () => {
    const mockLoginResponse: LoginResponse = { token: 'mock-token' };
    const mockUser = { role: 'USER' };

    // Mock the AuthService.login and fetchUserDetails methods
    authService.login.and.returnValue(of(mockLoginResponse));
    authService.fetchUserDetails.and.returnValue(of(mockUser));

    // Set form values
    component.form.setValue({ email: 'test@example.com', password: 'password' });

    // Trigger form submission
    component.onsubmit();

    // Verify AuthService.login was called
    expect(authService.login).toHaveBeenCalledWith({ email: 'test@example.com', password: 'password' });

    // Verify AuthService.saveToken was called
    expect(authService.saveToken).toHaveBeenCalledWith('mock-token');

    // Verify AuthService.fetchUserDetails was called
    expect(authService.fetchUserDetails).toHaveBeenCalled();

    // Verify navigation based on role
    expect(router.navigate).toHaveBeenCalledWith(['/user/home']);
  });

  it('should handle login error', () => {
    const consoleSpy = spyOn(console, 'error');

    // Mock AuthService.login to return an error
    authService.login.and.returnValue(throwError(() => new Error('Login failed')));

    // Set form values
    component.form.setValue({ email: 'test@example.com', password: 'password' });

    // Trigger form submission
    component.onsubmit();

    // Verify error handling
    expect(consoleSpy).toHaveBeenCalledWith('Login failed:', jasmine.any(Error));
  });

  it('should handle fetchUserDetails error', () => {
    const consoleSpy = spyOn(console, 'error');
    const mockLoginResponse: LoginResponse = { token: 'mock-token' };

    // Mock AuthService.login to return a success response
    authService.login.and.returnValue(of(mockLoginResponse));

    // Mock AuthService.fetchUserDetails to return an error
    authService.fetchUserDetails.and.returnValue(throwError(() => new Error('Failed to fetch user details')));

    // Set form values
    component.form.setValue({ email: 'test@example.com', password: 'password' });

    // Trigger form submission
    component.onsubmit();

    // Verify error handling
    expect(consoleSpy).toHaveBeenCalledWith('Failed to fetch user details:', jasmine.any(Error));
  });
});
