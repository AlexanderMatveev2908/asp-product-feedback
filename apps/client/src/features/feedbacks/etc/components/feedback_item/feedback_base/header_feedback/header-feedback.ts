import { Nullable } from '@/common/types/etc';
import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-header-feedback',
  imports: [],
  templateUrl: './header-feedback.html',
  styleUrl: './header-feedback.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderFeedback {
  public readonly statusLabel: InputSignal<Nullable<string>> = input.required();
}
