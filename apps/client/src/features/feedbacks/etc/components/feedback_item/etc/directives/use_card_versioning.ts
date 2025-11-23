import { Nullable } from '@/common/types/etc';
import { FeedLibShape } from '@/features/feedbacks/etc/lib_shape';
import { computed, Directive, Signal } from '@angular/core';
import { UseFeedbackCardDir } from './use_feedback_card';

@Directive()
export abstract class UseCardVersioningDir extends UseFeedbackCardDir {
  public readonly catLabel: Signal<Nullable<string>> = computed(() =>
    FeedLibShape.catLabelByVal(this.item().category)
  );
}
