import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TransactionsService } from './transactions.service';

describe('TransactionsService', () => {
  let service: TransactionsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TransactionsService],
    });
    service = TestBed.inject(TransactionsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all transactions', () => {
    const mockTransactions = [
      { id: 1, amount: 100, fromAccount: 1, toAccount: 2 },
      { id: 2, amount: 200, fromAccount: 2, toAccount: 3 },
    ];

    service.findAll().subscribe((transactions) => {
      expect(transactions).toEqual(mockTransactions);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTransactions);
  });

  it('should fetch transactions by account ID', () => {
    const accountId = 1;
    const mockResponse = {
      from: [{ id: 1, amount: 100, fromAccount: 1, toAccount: 2 }],
      to: [{ id: 2, amount: 200, fromAccount: 2, toAccount: 1 }],
    };

    service.getTransactionsByAccount(accountId).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/account/${accountId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should create a transaction', () => {
    const mockTransactionData = { amount: 100, fromAccount: 1, toAccount: 2 };
    const mockResponse = { id: 1, ...mockTransactionData };

    service.createTransaction(mockTransactionData).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockTransactionData);
    req.flush(mockResponse);
  });

  it('should fetch a transaction by ID', () => {
    const transactionId = 1;
    const mockTransaction = { id: 1, amount: 100, fromAccount: 1, toAccount: 2 };

    service.findById(transactionId).subscribe((transaction) => {
      expect(transaction).toEqual(mockTransaction);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/${transactionId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTransaction);
  });

  it('should approve a transaction', () => {
    const transactionId = 1;
    const mockResponse = { id: 1, status: 'approved' };

    service.approveTransaction(transactionId).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/${transactionId}/approve`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockResponse);
  });

  it('should reject a transaction', () => {
    const transactionId = 1;
    const mockResponse = { id: 1, status: 'rejected' };

    service.rejectTransaction(transactionId).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/${transactionId}/reject`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockResponse);
  });
});
