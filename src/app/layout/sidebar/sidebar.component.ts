import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from 'src/app/model/Category';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginationResponse } from 'src/app/model/Pagination';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  constructor(private categoryService: CategoryService, private router: Router,private route: ActivatedRoute) {}
  paginationRes = new PaginationResponse<Category[]>();
  searchParam = {pageNumber: 1, pageSize: 10};

  categories: Category[] = [];
  totalPages: number = 1;
  pages: number[] | undefined;
  
  ngOnInit() {
    console.log(this.searchParam)
    this.getCategory();
  }

  getCategory() {
    if (this.route.snapshot.queryParamMap.has('page')) {
      this.searchParam.pageNumber = Number(this.route.snapshot.queryParamMap.get('page'));
    }
    if (this.route.snapshot.queryParamMap.has('limit')) {
      this.searchParam.pageSize = Number(this.route.snapshot.queryParamMap.get('limit'));
    }
    this.categoryService.getCategory(this.searchParam).subscribe((res) => {
      this.categories = res.content;
      this.totalPages = res.totalPages;
      this.pages = Array.from({length: this.totalPages}, (_, i) => i + 1);
    });
  }
}
