import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginationResponse } from 'src/app/model/Pagination';
import { Category } from '../../../model/Category';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  constructor(private categoryService: CategoryService, private router: Router,private route: ActivatedRoute) {}
  paginationRes = new PaginationResponse<Category[]>();
  searchParam = {pageNumber: 1, pageSize: 10};

  category: Category[] = [];
  totalPages: number = 0;
  pages: number[] | undefined;

  ngOnInit() {
    console.log(this.searchParam)
    this.getCategory();
  }

  getCategory(searchParam: any = this.searchParam) {
    if (this.route.snapshot.queryParamMap.get('page')) {
      searchParam.pageNumber = this.route.snapshot.queryParamMap.get('page');
    }
    if (this.route.snapshot.queryParamMap.get('limit')) {
      searchParam.pageSize = this.route.snapshot.queryParamMap.get('limit');
    }
    this.categoryService.getCategory(searchParam).subscribe((res) => {
      this.category = res.content;
      this.totalPages = res.totalPages;
      this.pages = Array.from({length: this.totalPages}, (_, i) => i + 1);
    });
  }

  createCategory() {
    this.router.navigate(['/category/create']);
  }

  editCategory(Id: any) {
    this.router.navigate(['/category', Id]);
  }

  deleteCategory(Id: any) {
    alert('Are you sure you want to delete? ' + Id);
      if (Id)
        this.categoryService.deleteCategory(Id).subscribe((res) => {
          this.getCategory();
        });
  
  }
  prevPage() {
    if (this.searchParam['pageNumber'] > 1) {
      this.searchParam['pageNumber']--;
      this.router.navigateByUrl('/category?page=' + this.searchParam['pageNumber'] + '&limit=' + this.searchParam['pageSize'])
      .then(() => {
        this.getCategory(this.searchParam);
      });
    }
  }

  nextPage() {
    if (this.searchParam['pageNumber'] < this.totalPages) {
      this.searchParam['pageNumber']++;
      this.router.navigateByUrl('/category?page=' + this.searchParam['pageNumber'] + '&limit=' + this.searchParam['pageSize'])
      .then(() => {
        this.getCategory(this.searchParam);
      });
    }
  }
  searchParamChange(page: number) {
    this.router.navigate(['/category'], { queryParams: { page: page, limit: this.searchParam['pageSize'] } })
    .then(() => {
      this.getCategory(this.searchParam);
    });
  }
}
