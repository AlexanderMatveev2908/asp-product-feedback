import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { LinkBack } from '@/common/components/links/link_back/link-back';
import { LinkMain } from '@/common/components/links/link_main/link-main';
import { UseMetaAppDir } from '@/core/directives/use_meta_app';
import { PageWrapper } from '@/layout/page_wrapper/page-wrapper';
import { PairValLabelTypedT } from '@/common/types/forms';
import { ProductStatusT, ProductT } from '@/features/products/etc/types';
import { ProductsLibShape } from '@/features/products/etc/lib_shape';
import { ProductsSlice } from '@/features/products/slice';
import { FeedbackItem } from './feedback_item/feedback-item';

@Component({
  selector: 'app-products-roadmap',
  imports: [LinkBack, LinkMain, UseMetaAppDir, PageWrapper, FeedbackItem],
  templateUrl: './products-roadmap.html',
  styleUrl: './products-roadmap.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsRoadmap {
  private readonly productsSlice: ProductsSlice = inject(ProductsSlice);

  public readonly statuses: PairValLabelTypedT<ProductStatusT>[] =
    ProductsLibShape.statusesFilter();

  public readonly filtered: Signal<ProductT[]> = computed(() => {
    const data: ProductT[] = this.productsSlice.products() ?? [];
    return data.filter((p: ProductT) => p);
  });
}
