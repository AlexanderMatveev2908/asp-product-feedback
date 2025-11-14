import { TxtFieldT } from '@/common/types/forms';
import { UseInjCtxHk } from '@/core/hooks/use_inj_ctx';
import { ChangeDetectionStrategy, Component, input, InputSignal, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormFieldErr } from '../form_field_err/form-field-err';

@Component({
  selector: 'app-form-field-txt',
  imports: [ReactiveFormsModule, FormFieldErr],
  templateUrl: './form-field-txt.html',
  styleUrl: './form-field-txt.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldTxt extends UseInjCtxHk implements OnInit {
  // ? props
  public readonly f: InputSignal<TxtFieldT> = input.required();
  public readonly onSvgClick: InputSignal<() => void> = input<() => void>(() => null);
  public readonly ctrl: InputSignal<FormControl> = input.required();
  public readonly disabled: InputSignal<boolean> = input(false);

  public readonly additionalSvgTwd: InputSignal<string> = input('');

  ngOnInit(): void {
    this.useEffect(() => {
      const isDisabled: boolean = this.disabled();

      if (isDisabled) this.ctrl().disable();
      else this.ctrl().enable();
    });
  }
}
