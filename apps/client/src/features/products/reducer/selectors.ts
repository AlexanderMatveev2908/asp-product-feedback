import { createFeatureSelector } from '@ngrx/store';
import { ProductsStateT } from './reducer';

export const getProductsState = createFeatureSelector<ProductsStateT>('products');
