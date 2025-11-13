import { createReducer, on } from '@ngrx/store';
import { ProductsActT } from './actions';
import { ProductT } from '../etc/types';
import { Nullable } from '@/common/types/etc';

export interface ProductsStateT {
  products: Nullable<ProductT[]>;
}

export const initState: ProductsStateT = {
  products: null,
};

export const productsReducer = createReducer(
  initState,
  on(ProductsActT.RESET__PRODUCTS_STATE, (_: ProductsStateT) => initState),
  on(ProductsActT.SET_PRODUCTS, (state: ProductsStateT, act: { products: ProductT[] }) => ({
    ...state,
    products: act.products,
  }))
);
