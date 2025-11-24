import { FeedbackStatusT } from '@/features/feedbacks/etc/types';
import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-column-feedbacks',
  imports: [],
  templateUrl: './column-feedbacks.html',
  styleUrl: './column-feedbacks.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnFeedbacks {
  public readonly currStatus: InputSignal<FeedbackStatusT> = input.required();
}
