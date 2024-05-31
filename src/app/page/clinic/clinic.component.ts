import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Clinic } from 'src/app/model/Clinic';
import { Pagination } from 'src/app/model/PaginationResponse';
import { ClinicService } from 'src/app/services/clinic.service';

@Component({
  selector: 'app-clinic',
  templateUrl: './clinic.component.html',
  styleUrls: ['./clinic.component.css']
})
export class ClinicComponent implements OnInit {

  constructor(private clinicService: ClinicService, private route: Router) { }


  pagination = new Pagination();
  clinics: Clinic[] = [];

  ngOnInit() {
    this.getClinics({ page: 1, size: 3 })
  }

  createClinic() {
    this.route.navigateByUrl("/clinic/create")
  }

  getClinics(param: any) {
    this.clinicService.getAllClinics({ page: param.page, size: param.size }).subscribe((res) => {
      this.clinics = res.content
      console.log(res.content)
      this.pagination.first = res.first;
      this.pagination.last = res.last;
      this.pagination.number = res.number;
      this.pagination.size = res.size;
      this.pagination.totalElements = res.totalElements;
      this.pagination.totalPages = res.totalPages;
    })
  }

  pageChange(event: any) {
    this.getClinics({ page: event, size: 3 })
  }


  editClinic(id: number) { }

  deleteClinic(id: number) {

  }
}
