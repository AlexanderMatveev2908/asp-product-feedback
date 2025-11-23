import { UseHoverHk } from '@/core/hooks/use_hover';
import { ChangeDetectionStrategy, Component, inject, input, InputSignal } from '@angular/core';
import { UseSearchFeedbacksCtx } from '../../../context/use_search_feedbacks_ctx';
import { PairValLabelT } from '@/common/types/forms';

@Component({
  selector: 'app-filter-item',
  imports: [],
  templateUrl: './filter-item.html',
  styleUrl: './filter-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UseHoverHk],
})
export class FilterItem {
  public readonly searchCtx: InputSignal<UseSearchFeedbacksCtx> = input.required();
  public readonly f: InputSignal<PairValLabelT> = input.required();

  public readonly useHover: UseHoverHk = inject(UseHoverHk);

  public bgFilter(v: string): string {
    return this.searchCtx().isCatChosen(v)
      ? 'var(--blue__prm)'
      : this.useHover.isHover()
      ? '#CFD7FF'
      : 'var(--gray__0)';
  }
  public clrFilter(v: string): string {
    return this.searchCtx().isCatChosen(v) ? '#fff' : 'var(--blue__prm)';
  }
}
