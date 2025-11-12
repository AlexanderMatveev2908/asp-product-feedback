
import { Nullable } from '@/common/types/etc';
import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-svg-advanced-icon-edit-feedback',
  templateUrl: `./icon-edit-feedback.html`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SvgAdvIconEditFeedback {
    width: InputSignal<'auto' | string> = input('100%');
    height: InputSignal<'auto' | string> = input('100%');
    
}
