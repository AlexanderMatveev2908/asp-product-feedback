import { Nullable, SvgT } from '@/common/types/etc';
import { UseNavSvc } from '@/core/services/use_nav/index';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { Params, RouterLink } from '@angular/router';
import { PageWrapper } from '@/layout/page_wrapper/page-wrapper';
import { ProductT } from '@/features/products/etc/types';
import { ProductsSlice } from '@/features/products/slice';
import { UseInjCtxHk } from '@/core/hooks/use_inj_ctx';
import { LibPrs } from '@/core/lib/data_structure/prs/prs';
import { ApiStatusT } from '@/core/store/api/etc/types';
import { SvgStrokeIconArrowLeft } from '@/common/components/svgs/stroke/icon-arrow-left/icon-arrow-left';
import { NgComponentOutlet } from '@angular/common';
import { BtnApp } from '@/common/components/btns/btn__app/btn-app';
import { ProductItem } from '@/features/products/etc/components/product_item/product-item';
import { CommentItem } from './comment_item/comment-item';

@Component({
  selector: 'app-products-read',
  imports: [PageWrapper, NgComponentOutlet, RouterLink, BtnApp, ProductItem, CommentItem],
  templateUrl: './products-read.html',
  styleUrl: './products-read.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsRead extends UseInjCtxHk implements OnInit {
  private readonly useNav: UseNavSvc = inject(UseNavSvc);
  private readonly productsSLice: ProductsSlice = inject(ProductsSlice);

  public readonly item: WritableSignal<Nullable<ProductT>> = signal(null);

  public readonly Chevron: SvgT = SvgStrokeIconArrowLeft;

  ngOnInit(): void {
    const vars: Nullable<Params> = this.useNav.path_variables();
    const productID: Nullable<string> = vars?.['productID'];
    const devID: Nullable<number> = LibPrs.asInt(productID);

    this.useEffect(() => {
      const products: Nullable<ProductT[]> = this.productsSLice.products();
      if (!products) return;

      const found: Nullable<ProductT> =
        products.find((p: ProductT) => (p.id as unknown as number) === devID) ?? null;

      if (!found)
        this.useNav.pushNotice({
          eventT: 'ERR',
          msg: 'Product not found',
          status: ApiStatusT.NOT_FOUND,
          tmpt: 'home',
        });

      this.item.set(found);
    });
  }
}
