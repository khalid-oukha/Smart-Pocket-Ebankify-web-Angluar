import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AccountDetailsComponent } from './account-details.component';
import { BankAccountsService } from '../../core/services/bankAccounts/bank-accounts.service';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { BankAccount } from '../../models/bankAccount.model';
import { AccountInformationCardComponent } from '../../shared/components/account-information-card/account-information-card.component';
import { TransactionCardComponent } from '../../shared/components/transaction-card/transaction-card.component';
import { NgClass, NgForOf } from '@angular/common';

describe('AccountDetailsComponent', () => {
  let component: AccountDetailsComponent;
  let fixture: ComponentFixture<AccountDetailsComponent>;
  let mockBankAccountService: jasmine.SpyObj<BankAccountsService>;
  let mockActivatedRoute: any;

  const mockAccount: BankAccount = {
    email: "",
    status: "",
    username: "",
    id: 1,
    accountNumber: '123456789',
    balance: 1000,
    recentTransactionsTo: [
      {
        id: 1,
        amount: 100,
        date: '2023-10-01',
        type: 'credit',
        fee: 0,
        status: '',
        accountFrom: undefined,
        accountTo: undefined,
      },
      {
        id: 2,
        amount: 200,
        date: '2023-10-02',
        type: 'debit',
        fee: 0,
        status: '',
        accountFrom: undefined,
        accountTo: undefined,
      },
    ],
  };

  beforeEach(async () => {
    mockBankAccountService = jasmine.createSpyObj('BankAccountsService', ['accountDetails']);
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: jasmine.createSpy('get').and.returnValue('1'),
        },
      },
    };

    await TestBed.configureTestingModule({
      imports: [
        AccountDetailsComponent, // Import the standalone component here
        NgClass,
        NgForOf,
        AccountInformationCardComponent,
        TransactionCardComponent,
      ],
      providers: [
        { provide: BankAccountsService, useValue: mockBankAccountService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
