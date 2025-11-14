import { Nullable } from '@/common/types/etc';
import { TxtFieldT } from '@/common/types/forms';
import { UseInjCtxHk } from '@/core/hooks/use_inj_ctx';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  InputSignal,
  OnInit,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { FormControl, FormControlStatus, ReactiveFormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { UseFocusHk } from '@/core/hooks/use_focus';

@Component({
  selector: 'app-form-field-txt',
  imports: [ReactiveFormsModule],
  templateUrl: './form-field-txt.html',
  styleUrl: './form-field-txt.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UseFocusHk],
})
export class FormFieldTxt extends UseInjCtxHk implements OnInit {
  // ? props
  public readonly f: InputSignal<TxtFieldT> = input.required();
  public readonly ctrl: InputSignal<FormControl> = input.required();

  // ? hooks
  public readonly useFocus: UseFocusHk = inject(UseFocusHk);

  // ? local state
  public readonly isValid: WritableSignal<boolean> = signal(true);
  // ? derived
  public readonly errMsg: Signal<string> = computed(() =>
    this.isValid() ? null : this.ctrl().errors?.['zod']
  );

  // ! to set in context injection
  private val: Nullable<Signal<string>> = null;
  private touched: Nullable<Signal<boolean>> = null;

  ngOnInit(): void {
    const c: FormControl = this.ctrl();

    this.inCtx(() => {
      this.val = toSignal(c.valueChanges, {
        initialValue: c.value,
      });

      this.touched = toSignal(
        c.statusChanges.pipe(map((_: FormControlStatus) => c.touched || c.dirty)),
        {
          initialValue: c.touched || c.dirty,
        }
      );
    });

    this.useEffect(() => {
      void this.val?.();
      const touched: boolean = !!this.touched?.();

      if (!touched) return;

      this.isValid.set(c.valid);
    });
  }
}
