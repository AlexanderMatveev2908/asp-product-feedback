import { PairValLabelT } from '@/common/types/forms';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FeedLibShape } from '../../lib_shape';
import { UseSearchFeedbacksCtx } from '../../context/use_search_feedbacks_ctx';

@Component({
  selector: 'app-feedbacks-filters',
  imports: [],
  templateUrl: './feedbacks-filters.html',
  styleUrl: './feedbacks-filters.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbacksFilters implements OnInit {
  private readonly useSearchCtx: UseSearchFeedbacksCtx = inject(UseSearchFeedbacksCtx);

  // ? static
  public readonly filtersFeedback: PairValLabelT[] = FeedLibShape.categoriesPlusAll();

  public bgFilter(v: string): string {
    return this.useSearchCtx.isCatChosen(v) ? 'var(--blue__prm)' : 'var(--gray__0)';
  }
  public clrFilter(v: string): string {
    return this.useSearchCtx.isCatChosen(v) ? '#fff' : 'var(--blue__prm)';
  }

  public onCatChange(v: string): void {
    this.useSearchCtx.onCatChange(v);
  }

  ngOnInit(): void {
    this.useSearchCtx.setupForm();
  }
}
