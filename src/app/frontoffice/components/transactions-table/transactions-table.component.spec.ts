import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionsTableComponent } from './transactions-table.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('TransactionsTableComponent', () => {
  let component: TransactionsTableComponent;
  let fixture: ComponentFixture<TransactionsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionsTableComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display "No transactions found" when transactions array is empty', () => {
    component.transactions = [];
    fixture.detectChanges();

    const noTransactionsMessage = fixture.nativeElement.querySelector('td.text-center');
    expect(noTransactionsMessage.textContent).toContain('No transactions found');
  });

  it('should render transactions correctly', () => {
    const mockTransactions = [
      {
        id: 1,
        type: 'Transfer',
        amount: 100,
        direction: 'from',
        date: '2023-10-01',
        status: 'PENDING',
      },
      {
        id: 2,
        type: 'Deposit',
        amount: 200,
        direction: 'to',
        date: '2023-10-02',
        status: 'APPROVED',
      },
    ];

    component.transactions = mockTransactions;
    fixture.detectChanges();

    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(mockTransactions.length);

    const firstRow = rows[0];
    expect(firstRow.querySelector('td:nth-child(1)').textContent).toContain('Transfer');
    expect(firstRow.querySelector('td:nth-child(2) span').textContent).toContain('$100.00');
    expect(firstRow.querySelector('td:nth-child(3)').textContent).toContain('Oct 1, 2023');
    expect(firstRow.querySelector('td:nth-child(4) span').textContent).toContain('PENDING');
    expect(firstRow.querySelector('td:nth-child(5) a').textContent).toContain('View Details');

    const secondRow = rows[1];
    expect(secondRow.querySelector('td:nth-child(1)').textContent).toContain('Deposit');
    expect(secondRow.querySelector('td:nth-child(2) span').textContent).toContain('$200.00');
    expect(secondRow.querySelector('td:nth-child(3)').textContent).toContain('Oct 2, 2023');
    expect(secondRow.querySelector('td:nth-child(4) span').textContent).toContain('APPROVED');
    expect(secondRow.querySelector('td:nth-child(5) a').textContent).toContain('View Details');
  });

  it('should apply correct CSS classes based on transaction direction', () => {
    const mockTransactions = [
      {
        id: 1,
        type: 'Transfer',
        amount: 100,
        direction: 'from',
        date: '2023-10-01',
        status: 'PENDING',
      },
      {
        id: 2,
        type: 'Deposit',
        amount: 200,
        direction: 'to',
        date: '2023-10-02',
        status: 'APPROVED',
      },
    ];

    component.transactions = mockTransactions;
    fixture.detectChanges();

    const rows = fixture.nativeElement.querySelectorAll('tbody tr');

    // Verify CSS classes for the first row (direction: 'from')
    expect(rows[0].classList).toContain('bg-red-50');
    expect(rows[0].querySelector('td:nth-child(2) span').classList).toContain('text-red-600');

    // Verify CSS classes for the second row (direction: 'to')
    expect(rows[1].classList).toContain('bg-green-50');
    expect(rows[1].querySelector('td:nth-child(2) span').classList).toContain('text-green-600');
  });

  it('should apply correct CSS classes based on transaction status', () => {
    const mockTransactions = [
      {
        id: 1,
        type: 'Transfer',
        amount: 100,
        direction: 'from',
        date: '2023-10-01',
        status: 'PENDING',
      },
      {
        id: 2,
        type: 'Deposit',
        amount: 200,
        direction: 'to',
        date: '2023-10-02',
        status: 'APPROVED',
      },
    ];

    component.transactions = mockTransactions;
    fixture.detectChanges();

    const rows = fixture.nativeElement.querySelectorAll('tbody tr');

    // Verify CSS classes for the first row (status: 'PENDING')
    expect(rows[0].querySelector('td:nth-child(4) span').classList).toContain('text-yellow-600');

    // Verify CSS classes for the second row (status: 'APPROVED')
    expect(rows[1].querySelector('td:nth-child(4) span').classList).toContain('text-green-600');
  });

  it('should set the correct routerLink for "View Details"', () => {
    const mockTransactions = [
      {
        id: 1,
        type: 'Transfer',
        amount: 100,
        direction: 'from',
        date: '2023-10-01',
        status: 'PENDING',
      },
    ];

    component.transactions = mockTransactions;
    fixture.detectChanges();

    const viewDetailsLink = fixture.nativeElement.querySelector('td:nth-child(5) a');
  });

  it('should set the correct routerLink for "View All Transactions"', () => {
    const viewAllLink = fixture.nativeElement.querySelector('div.mt-4 a');
  });
});
