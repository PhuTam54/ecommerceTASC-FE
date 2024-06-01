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
    { id: 3, name: 'ROLE_MODERER', value: 'mod' },
  ];
  coverImage: string | ArrayBuffer | null = null;

  ngOnInit() {
    this.initForm();
    let itemId = this.activedRoute.snapshot.params['id'];
    if (itemId) this.getUserById(itemId);
  }

  getUserById(Id: any) {
    this.userService.getById(Id).subscribe((res) => {
      this.user = res;

      this.userService.getImage(res.avatar).subscribe((res) => {
        this.coverImage = res;
      });
      this.bindValueForm();
    });
  }

  initForm() {
    this.form = this.fb.group({
      id: [null],
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      address: [''],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(11),
        ],
      ],
      dateOfBirth: [''],
      gender: [''],
      roles: [
        this?.user?.roles?.map((role) => role.name) ?? [],
        Validators.required,
      ],
      avatar: [''],
    });
  }

  bindValueForm() {
    this.form.patchValue(this.user);
  }

  onSave() {
    let userForm = this.form.getRawValue();
    const file = this.form.get('avatar')?.value;
    if (userForm.id && typeof file !== 'string') {
      this.userService.uploadImage(file).subscribe((res) => {
        userForm.avatar = res;
        this.userService.updateUser(userForm).subscribe((res) => {
          this.router.navigateByUrl('/user');
          if (res.success) this.router.navigateByUrl('/user');
        });
      });
    } else if (userForm.id) {
      userForm.avatar = this.user.avatar;
      this.userService.updateUser(userForm).subscribe((res) => {
        this.router.navigateByUrl('/user');
        if (res.success) this.router.navigateByUrl('/user');
      });
    } else {
      this.userService.uploadImage(file).subscribe((res) => {
        userForm.avatar = res;
        this.userService.createUser(userForm).subscribe((res) => {
          this.router.navigateByUrl('/user');
          if (res.success) this.router.navigateByUrl('/user');
        });
      });
    }
  }

  onUploadCoverImage(event: any) {
    let file = event.target.files;
    if (file.length === 0) return;

    let reader = new FileReader();
    reader.readAsDataURL(file[0]);
    reader.onload = (_event) => {
      this.coverImage = reader.result;
      this.form.get('avatar')?.setValue(file[0]);
    };
  }

  onUploadAvatar(avatar: File) {
    return this.userService.uploadImage(avatar).subscribe((res) => {
      console.log(res);
    });
  }
}
