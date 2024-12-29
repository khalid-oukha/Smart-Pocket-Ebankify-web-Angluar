import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {User} from "../../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(`/users/email/${email}`);
  }

  getUserRole(email: string): Observable<string> {
    return this.getUserByEmail(email).pipe(
      map((user: User) => user.role)
    );
  }
}
