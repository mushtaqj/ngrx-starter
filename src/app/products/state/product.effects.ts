import { Injectable } from '@angular/core';
import { ProductService } from '../product.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as productActions from './product.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Product } from '../product';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';


@Injectable()
export class ProductEffects {

  constructor(private readonly productService: ProductService,
              private readonly $actions: Actions) {
  }

  @Effect()
  loadProducts$: Observable<Action> = this.$actions.pipe(
    ofType(productActions.ProductActionTypes.Load),
    mergeMap(() =>
      this.productService.getProducts().pipe(
        map((products: Product[]) => new productActions.LoadSuccess(products)),
        catchError(err => of(new productActions.LoadFail(err)))
      )
    )
  );

  @Effect()
  updateProduct$: Observable<Action> = this.$actions.pipe(
    ofType(productActions.ProductActionTypes.UpdateProduct),
    map((action: productActions.UpdateProduct) => action.payload),
    mergeMap((product: Product) =>
      this.productService.updateProduct(product).pipe(
        map((updatedProduct: Product) => new productActions.UpdateProductSuccess(updatedProduct)),
        catchError(err => () => new productActions.UpdateProductFail(err))
      )
    )
  );

  @Effect()
  createProduct$: Observable<Action> = this.$actions.pipe(
    ofType(productActions.ProductActionTypes.CreateProduct),
    map((action: productActions.CreateProduct) => action.payload),
    mergeMap((product: Product) =>
      this.productService.createProduct(product).pipe(
        map((createdProduct: Product) => new productActions.CreateProductSuccess(createdProduct)),
        catchError(err => () => new productActions.CreateProductFail(err))
      )
    )
  );

  @Effect()
  deleteProduct$: Observable<Action> = this.$actions.pipe(
    ofType(productActions.ProductActionTypes.DeleteProduct),
    map((action: productActions.DeleteProduct) => action.payload),
    mergeMap((productId: number) =>
      this.productService.deleteProduct(productId).pipe(
        map(() => new productActions.DeleteProductSuccess(productId)),
        catchError(err => () => new productActions.DeleteProductFail(err))
      )
    )
  );

}
