import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../model/ApiResponse';
import { PaginationResponse } from '../model/Pagination';
import { User } from '../model/User';
const url = environment.endPoint;
const endPoint = 'users';
const defaultParams = '?page=1&limit=10';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUser(searchParam: any): Observable<any> {
    // return this.http.get<User[]>(url + endPoint + searchParam ?? defaultParams, {});
    return this.http.get<User[]>(url + endPoint + defaultParams, {});
  }
  
  getUsers(searchParam: any): Observable<PaginationResponse<User[]>> {
    return this.http.post<PaginationResponse<User[]>>(
      `${url + endPoint}`,
      searchParam
    );
  }

  // getById(Id: number): Observable<ApiResponse<User>> {
  //   return this.http.get<ApiResponse<User>>(`${url + endPoint + '/' + Id}`);
  // }

  getById(Id: number): Observable<any> {
    return this.http.get<User>(`${url + endPoint + '/' + Id}`);
  }

  createUser(user: User): Observable<ApiResponse<User>> {
    return this.http.post<ApiResponse<User>>(`${url + endPoint}`, user);
  }

  updateUser(user: User): Observable<ApiResponse<User>> {
    return this.http.put<ApiResponse<User>>(
      `${url + endPoint + '/' + user.id}`,
      user
    );
  }

  deleteUser(Id: number): Observable<ApiResponse<boolean>> {
    return this.http.delete<ApiResponse<boolean>>(
      `${url + endPoint + '/' + Id}`
    );
  }
}
