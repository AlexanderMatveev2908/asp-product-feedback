import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { _UseNavSecurityHk } from '../services/use_nav/sub/3.use_security';
import { Nullable } from '@/common/types/etc';
import { Params } from '@angular/router';
import { FeedbackT } from '@/features/feedbacks/etc/types';
import { ApiStatusT } from '@/core/store/api/etc/types';
import { UseInjCtxHk } from '@/core/hooks/use_inj_ctx';
import { UseNavSvc } from '../services/use_nav';
import { FeedbacksSlice } from '@/features/feedbacks/slice';

@Injectable()
export class UseFindFeedByParams extends UseInjCtxHk {
  private readonly useNav: UseNavSvc = inject(UseNavSvc);
  private readonly feedbacksSlice: FeedbacksSlice = inject(FeedbacksSlice);

  public readonly item: WritableSignal<Nullable<FeedbackT>> = signal(null);

  public main(): void {
    this.useEffect(() => {
      const vars: Nullable<Params> = this.useNav.pathVariables();
      const feedbackID: Nullable<string> = vars?.['feedbackID'];

      const feedbacks: Nullable<FeedbackT[]> = this.feedbacksSlice.feedbacks();
      if (!feedbacks) return;

      const found: Nullable<FeedbackT> =
        feedbacks.find((p: FeedbackT) => p.id === feedbackID) ?? null;

      if (!found)
        this.useNav.pushNotice({
          eventT: 'ERR',
          msg: 'Feedback not found',
          status: ApiStatusT.NOT_FOUND,
          tmpt: 'home',
        });
    });
  }
}
