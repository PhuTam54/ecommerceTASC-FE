import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaginationResponse } from 'src/app/model/Pagination';
import { User } from '../../../model/User';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  paginationRes = new PaginationResponse<User[]>();
  searchParam = { pageNumber: 1, pageSize: 10 };

  user: User[] = [];
  totalPages: number = 0;
  pages: number[] | undefined;

  ngOnInit() {
    this.getUser();
  }

  getUser(searchParam: any = this.searchParam) {
    if (this.route.snapshot.queryParamMap.get('page')) {
      searchParam.pageNumber = this.route.snapshot.queryParamMap.get('page');
    }
    if (this.route.snapshot.queryParamMap.get('limit')) {
      searchParam.pageSize = this.route.snapshot.queryParamMap.get('limit');
    }
    this.userService
      .getUser(searchParam)
      .pipe(
        catchError((err) => {
          if (err.status === 401) {
            alert('You are not authorized to access this resource');
            this.router.navigate(['/login']);
          }
          if (err.status === 403) {
            alert('You are not authorized to access this resource');
            this.router.navigate(['/login']);
          }
          return of(err);
        })
      )
      .subscribe((res) => {
        this.user = res.content;
        this.totalPages = res.totalPages;
        this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
      });
  }

  createUser() {
    this.router.navigate(['/user/create']);
  }

  editUser(Id: any) {
    this.router.navigate(['/user', Id]);
  }

  deleteUser(Id: any) {
    if (confirm('Are you sure to delete the use with id: ' + Id + '?')) {
      this.onDelete(Id);
    }
  }

  onDelete(Id: any) {
    this.userService.deleteUser(Id).subscribe((res) => {
      this.getUser();
      alert('Move to trash successfully! ' + Id);
    });
  }

  searchParamChange(page: number) {
    this.router
      .navigate(['/user'], {
        queryParams: { page: page, limit: this.searchParam['pageSize'] },
      })
      .then(() => {
        this.getUser(this.searchParam);
      });
  }

  prevPage() {
    if (this.searchParam['pageNumber'] > 1) {
      this.searchParam['pageNumber']--;
      this.router
        .navigateByUrl(
          '/user?page=' +
            this.searchParam['pageNumber'] +
            '&limit=' +
            this.searchParam['pageSize']
        )
        .then(() => {
          this.getUser(this.searchParam);
        });
    }
  }

  nextPage() {
    if (this.searchParam['pageNumber'] < this.totalPages) {
      this.searchParam['pageNumber']++;
      this.router
        .navigateByUrl(
          '/user?page=' +
            this.searchParam['pageNumber'] +
            '&limit=' +
            this.searchParam['pageSize']
        )
        .then(() => {
          this.getUser(this.searchParam);
        });
    }
  }
}
