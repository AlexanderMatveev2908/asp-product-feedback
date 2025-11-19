import { AfterViewInit, ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Popup } from '../popup/popup';
import { PopupStaticPropsT } from '../popup/etc/types';
import { SpinBtn } from '@/common/components/spins/spin_btn/spin-btn';
import { UsePlatformSvc } from '@/core/services/use_platform';
import { ToastSlice } from '@/features/toast/slice';
import { ErrApiT, ResApiT } from '@/core/store/api/etc/types';
import { finalize } from 'rxjs';
import { Nullable } from '@/common/types/etc';
import { UseMetaEventDir } from '@/core/directives/use_meta_event';
import { UsePopHk } from '@/core/hooks/use_pop';
import { UseStorageSvc } from '@/core/services/use_storage/use_storage';
import { LibPrs } from '@/core/lib/data_structure/prs/prs';
import { envVars } from '@/environments/environment';
import { UseWakeKit } from '@/features/wake_up/etc/use_wake_kit';
import { UseSsrSvc } from '@/core/services/use_ssr/use_ssr';
import { LibShape } from '@/core/lib/data_structure/shape';

@Component({
  selector: 'app-wake-up',
  imports: [Popup, SpinBtn, UseMetaEventDir],
  templateUrl: './wake-up.html',
  styleUrl: './wake-up.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UsePopHk],
})
export class WakeUp implements OnInit, AfterViewInit {
  // ? svc
  private readonly useWakeKit: UseWakeKit = inject(UseWakeKit);
  private readonly usePlatform: UsePlatformSvc = inject(UsePlatformSvc);
  private readonly toastSlice: ToastSlice = inject(ToastSlice);
  private readonly useStorage: UseStorageSvc = inject(UseStorageSvc);
  private readonly useSsr: UseSsrSvc = inject(UseSsrSvc);

  // ? hooks
  public readonly usePopHk: UsePopHk = inject(UsePopHk);

  // ? popup props
  public readonly popupStaticProps: PopupStaticPropsT = {
    closeOnMouseOut: false,
    eventT: 'INFO',
    closePop: this.usePopHk.closePop,
  };

  // ? message user
  public readonly backURL: string = envVars.backURL;

  // ? cbs
  private canClientPoll(): boolean {
    if (this.usePlatform.isServer || this.useWakeKit.slice.awake()) return false;

    const tmsp: Nullable<string> = this.useStorage.getItem('wakeUp');
    const lastCall: number = LibShape.isInt(tmsp) ? +tmsp! : 0;
    const now: number = Date.now();

    const marginMinutes: number = 15;
    const marginMillis: number = LibPrs.msFromMinutes(marginMinutes);
    if (now - lastCall < marginMillis) {
      this.useWakeKit.slice.setAwake();
      return false;
    }

    return true;
  }

  ngOnInit(): void {
    this.usePlatform.onServer(() =>
      this.useWakeKit.api.poll().subscribe((_: ResApiT<void>) => {
        this.useSsr.transferState.set(this.useSsr.wakeUpKey, true);
        this.useWakeKit.slice.awake();
      })
    );

    this.usePlatform.onClient(() => {
      const isAwake: boolean = this.useSsr.transferState.get(this.useSsr.wakeUpKey, false);

      if (!isAwake) return;

      this.useWakeKit.slice.awake();
      this.useStorage.setItem('wakeUp', Date.now());
      this.useSsr.transferState.remove(this.useSsr.wakeUpKey);
    });
  }

  ngAfterViewInit(): void {
    const canPoll: boolean = this.canClientPoll();
    if (!canPoll) return;

    this.usePopHk.isPop.set(true);

    this.usePlatform
      .whenStable<ResApiT<void>>(
        this.useWakeKit.api.poll().pipe(finalize(() => this.usePopHk.isPop.set(false)))
      )
      .subscribe({
        next: (res: ResApiT<void>) => {
          const now = Date.now();
          this.useStorage.setItem('wakeUp', now);

          this.toastSlice.ifNotPresent({
            msg: res?.msg ?? 'server available',
            status: 200,
            eventT: 'OK',
          });
          this.useWakeKit.slice.setAwake();
        },
        error: (err: ErrApiT<void>) => {
          this.toastSlice.ifNotPresent({
            msg: err.error.msg ?? 'server not available',
            status: err.status,
            eventT: 'ERR',
          });
        },
      });
  }
}
