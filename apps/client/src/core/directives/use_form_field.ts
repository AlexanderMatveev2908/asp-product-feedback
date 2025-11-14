import { Nullable } from '@/common/types/etc';
import { Directive, input, InputSignal, signal, Signal, WritableSignal } from '@angular/core';
import { UseInjCtxHk } from '../hooks/use_inj_ctx';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormControlStatus } from '@angular/forms';
import { map } from 'rxjs';

@Directive({
  selector: '[appUseFormField]',
})
export class UseFormFieldDir extends UseInjCtxHk {
  // ? props
  public readonly ctrl: InputSignal<FormControl> = input.required();

  // ? local state
  public readonly isValid: WritableSignal<boolean> = signal(true);
  public readonly errMsg: WritableSignal<Nullable<string>> = signal(null);

  // ! to set in context injection
  public val: Nullable<Signal<unknown>> = null;
  public touched: Nullable<Signal<boolean>> = null;

  // ? derived
  public readonly borderClr: (isSomething: boolean) => string = (isSomething: boolean) =>
    this.isValid() ? (isSomething ? 'var(--blue__prm)' : 'transparent') : '#D73737';

  public setupState(): void {
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
  }

  public patchState(): void {
    const c: FormControl = this.ctrl();

    this.useEffect(() => {
      void this.val?.();
      const touched: boolean = !!this.touched?.();

      if (!touched) return;

      this.isValid.set(c.valid);

      if (!c.valid) this.errMsg.set(c.errors?.['zod']);
    });
  }
}
