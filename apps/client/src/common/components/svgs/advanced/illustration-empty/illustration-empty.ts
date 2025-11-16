

import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-svg-advanced-illustration-empty',
  templateUrl: `./illustration-empty.html`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SvgAdvIllustrationEmpty {
    width: InputSignal<'auto' | string> = input('100%');
    height: InputSignal<'auto' | string> = input('100%');
    
}
