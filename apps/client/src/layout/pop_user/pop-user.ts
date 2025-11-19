import { ChangeDetectionStrategy, Component, inject, OnInit, Signal } from '@angular/core';
import { Popup } from '@/layout/popup/popup';
import { PopupStaticPropsT } from '@/layout/popup/etc/types';
import { UsePopHk } from '@/core/hooks/use_pop';
import { UseStorageSvc } from '@/core/services/use_storage/use_storage';
import { ResApiT } from '@/core/store/api/etc/types';
import { Nullable } from '@/common/types/etc';
import { UseInjCtxHk } from '@/core/hooks/use_inj_ctx';
import { WakeUpSlice } from '@/features/wake_up/slice';
import { UseUserKitSvc } from '@/features/user/etc/services/use_user_kit';
import { UserT } from '@/features/user/etc/types';

@Component({
  selector: 'app-pop-user',
  imports: [Popup],
  templateUrl: './pop-user.html',
  styleUrl: './pop-user.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UsePopHk],
})
export class PopUser extends UseInjCtxHk implements OnInit {
  private readonly useUserKit: UseUserKitSvc = inject(UseUserKitSvc);
  private readonly useStorage: UseStorageSvc = inject(UseStorageSvc);
  private readonly wakeUpSlice: WakeUpSlice = inject(WakeUpSlice);

  public readonly usePop: UsePopHk = inject(UsePopHk);

  public readonly user: Signal<Nullable<UserT>> = this.useUserKit.slice.user;

  private fetchIfNotUser(): void {
    const existingUser: Nullable<UserT> = this.useStorage.getItem('user');
    if (existingUser) {
      this.useUserKit.slice.setUser(existingUser);
      return;
    }

    this.useUserKit.api.getRandomUser().subscribe((res: ResApiT<{ user: UserT }>) => {
      this.useUserKit.slice.setUser(res.user);
      this.usePop.isPop.set(true);
    });
  }

  public readonly staticProps: PopupStaticPropsT = {
    closeOnMouseOut: true,
    closePop: this.usePop.closePop,
    eventT: 'INFO',
  };

  ngOnInit(): void {
    this.useEffect(() => {
      const isAwake: boolean = this.wakeUpSlice.awake();
      if (!isAwake) return;

      this.fetchIfNotUser();
    });
  }
}
