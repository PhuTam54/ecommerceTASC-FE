import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { User } from '../model/User';
const url = environment.endPoint;
const endPoint = 'users';
const params = '?page=1&limit=10';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUser(): Observable<any> {
    return this.http.get<User[]>(url + endPoint + params, {});
  }

  getById(Id: number): Observable<any> {
    return this.http.get<User>(url + endPoint + '/' + Id);
  }
}
