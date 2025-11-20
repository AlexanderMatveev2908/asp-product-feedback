import { FeedLibShape } from '@/features/feedbacks/etc/lib_shape';
import { FeedbackT } from '@/features/feedbacks/etc/types';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
  Signal,
} from '@angular/core';
import { HeaderFeedback } from './header_feedback/header-feedback';
import { FeedbackContent } from './feedback_content/feedback-content';

@Component({
  selector: 'app-feedback-item',
  imports: [FeedbackContent, HeaderFeedback],
  templateUrl: './feedback-item.html',
  styleUrl: './feedback-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackItem {
  public readonly item: InputSignal<FeedbackT> = input.required();
  public readonly withHeader: InputSignal<boolean> = input.required();

  public readonly statusLabel: Signal<string> = computed(() =>
    FeedLibShape.statusLabelByVal(this.item().status)
  );
}
