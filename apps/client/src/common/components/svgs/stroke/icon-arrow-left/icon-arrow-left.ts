
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Nullable } from '@/common/types/etc';
import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-svg-stroke-icon-arrow-left',
  templateUrl: `./icon-arrow-left.html`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SvgStrokeIconArrowLeft {
    width: InputSignal<'auto' | string> = input('100%');
    height: InputSignal<'auto' | string> = input('100%');
    
    fill: InputSignal<Nullable<string>> = input<Nullable<string>>(null);
    stroke: InputSignal<string> = input<string>('currentColor');
    
}
