import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BankaccountsComponent } from './bankaccounts.component';
import { BankAccountsService } from '../../core/services/bankAccounts/bank-accounts.service';
import { of, throwError } from 'rxjs';
import { BankAccount } from '../../models/bankAccount.model';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DialogComponent } from '../../shared/components/dialog/dialog.component';
import { ToggleButtonComponent } from '../../shared/components/toggle-button/toggle-button.component';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { DialogField } from '../../models/DialogField';
import { User } from '../../models/user.model';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('BankaccountsComponent', () => {
  let component: BankaccountsComponent;
  let fixture: ComponentFixture<BankaccountsComponent>;
  let bankAccountService: jasmine.SpyObj<BankAccountsService>;
  let messageService: jasmine.SpyObj<MessageService>;

  beforeEach(async () => {
    const bankAccountServiceSpy = jasmine.createSpyObj('BankAccountsService', [
      'findAll',
      'delete',
      'updateStatus',
      'create',
    ]);
    const messageServiceSpy = jasmine.createSpyObj('MessageService', ['add']);

    const activatedRouteStub = {
      snapshot: {
        paramMap: new Map(),
        queryParamMap: new Map(),
      },
    };

    await TestBed.configureTestingModule({
      imports: [
        BankaccountsComponent,
        ToastModule,
        DialogComponent,
        ToggleButtonComponent,
        RouterLink,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: BankAccountsService, useValue: bankAccountServiceSpy },
        { provide: MessageService, useValue: messageServiceSpy },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BankaccountsComponent);
    component = fixture.componentInstance;

    bankAccountService = TestBed.inject(BankAccountsService) as jasmine.SpyObj<BankAccountsService>;
    messageService = TestBed.inject(MessageService) as jasmine.SpyObj<MessageService>;

    bankAccountService.findAll.and.returnValue(of([]));

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with an empty bankAccounts array', () => {
    expect(component.bankAccounts).toEqual([]); // Expect an empty array
  });

  it('should load bank accounts on initialization', () => {
    const mockBankAccounts: BankAccount[] = [
      { id: 1, accountNumber: '12345', balance: 1000, status: 'ACTIVE', username: 'user1', email: 'user1@example.com' },
      { id: 2, accountNumber: '67890', balance: 2000, status: 'INACTIVE', username: 'user2', email: 'user2@example.com' },
    ];

    bankAccountService.findAll.and.returnValue(of(mockBankAccounts));

    component.ngOnInit();
    fixture.detectChanges();

    expect(bankAccountService.findAll).toHaveBeenCalled();
    expect(component.bankAccounts).toEqual(mockBankAccounts);
  });

  it('should handle errors when loading bank accounts', () => {
    // Mock the findAll method to return an error
    bankAccountService.findAll.and.returnValue(throwError(() => new Error('Failed to fetch bank accounts')));

    component.ngOnInit();
    fixture.detectChanges();

    expect(bankAccountService.findAll).toHaveBeenCalled();

  });

  it('should delete a bank account', () => {
    const mockBankAccounts: BankAccount[] = [
      { id: 1, accountNumber: '12345', balance: 1000, status: 'ACTIVE', username: 'user1', email: 'user1@example.com' },
      { id: 2, accountNumber: '67890', balance: 2000, status: 'INACTIVE', username: 'user2', email: 'user2@example.com' },
    ];
    component.bankAccounts = mockBankAccounts;

    bankAccountService.delete.and.returnValue(of(void 0));

    component.delete(1);
    fixture.detectChanges();

    expect(bankAccountService.delete).toHaveBeenCalledWith(1);
    expect(component.bankAccounts).toEqual([mockBankAccounts[1]]);

  });

  it('should handle errors when deleting a bank account', () => {
    // Mock the delete method to return an error
    bankAccountService.delete.and.returnValue(throwError(() => new Error('Failed to delete bank account')));

    component.delete(1);
    fixture.detectChanges();

    expect(bankAccountService.delete).toHaveBeenCalledWith(1);

  });

  it('should update the status of a bank account', () => {
    const mockBankAccount: BankAccount = {
      id: 1,
      accountNumber: '12345',
      balance: 1000,
      status: 'ACTIVE',
      username: 'user1',
      email: 'user1@example.com',
    };
    component.bankAccounts = [mockBankAccount];

    // Mock the updateStatus method to return an observable
    bankAccountService.updateStatus.and.returnValue(of(null));

    component.updateAccountStatus(mockBankAccount, false);
    fixture.detectChanges();

    expect(bankAccountService.updateStatus).toHaveBeenCalledWith(1, 'INACTIVE');
    expect(mockBankAccount.status).toBe('INACTIVE');

  });

  it('should handle errors when updating the status of a bank account', () => {
    const mockBankAccount: BankAccount = {
      id: 1,
      accountNumber: '12345',
      balance: 1000,
      status: 'ACTIVE',
      username: 'user1',
      email: 'user1@example.com',
    };
    component.bankAccounts = [mockBankAccount];

    bankAccountService.updateStatus.and.returnValue(throwError(() => new Error('Failed to update status')));

    component.updateAccountStatus(mockBankAccount, false);
    fixture.detectChanges();

    expect(bankAccountService.updateStatus).toHaveBeenCalledWith(1, 'INACTIVE');

  });

  it('should display the dialog', () => {
    component.displayDialog();
    fixture.detectChanges();

    expect(component.visible).toBeTrue();
    expect(component.dialogFields).toEqual([
      { key: 'username', label: 'Username', value: '' },
      { key: 'email', label: 'Email', value: '' },
      { key: 'password', label: 'Password', value: '' },
      { key: 'role', label: 'Role', value: '' },
      { key: 'age', label: 'Age', value: '' },
    ]);
  });

  it('should close the dialog and reset fields', () => {
    component.onDialogClosed();
    fixture.detectChanges();

    expect(component.visible).toBeFalse();
    expect(component.dialogFields).toEqual([]);
  });

  it('should create a new bank account when the dialog is saved', () => {
    const mockFields: DialogField[] = [
      { key: 'username', label: 'Username', value: 'newUser' },
      { key: 'email', label: 'Email', value: 'newuser@example.com' },
      { key: 'password', label: 'Password', value: 'password' },
      { key: 'role', label: 'Role', value: 'USER' },
      { key: 'age', label: 'Age', value: '25' },
    ];
    const mockNewUser: User = {
      id: 0,
      username: 'newUser',
      email: 'newuser@example.com',
      role: 'USER',
      age: 25,
      password: 'password',
    };
    const mockNewBankAccount: BankAccount = {
      id: 3,
      accountNumber: '98765',
      balance: 0,
      status: 'ACTIVE',
      username: 'newUser',
      email: 'newuser@example.com',
    };

    bankAccountService.create.and.returnValue(of(mockNewBankAccount));

    component.onSave(mockFields);
    fixture.detectChanges();

    expect(bankAccountService.create).toHaveBeenCalledWith(mockNewUser);
    expect(component.bankAccounts).toContain(mockNewBankAccount);
    expect(component.visible).toBeFalse();

  });

  it('should handle errors when creating a new bank account', () => {
    const mockFields: DialogField[] = [
      { key: 'username', label: 'Username', value: 'newUser' },
      { key: 'email', label: 'Email', value: 'newuser@example.com' },
      { key: 'password', label: 'Password', value: 'password' },
      { key: 'role', label: 'Role', value: 'USER' },
      { key: 'age', label: 'Age', value: '25' },
    ];

    bankAccountService.create.and.returnValue(throwError(() => new Error('Failed to create bank account')));

    component.onSave(mockFields);
    fixture.detectChanges();

    expect(bankAccountService.create).toHaveBeenCalled();

  });
});
