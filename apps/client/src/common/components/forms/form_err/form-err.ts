import { Nullable } from '@/common/types/etc';
import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-form-err',
  imports: [],
  templateUrl: './form-err.html',
  styleUrl: './form-err.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormErr {
  public readonly errMsg: InputSignal<Nullable<string>> = input.required();
}
