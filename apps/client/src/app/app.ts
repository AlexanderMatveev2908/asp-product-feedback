import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WakeUp } from '@/layout/wake_up/wake-up';
import { Toast } from '@/layout/toast/toast';
import { UseScrollSvc } from '@/core/services/use_scroll';
import { PopUser } from '@/layout/pop_user/pop-user';
import { UseAppSvc } from './etc/services/use_app';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, WakeUp, Toast, PopUser],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App extends UseAppSvc implements OnInit {
  private readonly useScroll: UseScrollSvc = inject(UseScrollSvc);

  ngOnInit(): void {
    this.useScroll.main();

    this.getAllFeedbacksSSR();
    this.setExistingOrFetch();
    this.refetchOnKeyTrigger();
  }
}
