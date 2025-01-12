import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private selectedAccountIdSubject = new BehaviorSubject<number | null>(null);
  selectedAccountId$ = this.selectedAccountIdSubject.asObservable();

  setSelectedAccountId(accountId: number): void {
    this.selectedAccountIdSubject.next(accountId);
  }

  getSelectedAccountId(): number | null {
    return this.selectedAccountIdSubject.value;
  }
}
