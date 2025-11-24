import { UseRoadmapCtx } from '@/features/feedbacks/etc/context/use_roadmap_ctx';
import { FeedLibShape, FilterRoadmapT } from '@/features/feedbacks/etc/lib_shape';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ColumnFeedbacks } from './column_feedbacks/column-feedbacks';

@Component({
  selector: 'app-road-content-tablet',
  imports: [ColumnFeedbacks],
  templateUrl: './road-content-tablet.html',
  styleUrl: './road-content-tablet.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoadContentTablet {
  public readonly useRoadCtx: UseRoadmapCtx = inject(UseRoadmapCtx);

  public readonly statuses: FilterRoadmapT[] = FeedLibShape.statusesAsFilters();
}
