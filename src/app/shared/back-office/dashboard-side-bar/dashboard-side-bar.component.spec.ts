import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardSideBarComponent } from './dashboard-side-bar.component';
import { RouterLink, ActivatedRoute } from '@angular/router';

describe('DashboardSideBarComponent', () => {
  let component: DashboardSideBarComponent;
  let fixture: ComponentFixture<DashboardSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterLink, DashboardSideBarComponent],
      providers: [
        // Provide a mock ActivatedRoute
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => null, // Mock paramMap.get method
              },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the search bar', () => {
    const searchBar = fixture.nativeElement.querySelector('input[type="text"]');
    expect(searchBar).toBeTruthy();
    expect(searchBar.getAttribute('placeholder')).toBe('Search');
  });

  it('should render the menu items', () => {
    const menuItems = fixture.nativeElement.querySelectorAll('a');
    expect(menuItems.length).toBeGreaterThan(0);

    // Check if specific menu items are rendered
    const homeMenuItem = fixture.nativeElement.querySelector('a[href="#"]');
    expect(homeMenuItem).toBeTruthy();
    expect(homeMenuItem.textContent).toContain('Home');

    const accountsMenuItem = fixture.nativeElement.querySelector('a[routerLink="bank-accounts"]');
    expect(accountsMenuItem).toBeTruthy();
    expect(accountsMenuItem.textContent).toContain('Accounts');
  });

  it('should render the new feature card', () => {
    const featureCard = fixture.nativeElement.querySelector('.bg-gray-100');
    expect(featureCard).toBeTruthy();
    expect(featureCard.textContent).toContain('New Feature Available!');
  });

  it('should render the user profile section', () => {
    const userProfile = fixture.nativeElement.querySelector('.flex.items-center.justify-between.mt-6');
    expect(userProfile).toBeTruthy();
    expect(userProfile.textContent).toContain('John Doe');
  });
});
