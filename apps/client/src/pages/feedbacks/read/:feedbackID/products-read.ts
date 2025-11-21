import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { PageWrapper } from '@/layout/page_wrapper/page-wrapper';
import { UseInjCtxHk } from '@/core/hooks/use_inj_ctx';
import { BtnMain } from '@/common/components/btns/btn__main/btn-main';
import { UseMetaAppDir } from '@/core/directives/use_meta_app';
import { LinkBack } from '@/common/components/links/link_back/link-back';
import { CommentItem } from './comment_item/comment-item';
import { FeedbackItem } from '@/features/feedbacks/etc/components/feedback_item/feedback-item';
import { UseFindFeedByParams } from '@/core/hooks/use_find_feed_by_params';

@Component({
  selector: 'app-products-read',
  imports: [PageWrapper, BtnMain, CommentItem, UseMetaAppDir, LinkBack, FeedbackItem],
  templateUrl: './products-read.html',
  styleUrl: './products-read.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UseFindFeedByParams],
})
export class ProductsRead extends UseInjCtxHk implements OnInit {
  public readonly useFindFeedByParams: UseFindFeedByParams = inject(UseFindFeedByParams);

  ngOnInit(): void {
    this.useFindFeedByParams.main();
  }
}
