import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserdetailsComponent } from './userdetails.component';

describe('UserdetailsComponent', () => {
  let component: UserdetailsComponent;
  let fixture: ComponentFixture<UserdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserdetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display user details when userDetails input is provided', () => {
    const mockUserDetails = {
      username: 'JohnDoe',
      email: 'john.doe@example.com',
      phoneNumber: '123-456-7890',
    };

    component.userDetails = mockUserDetails;
    fixture.detectChanges();

    const usernameElement = fixture.nativeElement.querySelector('div:nth-child(1) > p.text-gray-800');
    const emailElement = fixture.nativeElement.querySelector('div:nth-child(2) > p.text-gray-800');
    const phoneNumberElement = fixture.nativeElement.querySelector('div:nth-child(3) > p.text-gray-800');

    expect(usernameElement).toBeTruthy();
    expect(emailElement).toBeTruthy();
    expect(phoneNumberElement).toBeTruthy();

    expect(usernameElement.textContent).toContain(mockUserDetails.username);
    expect(emailElement.textContent).toContain(mockUserDetails.email);
    expect(phoneNumberElement.textContent).toContain(mockUserDetails.phoneNumber);
  });

  it('should display "N/A" for missing user details', () => {
    const mockUserDetails = {
      username: 'JohnDoe',
      email: null,
      phoneNumber: undefined,
    };

    component.userDetails = mockUserDetails;
    fixture.detectChanges();

    const usernameElement = fixture.nativeElement.querySelector('div:nth-child(1) > p.text-gray-800');
    const emailElement = fixture.nativeElement.querySelector('div:nth-child(2) > p.text-gray-800');
    const phoneNumberElement = fixture.nativeElement.querySelector('div:nth-child(3) > p.text-gray-800');

    expect(usernameElement).toBeTruthy();
    expect(emailElement).toBeTruthy();
    expect(phoneNumberElement).toBeTruthy();

    expect(usernameElement.textContent).toContain(mockUserDetails.username);
    expect(emailElement.textContent).toContain('N/A'); // Fallback for missing email
    expect(phoneNumberElement.textContent).toContain('N/A'); // Fallback for missing phone number
  });

  it('should not render user details if userDetails input is null', () => {
    component.userDetails = null;
    fixture.detectChanges();

    // Verify the rendered content
    const usernameElement = fixture.nativeElement.querySelector('div:nth-child(1) > p.text-gray-800');
    const emailElement = fixture.nativeElement.querySelector('div:nth-child(2) > p.text-gray-800');
    const phoneNumberElement = fixture.nativeElement.querySelector('div:nth-child(3) > p.text-gray-800');

    expect(usernameElement).toBeTruthy(); // Ensure the element exists
    expect(emailElement).toBeTruthy(); // Ensure the element exists
    expect(phoneNumberElement).toBeTruthy(); // Ensure the element exists

    expect(usernameElement.textContent).toContain('N/A');
    expect(emailElement.textContent).toContain('N/A');
    expect(phoneNumberElement.textContent).toContain('N/A');
  });

  it('should render the "Edit Profile" link', () => {
    const editProfileLink = fixture.nativeElement.querySelector('a.text-blue-600');
    expect(editProfileLink).toBeTruthy(); // Ensure the element exists
    expect(editProfileLink.textContent).toContain('Edit Profile');
    expect(editProfileLink.getAttribute('href')).toBe('#');
  });
});
