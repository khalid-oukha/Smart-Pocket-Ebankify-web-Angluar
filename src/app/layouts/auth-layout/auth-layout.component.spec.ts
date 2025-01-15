import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing'; // For RouterOutlet and routing dependencies
import { AuthLayoutComponent } from './auth-layout.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('AuthLayoutComponent', () => {
  let component: AuthLayoutComponent;
  let fixture: ComponentFixture<AuthLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        AuthLayoutComponent,
        HeaderComponent,
        FooterComponent,
        RouterOutlet
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the header', () => {
    const headerElement = fixture.debugElement.query(By.css('app-header'));
    expect(headerElement).toBeTruthy();
  });

  it('should render the footer', () => {
    const footerElement = fixture.debugElement.query(By.css('app-footer'));
    expect(footerElement).toBeTruthy();
  });

  it('should render the router outlet', () => {
    const routerOutletElement = fixture.debugElement.query(By.css('router-outlet'));
    expect(routerOutletElement).toBeTruthy();
  });
});
