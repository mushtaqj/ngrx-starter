import { Product } from '../product';
import * as fromRoot from '../../state/app.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductActions, ProductActionTypes } from './product.actions';


const initialState: ProductState = {
  showProductCode: true,
  currentProductId: null,
  products: [],
  error: ''
}

//Reducers
export function reducer(state = initialState, action: ProductActions): ProductState {

  switch (action.type) {

    case ProductActionTypes.ToggleProductCode:
      return {
        ...state,
        showProductCode: action.payload
      };
    case ProductActionTypes.SetCurrentProduct:
      return {
        ...state,
        // make a copy to prevent mutating the store from the the component reference
        currentProductId: action.payload.id
      }
    case ProductActionTypes.ClearCurrentProduct:
      return {
        ...state,
        currentProductId: null
      }
    case ProductActionTypes.InitializeCurrentProduct:
      return {
        ...state,
        currentProductId: 0
      }
    case ProductActionTypes.LoadSuccess:
      return {
        ...state,
        products: action.payload,
        error: ''
      }
    case ProductActionTypes.LoadFail:
      return {
        ...state,
        error: action.payload
      }
    case ProductActionTypes.UpdateProductSuccess:
      const updateProduct: Product = action.payload;
      const updateProducts = state.products.map(
        product => updateProduct.id === product.id ? updateProduct : product
      )
      return {
        ...state,
        products: updateProducts,
        currentProductId: updateProduct.id,
        error: ''
      }
    case ProductActionTypes.UpdateProductFail:
      return {
        ...state,
        error: action.payload
      }
    case ProductActionTypes.CreateProductSuccess:
      const createdProduct: Product = action.payload;
      const createdProducts = state.products.concat([createdProduct]);
      return {
        ...state,
        products: createdProducts,
        currentProductId: createdProduct.id,
        error: ''
      }
    case ProductActionTypes.CreateProductFail:
      return {
        ...state,
        error: action.payload
      }
    case ProductActionTypes.DeleteProductSuccess:
      const deletedProductId: number = action.payload;
      const deletedProducts = state.products.filter(product => product.id !== deletedProductId)
      return {
        ...state,
        products: deletedProducts,
        currentProductId: null,
        error: ''
      }
    case ProductActionTypes.DeleteProductFail:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state;
  }
}

//State
export interface ProductState {
  showProductCode: boolean;
  currentProductId: number | null;
  products: Product[];
  error: string;
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

export const getCurrentProductId = createSelector(
  getProductFeatureState,
  state => state.currentProductId
)

export const getCurrentProduct = createSelector(
  getProductFeatureState,
  getCurrentProductId,
  (state, currentProductId) => {
    if (currentProductId === 0) {
      return {
        id: null,
        productName: '',
        productCode: 'New',
        description: '',
        starRating: 0
      }
    } else {
      return currentProductId ? state.products.find(p => p.id === currentProductId) : null
    }
  }
)

export const getProducts = createSelector(
  getProductFeatureState,
  state => state.products
)

export const getError = createSelector(
  getProductFeatureState,
  state => state.error
)
