import {
  AppBtnClrVarT,
  AppBtnUiFkt,
  AppBtnVarT,
} from '@/common/components/btns/btn__main/etc/ui_fkt';
import { computed, Directive, input, InputSignal, Signal } from '@angular/core';

@Directive({
  selector: '[appUseMetaApp]',
})
export class UseMetaAppDir {
  public readonly label: InputSignal<string> = input.required();
  public readonly varT: InputSignal<AppBtnVarT> = input.required();

  public readonly varsHex: Signal<AppBtnClrVarT> = computed(() => AppBtnUiFkt.varByT(this.varT()));
}
