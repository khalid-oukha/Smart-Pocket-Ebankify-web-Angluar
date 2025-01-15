import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TransactionsService } from './transactions.service';

describe('TransactionsService', () => {
  let service: TransactionsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Use HttpClientTestingModule to mock HTTP requests
      providers: [TransactionsService],
    });

    // Inject the service and HTTP mock
    service = TestBed.inject(TransactionsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verify that there are no outstanding HTTP requests
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all transactions', () => {
    const mockTransactions = [
      { id: 1, amount: 100, type: 'transfer' },
      { id: 2, amount: 200, type: 'deposit' },
    ];

    // Call the service method
    service.findAll().subscribe((transactions) => {
      expect(transactions).toEqual(mockTransactions);
    });

    // Expect a GET request to the API URL
    const req = httpMock.expectOne('/api/v1/transactions');
    expect(req.request.method).toBe('GET');

    // Respond with mock data
    req.flush(mockTransactions);
  });

  it('should fetch transactions by account ID', () => {
    const mockResponse = {
      from: [{ id: 1, amount: 100, type: 'transfer' }],
      to: [{ id: 2, amount: 200, type: 'deposit' }],
    };

    // Call the service method
    service.getTransactionsByAccount(1).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    // Expect a GET request to the API URL with the account ID
    const req = httpMock.expectOne('/api/v1/transactions/account/1');
    expect(req.request.method).toBe('GET');

    // Respond with mock data
    req.flush(mockResponse);
  });

  it('should create a transaction', () => {
    const mockTransaction = { id: 1, amount: 100, type: 'transfer' };

    // Call the service method
    service.createTransaction(mockTransaction).subscribe((response) => {
      expect(response).toEqual(mockTransaction);
    });

    // Expect a POST request to the API URL
    const req = httpMock.expectOne('/api/v1/transactions');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockTransaction);

    // Respond with mock data
    req.flush(mockTransaction);
  });

  it('should fetch a transaction by ID', () => {
    const mockTransaction = { id: 1, amount: 100, type: 'transfer' };

    // Call the service method
    service.findById(1).subscribe((transaction) => {
      expect(transaction).toEqual(mockTransaction);
    });

    // Expect a GET request to the API URL with the transaction ID
    const req = httpMock.expectOne('/api/v1/transactions/1');
    expect(req.request.method).toBe('GET');

    // Respond with mock data
    req.flush(mockTransaction);
  });

  it('should approve a transaction', () => {
    const mockResponse = { id: 1, status: 'approved' };

    // Call the service method
    service.approveTransaction(1).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    // Expect a PUT request to the API URL with the transaction ID
    const req = httpMock.expectOne('/api/v1/transactions/1/approve');
    expect(req.request.method).toBe('PUT');

    // Respond with mock data
    req.flush(mockResponse);
  });

  it('should reject a transaction', () => {
    const mockResponse = { id: 1, status: 'rejected' };

    // Call the service method
    service.rejectTransaction(1).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    // Expect a PUT request to the API URL with the transaction ID
    const req = httpMock.expectOne('/api/v1/transactions/1/reject');
    expect(req.request.method).toBe('PUT');

    // Respond with mock data
    req.flush(mockResponse);
  });


});
