import { ChangeDetectionStrategy, Component, inject, input, InputSignal } from '@angular/core';
import { FeedbackT } from '../../../types';
import { VersionCol } from './version_col/card-version-col';
import { VersionRow } from './version_row/card-version-row';
import { UseTabletDir } from '@/core/services/use_tablet';

@Component({
  selector: 'app-feedback-content',
  imports: [VersionCol, VersionRow],
  templateUrl: './feedback-content.html',
  styleUrl: './feedback-content.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackContent {
  public readonly item: InputSignal<FeedbackT> = input.required();

  public readonly useTablet: UseTabletDir = inject(UseTabletDir);
}
