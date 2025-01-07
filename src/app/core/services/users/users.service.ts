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
}
