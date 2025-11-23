import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FeedbacksFilters } from '@/features/feedbacks/etc/components/feedbacks_filters/feedbacks-filters';
import { FeedbacksRoadmapCounter } from '@/features/feedbacks/etc/components/feedbacks_roadmap_counter/feedbacks-roadmap-counter';

@Component({
  selector: 'app-header-tablet',
  imports: [RouterLink, FeedbacksFilters, FeedbacksRoadmapCounter],
  templateUrl: './header-tablet.html',
  styleUrl: './header-tablet.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderTablet {}
