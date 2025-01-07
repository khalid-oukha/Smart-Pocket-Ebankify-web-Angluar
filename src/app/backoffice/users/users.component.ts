import {Component, OnInit} from '@angular/core';
import {User} from "../../models/user.model";
import {UsersService} from "../../core/services/users/users.service";
import {CommonModule} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  users?: User[];

  constructor(private usersService: UsersService) {}

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
}
