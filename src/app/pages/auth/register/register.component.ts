import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  form!: FormGroup;

  ngOnInit() {
    this.initForm();
  }

  goToLogin(event: Event) {
    event.preventDefault();
    this.router.navigate(['/login']);
  }

  onSave() {
    let registerForm = this.form.getRawValue();
    console.log(registerForm);
    this.authService.register(registerForm).subscribe((res) => {
      alert(res['message']);
      this.router.navigateByUrl('/login');
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
      passwordConfirm: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      role: [['user']],
    }, { validators: this.passwordsMatch });
  }

  // Custom validator
  passwordsMatch(group: FormGroup) {
    const password = group.get('password').value;
    const passwordConfirm = group.get('passwordConfirm').value;

    return password === passwordConfirm ? null : { notSame: true };
  }
}
