import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WakeUp } from '@/layout/wake_up/wake-up';
import { Toast } from '@/layout/toast/toast';
import { UseScrollSvc } from '@/core/services/use_scroll';
import { PopUser } from '@/features/user/etc/components/pop_user/pop-user';
import { UseInjCtxHk } from '@/core/hooks/use_inj_ctx';
import { UseFeedKit } from '@/features/feedbacks/etc/services/use_feed_kit';
import { ResApiT } from '@/core/store/api/etc/types';
import { FeedbackT } from '@/features/feedbacks/etc/types';
import { Nullable } from '@/common/types/etc';
import { UseSsrSvc } from '@/core/services/use_ssr/use_ssr';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, WakeUp, Toast, PopUser],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App extends UseInjCtxHk implements OnInit {
  private readonly feedKit: UseFeedKit = inject(UseFeedKit);
  private readonly useScroll: UseScrollSvc = inject(UseScrollSvc);
  private readonly useSsr: UseSsrSvc = inject(UseSsrSvc);

  private fetchFeedbacks(saveSrr: boolean): void {
    this.feedKit.api.fetchAllSSR().subscribe((res: ResApiT<{ feedbacks: FeedbackT[] }>) => {
      if (saveSrr) this.useSsr.transferState.set(this.useSsr.feedbacksKey, res.feedbacks);
      this.feedKit.slice.setFeedbacks(res.feedbacks);
    });
  }

  ngOnInit(): void {
    this.useScroll.main();

    this.usePlatform.onServer(() => this.fetchFeedbacks(true));

    this.usePlatform.onClient(() => {
      const serverData: Nullable<FeedbackT[]> = this.useSsr.transferState.get(
        this.useSsr.feedbacksKey,
        null
      );

      if (serverData) {
        this.feedKit.slice.setFeedbacks(serverData);
        this.useSsr.transferState.remove(this.useSsr.feedbacksKey);
      } else {
        this.fetchFeedbacks(false);
      }
    });
  }
}
