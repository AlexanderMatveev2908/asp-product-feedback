import { UseSsrSvc } from '@/core/services/use_ssr/use_ssr';
import { inject, Injectable } from '@angular/core';
import { UseFeedKit } from '../../../features/feedbacks/etc/services/use_feed_kit';
import { finalize } from 'rxjs';
import { ResApiT } from '@/core/store/api/etc/types';
import { Nullable } from '@/common/types/etc';
import { FeedbackT } from '../../../features/feedbacks/etc/types';
import { UseInjCtxHk } from '@/core/hooks/use_inj_ctx';

@Injectable({
  providedIn: 'root',
})
export abstract class UseAppSvc extends UseInjCtxHk {
  private readonly useSsr: UseSsrSvc = inject(UseSsrSvc);
  private readonly useFeedKit: UseFeedKit = inject(UseFeedKit);

  protected getAllFeedbacksSSR(): void {
    this.usePlatform.onServer(() => {
      this.useFeedKit.api
        .getAllFeedbacksSSR()
        .subscribe((res: ResApiT<{ feedbacks: FeedbackT[] }>) => {
          this.useSsr.transferState.set(this.useSsr.feedbacksKey, res.feedbacks);
          this.useFeedKit.slice.setFeedbacks(res.feedbacks);
        });
    });
  }
  protected getAllFeedbacksCSR(): void {
    this.useFeedKit.slice.setPending(true);
    this.useFeedKit.api
      .getAllFeedbacksCSR()
      .pipe(finalize(() => this.useFeedKit.slice.setPending(false)))
      .subscribe((res: ResApiT<{ feedbacks: FeedbackT[] }>) => {
        this.useFeedKit.slice.setFeedbacks(res.feedbacks);
      });
  }
  protected setExistingOrFetch(): void {
    this.usePlatform.onClient(() => {
      const serverData: Nullable<FeedbackT[]> = this.useSsr.transferState.get(
        this.useSsr.feedbacksKey,
        null
      );

      if (serverData) {
        this.useFeedKit.slice.setFeedbacks(serverData);
        this.useSsr.transferState.remove(this.useSsr.feedbacksKey);
      } else {
        this.getAllFeedbacksCSR();
      }
    });
  }

  protected refetchOnKeyTrigger(): void {
    this.useEffect(() => {
      const keyRefetch: number = this.useFeedKit.slice.keyRefetch();
      if (!keyRefetch) return;
      this.getAllFeedbacksCSR();
    });
  }
}
