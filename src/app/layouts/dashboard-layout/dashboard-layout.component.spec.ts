import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing'; // Import RouterTestingModule
import { DashboardLayoutComponent } from './dashboard-layout.component';
import { DashboardHeaderComponent } from '../../shared/back-office/dashboard-header/dashboard-header.component';
import { DashboardSideBarComponent } from '../../shared/back-office/dashboard-side-bar/dashboard-side-bar.component';
import { ProfileComponent } from '../../backoffice/profile/profile.component';
import { RouterOutlet } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('DashboardLayoutComponent', () => {
  let component: DashboardLayoutComponent;
  let fixture: ComponentFixture<DashboardLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule, // Add RouterTestingModule
        DashboardLayoutComponent, // Import the standalone component
        DashboardHeaderComponent,
        DashboardSideBarComponent,
        ProfileComponent,
        RouterOutlet
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the dashboard header', () => {
    const headerElement = fixture.debugElement.query(By.css('app-dashboard-header'));
    expect(headerElement).toBeTruthy();
  });

  it('should render the dashboard sidebar', () => {
    const sidebarElement = fixture.debugElement.query(By.css('app-dashboard-side-bar'));
    expect(sidebarElement).toBeTruthy();
  });

  it('should render the router outlet', () => {
    const routerOutletElement = fixture.debugElement.query(By.css('router-outlet'));
    expect(routerOutletElement).toBeTruthy();
  });

  it('should have the correct CSS classes applied', () => {
    const mainElement = fixture.debugElement.query(By.css('main'));
    expect(mainElement.nativeElement.classList.contains('flex')).toBeTrue();
    expect(mainElement.nativeElement.classList.contains('flex-col')).toBeTrue();
    expect(mainElement.nativeElement.classList.contains('w-full')).toBeTrue();
    expect(mainElement.nativeElement.classList.contains('bg-white')).toBeTrue();
    expect(mainElement.nativeElement.classList.contains('overflow-x-hidden')).toBeTrue();
    expect(mainElement.nativeElement.classList.contains('overflow-y-auto')).toBeTrue();
    expect(mainElement.nativeElement.classList.contains('mb-4')).toBeTrue();
  });
});
