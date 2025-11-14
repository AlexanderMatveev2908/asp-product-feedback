import { TxtFieldT } from '@/common/types/forms';
import { UseInjCtxHk } from '@/core/hooks/use_inj_ctx';
import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-field-txt',
  imports: [ReactiveFormsModule],
  templateUrl: './form-field-txt.html',
  styleUrl: './form-field-txt.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldTxt extends UseInjCtxHk {
  // ? props
  public readonly f: InputSignal<TxtFieldT> = input.required();
  public readonly ctrl: InputSignal<FormControl> = input.required();
}
