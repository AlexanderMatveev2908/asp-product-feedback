import { ObsResT } from '@/core/store/api/etc/types';
import { UseApiSvc } from '@/core/store/api/use_api';
import { inject, Injectable } from '@angular/core';
import { FeedbackT } from './etc/types';
import { LibApiArgs } from '@/core/store/api/etc/lib/api_args';
import { FeedFormPostT, FeedFormPutT } from './etc/forms/feedback_form/etc/form_mng';

@Injectable({
  providedIn: 'root',
})
export class FeedbacksApiSvc {
  private readonly base: string = '/feedbacks';
  private readonly api: UseApiSvc = inject(UseApiSvc);

  public getAllFeedbacksSSR(): ObsResT<{ feedbacks: FeedbackT[] }> {
    return this.api.get(LibApiArgs.withURL(`${this.base}`).noToast());
  }
  public getAllFeedbacksCSR(): ObsResT<{ feedbacks: FeedbackT[] }> {
    return this.api.get(LibApiArgs.withURL(`${this.base}`).toastOnErr());
  }

  public like(feedbackId: string): ObsResT<void> {
    return this.api.patch(LibApiArgs.withURL(`${this.base}/like/${feedbackId}`).toastOnFulfilled());
  }

  public post(data: FeedFormPostT): ObsResT<{ feedback: FeedbackT }> {
    return this.api.post(LibApiArgs.withURL(`${this.base}`).body(data).toastOnFulfilled());
  }

  public put(data: FeedFormPutT, feedbackId: string): ObsResT<{ feedback: FeedbackT }> {
    return this.api.put(
      LibApiArgs.withURL(`${this.base}/${feedbackId}`).body(data).toastOnFulfilled()
    );
  }
}
