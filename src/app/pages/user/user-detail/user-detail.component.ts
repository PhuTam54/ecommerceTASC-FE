import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../model/User';
import { UserService } from '../../../services/user.service';
import { Role } from 'src/app/model/Role';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
  constructor(
    private activedRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder
  ) {}

  form!: FormGroup;
  user = new User();
  roles: Role[] = [
    { id: 1, name: 'ROLE_USER', value: 'user' },
    { id: 2, name: 'ROLE_ADMIN', value: 'admin' },
    { id: 3, name: 'ROLE_MODERER', value: 'mod'},
  ];

  ngOnInit() {
    this.initForm();
    let itemId = this.activedRoute.snapshot.params['id'];
    if (itemId) this.getUserById(itemId);
  }

  getUserById(Id: any) {
    this.userService.getById(Id).subscribe((res) => {
      this.user = res //.data;
      this.bindValueForm();
    });
  }

  initForm() {
    this.form = this.fb.group({
      id: [null],
      username: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      address: [''],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(11)]],
      dateOfBirth: [''],
      gender: [''],
      roles: [[], Validators.required]
    });
  }

  bindValueForm() {
    this.form.patchValue(this.user);
  }

  onSave() {
    let userForm = this.form.getRawValue();
    if (userForm.id) {
      console.log(userForm);
      userForm.role = userForm.roles;
      // userForm.roles = this.selectedRoles;
      this.userService.updateUser(userForm).subscribe((res) => {
        this.router.navigateByUrl('/user');
        if (res.success) this.router.navigateByUrl('/user');
      }); 
    } else {
      this.userService.createUser(userForm).subscribe((res) => {
        this.router.navigateByUrl('/user');
        if (res.success) this.router.navigateByUrl('/user');
      });
      // if (this.form.valid) {
        // const newUser: User = this.form.value;
        // this.userService.createUser(newUser).subscribe(response => {
        //   console.log('User created successfully', response);
        // });
      // } else {
      //   console.log('Form is invalid');
      // }
    }
  }

  onUploadCoverImage(event: any) {
    let file = event.target.files;
  }

  selectedRoles: string[] = [];

  // handleRoleClick(role: Role) {
  //   let roles = this.form.get('roles')?.value as Role[];
  //   if (roles.includes(role)) {
  //     roles = roles.filter((r) => r.id !== role.id);
  //   } else {
  //     roles.push(role);
  //   }
  //   console.log(roles);
  //   this.selectedRoles = (roles as Role[]).map((r) => r.value ?? '');
  // }

}
