import { UseRoadmapCtx } from '@/features/feedbacks/etc/context/use_roadmap_ctx';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

@Component({
  selector: 'app-tablet-road-header',
  imports: [],
  templateUrl: './tablet-road-header.html',
  styleUrl: './tablet-road-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabletRoadHeader {
  public readonly useRoadCtx: UseRoadmapCtx = inject(UseRoadmapCtx);
}
