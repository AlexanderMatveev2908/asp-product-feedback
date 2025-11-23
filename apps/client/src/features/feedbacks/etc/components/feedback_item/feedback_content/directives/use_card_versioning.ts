import { Nullable } from '@/common/types/etc';
import { FeedLibShape } from '@/features/feedbacks/etc/lib_shape';
import { FeedbackT } from '@/features/feedbacks/etc/types';
import { computed, Directive, input, InputSignal, Signal } from '@angular/core';

@Directive()
export abstract class UseCardVersioningDir {
  public readonly item: InputSignal<FeedbackT> = input.required();

  public readonly catLabel: Signal<Nullable<string>> = computed(() =>
    FeedLibShape.catLabelByVal(this.item().category)
  );
}
