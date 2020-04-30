import { Injectable } from '@angular/core';
import { ProductService } from '../product.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as productActions from './product.actions';
import { map, mergeMap } from 'rxjs/operators';
import { Product } from '../product';


@Injectable()
export class ProductEffects {

  constructor(private readonly productService: ProductService,
              private readonly $actions: Actions) {
  }

  @Effect()
  loadProducts$ = this.$actions.pipe(
    ofType(productActions.ProductActionTypes.Load),
    mergeMap(() =>
      this.productService.getProducts().pipe(
        map((products: Product[]) => new productActions.LoadSuccess(products))
      )
    )
  );

}
