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
  public feedbacks: Signal<Nullable<FeedbackT[]>> = computed(() => this.feedbacksState().feedbacks);

  public reset(): void {
    this.store.dispatch(FeedbacksActT.RESET__FEEDBACKS_STATE());
  }
}
