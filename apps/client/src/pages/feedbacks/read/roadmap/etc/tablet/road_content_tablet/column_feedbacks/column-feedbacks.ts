import { Nullable } from '@/common/types/etc';
import { FeedbackStatusT, FeedbackT } from '@/features/feedbacks/etc/types';
import { FeedbacksSlice } from '@/features/feedbacks/slice';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  InputSignal,
  Signal,
} from '@angular/core';
import { FeedbackBase } from '@/features/feedbacks/etc/components/feedback_item/feedback_base/feedback-base';

@Component({
  selector: 'app-column-feedbacks',
  imports: [FeedbackBase],
  templateUrl: './column-feedbacks.html',
  styleUrl: './column-feedbacks.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnFeedbacks {
  private readonly feedbacksSlice: FeedbacksSlice = inject(FeedbacksSlice);

  public readonly currStatus: InputSignal<FeedbackStatusT> = input.required();

  public readonly currFeedbacks: Signal<FeedbackT[]> = computed(() => {
    const data: Nullable<FeedbackT[]> = this.feedbacksSlice.feedbacks();
    if (!data) return [];

    const filtered: FeedbackT[] = data.filter((f: FeedbackT) => f.status === this.currStatus());
    return filtered;
  });
}
