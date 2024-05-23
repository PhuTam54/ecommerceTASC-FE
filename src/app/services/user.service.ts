import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { User } from '../model/User';
const url = environment.endPoint;
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUser(): Observable<User[]> {
    return this.http.get<User[]>(url, {});
  }

  getById(Id: number): Observable<User[]> {
    return this.http.get<User[]>(`${url + Id}`, {});
  }
}
