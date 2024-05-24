import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-UserCreate',
  templateUrl: './userCreate.component.html',
  styleUrls: ['./userCreate.component.css']
})
export class UsercreateComponent implements OnInit {

  constructor(
    private activedRoute: ActivatedRoute,
    private userService: UserService,
    private fb: FormBuilder,
  ) { }

  form!: FormGroup;
  user = new User();

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      id: [0],
      username: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      phoneNumber: [null, [Validators.required], Validators.pattern('^[0-9]*$'), Validators.minLength(10), Validators.maxLength(11)],
      email: [null, [Validators.required], Validators.email, Validators.maxLength(50)],
    });
  }

  onSave() {
    let valueForm = this.form.getRawValue();
    console.log(valueForm);
  }

  onUploadCoverImage(file: any) {}
}
