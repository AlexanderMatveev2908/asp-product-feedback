

import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-svg-advanced-icon-comments',
  templateUrl: `./icon-comments.html`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SvgAdvIconComments {
    width: InputSignal<'auto' | string> = input('100%');
    height: InputSignal<'auto' | string> = input('100%');
    
}
