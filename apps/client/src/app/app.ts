import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WakeUp } from '@/layout/wake_up/wake-up';
import { Toast } from '@/layout/toast/toast';
import { FeedbacksSlice } from '@/features/feedbacks/slice';
import { mockData } from '@/assets/data';
import { FeedbackT } from '@/features/feedbacks/etc/types';
import { UseScrollSvc } from '@/core/services/use_scroll';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, WakeUp, Toast],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App implements OnInit {
  private readonly productsSlice: FeedbacksSlice = inject(FeedbacksSlice);
  private readonly useScroll: UseScrollSvc = inject(UseScrollSvc);

  ngOnInit(): void {
    this.useScroll.main();
    const fakeLoading: number = 1000;
    setTimeout(() => {
      this.productsSlice.setFeedbacks(mockData.productRequests as unknown as FeedbackT[]);
    }, fakeLoading);
  }
}
