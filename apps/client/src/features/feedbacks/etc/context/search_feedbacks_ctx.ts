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

  public onCatChange(v: string): void {
    // ? form is setup in nInit
    // ? if it is undefined means is too early to click stuff in page
    // ? so just wait and leave angular do with calm his job
    const existing: OrNone<string[]> = this.formData?.()?.category;
    if (!existing) return;

    if (v === 'ALL') {
      this.form.patchValue({ category: ['ALL'] });
      return;
    }

    if (existing.some((str: string) => str === v)) {
      const filtered: string[] = existing.filter((str: string) => str !== v);
      this.form.patchValue({
        category: !filtered.length ? ['ALL'] : filtered,
      });
    } else {
      this.form.patchValue({
        category: [...existing.filter((str: string) => str !== 'ALL'), v],
      });
    }

    this.form.updateValueAndValidity();
  }

  public setupForm(): void {
    this.inCtx(() => {
      this.formData = toSignal(this.form.valueChanges, {
        initialValue: this.form.value,
      });
    });
  }
}
