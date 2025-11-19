import { inject, Injectable } from '@angular/core';
import { FeedbacksSlice } from '../../slice';
import { FeedbacksApiSvc } from '../../api';

@Injectable({
  providedIn: 'root',
})
export class UseFeedKit {
  public readonly slice: FeedbacksSlice = inject(FeedbacksSlice);
  public readonly api: FeedbacksApiSvc = inject(FeedbacksApiSvc);
}
