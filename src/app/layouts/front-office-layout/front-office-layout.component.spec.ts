import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing'; // For RouterOutlet and routing dependencies
import { FrontOfficeLayoutComponent } from './front-office-layout.component';
import { FrontHeaderComponent } from '../../shared/front-office/front-header/front-header.component';
import { FrontSidebarComponent } from '../../shared/front-office/front-sidebar/front-sidebar.component';
import { RouterOutlet } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('FrontOfficeLayoutComponent', () => {
  let component: FrontOfficeLayoutComponent;
  let fixture: ComponentFixture<FrontOfficeLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        FrontOfficeLayoutComponent,
        FrontHeaderComponent,
        FrontSidebarComponent,
        RouterOutlet
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FrontOfficeLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the front header', () => {
    const headerElement = fixture.debugElement.query(By.css('app-front-header'));
    expect(headerElement).toBeTruthy();
  });

  it('should render the front sidebar', () => {
    const sidebarElement = fixture.debugElement.query(By.css('app-front-sidebar'));
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
