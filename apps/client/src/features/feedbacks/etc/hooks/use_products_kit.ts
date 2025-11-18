import { inject, Injectable } from '@angular/core';
import { FeedbacksSlice } from '../../slice';
import { ProductsApiSvc } from '../../api';

@Injectable({
  providedIn: 'root',
})
export class UseProductsKitSvc {
  public readonly slice: FeedbacksSlice = inject(FeedbacksSlice);
  public readonly api: ProductsApiSvc = inject(ProductsApiSvc);
}
