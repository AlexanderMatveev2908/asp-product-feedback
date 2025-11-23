import { Nullable } from '@/common/types/etc';
import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-svg-stroke-icon-arrow-up',
  templateUrl: `./icon-arrow-up.html`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SvgStrokeIconArrowUp {
  width: InputSignal<'auto' | string> = input('100%');
  height: InputSignal<'auto' | string> = input('100%');

  fill: InputSignal<Nullable<string>> = input<Nullable<string>>('transparent');
  stroke: InputSignal<string> = input<string>('currentColor');
}
