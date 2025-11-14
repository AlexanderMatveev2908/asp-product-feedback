import { CheckFieldT, TxtFieldT } from '@/common/types/forms';
import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-form-header-field',
  imports: [],
  templateUrl: './form-header-field.html',
  styleUrl: './form-header-field.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormHeaderField {
  public readonly f: InputSignal<TxtFieldT | CheckFieldT> = input.required();
}
