import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FeedbacksFilters } from '@/features/feedbacks/etc/components/feedbacks_filters/feedbacks-filters';
import { FeedbacksRoadmapCounter } from '@/features/feedbacks/etc/components/feedbacks_roadmap_counter/feedbacks-roadmap-counter';

@Component({
  selector: 'app-sidebar-desktop',
  imports: [RouterLink, FeedbacksFilters, FeedbacksRoadmapCounter],
  templateUrl: './sidebar-desktop.html',
  styleUrl: './sidebar-desktop.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarDesktop {}
