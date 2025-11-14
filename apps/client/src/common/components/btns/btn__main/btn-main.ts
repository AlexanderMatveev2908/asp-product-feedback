import { BtnT } from '@/common/types/dom';
import { Nullable } from '@/common/types/etc';
import { UseMetaAppDir } from '@/core/directives/use_meta_app';
import { ChangeDetectionStrategy, Component, inject, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-btn-main',
  imports: [],
  templateUrl: './btn-main.html',
  styleUrl: './btn-main.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BtnMain {
  public readonly btnT: InputSignal<BtnT> = input<BtnT>('button');
  public readonly minW: InputSignal<string> = input('fit');
  public readonly onClick: InputSignal<Nullable<() => void>> = input<Nullable<() => void>>(null);

  public readonly useMetaApp: UseMetaAppDir = inject(UseMetaAppDir);
}
