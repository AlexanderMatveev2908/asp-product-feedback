
import { Nullable } from '@/common/types/etc';
import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-svg-advanced-icon-new-feedback',
  templateUrl: `./icon-new-feedback.html`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SvgAdvIconNewFeedback {
    width: InputSignal<'auto' | string> = input('100%');
    height: InputSignal<'auto' | string> = input('100%');
    
}
