import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { catchError, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  searchParam = { pageNumber: 1, pageSize: 10 };

  totalPages: number = 0;
  pages: number[] | undefined;
  authInfo = JSON.parse(localStorage.getItem('authInfo'));
  oauth2Code = this.route.snapshot.queryParamMap.get('code');

  ngOnInit() {
    if (this.oauth2Code !== null && this.oauth2Code !== undefined) {
      this.authService.getAccessToken(this.oauth2Code).subscribe((res) => {
        localStorage.setItem('authInfo', JSON.stringify(res));
        this.authInfo = JSON.parse(localStorage.getItem('authInfo'));
      });
    }

    if (
      !this.authInfo ||
      this.authInfo === null ||
      this.authInfo === undefined ||
      this.authInfo === ''
    ) {
      this.router.navigateByUrl('/login');
    }
    if (this.authInfo['roles'].contain('ROLE_ADMIN')) {
      alert('You are not authorized to access this resource');
      this.router.navigateByUrl('/login');
    }
    const decodedToken = jwtDecode(this.authInfo['accessToken']);
    if (decodedToken.exp < Date.now() / 1000) {
      alert('Your access token has expired, please login again!');
      this.router.navigateByUrl('/login');
    }
  }

}
