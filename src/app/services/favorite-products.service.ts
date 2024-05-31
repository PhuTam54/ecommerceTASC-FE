import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginationResponse } from '../model/PaginationResponse';
import { Product } from '../model/Product';
import { environment } from 'src/environments/environment';

const baseUrl = environment.endPoint;
const endPoint = 'favorite-products/user';

@Injectable({
  providedIn: 'root'
})
export class FavoriteProductsService {

  constructor(private http: HttpClient) { }
  getFP(param: any): Observable<PaginationResponse<Product[]>> {
    let url = baseUrl + endPoint + '/' + param.userId + '?';
    if (param.page && param.size) url = url + 'page=' + param.page + '&size=' + param.size
    else if (param.page && !param.size) url = url + 'page=' + param.page;
    else if (param.size && !param.page) url = url + 'size=' + param.size
    return this.http.get<PaginationResponse<Product[]>>(
      url, {})
  }
}
