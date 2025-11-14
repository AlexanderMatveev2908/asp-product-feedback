import { inject, Injectable } from '@angular/core';
import { FeedbacksSlice } from '../../slice';
import { ProductsApiSvc } from '../../api';

@Injectable({
  providedIn: 'root',
})
export class UseProductsKitSvc {
  public readonly productsSlice: FeedbacksSlice = inject(FeedbacksSlice);
  public readonly productsApi: ProductsApiSvc = inject(ProductsApiSvc);
}
