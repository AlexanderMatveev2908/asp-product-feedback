import { ChangeDetectionStrategy, Component, computed, Signal } from '@angular/core';
import { UseFeedbackCardDir } from '../etc/directives/use_feedback_card';
import { HeaderFeedback } from './header_feedback/header-feedback';
import { VersionCol } from '../etc/versions/version_col/card-version-col';
import { FeedLibShape } from '../../../lib_shape';

@Component({
  selector: 'app-feedback-base',
  imports: [HeaderFeedback, VersionCol],
  templateUrl: './feedback-base.html',
  styleUrl: './feedback-base.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackBase extends UseFeedbackCardDir {
  public readonly statusLabel: Signal<string> = computed(() =>
    FeedLibShape.statusLabelByVal(this.item().status)
  );
}
