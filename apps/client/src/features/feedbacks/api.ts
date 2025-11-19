import { ObsResT } from '@/core/store/api/etc/types';
import { UseApiSvc } from '@/core/store/api/use_api';
import { inject, Injectable } from '@angular/core';
import { FeedbackT } from './etc/types';
import { LibApiArgs } from '@/core/store/api/etc/lib/api_args';

@Injectable({
  providedIn: 'root',
})
export class FeedbacksApiSvc {
  private readonly base: string = '/feedbacks';
  private readonly api: UseApiSvc = inject(UseApiSvc);

  public fetchAllSSR(): ObsResT<{ feedbacks: FeedbackT[] }> {
    return this.api.get(LibApiArgs.withURL(`${this.base}`).noToast());
  }
}
