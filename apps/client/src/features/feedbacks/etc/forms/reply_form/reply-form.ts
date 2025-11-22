import { TxtFieldT } from '@/common/types/forms';
import { UseFormAppDir } from '@/core/directives/use_form_app';
import { ContentFormMng, ContentFormT } from '@/core/paperwork/etc/content_form_mng';
import { CommentFormUiFkt } from '@/core/ui_fkt/etc/content_ui_fkt';
import { ChangeDetectionStrategy, Component, input, InputSignal, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { FormFieldTxt } from '@/common/components/forms/form_field_txt/form-field-txt';
import { UseFormFieldDir } from '@/core/directives/use_form_field';
import { UseApiTrackerHk } from '@/core/store/api/etc/hooks/use_tracker';
import { BtnMain } from '@/common/components/btns/btn__main/btn-main';
import { UseMetaAppDir } from '@/core/directives/use_meta_app';

@Component({
  selector: 'app-reply-form',
  imports: [ReactiveFormsModule, FormFieldTxt, UseFormFieldDir, BtnMain, UseMetaAppDir],
  templateUrl: './reply-form.html',
  styleUrl: './reply-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UseApiTrackerHk],
})
export class ReplyForm extends UseFormAppDir<ContentFormT> implements OnInit {
  public readonly strategy: InputSignal<(data: ContentFormT) => Observable<unknown>> =
    input.required();

  // ? statics
  public readonly form: FormGroup = ContentFormMng.form();
  protected resetFormValue: ContentFormT = ContentFormMng.defFormData();
  public readonly field: TxtFieldT = CommentFormUiFkt.field();

  // ? listeners
  public onSubmit(): void {
    this.submitForm(this.strategy()(this.form.value));
  }

  // ? ng lifecycle
  ngOnInit(): void {
    this.bindFormValue();
  }
}
