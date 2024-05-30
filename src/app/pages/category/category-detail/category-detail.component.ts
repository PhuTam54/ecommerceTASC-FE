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
      id: [0],
      name: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      parentId: [null, [Validators.required]],
      childrenNames: this.fb.array([], Validators.maxLength(250))
    });
  }

  bindValueForm() {
    this.form.patchValue({
      id: this.category.id,
      name: this.category.name,
      parentId: this.category.parent_id
    });

    if (this.category.childrenNames) {
      this.setChildrenNames(this.category.childrenNames);
    }
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

  addChildName() {
    this.childrenNames.push(this.fb.control(''));
  }

  removeChildName(index: number) {
    this.childrenNames.removeAt(index);
  }

  onSave() {
    let categoryForm = this.form.getRawValue();
    if (categoryForm.id) {
      this.categoryService.updateCategory(categoryForm).subscribe((res) => {
        if (res.success) {
          this.router.navigateByUrl('/category');
        }
      });
    } else {
      this.categoryService.createCategory(categoryForm).subscribe((res) => {
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
