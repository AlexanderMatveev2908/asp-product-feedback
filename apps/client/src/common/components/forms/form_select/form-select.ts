import { CheckFieldT, PairValLabelT, PairValLabelTypedT } from '@/common/types/forms';
import { UseFormFieldDir } from '@/core/directives/use_form_field';
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
import { FormHeaderField } from '../form_header_field/form-header-field';
import { Nullable, SvgT } from '@/common/types/etc';
import { SvgStrokeIconArrowDown } from '../../svgs/stroke/icon-arrow-down/icon-arrow-down';
import { NgComponentOutlet } from '@angular/common';
import { UseDropHk } from '@/core/hooks/use_drop';

@Component({
  selector: 'app-form-select',
  imports: [FormHeaderField, NgComponentOutlet],
  templateUrl: './form-select.html',
  styleUrl: './form-select.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UseDropHk],
})
export class FormSelect implements OnInit {
  // ? props
  public readonly f: InputSignal<CheckFieldT> = input.required();

  // ? directives
  public readonly useFormField: UseFormFieldDir = inject(UseFormFieldDir);

  // ? hooks
  public readonly useDrop: UseDropHk = inject(UseDropHk);

  // ? statics
  public readonly Chevron: SvgT = SvgStrokeIconArrowDown;

  // ? derived
  public readonly labelByVal: Signal<Nullable<string>> = computed(
    () =>
      this.f().options.find(
        (el: PairValLabelT | PairValLabelTypedT<unknown>) => el.val === this.useFormField.val?.()
      )?.label ?? null
  );

  ngOnInit(): void {
    this.useFormField.setupState();
    this.useFormField.patchState();
  }
}
