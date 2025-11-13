import { inject, Injectable } from '@angular/core';
import { ProductsSlice } from '../../slice';
import { ProductsApiSvc } from '../../api';

@Injectable({
  providedIn: 'root',
})
export class UseProductsKitSvc {
  public readonly productsSlice: ProductsSlice = inject(ProductsSlice);
  public readonly productsApi: ProductsApiSvc = inject(ProductsApiSvc);
}
