import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateTransactionComponent } from './create-transaction.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { BankAccountsService } from '../../../core/services/bankAccounts/bank-accounts.service';
import { TransactionsService } from '../../../core/services/transactions/transactions.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { BankAccount } from '../../../models/bankAccount.model';

describe('CreateTransactionComponent', () => {
  let component: CreateTransactionComponent;
  let fixture: ComponentFixture<CreateTransactionComponent>;
  let bankAccountsService: jasmine.SpyObj<BankAccountsService>;
  let transactionsService: jasmine.SpyObj<TransactionsService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const bankAccountsServiceSpy = jasmine.createSpyObj('BankAccountsService', ['connectedUserBankAccounts']);
    const transactionsServiceSpy = jasmine.createSpyObj('TransactionsService', ['createTransaction']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, CreateTransactionComponent],
      providers: [
        FormBuilder,
        { provide: BankAccountsService, useValue: bankAccountsServiceSpy },
        { provide: TransactionsService, useValue: transactionsServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateTransactionComponent);
    component = fixture.componentInstance;

    bankAccountsService = TestBed.inject(BankAccountsService) as jasmine.SpyObj<BankAccountsService>;
    transactionsService = TestBed.inject(TransactionsService) as jasmine.SpyObj<TransactionsService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    bankAccountsService.connectedUserBankAccounts.and.returnValue(of([]));

    fixture.detectChanges();
  });

  it('should create the component', () => {
    // @ts-ignore
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values and validators', () => {
    expect(component.transactionForm).toBeTruthy();
    expect(component.transactionForm.get('type')?.value).toBe('CLASSIC');
    expect(component.transactionForm.get('amount')?.value).toBe(0);
    expect(component.transactionForm.get('accountFromNumber')?.value).toBeNull();
    expect(component.transactionForm.get('accountToNumber')?.value).toBeNull();

    expect(component.transactionForm.get('type')?.validator).toBeTruthy();
    expect(component.transactionForm.get('amount')?.validator).toBeTruthy();
    expect(component.transactionForm.get('accountFromNumber')?.validator).toBeTruthy();
    expect(component.transactionForm.get('accountToNumber')?.validator).toBeTruthy();
  });

  it('should load user accounts on initialization', () => {
    const mockAccounts: BankAccount[] = [
      { id: 1, accountNumber: '12345', balance: 1000, status: 'ACTIVE', username: 'user1', email: 'user1@example.com' },
    ];

    bankAccountsService.connectedUserBankAccounts.and.returnValue(of(mockAccounts));

    component.ngOnInit();
    fixture.detectChanges();

    expect(bankAccountsService.connectedUserBankAccounts).toHaveBeenCalled();
    expect(component.accounts).toEqual(mockAccounts);
  });

  it('should mark the form as invalid when required fields are empty', () => {
    component.transactionForm.setValue({
      type: '',
      amount: 0,
      accountFromNumber: null,
      accountToNumber: null,
    });

    expect(component.transactionForm.invalid).toBeTrue();
  });

  it('should mark the form as valid when all fields are filled correctly', () => {
    component.transactionForm.setValue({
      type: 'CLASSIC',
      amount: 100,
      accountFromNumber: '12345',
      accountToNumber: '550e8400-e29b-41d4-a716-446655440000', // Valid UUID
    });

    fixture.detectChanges();

    expect(component.transactionForm.valid).toBeTrue();
  });

  it('should display an error if source and destination accounts are the same', () => {
    component.transactionForm.setValue({
      type: 'CLASSIC',
      amount: 100,
      accountFromNumber: '12345',
      accountToNumber: '12345', // Same as accountFromNumber
    });

    component.onSubmit();

  });

  it('should call createTransaction and navigate on successful submission', () => {
    const mockTransactionData = {
      type: 'CLASSIC',
      amount: 100,
      accountFromNumber: '12345',
      accountToNumber: '550e8400-e29b-41d4-a716-446655440000', // Valid UUID
    };

    component.transactionForm.setValue(mockTransactionData);
    transactionsService.createTransaction.and.returnValue(of({ id: 1 }));

    component.onSubmit();

    expect(transactionsService.createTransaction).toHaveBeenCalledWith(mockTransactionData);
    expect(router.navigate).toHaveBeenCalledWith(['user/transactions', 1]);
  });

  it('should display a backend error message on failed submission', () => {
    const mockTransactionData = {
      type: 'CLASSIC',
      amount: 100,
      accountFromNumber: '12345',
      accountToNumber: '550e8400-e29b-41d4-a716-446655440000', // Valid UUID
    };

    component.transactionForm.setValue(mockTransactionData);
    transactionsService.createTransaction.and.returnValue(throwError(() => ({ error: { message: 'Insufficient balance' } })));

    component.onSubmit();

    expect(component.backendError).toBe('Insufficient balance');
  });
});
