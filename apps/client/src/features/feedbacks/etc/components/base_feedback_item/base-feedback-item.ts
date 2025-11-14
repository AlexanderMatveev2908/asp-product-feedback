import { FeedbackT } from '@/features/feedbacks/etc/types';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
  Signal,
} from '@angular/core';
import { FeedbackContent } from '../feedback_content/feedback-content';

@Component({
  selector: 'app-base-feedback-item',
  imports: [FeedbackContent],
  templateUrl: './base-feedback-item.html',
  styleUrl: './base-feedback-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseFeedbackItem {
  public readonly item: InputSignal<FeedbackT> = input.required();

  // ? derived
  public readonly path: Signal<string> = computed(() => `feedbacks/read/${this.item()?.id}`);
}
