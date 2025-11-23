import { PairValLabelT } from '@/common/types/forms';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FeedLibShape } from '../../lib_shape';
import { UseSearchFeedbacksCtx } from '../../context/use_search_feedbacks_ctx';
import { FilterItem } from './filter_item/filter-item';

@Component({
  selector: 'app-feedbacks-filters',
  imports: [FilterItem],
  templateUrl: './feedbacks-filters.html',
  styleUrl: './feedbacks-filters.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbacksFilters implements OnInit {
  public readonly useSearchCtx: UseSearchFeedbacksCtx = inject(UseSearchFeedbacksCtx);

  // ? static
  public readonly filtersFeedback: PairValLabelT[] = FeedLibShape.categoriesPlusAll();

  public onCatChange(v: string): void {
    this.useSearchCtx.onCatChange(v);
  }

  ngOnInit(): void {
    this.useSearchCtx.setupForm();
  }
}
