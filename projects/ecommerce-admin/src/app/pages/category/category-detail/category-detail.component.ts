import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../../model/Category';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent implements OnInit {
  form!: FormGroup;
  category = new Category();

  constructor(
    private activedRoute: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.initForm();
    let itemId = this.activedRoute.snapshot.params['id'];
    if (itemId) {
      this.getCategoryById(itemId);
    }
  }

  getCategoryById(id: any) {
    this.categoryService.getById(id).subscribe((res) => {
      this.category = res;
      this.bindValueForm();
    });
  }

  initForm() {
    this.form = this.fb.group({
      id: [null],     
      name: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      parent_id: ['', [Validators.required]],
      childrenNames:[null]
    });
  }

  bindValueForm() {
    this.form.patchValue(this.category);
  }

  get childrenNames() : FormArray {
    return this.form.get('childrenNames') as FormArray;
  }

  setChildrenNames(names: string[]) {
    const childrenNamesFormArray = this.form.get('childrenNames') as FormArray;
    names.forEach(name => {
      childrenNamesFormArray.push(this.fb.control(name));
    });
  }

  onSave() {
    let categoryForm = this.form.getRawValue();
    console.log(categoryForm);
    if (categoryForm.id) {
      console.log(categoryForm);
      this.categoryService.updateCategory(categoryForm).subscribe((res) => {
        this.router.navigateByUrl('/category');
        if (res.success) {
          this.router.navigateByUrl('/category');
        }
      });
    } else {
      this.categoryService.createCategory(categoryForm).subscribe((res) => {
        this.router.navigateByUrl('/category');
        if (res.success) {
          this.router.navigateByUrl('/category');
        }
      });
    }
  }

  onUploadCoverImage(event: any) {
    let file = event.target.files;
    // Handle file upload logic here
  }
}
