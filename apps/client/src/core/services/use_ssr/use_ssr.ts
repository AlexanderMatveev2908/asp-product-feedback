import { FeedbackT } from '@/features/feedbacks/etc/types';
import { inject, Injectable, makeStateKey, StateKey, TransferState } from '@angular/core';
import { SsrKeyT } from './etc/types';

@Injectable({
  providedIn: 'root',
})
export class UseSsrSvc {
  public readonly transferState: TransferState = inject(TransferState);
  public readonly feedbacksKey: StateKey<FeedbackT[]> = makeStateKey<FeedbackT[]>(
    SsrKeyT.FEEDBACKS
  );
  public readonly wakeUpKey: StateKey<boolean> = makeStateKey<boolean>(SsrKeyT.WAKE_UP);
}
