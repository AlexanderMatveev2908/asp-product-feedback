import { TxtFieldT } from '@/common/types/forms';
import { UseInjCtxHk } from '@/core/hooks/use_inj_ctx';
import {
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

@Component({
  selector: 'app-form-field-txt',
  imports: [ReactiveFormsModule, FormHeaderField],
  templateUrl: './form-field-txt.html',
  styleUrl: './form-field-txt.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UseFocusHk],
})
export class FormFieldTxt extends UseInjCtxHk implements OnInit {
  // ? props
  public readonly f: InputSignal<TxtFieldT> = input.required();

  // ? hooks
  public readonly useFocus: UseFocusHk = inject(UseFocusHk);

  // ? directives
  public readonly useFormField: UseFormFieldDir = inject(UseFormFieldDir);

  ngOnInit(): void {
    this.useFormField.setupState();
    this.useFormField.patchState();
  }
}
