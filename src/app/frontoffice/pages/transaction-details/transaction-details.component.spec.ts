import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionDetailsComponent } from './transaction-details.component';
import { ActivatedRoute } from '@angular/router';
import { TransactionsService } from '../../../core/services/transactions/transactions.service';
import { of, throwError } from 'rxjs';
import { NgIf } from '@angular/common';

describe('TransactionDetailsComponent', () => {
  let component: TransactionDetailsComponent;
  let fixture: ComponentFixture<TransactionDetailsComponent>;
  let mockTransactionsService: jasmine.SpyObj<TransactionsService>;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    mockTransactionsService = jasmine.createSpyObj('TransactionsService', ['findById']);
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: jasmine.createSpy('get').and.returnValue('123')
        }
      }
    };

    await TestBed.configureTestingModule({
      imports: [TransactionDetailsComponent, NgIf],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: TransactionsService, useValue: mockTransactionsService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should fetch transaction details on init if transactionId is valid', () => {
    const mockTransaction = {
      id: 123,
      date: '2023-10-01',
      type: 'transfer',
      amount: 100.0,
      fee: 5.0,
      status: 'completed',
      accountFrom: {
        accountNumber: '123456789',
        status: 'active',
        username: 'user1',
        email: 'user1@example.com'
      },
      accountTo: {
        accountNumber: '987654321',
        status: 'active',
        username: 'user2',
        email: 'user2@example.com'
      }
    };

    mockTransactionsService.findById.and.returnValue(of(mockTransaction));

    fixture.detectChanges();

    expect(component.transactionId).toBe(123);
    expect(mockTransactionsService.findById).toHaveBeenCalledWith(123);
    expect(component.transaction).toEqual(mockTransaction);
  });


  it('should render loading message when transaction is not available', () => {
    mockTransactionsService.findById.and.returnValue(of(null));

    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('p').textContent).toContain('Loading transaction details...');
  });

  it('should handle error when fetching transaction details fails', () => {
    const mockError = new Error('Failed to fetch transaction details');
    mockTransactionsService.findById.and.returnValue(throwError(() => mockError));

    spyOn(console, 'error');

    fixture.detectChanges();

    expect(mockTransactionsService.findById).toHaveBeenCalledWith(123);
    expect(component.transaction).toBeNull();
    expect(console.error).toHaveBeenCalledWith('Error fetching transaction details:', mockError);
  });

  it('should call window.print when downloadReceipt is called', () => {
    spyOn(window, 'print');

    component.downloadReceipt();

    expect(window.print).toHaveBeenCalled();
  });

  it('should render transaction details when transaction is available', () => {
    const mockTransaction = {
      id: 123,
      date: '2023-10-01',
      type: 'transfer',
      amount: 100.0,
      fee: 5.0,
      status: 'completed',
      accountFrom: {
        accountNumber: '123456789',
        status: 'active',
        username: 'user1',
        email: 'user1@example.com'
      },
      accountTo: {
        accountNumber: '987654321',
        status: 'active',
        username: 'user2',
        email: 'user2@example.com'
      }
    };
    mockTransactionsService.findById.and.returnValue(of(mockTransaction));

    component.transactionId = mockTransaction.id;
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Transaction Receipt');
    expect(compiled.querySelector('p').textContent).toContain('Transaction ID: 123');
    expect(compiled.querySelector('button').textContent).toContain('Download Receipt as PDF');
  });

  it('should not render transaction details when an error occurs', () => {
    const mockError = new Error('Failed to fetch transaction details');
    mockTransactionsService.findById.and.returnValue(throwError(() => mockError));

    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('p').textContent).toContain('Loading transaction details...');
    expect(compiled.querySelector('h1')).toBeNull();
  });

  it('should not render transaction details when transactionId is invalid', () => {
    mockActivatedRoute.snapshot.paramMap.get.and.returnValue(null);

    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('p').textContent).toContain('Loading transaction details...');
    expect(compiled.querySelector('h1')).toBeNull();
  });
});
