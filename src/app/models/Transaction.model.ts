import {BankAccount} from "./bankAccount.model";

export interface Transaction {
  id: number;
  type: string;
  amount: number;
  date: string;
  fee: number;
  status: string;
  accountFrom: BankAccount;
  accountTo: BankAccount;
}
