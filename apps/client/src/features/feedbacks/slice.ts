import { computed, Injectable, Signal } from '@angular/core';
import { FeedbacksStateT } from './reducer/reducer';
import { getProductsState } from './reducer/selectors';
import { FeedbacksActT } from './reducer/actions';
import { UseKitSliceSvc } from '@/core/services/use_kit_slice';
import { FeedbackT } from './etc/types';
import { Nullable } from '@/common/types/etc';

@Injectable({
  providedIn: 'root',
})
export class FeedbacksSlice extends UseKitSliceSvc {
  public get feedbacksState(): Signal<FeedbacksStateT> {
    return this.store.selectSignal(getProductsState);
  }

  public setFeedbacks(feedbacks: FeedbackT[]): void {
    this.store.dispatch(FeedbacksActT.SET_FEEDBACKS({ feedbacks }));
  }
  public readonly feedbacks: Signal<Nullable<FeedbackT[]>> = computed(
    () => this.feedbacksState().feedbacks
  );

  public refetch(): void {
    this.store.dispatch(FeedbacksActT.REFETCH());
  }
  public readonly keyRefetch: Signal<number> = computed(() => this.feedbacksState().keyRefetch);

  public setPending(v: boolean): void {
    this.store.dispatch(FeedbacksActT.SET_PENDING({ v }));
  }
  public readonly isPending: Signal<boolean> = computed(() => this.feedbacksState().isPending);

  public reset(): void {
    this.store.dispatch(FeedbacksActT.RESET__FEEDBACKS_STATE());
  }
}
