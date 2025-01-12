import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BankAccount} from "../../../models/bankAccount.model";
import {User} from "../../../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class BankAccountsService {

  constructor(private http: HttpClient) {}

  findAll():Observable<BankAccount[]>{
    return this.http.get<BankAccount[]>('/api/v1/admin/accounts');
  }

  delete(id:number):Observable<void>{
    return this.http.delete<void>(`/api/v1/admin/accounts/${id}`);
  }

  updateStatus(accountId: number, status: string): Observable<any> {
    return this.http.put(`/api/v1/admin/bank-accounts/${accountId}/status?status=${status}`, {});
  }

  accountDetails(accountId: number): Observable<BankAccount> {
    return this.http.get<BankAccount>(`/api/v1/bank-accounts/account/${accountId}`);
  }

  create(user: User): Observable<BankAccount> {
    return this.http.post<BankAccount>('/api/v1/admin/bank-accounts/new-user', user);
  }

  connectedUserBankAccounts(): Observable<BankAccount[]> {
    return this.http.get<BankAccount[]>('/api/v1/bank-accounts/my-account');
  }
}
