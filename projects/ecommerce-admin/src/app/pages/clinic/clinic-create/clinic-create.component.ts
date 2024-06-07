import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Clinic } from 'projects/ecommerce-admin/src/app/model/Clinic';
import { ClinicService } from 'projects/ecommerce-admin/src/app/services/clinic.service';

@Component({
  selector: 'app-clinic-create',
  templateUrl: './clinic-create.component.html',
  styleUrls: ['./clinic-create.component.css']
})
export class ClinicCreateComponent implements OnInit {
  form: FormGroup;
  clinic = new Clinic()
  isUpdate: boolean = false
  id: number

  constructor(
    private fb: FormBuilder,
    private clinicService: ClinicService,
    private router: Router,
    private activedRoute: ActivatedRoute
  ) {
    this.form = this.fb.group({
      clinicName: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      openingHours: ['', Validators.required],
      closingHours: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.activedRoute.params.subscribe(params => {
      this.id = params['id']
      if (this.id) {
        this.isUpdate = true;
        this.loadFormData(this.id)
      }
    })
  }

  onSave() {
    if (this.form.valid) {
      this.clinicService.createClinic(this.form.value).subscribe(response => {
        alert('Created successfully')
        this.router.navigateByUrl('/clinic')
      }, error => {
        console.error('Error saving clinic', error);
        // Handle error, maybe show an error message
      });
    }
  }

  onUpdate() {
    if (this.form.valid && this.id !== undefined) {
      let dataForm = this.form.value;
      this.clinicService.updateClinic(this.id, dataForm).subscribe((res) => {
        this.router.navigateByUrl('/clinic');
      });
    }
  }

  loadFormData(id: number) {
    this.clinicService.getClinicById(id).subscribe(res => {
      this.form.patchValue(res);
    })
  }

  goBack() {
    // window.history.back();
    this.router.navigateByUrl('/clinic');
  }
}
