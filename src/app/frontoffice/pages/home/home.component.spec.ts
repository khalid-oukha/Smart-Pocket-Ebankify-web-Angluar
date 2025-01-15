import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { AuthService } from '../../../core/services/auth/auth.service';
import { BankAccountsService } from '../../../core/services/bankAccounts/bank-accounts.service';
import { TransactionsService } from '../../../core/services/transactions/transactions.service';
import { of, throwError } from 'rxjs';
import { BankAccount } from '../../../models/bankAccount.model';
import { ActivatedRoute } from '@angular/router';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let bankAccountsService: jasmine.SpyObj<BankAccountsService>;
  let transactionsService: jasmine.SpyObj<TransactionsService>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['getUserDetails']);
    const bankAccountsServiceSpy = jasmine.createSpyObj('BankAccountsService', ['connectedUserBankAccounts']);
    const transactionsServiceSpy = jasmine.createSpyObj('TransactionsService', ['getTransactionsByAccount']);

    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: BankAccountsService, useValue: bankAccountsServiceSpy },
        { provide: TransactionsService, useValue: transactionsServiceSpy },
        { provide: ActivatedRoute, useValue: {} }, // Provide a mock ActivatedRoute
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    bankAccountsService = TestBed.inject(BankAccountsService) as jasmine.SpyObj<BankAccountsService>;
    transactionsService = TestBed.inject(TransactionsService) as jasmine.SpyObj<TransactionsService>;

    authService.getUserDetails.and.returnValue(of({ username: 'JohnDoe', email: 'john.doe@example.com' }));

    bankAccountsService.connectedUserBankAccounts.and.returnValue(of([]));

    // Mock getTransactionsByAccount to return an observable
    transactionsService.getTransactionsByAccount.and.returnValue(of({
      from: [],
      to: [],
    }));

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch user details on initialization', () => {
    const mockUserDetails = { username: 'JohnDoe', email: 'john.doe@example.com' };
    authService.getUserDetails.and.returnValue(of(mockUserDetails));

    component.ngOnInit();
    fixture.detectChanges();

    expect(authService.getUserDetails).toHaveBeenCalled();
    expect(component.userDetails).toEqual(mockUserDetails);
  });

  it('should fetch user accounts on initialization', () => {
    const mockAccounts: BankAccount[] = [
      { id: 1, accountNumber: '12345', balance: 1000, status: 'ACTIVE', username: 'user1', email: 'user1@example.com' },
    ];

    bankAccountsService.connectedUserBankAccounts.and.returnValue(of(mockAccounts));

    component.ngOnInit();
    fixture.detectChanges();

    expect(bankAccountsService.connectedUserBankAccounts).toHaveBeenCalled();
    expect(component.userAccounts).toEqual(mockAccounts);
    expect(component.selectedAccount).toEqual(mockAccounts[0]);
  });

  it('should select an account and fetch transactions', () => {
    const mockAccount: BankAccount = {
      id: 1,
      accountNumber: '12345',
      balance: 1000,
      status: 'ACTIVE',
      username: 'user1',
      email: 'user1@example.com',
    };

    const mockTransactions = {
      from: [{ id: 1, amount: 100, type: 'TRANSFER', date: '2023-10-01', status: 'COMPLETED' }],
      to: [{ id: 2, amount: 200, type: 'DEPOSIT', date: '2023-10-02', status: 'COMPLETED' }],
    };

    transactionsService.getTransactionsByAccount.and.returnValue(of(mockTransactions));

    component.selectAccount(mockAccount);

    expect(component.selectedAccount).toEqual(mockAccount);
    expect(transactionsService.getTransactionsByAccount).toHaveBeenCalledWith(mockAccount.id);
    expect(component.transactions).toEqual([
      ...mockTransactions.from.map((t) => ({ ...t, direction: 'from' })),
      ...mockTransactions.to.map((t) => ({ ...t, direction: 'to' })),
    ]);
  });

  it('should handle errors when fetching user accounts', () => {
    bankAccountsService.connectedUserBankAccounts.and.returnValue(throwError(() => new Error('Failed to fetch accounts')));

    component.ngOnInit();
    fixture.detectChanges();

    expect(bankAccountsService.connectedUserBankAccounts).toHaveBeenCalled();
    expect(component.userAccounts).toEqual([]);
    expect(component.selectedAccount).toBeNull();
  });

  it('should handle errors when fetching transactions', () => {
    const mockAccount: BankAccount = {
      id: 1,
      accountNumber: '12345',
      balance: 1000,
      status: 'ACTIVE',
      username: 'user1',
      email: 'user1@example.com',
    };

    transactionsService.getTransactionsByAccount.and.returnValue(throwError(() => new Error('Failed to fetch transactions')));

    component.selectAccount(mockAccount);

    expect(transactionsService.getTransactionsByAccount).toHaveBeenCalledWith(mockAccount.id);
    expect(component.transactions).toEqual([]);
  });
});
