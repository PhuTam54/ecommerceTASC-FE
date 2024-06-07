import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { environment } from '../../../src/environments/environment';
import { ApiResponse } from '../model/ApiResponse';
import { PaginationResponse } from '../model/Pagination';
import { User } from '../model/User';
const url = environment.endPoint;
const endPoint = 'users';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  authInfo = JSON.parse(localStorage.getItem('authInfo') || '{}');

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.authInfo.tokenType + ' ' + this.authInfo.accessToken,
    }),
  };

  getUser(searchParam: any): Observable<any> {
    return this.http.get<User[]>(
      url +
        endPoint +
        '?page=' +
        searchParam.pageNumber +
        '&limit=' +
        searchParam.pageSize,
      this.httpOptions
    );
  }

  getUsers(searchParam: any): Observable<PaginationResponse<User[]>> {
    return this.http.post<PaginationResponse<User[]>>(
      `${url + endPoint}`,
      searchParam,
      this.httpOptions
    );
  }

  // getById(Id: number): Observable<ApiResponse<User>> {
  //   return this.http.get<ApiResponse<User>>(`${url + endPoint + '/' + Id}`);
  // }

  getById(Id: number): Observable<any> {
    return this.http.get<User>(
      `${url + endPoint + '/' + Id}`,
      this.httpOptions
    );
  }

  createUser(user: User): Observable<ApiResponse<User>> {
    return this.http
      .post<ApiResponse<User>>(`${url + endPoint}`, user, this.httpOptions)
      .pipe(
        map((response) => {
          response.success = true;
          response.message = 'User created successfully';
          return response;
        })
      );
  }

  uploadImage(image: File): Observable<String> {
    const formData = new FormData();
    formData.append('file', image);

    return this.http.post(`${url + endPoint + '/images'}`, formData, {
      headers: {
        contentType: 'multipart/form-data',
        Authorization: this.authInfo.tokenType + ' ' + this.authInfo.accessToken,
      },
      responseType: 'text',
    });
  }

  getImage(fileName: string): Observable<string> {
    return of(`${url + endPoint + '/images/' + fileName}`);
  }

  updateUser(user: User): Observable<ApiResponse<User>> {
    return this.http.put<ApiResponse<User>>(
      `${url + endPoint + '/' + user.id}`,
      user,
      this.httpOptions
    )
    .pipe(
      map((response) => {
        response.success = true;
        response.message = 'User updated successfully';
        return response;
      })
    );;
  }

  deleteUser(Id: number): Observable<ApiResponse<boolean>> {
    return this.http.delete<ApiResponse<boolean>>(
      `${url + endPoint + '/' + Id}`,
      this.httpOptions
    )
    .pipe(
      map((response) => {
        response.success = true;
        response.message = 'User deleted successfully';
        return response;
      })
    );;
  }
}
