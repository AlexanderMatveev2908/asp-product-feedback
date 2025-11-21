/* eslint-disable no-magic-numbers */
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  InputSignal,
  OnInit,
  Signal,
} from '@angular/core';
import { BtnMain } from '@/common/components/btns/btn__main/btn-main';
import { UseMetaAppDir } from '@/core/directives/use_meta_app';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommentFormMng, CommentFormT } from './etc/form_mng';
import { TxtFieldT } from '@/common/types/forms';
import { CommentFormUiFkt } from './etc/ui_fkt';
import { FormFieldTxt } from '@/common/components/forms/form_field_txt/form-field-txt';
import { UseFormFieldDir } from '@/core/directives/use_form_field';
import { Nullable, OrNone } from '@/common/types/etc';
import { UseInjCtxHk } from '@/core/hooks/use_inj_ctx';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable, tap } from 'rxjs';
import { RootFormMng } from '@/core/paperwork/root_form_mng/root_form_mng';
import { UseApiTrackerHk } from '@/core/store/api/etc/hooks/use_tracker';

@Component({
  selector: 'app-comment-form',
  imports: [BtnMain, UseMetaAppDir, FormFieldTxt, UseFormFieldDir, ReactiveFormsModule],
  templateUrl: './comment-form.html',
  styleUrl: './comment-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UseApiTrackerHk],
})
export class CommentForm extends UseInjCtxHk implements OnInit {
  // ? props
  public readonly strategy: InputSignal<(data: CommentFormT) => Observable<unknown>> =
    input.required();

  // ? hooks
  public readonly useTrackApi: UseApiTrackerHk = inject(UseApiTrackerHk);

  // ? statics
  public readonly form: FormGroup = CommentFormMng.form();
  public readonly field: TxtFieldT = CommentFormUiFkt.field();
  public readonly maxLength: number = 250;

  // ? helpers
  public readonly ctrl: FormControl = this.form.get('content') as FormControl;

  // ? local state
  public formValue: Nullable<Signal<CommentFormT>> = null;

  // ? listeners
  public onSubmit(): void {
    if (!this.form.valid) {
      RootFormMng.onSubmitFailed(this.form);
      return;
    }

    this.useTrackApi
      .track(this.strategy()(this.form.value))
      .pipe(
        tap((_: unknown) => {
          RootFormMng.reset(this.form, CommentFormMng.defFormData());
        })
      )
      .subscribe();
  }

  // ? derived
  public readonly charsLeft: Signal<number> = computed(() => {
    const data: OrNone<CommentFormT> = this.formValue?.();
    if (!data) return 250;

    return Math.max(0, this.maxLength - data.content.length);
  });

  // ? ng lifecycle
  ngOnInit(): void {
    this.inCtx(() => {
      this.formValue = toSignal(this.form.valueChanges, {
        initialValue: this.form.value,
      });
    });
  }
}
