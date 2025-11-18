import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WakeUp } from '@/layout/wake_up/wake-up';
import { Toast } from '@/layout/toast/toast';
import { FeedbacksSlice } from '@/features/feedbacks/slice';
import { UseScrollSvc } from '@/core/services/use_scroll';
import { PopUser } from '@/features/user/etc/components/pop_user/pop-user';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, WakeUp, Toast, PopUser],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App implements OnInit {
  private readonly productsSlice: FeedbacksSlice = inject(FeedbacksSlice);
  private readonly useScroll: UseScrollSvc = inject(UseScrollSvc);

  ngOnInit(): void {
    this.useScroll.main();
  }
}
