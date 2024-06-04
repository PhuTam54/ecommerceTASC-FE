import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const url = environment.endPoint;
const oauth2Url = environment.oauth2Url;
const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})

export class AuthService {

constructor(private http: HttpClient) { }

  login(loginForm: any) {
    return this.http.post(url + 'auth/login', loginForm);
  }

  register(registerForm: any) {
    return this.http.post(url + 'auth/register', registerForm);
  }

  oAuth2Login(provider: string) {
    if (provider === 'google') {
      window.location.href = oauth2Url + provider;
    } else if (provider === 'facebook') {
      window.location.href = oauth2Url + provider;
    } else if (provider === 'github') {
      window.location.href = oauth2Url + provider;
    }
  }

  getAccessToken(authentication: any) {
    return this.http.get(baseUrl + 'oauth2/login-success', authentication);
  }
}
