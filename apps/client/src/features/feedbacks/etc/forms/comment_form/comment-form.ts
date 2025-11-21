import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BtnMain } from '@/common/components/btns/btn__main/btn-main';
import { UseMetaAppDir } from '@/core/directives/use_meta_app';
import { FormControl, FormGroup } from '@angular/forms';
import { CommentFormMng } from './etc/form_mng';
import { TxtFieldT } from '@/common/types/forms';
import { CommentFormUiFkt } from './etc/ui_fkt';
import { FormFieldTxt } from '@/common/components/forms/form_field_txt/form-field-txt';
import { UseFormFieldDir } from '@/core/directives/use_form_field';

@Component({
  selector: 'app-comment-form',
  imports: [BtnMain, UseMetaAppDir, FormFieldTxt, UseFormFieldDir],
  templateUrl: './comment-form.html',
  styleUrl: './comment-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentForm {
  public readonly form: FormGroup = CommentFormMng.form();
  public readonly field: TxtFieldT = CommentFormUiFkt.field();

  // ? helpers
  public readonly ctrl: FormControl = this.form.get('content') as FormControl;
}
