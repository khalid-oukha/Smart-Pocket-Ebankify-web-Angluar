import {Component, OnInit} from '@angular/core';
import {Button} from "primeng/button";
import {NgClass, NgForOf} from "@angular/common";
import {BankAccountsService} from "../../core/services/bankAccounts/bank-accounts.service";
import {BankAccount} from "../../models/bankAccount.model";
import {ToggleButtonComponent} from "../../shared/components/toggle-button/toggle-button.component";
import {RouterLink} from "@angular/router";
import {DialogField} from "../../models/DialogField";
import {DialogComponent} from "../../shared/components/dialog/dialog.component";
import {User} from "../../models/user.model";
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";

@Component({
  selector: 'app-bankaccounts',
  standalone: true,
  imports: [
    Button,
    NgForOf,
    ToggleButtonComponent,
    RouterLink,
    DialogComponent,
    ToastModule,

  ],
  templateUrl: './bankaccounts.component.html',
  styleUrl: './bankaccounts.component.css',
  providers: [MessageService]

})
export class BankaccountsComponent implements OnInit {
  bankAccounts?: BankAccount[];
  updatingAccountIds: Set<number> = new Set();
  selectedUser?: User;
  visible: boolean = false;
  dialogFields: DialogField[] = [];
  isEditMode: boolean = false;

  constructor(private bankAccountService: BankAccountsService,    private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.loadBankAccounts();
  }

  private loadBankAccounts(): void {
    this.bankAccountService.findAll().subscribe({
      next: (bankAccounts) => {
        this.bankAccounts = bankAccounts;
      },
      error: (error) => {
        console.error('Error fetching bank accounts:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load bank accounts. Please try again.'
        });
      }
    });
  }

  public delete(id: number): void {
    this.bankAccountService.delete(id).subscribe({
      next: () => {
        this.bankAccounts = this.bankAccounts?.filter((bankAccount) => bankAccount.id !== id);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Bank account deleted successfully!'
        });
      },
      error: (error) => {
        console.error('Error deleting bank account:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to delete bank account. Please try again.'
        });
      }
    });
  }

  public updateAccountStatus(account: BankAccount, isActive: boolean): void {
    this.updatingAccountIds.add(account.id);

    const newStatus = isActive ? 'ACTIVE' : 'INACTIVE';
    this.bankAccountService.updateStatus(account.id, newStatus).subscribe({
      next: () => {
        account.status = newStatus;
        this.updatingAccountIds.delete(account.id);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Bank account status updated successfully!'
        });
      },
      error: (error) => {
        console.error('Error updating bank account status:', error);
        this.updatingAccountIds.delete(account.id);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to update bank account status. Please try again.'
        });
      }
    });
  }


  displayDialog():void{
    this.selectedUser = undefined;
    this.dialogFields = [
      { key: 'username', label: 'Username', value: '' },
      { key: 'email', label: 'Email', value: '' },
      {key: 'password', label: 'Password', value: ''},
      { key: 'role', label: 'Role', value: '' },
      { key: 'age', label: 'Age', value: '' }
    ];
    this.visible = true;
  }

  onDialogClosed(): void {
    this.dialogFields = [];
  }

  onSave(fields: DialogField[]): void {
    const newUser: User = {
      id: 0,
      username: fields.find(f => f.key === 'username')?.value || '',
      email: fields.find(f => f.key === 'email')?.value || '',
      role: fields.find(f => f.key === 'role')?.value || '',
      age: Number(fields.find(f => f.key === 'age')?.value) || 0,
      password: fields.find(f => f.key === 'password')?.value || ''
    };

    this.bankAccountService.create(newUser).subscribe({
      next: (newUser) => {
        this.bankAccounts?.push(newUser);
        this.visible = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Bank account created successfully!'
        });
      },
      error: (error) => {
        console.error('Error creating bank account:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to create bank account. Please try again.'
        });
      }
    });
  }
}
