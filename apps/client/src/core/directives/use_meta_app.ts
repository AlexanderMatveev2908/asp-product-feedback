import { AppBtnClrVarT, AppBtnUiFkt, AppBtnVarT } from '@/core/lib/css/app_vars';
import { computed, Directive, input, InputSignal, Signal } from '@angular/core';

@Directive({
  selector: '[appUseMetaApp]',
})
export class UseMetaAppDir {
  public readonly label: InputSignal<string> = input.required();
  public readonly varT: InputSignal<AppBtnVarT> = input.required();

  public readonly varsHex: Signal<AppBtnClrVarT> = computed(() => AppBtnUiFkt.varByT(this.varT()));
}
