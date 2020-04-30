import { Component, OnDestroy, OnInit } from '@angular/core';

import { Product } from '../product';
import { ProductService } from '../product.service';
import { select, Store } from '@ngrx/store';
import * as fromProduct from '../state/product.reducer';
import * as productActions from '../state/product.actions';
import { Observable } from 'rxjs';


@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';
  errorMessage$: Observable<string>;
  displayCode: boolean;
  products$: Observable<Product[]>;

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;

  constructor(private readonly productService: ProductService,
              private readonly store: Store<fromProduct.State>) { }

  ngOnInit(): void {

    this.store.dispatch(new productActions.Load())
    this.products$ = this.store.pipe(select(fromProduct.getProducts));
    this.errorMessage$ = this.store.pipe(select(fromProduct.getError))

    this.store.pipe(select(fromProduct.getCurrentProduct)).subscribe(currentProduct => {
      this.selectedProduct = currentProduct;
    })

    this.store.pipe(select(fromProduct.getShowProductCode)).subscribe(showProductCode =>
      this.displayCode = showProductCode
    );
  }

  ngOnDestroy(): void {
  }

  checkChanged(value: boolean): void {
    this.store.dispatch(new productActions.ToggleProductCode(value));
  }

  newProduct(): void {
    this.store.dispatch(new productActions.InitializeCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(new productActions.SetCurrentProduct(product));
  }

}
