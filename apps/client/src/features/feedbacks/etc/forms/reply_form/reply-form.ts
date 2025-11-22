import { TxtFieldT } from '@/common/types/forms';
import { ContentFormMng } from '@/core/paperwork/etc/content_form_mng';
import { CommentFormUiFkt } from '@/core/ui_fkt/etc/content_ui_fkt';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-reply-form',
  imports: [ReactiveFormsModule],
  templateUrl: './reply-form.html',
  styleUrl: './reply-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReplyForm {
  // ? statics
  public readonly form: FormGroup = ContentFormMng.form();
  public readonly field: TxtFieldT = CommentFormUiFkt.field();
}
