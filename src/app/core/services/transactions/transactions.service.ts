import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(private http:HttpClient) { }

  getTransactionsByAccount(accountId: number): Observable<{ from: any[]; to: any[] }> {
    return this.http.get<{ from: any[]; to: any[] }>(`/api/v1/transactions/account/${accountId}`);
  }
}
