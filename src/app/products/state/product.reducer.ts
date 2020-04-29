import { Product } from '../product';
import * as fromRoot from '../../state/app.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductActions, ProductActionTypes } from './product.actions';


const initialState: ProductState = {
  showProductCode: true,
  currentProduct: null,
  products: []
}

//Reducers
export function reducer(state = initialState, action: ProductActions): ProductState {

  switch (action.type) {

    case ProductActionTypes.ToggleProductCode:
      return {
        ...state,
        showProductCode: action.payload
      };
    default:
      return state;
  }
}

//State
export interface ProductState {
  showProductCode: boolean;
  currentProduct: Product;
  products: Product[];
}

export interface State extends fromRoot.State {
  products: ProductState
}

//Selectors
const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getShowProductCode = createSelector(
  getProductFeatureState,
  state => state.showProductCode
);

export const getCurrentProduct = createSelector(
  getProductFeatureState,
  state => state.currentProduct
)

export const getProducts = createSelector(
  getProductFeatureState,
  state => state.products
)
