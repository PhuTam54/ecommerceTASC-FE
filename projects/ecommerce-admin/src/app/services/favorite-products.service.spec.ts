/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FavoriteProductsService } from './favorite-products.service';

describe('Service: FavoriteProducts', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FavoriteProductsService]
    });
  });

  it('should ...', inject([FavoriteProductsService], (service: FavoriteProductsService) => {
    expect(service).toBeTruthy();
  }));
});
