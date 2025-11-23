import { ChangeDetectionStrategy, Component, inject, input, InputSignal } from '@angular/core';
import { UseRoadmapCtx } from '../../context/use_roadmap_ctx';
import { RouterLink } from '@angular/router';
import { Nullable } from '@/common/types/etc';

@Component({
  selector: 'app-feedbacks-roadmap-counter',
  imports: [RouterLink],
  templateUrl: './feedbacks-roadmap-counter.html',
  styleUrl: './feedbacks-roadmap-counter.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbacksRoadmapCounter {
  public readonly closeOnNav: InputSignal<Nullable<() => void>> = input<Nullable<() => void>>(null);

  public readonly useRoadCtx: UseRoadmapCtx = inject(UseRoadmapCtx);
}
