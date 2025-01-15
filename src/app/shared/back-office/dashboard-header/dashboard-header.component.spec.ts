import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardHeaderComponent } from './dashboard-header.component';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

describe('DashboardHeaderComponent', () => {
  let component: DashboardHeaderComponent;
  let fixture: ComponentFixture<DashboardHeaderComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authService = jasmine.createSpyObj('AuthService', ['isLoggedIn', 'logout']);
    router = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [NgIf, DashboardHeaderComponent],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardHeaderComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set isLoggedIn to true if the user is logged in', () => {
    authService.isLoggedIn.and.returnValue(true);

    // Trigger ngOnInit
    fixture.detectChanges();

    // Verify isLoggedIn is set correctly
    expect(component.isLoggedIn).toBeTrue();
  });

  it('should set isLoggedIn to false if the user is not logged in', () => {
    // Mock isLoggedIn to return false
    authService.isLoggedIn.and.returnValue(false);

    // Trigger ngOnInit
    fixture.detectChanges();

    // Verify isLoggedIn is set correctly
    expect(component.isLoggedIn).toBeFalse();
  });

  it('should call AuthService.logout and navigate to login page on logout', () => {
    // Mock isLoggedIn to return true
    authService.isLoggedIn.and.returnValue(true);

    // Mock router.navigate to return a resolved Promise
    router.navigate.and.returnValue(Promise.resolve(true));

    // Trigger ngOnInit
    fixture.detectChanges();

    // Call the logout method
    component.logout();

    // Verify AuthService.logout was called
    expect(authService.logout).toHaveBeenCalled();

    // Verify isLoggedIn is set to false
    expect(component.isLoggedIn).toBeFalse();

    // Verify navigation to the login page
    expect(router.navigate).toHaveBeenCalledWith(['auth/login']);
  });

  it('should render the logout button if the user is logged in', () => {
    // Mock isLoggedIn to return true
    authService.isLoggedIn.and.returnValue(true);

    // Trigger ngOnInit
    fixture.detectChanges();

    // Check if the logout button is rendered
    const logoutButton = fixture.nativeElement.querySelector('button');
    expect(logoutButton).toBeTruthy(); // Ensure the button exists
  });

  it('should not render the logout button if the user is not logged in', () => {
    // Mock isLoggedIn to return false
    authService.isLoggedIn.and.returnValue(false);

    // Trigger ngOnInit
    fixture.detectChanges();

    // Check if the logout button is not rendered
    const logoutButton = fixture.nativeElement.querySelector('button[ng-if="isLoggedIn"]');
    expect(logoutButton).toBeFalsy();
  });
});
