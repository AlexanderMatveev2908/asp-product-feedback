import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  Signal,
} from '@angular/core';
import { PageWrapper } from '@/layout/page_wrapper/page-wrapper';
import { UseInjCtxHk } from '@/core/hooks/use_inj_ctx';
import { UseMetaAppDir } from '@/core/directives/use_meta_app';
import { LinkBack } from '@/common/components/links/link_back/link-back';
import { CommentItem } from './comment_item/comment-item';
import { FeedbackItem } from '@/features/feedbacks/etc/components/feedback_item/feedback-item';
import { UseFindFeedByParams } from '@/core/hooks/use_find_feed_by_params';
import { FeedbackT } from '@/features/feedbacks/etc/types';
import { Nullable } from '@/common/types/etc';
import { LinkMain } from '@/common/components/links/link_main/link-main';
import { CommentForm } from '@/features/feedbacks/etc/forms/comment_form/comment-form';

@Component({
  selector: 'app-products-read',
  imports: [PageWrapper, CommentItem, UseMetaAppDir, LinkBack, FeedbackItem, LinkMain, CommentForm],
  templateUrl: './products-read.html',
  styleUrl: './products-read.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UseFindFeedByParams],
})
export class ProductsRead extends UseInjCtxHk implements OnInit {
  private readonly useFindFeedByParams: UseFindFeedByParams = inject(UseFindFeedByParams);

  public readonly found: Signal<Nullable<FeedbackT>> = this.useFindFeedByParams.found;

  public readonly pathEdit: Signal<string> = computed(() => `/feedbacks/put/${this.found()?.id}`);

  ngOnInit(): void {
    this.useFindFeedByParams.main();
  }
}
