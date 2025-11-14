import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { LinkBack } from '@/common/components/links/link_back/link-back';
import { LinkMain } from '@/common/components/links/link_main/link-main';
import { UseMetaAppDir } from '@/core/directives/use_meta_app';
import { PageWrapper } from '@/layout/page_wrapper/page-wrapper';
import { PairValLabelTypedT } from '@/common/types/forms';
import { FeedbackStatusT, FeedbackT } from '@/features/feedbacks/etc/types';
import { ProductsLibShape } from '@/features/feedbacks/etc/lib_shape';
import { FeedbacksSlice } from '@/features/feedbacks/slice';
import { FeedbackItem } from './feedback_item/feedback-item';

@Component({
  selector: 'app-products-roadmap',
  imports: [LinkBack, LinkMain, UseMetaAppDir, PageWrapper, FeedbackItem],
  templateUrl: './products-roadmap.html',
  styleUrl: './products-roadmap.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsRoadmap {
  private readonly productsSlice: FeedbacksSlice = inject(FeedbacksSlice);

  public readonly statuses: PairValLabelTypedT<FeedbackStatusT>[] =
    ProductsLibShape.statusesFilter();

  public readonly filtered: Signal<FeedbackT[]> = computed(() => {
    const data: FeedbackT[] = this.productsSlice.feedbacks() ?? [];
    return data.filter((p: FeedbackT) => p);
  });
}
