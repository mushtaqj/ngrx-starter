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
      return {
        ...state,
        products: [...state.products, action.payload],
        currentProductId: action.payload.id,
        error: ''
      }
    case ProductActionTypes.CreateProductFail:
      return {
        ...state,
        error: action.payload
      }
    case ProductActionTypes.DeleteProductSuccess:
      return {
        ...state,
        products: state.products.filter(product => product.id !== action.payload),
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
