import { Product } from '../product';
import { ProductActions, ProductActionTypes } from './product.actions';

//State
export interface ProductState {
  showProductCode: boolean;
  currentProductId: number | null;
  products: Product[];
  error: string;
}

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
  }
}
