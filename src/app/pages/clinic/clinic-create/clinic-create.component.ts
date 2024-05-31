import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-clinic-create',
  templateUrl: './clinic-create.component.html',
  styleUrls: ['./clinic-create.component.css']
})
export class ClinicCreateComponent implements OnInit {
  form: FormGroup;
  constructor() { }

  ngOnInit() {
  }

  onSave() { }

}
