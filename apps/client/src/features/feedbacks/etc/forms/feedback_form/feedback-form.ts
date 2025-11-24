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
import { FeedbackFormMng, FeedFormPostT, FeedFormPutT, FormKeyT } from './etc/form_mng';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UseFormFieldDir } from '@/core/directives/use_form_field';
import { FormSelect } from '@/common/components/forms/form_select/form-select';
import { RootFormMng } from '@/core/paperwork/root_form_mng/root_form_mng';
import { Observable, tap } from 'rxjs';
import { UseApiTrackerHk } from '@/core/store/api/etc/hooks/use_tracker';
import { FeedbackT } from '../../types';
import { UseInjCtxHk } from '@/core/hooks/use_inj_ctx';
import { ErrApp } from '@/core/lib/etc/err';
import { FeedbackFormTokens } from './etc/tokens';
import { FeedbackFormMobileFooter } from './etc/components/mobile/feedback_form_mobile_footer/feedback-form-mobile-footer';
import { FeedbackFormTabletFooter } from './etc/components/tablet/feedback_form_tablet_footer/feedback-form-tablet-footer';

@Component({
  selector: 'app-feedback-form',
  imports: [
    ReactiveFormsModule,
    NgComponentOutlet,
    FormFieldTxt,
    UseFormFieldDir,
    FormSelect,
    FeedbackFormMobileFooter,
    FeedbackFormTabletFooter,
  ],
  templateUrl: './feedback-form.html',
  styleUrl: './feedback-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: FeedbackFormTokens.FORM_TRACKER, useClass: UseApiTrackerHk },
    { provide: FeedbackFormTokens.DEL_TRACKER, useClass: UseApiTrackerHk },
  ],
})
export class FeedbackForm extends UseInjCtxHk implements OnInit {
  // ? props
  public readonly strategy: InputSignal<(data: FeedFormPostT) => Observable<unknown>> =
    input.required();
  public readonly existingItem: InputSignal<Nullable<FeedbackT>> = input<Nullable<FeedbackT>>(null);
  public readonly delStrategy: InputSignal<Nullable<() => Observable<unknown>>> =
    input<Nullable<() => Observable<unknown>>>(null);

  // ? svc
  private readonly useNav: UseNavSvc = inject(UseNavSvc);

  // ? hooks
  public readonly useTrackFormPending: UseApiTrackerHk = inject(FeedbackFormTokens.FORM_TRACKER);
  public readonly useTrackDelPending: UseApiTrackerHk = inject(FeedbackFormTokens.DEL_TRACKER);

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

  public readonly preFilledData: Signal<FeedFormPutT> = computed(() => {
    const found: Nullable<FeedbackT> = this.existingItem();
    return {
      title: found?.title ?? '',
      category: found?.category ?? '',
      status: found?.status ?? '',
      content: found?.description ?? '',
    };
  });

  // ? helpers
  public asFormControl(formKey: FormKeyT): FormControl {
    return this.currForm().get(formKey) as FormControl;
  }

  // | === listeners ===
  // ? form related
  public onSubmit(): void {
    if (!this.currForm().valid) {
      RootFormMng.onSubmitFailed(this.currForm());
      return;
    }

    this.useTrackFormPending
      .track(this.strategy()(this.currForm().value))
      .pipe(tap((_: unknown) => this.resetEmpty()))
      .subscribe();
  }

  public resetEmpty: () => void = () => {
    RootFormMng.reset(
      this.currForm(),
      this.isFormTypePost() ? FeedbackFormMng.defPostForm() : FeedbackFormMng.defPutForm()
    );
  };

  public resetPreFilled: () => void = () =>
    this.isFormTypePost()
      ? RootFormMng.reset(this.currForm(), FeedbackFormMng.defPostForm())
      : RootFormMng.reset(this.currForm(), this.preFilledData());

  // ? deleting
  public readonly delFeed: () => void = () => {
    const strategy: Nullable<() => Observable<unknown>> = this.delStrategy();
    if (!strategy) throw new ErrApp('expected a callable');

    this.useTrackDelPending.track(strategy()).subscribe();
  };

  // ? ng lifecycle
  ngOnInit(): void {
    this.useEffect(() => {
      const found: Nullable<FeedbackT> = this.existingItem();
      if (!found) return;

      this.currForm().patchValue(this.preFilledData());
    });
  }
}
