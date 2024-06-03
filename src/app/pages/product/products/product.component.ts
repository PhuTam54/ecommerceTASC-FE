import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaginationResponse } from 'src/app/model/Pagination';
import { Product } from '../../../model/Product';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private productService: ProductService, private router: Router) {}
  paginationRes = new PaginationResponse<Product[]>();
  searchParam = {
    pageNumber: 0,
    pageSize: 10,
    Product: '',
  };

  product: Product[] = [];


  ngOnInit(): void {
    this.getProducts();
  }


  getProducts() {
    this.productService.getProducts().subscribe((res) => {
      console.log(res);
      this.product = res.content;
    });
  }
  onCreate() {
    this.router.navigate(['/']);
  }

  onEdit(Id: any): void {
    this.router.navigate(['/product', Id]);
  }

  onDelete(Id: number) {
    if (Id)
      this.productService.deleteProduct(Id).subscribe((res) => {
        this.getProducts();
      });
  }

}