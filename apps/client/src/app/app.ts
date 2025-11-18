import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WakeUp } from '@/layout/wake_up/wake-up';
import { Toast } from '@/layout/toast/toast';
import { FeedbacksSlice } from '@/features/feedbacks/slice';
import { UserT } from '@/features/feedbacks/etc/types';
import { UseScrollSvc } from '@/core/services/use_scroll';
import { UseUserKitSvc } from '@/features/user/etc/hooks/use_user_kit';
import { ResApiT } from '@/core/store/api/etc/types';
import { Nullable } from '@/common/types/etc';
import { UseStorageSvc } from '@/core/services/use_storage/use_storage';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, WakeUp, Toast],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App implements OnInit {
  private readonly productsSlice: FeedbacksSlice = inject(FeedbacksSlice);
  private readonly useScroll: UseScrollSvc = inject(UseScrollSvc);
  private readonly useUserKit: UseUserKitSvc = inject(UseUserKitSvc);
  private readonly useStorage: UseStorageSvc = inject(UseStorageSvc);

  private fetchIfNotUser(): void {
    const existingUser: Nullable<UserT> = this.useStorage.getItem('user');
    if (existingUser) {
      this.useUserKit.userSlice.setUser(existingUser);
      return;
    }

    this.useUserKit.userApi.getRandomUser().subscribe((res: ResApiT<{ user: UserT }>) => {
      this.useUserKit.userSlice.setUser(res.user);
    });
  }

  ngOnInit(): void {
    this.useScroll.main();

    this.fetchIfNotUser();
  }
}
