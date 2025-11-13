import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
  Signal,
} from '@angular/core';
import { AppBtnClrVarT, AppBtnUiFkt, AppBtnVarT } from './etc/ui_fkt';

@Component({
  selector: 'app-btn-app',
  imports: [],
  templateUrl: './btn-app.html',
  styleUrl: './btn-app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BtnApp {
  public readonly label: InputSignal<string> = input.required();
  public readonly varT: InputSignal<AppBtnVarT> = input.required();

  public readonly varsHex: Signal<AppBtnClrVarT> = computed(() => AppBtnUiFkt.varByT(this.varT()));
}
