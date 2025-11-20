import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { LinkBack } from '@/common/components/links/link_back/link-back';
import { LinkMain } from '@/common/components/links/link_main/link-main';
import { UseMetaAppDir } from '@/core/directives/use_meta_app';
import { PageWrapper } from '@/layout/page_wrapper/page-wrapper';
import { FeedbackStatusT } from '@/features/feedbacks/etc/types';
import { FeedLibShape } from '@/features/feedbacks/etc/lib_shape';
import { FeedbackItem } from '../../../../features/feedbacks/etc/components/feedback_item/feedback-item';
import { ErrApp } from '@/core/lib/etc/err';
import { NgClass } from '@angular/common';
import { UseRoadmapCtx } from '@/features/feedbacks/etc/context/use_roadmap_ctx';

@Component({
  selector: 'app-products-roadmap',
  imports: [LinkBack, LinkMain, UseMetaAppDir, PageWrapper, FeedbackItem, NgClass],
  templateUrl: './products-roadmap.html',
  styleUrl: './products-roadmap.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsRoadmap {
  public readonly useRoadCtx: UseRoadmapCtx = inject(UseRoadmapCtx);

  // ? derived
  public readonly currLabel: Signal<string> = computed(
    () =>
      FeedLibShape.statusLabelByVal(this.useRoadCtx.currStatus()) +
      ` (${this.useRoadCtx.countOf(this.useRoadCtx.currStatus())})`
  );
  public readonly currDescription: Signal<string> = computed(() =>
    FeedLibShape.descriptionStatusByVal(this.useRoadCtx.currStatus())
  );

  public readonly twdHeaderLine: Signal<string> = computed(() => {
    switch (this.useRoadCtx.currStatus()) {
      case FeedbackStatusT.PLANNED:
        return 'translate-x-0';
      case FeedbackStatusT.IN_PROGRESS:
        return 'translate-x-full';
      case FeedbackStatusT.LIVE:
        return 'translate-x-[200%]';
      case FeedbackStatusT.SUGGESTION:
        throw new ErrApp('suggestion should not be available as status');
      default:
        throw new ErrApp('invalid status type');
    }
  });

  public bgHeaderLine(): string {
    const clr: string = FeedLibShape.clrByStatus(this.useRoadCtx.currStatus());
    return clr;
  }

  public twdLabel(v: FeedbackStatusT): string {
    return this.useRoadCtx.currStatus() === v ? 'opacity-1' : 'opacity-[0.4]';
  }
}
