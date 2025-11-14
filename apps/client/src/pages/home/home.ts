import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { PageWrapper } from '@/layout/page_wrapper/page-wrapper';
import { MainDrop } from '@/common/components/drop/main_drop/main-drop';
import { Nullable } from '@/common/types/etc';
import { ProductsSlice } from '@/features/products/slice';
import { ProductT } from '@/features/products/etc/types';
import { HomeNoData } from './home_no_data/home-no-data';
import { ProductItem } from '../../features/products/etc/components/product_item/product-item';
import { NavbarHomeMobile } from '@/layout/navbar_home_mobile/navbar-home-mobile';
import { SidebarMobile } from '@/layout/sidebar_mobile/sidebar-mobile';
import { UseMetaAppDir } from '@/core/directives/use_meta_app';
import { LinkMain } from '@/common/components/links/link_main/link-main';

@Component({
  selector: 'app-home',
  imports: [
    PageWrapper,
    MainDrop,
    HomeNoData,
    ProductItem,
    NavbarHomeMobile,
    SidebarMobile,
    UseMetaAppDir,
    LinkMain,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  private readonly productsSLice: ProductsSlice = inject(ProductsSlice);

  public readonly products: Signal<Nullable<ProductT[]>> = this.productsSLice.products;
}
