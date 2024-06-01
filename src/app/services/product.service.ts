import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../model/ApiResponse';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../model/Product';


const url = environment.endPoint;
const endPoint = 'product';
@Injectable({
  providedIn: 'root'
})



export class ProductService {

  constructor(private http: HttpClient) { }

  

  getProducts(searchParam: any): Observable<any> {
    
    return this.http.get<Product[]>(url + endPoint + '?page=' 
    + searchParam.pageNumber + '&limit=' + searchParam.pageSize, {});
  }


  getProductByName(name :any): Observable<any> {
    return this.http.get<Product>(`${url + endPoint + '/' + name}`);
  }

  createProduct(product: Product): Observable<ApiResponse<Product>> {
    return this.http.post<ApiResponse<Product>>(`${url + endPoint}`, product);
  }

  updateProduct(product: Product): Observable<ApiResponse<Product>> {
    return this.http.put<ApiResponse<Product>>(
      `${url + endPoint + '/' + product.id}`,
      product
    );
  }


  deleteProduct(Id: number): Observable<ApiResponse<boolean>> {
    return this.http.delete<ApiResponse<boolean>>(
      `${url + endPoint + '/trash/' + Id}`
    );
  }
}