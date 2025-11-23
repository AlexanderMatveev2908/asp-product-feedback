import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FeedbacksFilters } from '@/features/feedbacks/etc/components/feedbacks_filters/feedbacks-filters';

@Component({
  selector: 'app-header-tablet',
  imports: [RouterLink, FeedbacksFilters],
  templateUrl: './header-tablet.html',
  styleUrl: './header-tablet.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderTablet {}
