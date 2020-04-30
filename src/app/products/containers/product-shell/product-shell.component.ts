import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import * as productActions from '../../state/product.actions';
import { select, Store } from '@ngrx/store';
import * as fromProduct from '../../state/product.reducer';
import { ProductService } from '../../product.service';
import { Observable } from 'rxjs';
import { Product } from '../../product';


@Component({
  templateUrl: './product-shell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductShellComponent implements OnInit {

  errorMessage$: Observable<string>;
  displayCode$: Observable<boolean>;
  products$: Observable<Product[]>;
  selectedProduct$: Observable<Product>;

  constructor(private readonly productService: ProductService,
              private readonly store: Store<fromProduct.State>) { }

  ngOnInit(): void {
    this.store.dispatch(new productActions.Load())

    this.products$ = this.store.pipe(select(fromProduct.getProducts));
    this.errorMessage$ = this.store.pipe(select(fromProduct.getError))
    this.store.pipe(select(fromProduct.getCurrentProduct))
    this.store.pipe(select(fromProduct.getShowProductCode))
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
