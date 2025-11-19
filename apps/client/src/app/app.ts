import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WakeUp } from '@/layout/wake_up/wake-up';
import { Toast } from '@/layout/toast/toast';
import { UseScrollSvc } from '@/core/services/use_scroll';
import { UseInjCtxHk } from '@/core/hooks/use_inj_ctx';
import { UseFeedKit } from '@/features/feedbacks/etc/services/use_feed_kit';
import { ResApiT } from '@/core/store/api/etc/types';
import { FeedbackT } from '@/features/feedbacks/etc/types';
import { Nullable } from '@/common/types/etc';
import { UseSsrSvc } from '@/core/services/use_ssr/use_ssr';
import { PopUser } from '@/layout/pop_user/pop-user';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, WakeUp, Toast, PopUser],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App extends UseInjCtxHk implements OnInit {
  private readonly useFeedKit: UseFeedKit = inject(UseFeedKit);
  private readonly useScroll: UseScrollSvc = inject(UseScrollSvc);
  private readonly useSsr: UseSsrSvc = inject(UseSsrSvc);

  private getAllFeedbacksSSR(): void {
    this.usePlatform.onServer(() => {
      this.useFeedKit.api
        .getAllFeedbacksSSR()
        .subscribe((res: ResApiT<{ feedbacks: FeedbackT[] }>) => {
          this.useSsr.transferState.set(this.useSsr.feedbacksKey, res.feedbacks);
          this.useFeedKit.slice.setFeedbacks(res.feedbacks);
        });
    });
  }
  private getAllFeedbacksCSR(): void {
    this.useFeedKit.slice.setPending(true);
    this.useFeedKit.api
      .getAllFeedbacksCSR()
      .pipe(finalize(() => this.useFeedKit.slice.setPending(false)))
      .subscribe((res: ResApiT<{ feedbacks: FeedbackT[] }>) => {
        this.useFeedKit.slice.setFeedbacks(res.feedbacks);
      });
  }
  private setExistingOrFetch(): void {
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

  ngOnInit(): void {
    this.useScroll.main();

    this.getAllFeedbacksSSR();
    this.setExistingOrFetch();

    this.useEffect(() => {
      const keyRefetch: number = this.useFeedKit.slice.keyRefetch();
      if (!keyRefetch) return;
      this.getAllFeedbacksCSR();
    });
  }
}
