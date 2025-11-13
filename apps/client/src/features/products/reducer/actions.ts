import { createAction, props } from '@ngrx/store';
import { ProductT } from '../etc/types';

export const ProductsActT = {
  RESET__PRODUCTS_STATE: createAction('RESET__PRODUCTS_STATE'),
  SET_PRODUCTS: createAction('SET_PRODUCTS', props<{ products: ProductT[] }>()),
};
