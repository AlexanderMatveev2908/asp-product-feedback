import { computed, Injectable, Signal } from '@angular/core';
import { ProductsStateT } from './reducer/reducer';
import { getProductsState } from './reducer/selectors';
import { ProductsActT } from './reducer/actions';
import { UseKitSliceSvc } from '@/core/services/use_kit_slice';
import { ProductT } from './etc/types';
import { Nullable } from '@/common/types/etc';

@Injectable({
  providedIn: 'root',
})
export class ProductsSlice extends UseKitSliceSvc {
  public get productsState(): Signal<ProductsStateT> {
    return this.store.selectSignal(getProductsState);
  }

  public setProducts(products: ProductT[]): void {
    this.store.dispatch(ProductsActT.SET_PRODUCTS({ products }));
  }
  public products: Signal<Nullable<ProductT[]>> = computed(() => this.productsState().products);

  public reset(): void {
    this.store.dispatch(ProductsActT.RESET__PRODUCTS_STATE());
  }
}
