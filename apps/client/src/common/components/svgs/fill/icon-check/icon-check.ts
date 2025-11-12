
import { Nullable } from '@/common/types/etc';
import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-svg-fill-icon-check',
  templateUrl: `./icon-check.html`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SvgFillIconCheck {
    width: InputSignal<'auto' | string> = input('100%');
    height: InputSignal<'auto' | string> = input('100%');
    
    fill: InputSignal<string> = input<string>('currentColor');
    stroke: InputSignal<Nullable<string>> = input<Nullable<string>>(null);
    
}
