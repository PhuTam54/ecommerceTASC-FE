import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'projects/ecommerce-admin/src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  form!: FormGroup;

  ngOnInit() {
    this.initForm();
  }

  goToRegister(event: Event) {
    event.preventDefault();
    this.router.navigate(['/register']);
  }

  onSave() {
    let loginForm = this.form.getRawValue();
    console.log(loginForm);
    this.authService.login(loginForm).subscribe((res) => {
      localStorage.setItem('authInfo', JSON.stringify(res));
      this.router.navigateByUrl('/');
    });
  }

  onOAuth2Login(provider: string, event: Event) {
    event.preventDefault();
    this.authService.oAuth2Login(provider);
  }

  initForm() {
    this.form = this.fb.group({
      userName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
}
