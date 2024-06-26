import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Clinic } from 'projects/ecommerce-admin/src/app/model/Clinic';
import { Pagination } from 'projects/ecommerce-admin/src/app/model/PaginationResponse';
import { ClinicService } from 'projects/ecommerce-admin/src/app/services/clinic.service';

@Component({
  selector: 'app-clinic',
  templateUrl: './clinics.component.html',
  styleUrls: ['./clinics.component.css']
})
export class ClinicComponent implements OnInit {

  constructor(private clinicService: ClinicService, private route: Router) { }

  pagination = new Pagination();
  clinics: Clinic[] = [];

  ngOnInit() {
    this.getClinics({ page: 0, size: 3 })
  }

  createClinic() {
    this.route.navigateByUrl("/clinic/create")
  }

  getClinics(param: any) {
    this.clinicService.getAllClinics({ page: param.page, size: param.size }).subscribe((res) => {
      this.clinics = res.content
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

  editClinic(id: number) {
    this.route.navigateByUrl('/clinic/' + id)
  }

  deleteClinic(id: number) {
    if (confirm('Are you sure to delete the clinic with id: ' + id + '?')) {
      this.clinicService.deleteClinic(id).subscribe(res => {
        alert('Deleted successfully');
        this.clinics = this.clinics.filter(clinic => clinic.id !== id);
      }
      )
    }
  }
}
