import { Injectable, Signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SearchFeedbacksFormMng, SearchFeedbacksFormT } from '../forms/search_feedbacks/form_mng';
import { UseInjCtxHk } from '@/core/hooks/use_inj_ctx';
import { Nullable, OrNone } from '@/common/types/etc';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class SearchFeedbacksCtx extends UseInjCtxHk {
  public readonly form: FormGroup = SearchFeedbacksFormMng.form;

  public formData: Nullable<Signal<SearchFeedbacksFormT>> = null;

  public isCatChosen(v: string): boolean {
    const filters: OrNone<string[]> = this.formData?.()?.category;
    if (!filters) return false;

    return filters.some((str: string) => str === v);
  }

  public setupForm(): void {
    this.inCtx(() => {
      this.formData = toSignal(this.form.valueChanges, {
        initialValue: this.form.value,
      });
    });
  }
}
