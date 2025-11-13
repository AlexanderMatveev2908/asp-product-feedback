import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CsrNoticeWrapper } from '@/common/components/hoc/page/csr_notice_wrapper/csr-notice-wrapper';
import { UseMetaEventDir } from '@/core/directives/use_meta_event';
import { NoticeWrapperPropsT } from '@/common/components/hoc/page/csr_notice_wrapper/etc/types';

@Component({
  selector: 'app-not-found',
  imports: [CsrNoticeWrapper, CsrNoticeWrapper, UseMetaEventDir],
  templateUrl: './not-found.html',
  styleUrl: './not-found.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFound {
  // ? notice props
  public readonly wrapEventsProps: NoticeWrapperPropsT = {
    msg: 'The treasure chest is empty. Someone got here before you... 💰',
    status: 404,
    tmpt: 'home',
  };
}
