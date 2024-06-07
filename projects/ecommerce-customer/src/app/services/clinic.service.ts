import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'projects/ecommerce-admin/src/environments/environment.development';
import { Clinic } from '../model/Clinic';
import { PaginationResponse } from '../model/PaginationResponse';

const baseUrl = environment.endPoint;
const endPoint = 'clinics';

@Injectable({
  providedIn: 'root'
})

export class ClinicService {

  constructor(private http: HttpClient) { }

  getAllClinics(param: any): Observable<PaginationResponse<Clinic[]>> {
    let url = baseUrl + endPoint;
    if (param.page && param.size) url = url + '?page=' + param.page + '&size=' + param.size
    else if (param.page && !param.size) url = url + '?page=' + param.page;
    else if (param.size && !param.page) url = url + '?size=' + param.size
    return this.http.get<PaginationResponse<Clinic[]>>(url, {})
  }

  getClinicById(id: number): Observable<Clinic> {
    return this.http.get<Clinic>(baseUrl + endPoint + '/' + id)
  }

  updateClinic(id: number, data: any): Observable<Clinic> {
    console.log('Sending data to server:', data); // Log dữ liệu trước khi gửi
    return this.http.put<Clinic>(baseUrl + endPoint + '/' + id, data)
  }

  createClinic(data: any): Observable<Clinic> {
    console.log('Sending data to server:', data); // Log dữ liệu trước khi gửi
    return this.http.post<Clinic>(baseUrl + endPoint, data)
  }

  deleteClinic(id: number): Observable<Clinic> {
    return this.http.delete<Clinic>(baseUrl + endPoint + '/' + id)
  }



}
