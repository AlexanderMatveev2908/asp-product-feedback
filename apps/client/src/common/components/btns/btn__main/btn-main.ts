import { BtnT } from '@/common/types/dom';
import { Nullable } from '@/common/types/etc';
import { UseMetaAppDir } from '@/core/directives/use_meta_app';
import { ChangeDetectionStrategy, Component, inject, input, InputSignal } from '@angular/core';
import { SpinTxt } from '../../spins/spin_txt/spin-txt';
import { UseMetaEventDir } from '@/core/directives/use_meta_event';

@Component({
  selector: 'app-btn-main',
  imports: [SpinTxt, UseMetaEventDir],
  templateUrl: './btn-main.html',
  styleUrl: './btn-main.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BtnMain {
  public readonly btnT: InputSignal<BtnT> = input<BtnT>('button');
  public readonly minW: InputSignal<string> = input('fit');
  public readonly onClick: InputSignal<Nullable<() => void>> = input<Nullable<() => void>>(null);

  public readonly isDisabled: InputSignal<boolean> = input(false);
  public readonly isPending: InputSignal<boolean> = input(false);

  public readonly useMetaApp: UseMetaAppDir = inject(UseMetaAppDir);
}
