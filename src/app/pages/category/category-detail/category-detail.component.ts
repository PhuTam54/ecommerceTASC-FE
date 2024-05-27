import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../../model/Category';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent implements OnInit {
  constructor(
    private activedRoute: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private fb: FormBuilder
  ) {}

  form!: FormGroup;
  category = new Category();
  ngOnInit() {
    this.initForm();
    let itemId = this.activedRoute.snapshot.params['id'];
    if (itemId) this.getCategoryById(itemId);
  }

  getCategoryById(Id: any) {
    this.categoryService.getById(Id).subscribe((res) => {
      this.category = res //.data;
      this.bindValueForm();
    });
  }

  initForm() {
    this.form = this.fb.group({
      id: [0],
      name: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      parent_id: [null, [Validators.required]],
      childrenNames: [null, [Validators.required], Validators.maxLength(250)],
    });
  }

  bindValueForm() {
    this.form.patchValue(this.category);
  }

  onSave() {
    let categoryForm = this.form.getRawValue();
    if (categoryForm.id) {
      this.categoryService.updateCategory(categoryForm).subscribe((res) => {
        if (res.success) this.router.navigateByUrl('/category');
      });
    } else {
      this.categoryService.createCategory(categoryForm).subscribe((res) => {
        if (res.success) this.router.navigateByUrl('/category');
      });
    }
  }

  onUploadCoverImage(event: any) {
    let file = event.target.files;
  }
}
