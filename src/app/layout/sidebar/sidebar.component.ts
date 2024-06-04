import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from 'src/app/model/Category';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginationResponse } from 'src/app/model/Pagination';
import { User } from 'src/app/model/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  constructor(
    private categoryService: CategoryService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  paginationRes = new PaginationResponse<Category[]>();
  searchParam = { pageNumber: 1, pageSize: 10 };

  categories: Category[] = [];
  totalPages: number = 1;
  pages: number[] | undefined;

  ngOnInit() {
    this.getUser();

    this.getCategory();
  }

  user = new User();
  coverImage: string | ArrayBuffer | null = null;
  authInfo = JSON.parse(localStorage.getItem('authInfo') || '{}');

  goToHome(event: Event) {
    event.preventDefault();
    this.router.navigate(['/']);
  }

  logout(event: Event) {
    event.preventDefault();
    this.router.navigate(['/logout']);
  }

  getUser() {
    this.userService.getById(this.authInfo['id']).subscribe((res) => {
      this.userService.getImage(res.avatar).subscribe((res) => {
        this.coverImage = res;
      });

      this.user = res;
    });
  }

  bindValueForm() {
    // this.form.patchValue(this.user);
  }

  getCategory() {
    if (this.route.snapshot.queryParamMap.has('page')) {
      this.searchParam.pageNumber = Number(
        this.route.snapshot.queryParamMap.get('page')
      );
    }
    if (this.route.snapshot.queryParamMap.has('limit')) {
      this.searchParam.pageSize = Number(
        this.route.snapshot.queryParamMap.get('limit')
      );
    }
    this.categoryService.getCategory(this.searchParam).subscribe((res) => {
      this.categories = res.content;
      this.totalPages = res.totalPages;
      this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    });
  }
}
