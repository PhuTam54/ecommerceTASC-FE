import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginationResponse } from 'projects/ecommerce-admin/src/app/model/Pagination';
import { Product } from '../../../model/Product';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private productService: ProductService, private router: Router,private route: ActivatedRoute) {}
  paginationRes = new PaginationResponse<Product[]>();
  searchParam = {
    pageNumber: 0,
    pageSize: 10,
    Product: '',
  };

  product: Product[] = [];
  totalPages: number = 0;
  pages: number[] | undefined;


  ngOnInit(): void {
    this.getProducts();
  }


  getProducts(searchParam: any = this.searchParam) {
    if (this.route.snapshot.queryParamMap.get('page')) {
      searchParam.pageNumber = this.route.snapshot.queryParamMap.get('page');
    }
    if (this.route.snapshot.queryParamMap.get('limit')) {
      searchParam.pageSize = this.route.snapshot.queryParamMap.get('limit');
    }
    this.productService.getProducts(searchParam).subscribe((res) => {
      this.product = res.content;
      this.totalPages = res.totalPages;
      this.pages = Array.from({length: this.totalPages}, (_, i) => i + 1);
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

  searchParamChange(page: number) {
    this.router.navigate(['/product'], { queryParams: { page: page, limit: this.searchParam['pageSize'] } })
    .then(() => {
      this.getProducts(this.searchParam);
    });
  }

  prevPage() {
    if (this.searchParam['pageNumber'] > 1) {
      this.searchParam['pageNumber']--;
      this.router.navigateByUrl('/product?page=' + this.searchParam['pageNumber'] + '&limit=' + this.searchParam['pageSize'])
      .then(() => {
        this.getProducts(this.searchParam);
      });
    }
  }

  nextPage() {
    if (this.searchParam['pageNumber'] < this.totalPages) {
      this.searchParam['pageNumber']++;
      this.router.navigateByUrl('/product?page=' + this.searchParam['pageNumber'] + '&limit=' + this.searchParam['pageSize'])
      .then(() => {
        this.getProducts(this.searchParam);
      });
    }
}
}