import {Transaction} from "./Transaction.model";

export interface BankAccount{
    id: number;
    accountNumber: string;
    balance: number;
    status: string;
    username: string;
    email: string;
    recentTransactionsFrom?: Transaction[];
    recentTransactionsTo?: Transaction[];
    createdAt?: string;
    updatedAt?: string;
}
