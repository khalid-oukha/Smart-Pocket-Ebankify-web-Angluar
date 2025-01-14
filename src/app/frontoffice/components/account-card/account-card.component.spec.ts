import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountCardComponent } from './account-card.component';

describe('AccountCardComponent', () => {
  let component: AccountCardComponent;
  let fixture: ComponentFixture<AccountCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display account information when account input is provided', () => {
    // Mock account data
    const mockAccount = {
      accountNumber: '123456789',
      balance: 1000,
      status: 'ACTIVE',
    };

    component.account = mockAccount;
    fixture.detectChanges();

    const accountNumberElement = fixture.nativeElement.querySelector('p.text-gray-800');
    const balanceElement = fixture.nativeElement.querySelector('p.text-gray-800:nth-of-type(2)');
    const statusElement = fixture.nativeElement.querySelector('p.text-sm.font-medium');

    expect(accountNumberElement.textContent).toContain(mockAccount.accountNumber);
    expect(statusElement.textContent).toContain(mockAccount.status);
  });

  it('should display the correct status indicator color for ACTIVE status', () => {
    const mockAccount = {
      accountNumber: '123456789',
      balance: 1000,
      status: 'ACTIVE',
    };

    component.account = mockAccount;
    fixture.detectChanges();

    const statusDot = fixture.nativeElement.querySelector('span.w-2.h-2');
    const statusText = fixture.nativeElement.querySelector('p.text-sm.font-medium');

    expect(statusDot.classList).toContain('bg-green-500');
    expect(statusText.classList).toContain('text-green-700');
  });

  it('should display the correct status indicator color for INACTIVE status', () => {
    const mockAccount = {
      accountNumber: '123456789',
      balance: 1000,
      status: 'INACTIVE',
    };

    component.account = mockAccount;
    fixture.detectChanges();

    const statusDot = fixture.nativeElement.querySelector('span.w-2.h-2');
    const statusText = fixture.nativeElement.querySelector('p.text-sm.font-medium');

    expect(statusDot.classList).toContain('bg-yellow-500');
    expect(statusText.classList).toContain('text-yellow-700');
  });

  it('should display the correct status indicator color for other statuses', () => {
    const mockAccount = {
      accountNumber: '123456789',
      balance: 1000,
      status: 'BLOCKED',
    };

    component.account = mockAccount;
    fixture.detectChanges();

    const statusDot = fixture.nativeElement.querySelector('span.w-2.h-2');
    const statusText = fixture.nativeElement.querySelector('p.text-sm.font-medium');

    expect(statusDot.classList).toContain('bg-red-500');
    expect(statusText.classList).toContain('text-red-700');
  });

  it('should not render account information if account input is null', () => {
    component.account = null;
    fixture.detectChanges();

    const accountNumberElement = fixture.nativeElement.querySelector('p.text-gray-800');
    const balanceElement = fixture.nativeElement.querySelector('p.text-gray-800:nth-of-type(2)');
    const statusElement = fixture.nativeElement.querySelector('p.text-sm.font-medium');

    expect(accountNumberElement).toBeNull();
    expect(balanceElement).toBeNull();
    expect(statusElement).toBeNull();
  });
});
