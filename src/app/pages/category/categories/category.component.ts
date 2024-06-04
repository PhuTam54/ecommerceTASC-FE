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
  constructor(private categoryService: CategoryService, private router: Router,private route: ActivatedRoute , private activedRoute: ActivatedRoute) {}

  category: Category[] = [];
  totalPages: number = 0;
  pages: number[] | undefined;
  parentId: number;
  

  ngOnInit() {
 
    let itemId = this.activedRoute.snapshot.params['id'];
    if (itemId) {
      this.getCategory(itemId);
    }
  }
  getCategory(categoryId: number) {
    if(categoryId){
      this.categoryService.getByParent(categoryId).subscribe((res) => {
      console.log(res);
      this.category = res;
    });
  }
  if(!categoryId) {
    const params = '?page=1&limit=10';
    this.categoryService.getCategory(params).subscribe((res) => {
    console.log(res);
    this.category = res;
  });
}
    
}

  // getCategory(searchParam: any = this.searchParam) {
  //   if (this.route.snapshot.queryParamMap.get('page')) {
  //     searchParam.pageNumber = this.route.snapshot.queryParamMap.get('page');
  //   }
  //   if (this.route.snapshot.queryParamMap.get('limit')) {
  //     searchParam.pageSize = this.route.snapshot.queryParamMap.get('limit');
  //   }
  //   this.categoryService.getCategory(searchParam).subscribe((res) => {
  //     this.category = res.content;
  //     this.totalPages = res.totalPages;
  //     this.pages = Array.from({length: this.totalPages}, (_, i) => i + 1);
  //   });
  // }

  createCategory() {
    this.router.navigate(['/category/create']);
  }

  editCategory(Id: any) {
    this.router.navigate(['/category/update', Id]);
  }

  deleteCategory(Id: any) {
    alert('Are you sure you want to delete? ' + Id);
      if (Id)
        this.categoryService.deleteCategory(Id).subscribe((res) => {
          this.getCategory;
        });
  
  }
  // prevPage() {
  //   if (this.searchParam['pageNumber'] > 1) {
  //     this.searchParam['pageNumber']--;
  //     this.router.navigateByUrl('/category?page=' + this.searchParam['pageNumber'] + '&limit=' + this.searchParam['pageSize'])
  //     .then(() => {
  //       this.getCategory(this.searchParam);
  //     });
  //   }
  // }

  // nextPage() {
  //   if (this.searchParam['pageNumber'] < this.totalPages) {
  //     this.searchParam['pageNumber']++;
  //     this.router.navigateByUrl('/category?page=' + this.searchParam['pageNumber'] + '&limit=' + this.searchParam['pageSize'])
  //     .then(() => {
  //       this.getCategory(this.searchParam);
  //     });
  //   }
  // }
  // searchParamChange(page: number) {
  //   this.router.navigate(['/category'], { queryParams: { page: page, limit: this.searchParam['pageSize'] } })
  //   .then(() => {
  //     this.getCategory(this.searchParam);
  //   });
  // }
}
