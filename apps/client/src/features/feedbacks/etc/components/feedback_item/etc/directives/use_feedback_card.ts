import { FeedbackT } from '@/features/feedbacks/etc/types';
import { Directive, input, InputSignal } from '@angular/core';

@Directive()
export abstract class UseFeedbackCardDir {
  public readonly item: InputSignal<FeedbackT> = input.required();
}
