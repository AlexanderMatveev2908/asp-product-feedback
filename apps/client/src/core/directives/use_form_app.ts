import { Nullable } from '@/common/types/etc';
import { Directive, inject, Signal } from '@angular/core';
import { ContentFormT } from '../paperwork/etc/content_form_mng';
import { UseInjCtxHk } from '../hooks/use_inj_ctx';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup } from '@angular/forms';
import { RootFormMng } from '../paperwork/root_form_mng/root_form_mng';
import { UseApiTrackerHk } from '../store/api/etc/hooks/use_tracker';
import { Observable, tap } from 'rxjs';

@Directive()
export abstract class UseFormAppDir<T> extends UseInjCtxHk {
  public readonly useTrackApi: UseApiTrackerHk = inject(UseApiTrackerHk);

  public abstract form: FormGroup;
  protected abstract resetFormValue: T;

  // ? local state
  public formValue: Nullable<Signal<ContentFormT>> = null;

  // ? listeners
  protected bindFormValue(): void {
    this.inCtx(() => {
      this.formValue = toSignal(this.form.valueChanges, {
        initialValue: this.form.value,
      });
    });
  }

  protected reset(): void {
    RootFormMng.reset(this.form, this.resetFormValue);
  }

  protected submitForm(obs: Observable<unknown>): void {
    if (!this.form.valid) {
      RootFormMng.onSubmitFailed(this.form);
      return;
    }

    this.useTrackApi
      .track(obs)
      .pipe(tap((_: unknown) => this.reset()))
      .subscribe();
  }

  public asFormControl(key: keyof T): FormControl {
    return this.form.get(key as keyof typeof this.form) as FormControl;
  }
}
