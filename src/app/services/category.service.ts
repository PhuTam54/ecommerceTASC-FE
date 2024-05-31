import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../model/ApiResponse';
import { PaginationResponse } from '../model/Pagination';
import { Category } from '../model/Category';
const url = environment.endPoint;
const endPoint = 'category';
const params = '?page=1&limit=10';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  getCategory(searchParam: any): Observable<any> {
    return this.http.get<Category[]>(url + endPoint +'/'+ '?page=' 
    + searchParam.pageNumber + '&limit=' + searchParam.pageSize, {});
  }
  
  getCategorys(searchParam: any): Observable<PaginationResponse<Category[]>> {
    return this.http.post<PaginationResponse<Category[]>>(
      `${url + endPoint + '/search'}`,
      searchParam
    );
  }

  // getById(Id: number): Observable<ApiResponse<Category>> {
  //   return this.http.get<ApiResponse<Category>>(`${url + endPoint + '/' + Id}`);
  // }

  getById(Id: number): Observable<any> {
    return this.http.get<Category>(`${url + endPoint + '/' + Id}`);
  }

  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${url + endPoint}/`, category);
  }

  updateCategory(category: Category): Observable<ApiResponse<Category>> {
    return this.http.put<ApiResponse<Category>>(
      `${url + endPoint + '/' + category.id}`,
      category
    );
  }

  deleteCategory(Id: number): Observable<ApiResponse<boolean>> {
    return this.http.delete<ApiResponse<boolean>>(
      `${url + endPoint + '/' + Id}`
    );
  }
}
