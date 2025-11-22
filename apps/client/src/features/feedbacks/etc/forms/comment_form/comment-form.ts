/* eslint-disable no-magic-numbers */
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
  OnInit,
  Signal,
} from '@angular/core';
import { BtnMain } from '@/common/components/btns/btn__main/btn-main';
import { UseMetaAppDir } from '@/core/directives/use_meta_app';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ContentFormMng, ContentFormT } from '../../../../../core/paperwork/etc/content_form_mng';
import { TxtFieldT } from '@/common/types/forms';
import { CommentFormUiFkt } from '../../../../../core/ui_fkt/etc/content_ui_fkt';
import { FormFieldTxt } from '@/common/components/forms/form_field_txt/form-field-txt';
import { UseFormFieldDir } from '@/core/directives/use_form_field';
import { OrNone } from '@/common/types/etc';
import { UseApiTrackerHk } from '@/core/store/api/etc/hooks/use_tracker';
import { UseFormAppDir } from '@/core/directives/use_form_app';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-comment-form',
  imports: [BtnMain, UseMetaAppDir, FormFieldTxt, UseFormFieldDir, ReactiveFormsModule],
  templateUrl: './comment-form.html',
  styleUrl: './comment-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UseApiTrackerHk],
})
export class CommentForm extends UseFormAppDir<ContentFormT> implements OnInit {
  // ? props
  public readonly strategy: InputSignal<(data: ContentFormT) => Observable<unknown>> =
    input.required();

  // ? statics
  public readonly form: FormGroup = ContentFormMng.form();
  protected resetFormValue: ContentFormT = ContentFormMng.defFormData();
  public readonly field: TxtFieldT = CommentFormUiFkt.field();
  public readonly maxLength: number = 250;

  // ? listeners
  public onSubmit(): void {
    this.submitForm(this.strategy()(this.form.value));
  }

  // ? derived
  public readonly charsLeft: Signal<number> = computed(() => {
    const data: OrNone<ContentFormT> = this.formValue?.();
    if (!data) return 250;

    return Math.max(0, this.maxLength - data.content.length);
  });

  // ? ng lifecycle
  ngOnInit(): void {
    this.bindFormValue();
  }
}
