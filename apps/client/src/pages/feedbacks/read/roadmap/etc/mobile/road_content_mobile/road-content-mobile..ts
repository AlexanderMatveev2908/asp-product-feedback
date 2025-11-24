import { UseRoadmapCtx } from '@/features/feedbacks/etc/context/use_roadmap_ctx';
import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { FeedbackBase } from '@/features/feedbacks/etc/components/feedback_item/feedback_base/feedback-base';
import { FeedLibShape } from '@/features/feedbacks/etc/lib_shape';

@Component({
  selector: 'app-road-content-mobile.',
  imports: [FeedbackBase],
  templateUrl: './road-content-mobile.html',
  styleUrl: './road-content-mobile.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoadContentMobile {
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
