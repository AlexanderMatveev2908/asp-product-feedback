import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { LinkBack } from '@/common/components/links/link_back/link-back';
import { LinkMain } from '@/common/components/links/link_main/link-main';
import { UseMetaAppDir } from '@/core/directives/use_meta_app';
import { PageWrapper } from '@/layout/page_wrapper/page-wrapper';
import { FeedLibShape } from '@/features/feedbacks/etc/lib_shape';
import { UseRoadmapCtx } from '@/features/feedbacks/etc/context/use_roadmap_ctx';
import { FeedbackBase } from '@/features/feedbacks/etc/components/feedback_item/feedback_base/feedback-base';
import { MobileRoadHeader } from './etc/mobile_road_header/mobile-road-header';

@Component({
  selector: 'app-feedbacks-roadmap',
  imports: [LinkBack, LinkMain, UseMetaAppDir, PageWrapper, FeedbackBase, MobileRoadHeader],
  templateUrl: './feedbacks-roadmap.html',
  styleUrl: './feedbacks-roadmap.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbacksRoadmap {
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
}
