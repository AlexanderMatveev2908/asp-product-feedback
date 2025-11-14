import { TxtFieldT } from '@/common/types/forms';
import { UseInjCtxHk } from '@/core/hooks/use_inj_ctx';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  InputSignal,
  OnInit,
} from '@angular/core';
import { UseFocusHk } from '@/core/hooks/use_focus';
import { FormHeaderField } from '../form_header_field/form-header-field';
import { UseFormFieldDir } from '@/core/directives/use_form_field';
import { ReactiveFormsModule } from '@angular/forms';
import { FormErr } from '../form_err/form-err';
import { FocusDom } from '@/core/lib/dom/focus';

@Component({
  selector: 'app-form-field-txt',
  imports: [ReactiveFormsModule, FormHeaderField, FormErr],
  templateUrl: './form-field-txt.html',
  styleUrl: './form-field-txt.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UseFocusHk],
})
export class FormFieldTxt extends UseInjCtxHk implements OnInit, AfterViewInit {
  // ? props
  public readonly f: InputSignal<TxtFieldT> = input.required();
  public readonly focusOnMount: InputSignal<boolean> = input(false);

  // ? hooks
  public readonly useFocus: UseFocusHk = inject(UseFocusHk);

  // ? directives
  public readonly useFormField: UseFormFieldDir = inject(UseFormFieldDir);

  ngOnInit(): void {
    this.useFormField.setupState();
    this.useFormField.patchState();
  }

  ngAfterViewInit(): void {
    this.useDOM(() => {
      if (!this.focusOnMount()) return;

      FocusDom.focusByDataField(this.f().field);
    });
  }
}
