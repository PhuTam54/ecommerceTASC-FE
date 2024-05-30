import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaginationResponse } from 'src/app/model/Pagination';
import { Category } from '../../../model/Category';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  constructor(private categoryService: CategoryService, private router: Router) {}


  category: Category[] = [];

  ngOnInit() {
    this.getCategory();
  }

  getCategory() {
    this.categoryService.getCategory().subscribe((res) => {
      console.log(res);
      this.category = res;
    });
  }

  createCategory() {
    this.router.navigate(['/category/add']);
  }

  editCategory(Id: any) {
    this.router.navigate(['/category', Id]);
  }

  deleteCategory(Id: any) {
    alert('Are you sure you want to delete? ' + Id);
  }
  onDelete(item: Category) {
    // if (item)
    //   this.categoryService.deleteCategory(item.id).subscribe((res) => {
    //     this.getCategory();
    //   });
  }
}
