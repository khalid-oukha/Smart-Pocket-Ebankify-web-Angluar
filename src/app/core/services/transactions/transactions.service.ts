import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  private apiUrl = '/api/v1/transactions';

  constructor(private http: HttpClient) {}

  findAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getTransactionsByAccount(accountId: number): Observable<{ from: any[]; to: any[] }> {
    return this.http.get<{ from: any[]; to: any[] }>(`${this.apiUrl}/account/${accountId}`);
  }

  createTransaction(transactionData: any): Observable<any> {
    return this.http.post(this.apiUrl, transactionData);
  }

  findById(transactionId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${transactionId}`);
  }

  approveTransaction(transactionId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${transactionId}/approve`, {});
  }

  rejectTransaction(transactionId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${transactionId}/reject`, {});
  }
}
