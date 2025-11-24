import { UseApiTrackerHk } from '@/core/store/api/etc/hooks/use_tracker';
import { computed, Directive, input, InputSignal, Signal } from '@angular/core';

@Directive()
export abstract class UseFeedbackFooterFormDir {
  public readonly isFormTypePost: InputSignal<boolean> = input.required();
  public readonly useTrackFormPending: InputSignal<UseApiTrackerHk> = input.required();
  public readonly useTrackDelPending: InputSignal<UseApiTrackerHk> = input.required();

  public readonly delFeed: InputSignal<() => void> = input.required();
  public readonly resetPreFilled: InputSignal<() => void> = input.required();

  // ? derived
  public readonly someonePending: Signal<boolean> = computed(
    () => this.useTrackDelPending().isPending() || this.useTrackFormPending().isPending()
  );
}
