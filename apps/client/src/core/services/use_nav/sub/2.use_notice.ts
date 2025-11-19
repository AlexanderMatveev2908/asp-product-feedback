import { inject, Injectable } from '@angular/core';
import { _UseRouterHk } from './1.use_router';
import { NoticeSlice } from '@/features/notice/slice';
import { PartialNotice } from '@/features/notice/etc/types';

@Injectable()
export abstract class _UseNavNoticeHk extends _UseRouterHk {
  private readonly noticeSlice: NoticeSlice = inject(NoticeSlice);

  public pushNotice(arg: PartialNotice): void {
    this.noticeSlice.setNotice(arg);

    void this.replace('/notice', { from: 'err' });
  }
}
