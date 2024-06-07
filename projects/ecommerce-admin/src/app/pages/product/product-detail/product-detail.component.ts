import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../model/Product';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  constructor(
    private activedRoute: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private fb: FormBuilder
  ) {}

  form!: FormGroup;
  product = new Product();
  ngOnInit() {
    this.initForm();
    let itemId = this.activedRoute.snapshot.params['id'];
    if (itemId) this.getProductByName(itemId);
  }

  getProductByName(Name: any) {
    this.productService.getProductByName(Name).subscribe((res) => {
      this.product = res;
      this.bindValueForm();
    });
  }

  initForm() {
    this.form = this.fb.group({
      id: [0],
      name: [null, [Validators.required, Validators.minLength(0), Validators.maxLength(20)]],
      // Add other product properties here...
    });
  }

  bindValueForm() {
    this.form.patchValue(this.product);
  }

  onSave() {
    let productForm = this.form.getRawValue();
    if (productForm.id) {
      this.productService.updateProduct(productForm).subscribe((res) => {
        if (res.success) this.router.navigateByUrl('/product');
      });
    } else {
      this.productService.createProduct(productForm).subscribe((res) => {
        if (res.success) this.router.navigateByUrl('/product');
      });
    }
  }

  onUploadCoverImage(event: any) {
    let file = event.target.files;
  }
}