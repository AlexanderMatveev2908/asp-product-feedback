import { BtnT } from '@/common/types/dom';
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

  public readonly useMetaApp: UseMetaAppDir = inject(UseMetaAppDir);
}
