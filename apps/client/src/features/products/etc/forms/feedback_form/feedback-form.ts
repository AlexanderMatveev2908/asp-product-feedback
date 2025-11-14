import { SvgAdvIconEditFeedback } from '@/common/components/svgs/advanced/icon-edit-feedback/icon-edit-feedback';
import { SvgAdvIconNewFeedback } from '@/common/components/svgs/advanced/icon-new-feedback/icon-new-feedback';
import { SvgT } from '@/common/types/etc';
import { UseNavSvc } from '@/core/services/use_nav';
import { NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { FeedbackFormFields, FeedbackFormUiFkt } from './etc/ui_fkt';
import { FormFieldTxt } from '@/common/components/forms/form_field_txt/form-field-txt';
import { FeedbackFormMng, FormKeyT } from './etc/form_mng';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UseFormFieldDir } from '@/core/directives/use_form_field';
import { FormSelect } from '@/common/components/forms/form_select/form-select';
import { BtnMain } from '@/common/components/btns/btn__main/btn-main';
import { UseMetaAppDir } from '@/core/directives/use_meta_app';
import { RootFormMng } from '@/core/paperwork/root_form_mng/root_form_mng';
import { LibLog } from '@/core/lib/dev/log';

@Component({
  selector: 'app-feedback-form',
  imports: [
    ReactiveFormsModule,
    NgComponentOutlet,
    FormFieldTxt,
    UseFormFieldDir,
    FormSelect,
    BtnMain,
    UseMetaAppDir,
  ],
  templateUrl: './feedback-form.html',
  styleUrl: './feedback-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackForm {
  private readonly useNav: UseNavSvc = inject(UseNavSvc);

  public readonly isFormTypePost: Signal<boolean> = computed(
    () => !!this.useNav.currPath()?.includes('post')
  );
  public readonly currSVG: Signal<SvgT> = computed(() =>
    this.isFormTypePost() ? SvgAdvIconNewFeedback : SvgAdvIconEditFeedback
  );
  public readonly currTitle: Signal<string> = computed(() =>
    this.isFormTypePost() ? 'Create New Feedback' : 'Editing ...'
  );

  public readonly fields: FeedbackFormFields = FeedbackFormUiFkt.formFields();
  public readonly formPost: FormGroup = FeedbackFormMng.formPost;

  public asFormControl(formKey: FormKeyT): FormControl {
    return this.formPost.get(formKey) as FormControl;
  }

  public onSubmit(): void {
    if (!this.formPost.valid) {
      RootFormMng.onSubmitFailed(this.formPost);
      return;
    }

    LibLog.logTtl('✅ ok', this.formPost.value);
  }
}
