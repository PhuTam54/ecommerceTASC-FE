import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaginationResponse } from 'projects/ecommerce-admin/src/app/model/PaginationResponse';
import { Product } from 'projects/ecommerce-admin/src/app/model/Product';
import { User } from 'projects/ecommerce-admin/src/app/model/User';
import { FavoriteProductsService } from 'projects/ecommerce-admin/src/app/services/favorite-products.service';

@Component({
  selector: 'app-favorite-product',
  templateUrl: './favorite-product.component.html',
  styleUrls: ['./favorite-product.component.css']
})
export class FavoriteProductComponent implements OnInit {
  /**
   *
   */
  constructor(private router: Router, private fds: FavoriteProductsService) { }
  user: User[] = [];
  products: Product[] = [];
  paging = new PaginationResponse<Product[]>
  ngOnInit() {
    this.getFP();
  }

  getFP() {
    this.fds.getFP({ page: 1, size: 3, userId: 1 }).subscribe(res => {
      console.log(res)
      this.paging = res
      this.products = res.content;
    })
  }

  create() {
    this.router.navigate(['/favorite-product/create']);
  }

  edit(Id: any) {
    this.router.navigate(['/favorite-product', Id]);
  }

  delete(Id: any) {
    alert('Are you sure you want to delete? ' + Id);
  }

}
