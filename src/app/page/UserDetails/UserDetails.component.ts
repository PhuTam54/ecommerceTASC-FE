import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-userDetails',
  templateUrl: './UserDetails.component.html',
  styleUrls: ['./UserDetails.component.css']
})
export class UserdetailsComponent implements OnInit {

  constructor(
    private activedRoute: ActivatedRoute,
    private userService: UserService,
    private fb: FormBuilder,
  ) { }

  form!: FormGroup;
  user = new User();

  ngOnInit() {
    this.initForm();
    let id = this.activedRoute.snapshot.params['id'];
    this.getUserById(id);
  }

  getUserById(id: any) {
    this.userService.getById(id).subscribe((res) => {
      this.user = res;
      this.bindValueForm();
    });
  }

  initForm() {
    this.form = this.fb.group({
      id: [0],
      username: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      phoneNumber: [null, [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(10), Validators.maxLength(20)]],
      email: [null, [Validators.required, Validators.email, Validators.maxLength(50)]],
    });
  }

  bindValueForm() {
    this.form.patchValue(this.user)
  }

  onSave() {
    let valueForm = this.form.getRawValue();
    console.log(valueForm);
  }

  onUploadCoverImage(file: any) { }
}
