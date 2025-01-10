import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import * as http from "node:http";
import {User} from "../../../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<User[]> {
    console.log('Fetching users');
    return this.http.get<User[]>('/users');
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`/users/${id}`);
  }

  findById(id: number): Observable<User> {
    return this.http.get<User>(`/users/${id}`);
  }

  update(user: User): Observable<User> {
    return this.http.put<User>(`/users/${user.id}`, user);
  }

  create(user: User): Observable<User> {
    return this.http.post<User>('/users', user);
  }
}
