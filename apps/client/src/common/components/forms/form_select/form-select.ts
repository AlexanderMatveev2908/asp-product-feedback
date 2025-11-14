import { CheckFieldT, PairValLabelT, PairValLabelTypedT } from '@/common/types/forms';
import { UseFormFieldDir } from '@/core/directives/use_form_field';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  HostListener,
  inject,
  input,
  InputSignal,
  OnInit,
  Signal,
  ViewChild,
} from '@angular/core';
import { FormHeaderField } from '../form_header_field/form-header-field';
import { Nullable, SvgT } from '@/common/types/etc';
import { SvgStrokeIconArrowDown } from '../../svgs/stroke/icon-arrow-down/icon-arrow-down';
import { NgComponentOutlet } from '@angular/common';
import { UseDropHk } from '@/core/hooks/use_drop';
import { SvgStrokeIconCheck } from '../../svgs/stroke/icon-check/icon-check';
import { FormControl } from '@angular/forms';
import { LibLog } from '@/core/lib/dev/log';
import { ClosableDom } from '@/core/lib/dom/closable';
import { RefDomT } from '@/common/types/dom';

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
  public readonly Check: SvgT = SvgStrokeIconCheck;

  // ? derived
  public readonly labelByVal: Signal<Nullable<string>> = computed(
    () =>
      this.f().options.find(
        (el: PairValLabelT | PairValLabelTypedT<unknown>) => el.val === this.useFormField.val?.()
      )?.label ?? null
  );

  public isChosen(v: string): boolean {
    return v === this.useFormField.val?.();
  }

  public onChange(v: string): void {
    const c: FormControl = this.useFormField.ctrl();

    if (this.f().type === 'checkbox') {
      LibLog.log('TO_DO');
      return;
    }

    c.markAsDirty();
    c.markAsTouched();
    c.setValue(this.isChosen(v) ? '' : v);
    c.updateValueAndValidity();

    this.useDrop.isOpen.set(false);
  }

  ngOnInit(): void {
    this.useFormField.setupState();
    this.useFormField.patchState();
  }

  @ViewChild('dropRef')
  public readonly dropRef: RefDomT;

  @HostListener('document:mousedown', ['$event'])
  public onMouseDown(e: Event): void {
    ClosableDom.onMouseOut({
      e,
      cb: () => this.useDrop.isOpen.set(false),
      elRef: this.dropRef,
      isOpen: this.useDrop.isOpen,
    });
  }
}
