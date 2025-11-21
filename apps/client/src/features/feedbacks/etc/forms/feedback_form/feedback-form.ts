import { SvgAdvIconEditFeedback } from '@/common/components/svgs/advanced/icon-edit-feedback/icon-edit-feedback';
import { SvgAdvIconNewFeedback } from '@/common/components/svgs/advanced/icon-new-feedback/icon-new-feedback';
import { Nullable, SvgT } from '@/common/types/etc';
import { UseNavSvc } from '@/core/services/use_nav';
import { NgComponentOutlet } from '@angular/common';
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
import { FeedbackFormFields, FeedbackFormUiFkt } from './etc/ui_fkt';
import { FormFieldTxt } from '@/common/components/forms/form_field_txt/form-field-txt';
import { FeedbackFormMng, FeedFormPostT, FormKeyT } from './etc/form_mng';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UseFormFieldDir } from '@/core/directives/use_form_field';
import { FormSelect } from '@/common/components/forms/form_select/form-select';
import { BtnMain } from '@/common/components/btns/btn__main/btn-main';
import { UseMetaAppDir } from '@/core/directives/use_meta_app';
import { RootFormMng } from '@/core/paperwork/root_form_mng/root_form_mng';
import { Observable, tap } from 'rxjs';
import { UseApiTrackerHk } from '@/core/store/api/etc/hooks/use_tracker';
import { FeedbackT } from '../../types';
import { UseInjCtxHk } from '@/core/hooks/use_inj_ctx';

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
  providers: [UseApiTrackerHk],
})
export class FeedbackForm extends UseInjCtxHk implements OnInit {
  // ? props
  public readonly strategy: InputSignal<(data: FeedFormPostT) => Observable<unknown>> =
    input.required();
  public readonly existingItem: InputSignal<Nullable<FeedbackT>> = input<Nullable<FeedbackT>>(null);

  // ? svc
  private readonly useNav: UseNavSvc = inject(UseNavSvc);

  // ? hooks
  public readonly useApiTrack: UseApiTrackerHk = inject(UseApiTrackerHk);

  // ? derived
  public readonly isFormTypePost: Signal<boolean> = computed(
    () => !!this.useNav.currPath()?.includes('post')
  );
  public readonly currSVG: Signal<SvgT> = computed(() =>
    this.isFormTypePost() ? SvgAdvIconNewFeedback : SvgAdvIconEditFeedback
  );
  public readonly currTitle: Signal<string> = computed(() =>
    this.isFormTypePost() ? 'Create New Feedback' : `Editing '${this.existingItem()?.title}'`
  );

  public readonly fields: FeedbackFormFields = FeedbackFormUiFkt.formFields();
  public readonly currForm: Signal<FormGroup> = computed(() =>
    this.isFormTypePost() ? FeedbackFormMng.formPost() : FeedbackFormMng.formPut()
  );

  // ? helpers
  public asFormControl(formKey: FormKeyT): FormControl {
    return this.currForm().get(formKey) as FormControl;
  }

  // ? listeners
  public onSubmit(): void {
    if (!this.currForm().valid) {
      RootFormMng.onSubmitFailed(this.currForm());
      return;
    }

    this.useApiTrack
      .track(this.strategy()(this.currForm().value))
      .pipe(tap((_: unknown) => this.reset()))
      .subscribe();
  }

  public reset: () => void = () => {
    RootFormMng.reset(this.currForm(), FeedbackFormMng.defPostForm());
  };

  ngOnInit(): void {
    this.useEffect(() => {
      const found: Nullable<FeedbackT> = this.existingItem();
      if (!found) return;
    });
  }
}
