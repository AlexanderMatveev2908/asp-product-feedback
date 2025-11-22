import { TxtFieldT } from '@/common/types/forms';
import { UseFormAppDir } from '@/core/directives/use_form_app';
import { ContentFormMng, ContentFormT } from '@/core/paperwork/etc/content_form_mng';
import { CommentFormUiFkt } from '@/core/ui_fkt/etc/content_ui_fkt';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  InputSignal,
  OnInit,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormFieldTxt } from '@/common/components/forms/form_field_txt/form-field-txt';
import { UseFormFieldDir } from '@/core/directives/use_form_field';
import { UseApiTrackerHk } from '@/core/store/api/etc/hooks/use_tracker';
import { BtnMain } from '@/common/components/btns/btn__main/btn-main';
import { UseMetaAppDir } from '@/core/directives/use_meta_app';
import { UseReplySvc } from '../../services/use_reply';
import { finalize } from 'rxjs';
import { FocusDom } from '@/core/lib/dom/focus';

@Component({
  selector: 'app-reply-form',
  imports: [ReactiveFormsModule, FormFieldTxt, UseFormFieldDir, BtnMain, UseMetaAppDir],
  templateUrl: './reply-form.html',
  styleUrl: './reply-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UseApiTrackerHk],
})
export class ReplyForm extends UseFormAppDir<ContentFormT> implements OnInit {
  public readonly formShown: InputSignal<boolean> = input.required();
  public readonly commentId: InputSignal<string> = input.required();
  public readonly replyingToId: InputSignal<string> = input.required();
  public readonly hideForm: InputSignal<() => void> = input.required();

  private readonly useReply: UseReplySvc = inject(UseReplySvc);

  // ? statics
  public readonly form: FormGroup = ContentFormMng.form();
  protected resetFormValue: ContentFormT = ContentFormMng.defFormData();
  public readonly field: TxtFieldT = CommentFormUiFkt.field();

  // ? listeners
  public onSubmit(): void {
    this.submitForm(
      this.useReply
        .main(this.form.value, {
          commentId: this.commentId(),
          replyingToId: this.replyingToId(),
        })
        .pipe(finalize(() => this.hideForm()()))
    );
  }

  // ? ng lifecycle
  ngOnInit(): void {
    this.bindFormValue();

    this.useEffect(() => {
      const formShown: boolean = this.formShown();
      if (!formShown) {
        this.reset();
        return;
      }

      FocusDom.focusByDataField('content');
    });
  }
}
