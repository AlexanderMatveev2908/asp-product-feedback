import { ErrApp } from '@/core/lib/etc/err';
import { UseRoadmapCtx } from '@/features/feedbacks/etc/context/use_roadmap_ctx';
import { FeedLibShape } from '@/features/feedbacks/etc/lib_shape';
import { FeedbackStatusT } from '@/features/feedbacks/etc/types';
import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';

@Component({
  selector: 'app-mobile-road-header',
  imports: [NgClass],
  templateUrl: './mobile-road-header.html',
  styleUrl: './mobile-road-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileRoadHeader {
  public readonly useRoadCtx: UseRoadmapCtx = inject(UseRoadmapCtx);

  public bgHeaderLine(): string {
    const clr: string = FeedLibShape.clrByStatus(this.useRoadCtx.currStatus());
    return clr;
  }

  public twdLabel(v: FeedbackStatusT): string {
    return this.useRoadCtx.currStatus() === v ? 'opacity-1' : 'opacity-[0.4]';
  }

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
}
