import {Component, OnInit} from '@angular/core';
import {User} from "../../models/user.model";
import {UsersService} from "../../core/services/users/users.service";
import {CommonModule} from "@angular/common";
import {RouterLink} from "@angular/router";
import {Button} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {InputTextModule} from "primeng/inputtext";
import {AvatarModule} from "primeng/avatar";
import {FormsModule} from "@angular/forms";
import {DialogField} from "../../models/DialogField";
import {DialogComponent} from "../../shared/components/dialog/dialog.component";
import {SplitButtonModule} from "primeng/splitbutton";
import {MessagesModule} from "primeng/messages";
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    Button,
    DialogModule,
    InputTextModule,
    AvatarModule,
    FormsModule,
    DialogComponent,
    SplitButtonModule,
    MessagesModule,
    ToastModule

  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
  providers: [MessageService]

})
export class UsersComponent implements OnInit {

  users?: User[];
  selectedUser?: User;
  visible: boolean = false;
  dialogFields: DialogField[] = [];
  isEditMode: boolean = false;

  constructor(private usersService: UsersService,
              private messageService: MessageService
  ) {
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  private loadUsers(): void {
    this.usersService.findAll().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    });
  }

  deleteUser(id: number): void {
    this.usersService.delete(id).subscribe({
      next: () => {
        this.users = this.users?.filter((user) => user.id !== id);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'User deleted successfully!'
        });
      },
      error: (error) => {
        console.error('Error deleting user:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to delete user. Please try again.'
        });
      }
    });
  }

  showAddUserDialog(): void {
    this.isEditMode = false;
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

  showDialog(id: number): void {
    this.isEditMode = true;
    this.usersService.findById(id).subscribe({
      next: (user) => {
        this.selectedUser = { ...user };
        this.dialogFields = [
          { key: 'username', label: 'Username', value: user.username },
          { key: 'email', label: 'Email', value: user.email },
          { key: 'role', label: 'Role', value: user.role },
          { key: 'age', label: 'Age', value: user.age?.toString() as string }
        ];
        this.visible = true;
      },
      error: (error) => {
        console.error('Error fetching user:', error);
      }
    });
  }

  onDialogClosed(): void {
    this.selectedUser = undefined;
    this.dialogFields = [];
  }

  onSave(fields: DialogField[]): void {
    if (this.isEditMode && this.selectedUser) {
      const updatedUser: User = {
        ...this.selectedUser,
        username: fields.find(f => f.key === 'username')?.value || '',
        email: fields.find(f => f.key === 'email')?.value || '',
        role: fields.find(f => f.key === 'role')?.value || '',
        age: Number(fields.find(f => f.key === 'age')?.value) || 0
      };

      this.usersService.update(updatedUser).subscribe({
        next: (response) => {
          this.users = this.users?.map(user =>
            user.id === updatedUser.id ? updatedUser : user
          );
          this.onDialogClosed();
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'User updated successfully!'
          });
        },
        error: (error) => {
          console.error('Error updating user:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to update user. Please try again.'
          });
        }
      });
    } else {
      const newUser: User = {
        id: 0,
        username: fields.find(f => f.key === 'username')?.value || '',
        email: fields.find(f => f.key === 'email')?.value || '',
        role: fields.find(f => f.key === 'role')?.value || '',
        age: Number(fields.find(f => f.key === 'age')?.value) || 0,
        password: fields.find(f => f.key === 'password')?.value || ''
      };

      this.usersService.create(newUser).subscribe({
        next: (response) => {
          this.users?.push(response);
          this.onDialogClosed();
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'User added successfully!'
          });
        },
        error: (error) => {
          console.error('Error creating user:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to add user. Please try again.'
          });
        }
      });
    }
  }
}
