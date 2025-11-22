import { NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, InputSignal } from '@angular/core';
import { WrapTxtApi } from '../../hoc/txt/wrap_txt_api/wrap-txt-api';
import { UseWrapApiDir } from '@/core/directives/use_wrap_api';
import { UseSpanDir } from '@/core/directives/use_span';
import { SpinTxtClsT } from '@/common/types/css';
import { AppEventT } from '@/common/types/etc';

@Component({
  selector: 'app-span',
  imports: [NgComponentOutlet, WrapTxtApi, UseWrapApiDir],
  templateUrl: './span.html',
  styleUrl: './span.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Span {
  // ? directives
  public readonly useSpanDir: UseSpanDir = inject(UseSpanDir);

  // ? props
  public readonly eventT: InputSignal<AppEventT> = input<AppEventT>('NONE');
  public readonly spinSize: InputSignal<SpinTxtClsT> = input<SpinTxtClsT>('spin__sm');
  public readonly isPending: InputSignal<boolean> = input(false);
}
