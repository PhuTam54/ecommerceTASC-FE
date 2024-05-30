import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaginationResponse } from 'src/app/model/Pagination';
import { Category } from '../../model/Category';
import { CategoryService } from '../../services/Category.service';

@Component({
  selector: 'app-Category',
  templateUrl: './Category.component.html',
  styleUrls: ['./Category.component.css'],
})
export class CategoryComponent implements OnInit {
  paginationRes = new PaginationResponse<Category[]>();
  searchParam = {
    pageNumber: 1,
    pageSize: 5,
    Category: '',
  };
  categories: Category[] = [];
Category: any;

  constructor(private categoryService: CategoryService, private router: Router) {}

  ngOnInit() {
    this.getCategory();
  }

  getCategory() {
    this.categoryService.getCategory().subscribe((res) => {
      this.categories = res; // Adjusted to match the structure of the response
    });
  }

  createCategory() {
    this.router.navigate(['/Category/create']);
  }

  editCategory(id: number | undefined) {
    if (id !== undefined) {
      this.router.navigate(['/Category', id]);
    } else {
      console.error('Category ID is undefined');
    }
  }

  deleteCategory(id: number | undefined) {
    if (id !== undefined) {
      if (confirm('Are you sure you want to delete?')) {
        this.categoryService.deleteCategory(id).subscribe(() => {
          this.getCategory();
        });
      }
    } else {
      console.error('Category ID is undefined');
    }
  }

  onDelete(item: Category) {
    if (item && item.id !== undefined) {
      this.deleteCategory(item.id);
    } else {
      console.error('Item or Item ID is undefined');
    }
  }
}
