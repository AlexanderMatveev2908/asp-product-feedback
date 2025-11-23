import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UseFeedbackCardDir } from '../etc/directives/use_feedback_card';
import { VersionCol } from '../etc/versions/version_col/card-version-col';
import { VersionRow } from '../etc/versions/version_row/card-version-row';

@Component({
  selector: 'app-feedback-responsive',
  imports: [VersionCol, VersionRow],
  templateUrl: './feedback-responsive.html',
  styleUrl: './feedback-responsive.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackResponsive extends UseFeedbackCardDir {}
