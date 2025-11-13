import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { PageWrapper } from '@/layout/page_wrapper/page-wrapper';
import { BtnApp } from '@/common/components/btns/btn__app/btn-app';
import { MainDrop } from '@/common/components/drop/main_drop/main-drop';
import { Nullable } from '@/common/types/etc';
import { ProductsSlice } from '@/features/products/slice';
import { ProductT } from '@/features/products/etc/types';
import { HomeNoData } from './home_no_data/home-no-data';
import { ProductItem } from './product_item/product-item';

@Component({
  selector: 'app-home',
  imports: [PageWrapper, BtnApp, MainDrop, HomeNoData, ProductItem],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  private readonly productsSLice: ProductsSlice = inject(ProductsSlice);

  public readonly products: Signal<Nullable<ProductT[]>> = this.productsSLice.products;
}
