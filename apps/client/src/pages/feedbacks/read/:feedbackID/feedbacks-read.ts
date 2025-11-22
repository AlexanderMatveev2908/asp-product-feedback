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
import { CommentT, FeedbackT } from '@/features/feedbacks/etc/types';
import { Nullable } from '@/common/types/etc';
import { LinkMain } from '@/common/components/links/link_main/link-main';
import { CommentForm } from '@/features/feedbacks/etc/forms/comment_form/comment-form';
import { ContentFormT } from '@/core/paperwork/etc/content_form_mng';
import { Observable, tap } from 'rxjs';
import { UseFeedKit } from '@/features/feedbacks/etc/services/use_feed_kit';
import { UserSlice } from '@/features/user/slice';
import { ResApiT } from '@/core/store/api/etc/types';
import { UserT } from '@/features/user/etc/types';

@Component({
  selector: 'app-feedbacks-read',
  imports: [PageWrapper, CommentItem, UseMetaAppDir, LinkBack, FeedbackItem, LinkMain, CommentForm],
  templateUrl: './feedbacks-read.html',
  styleUrl: './feedbacks-read.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UseFindFeedByParams],
})
export class FeedbacksRead extends UseInjCtxHk implements OnInit {
  private readonly useFindFeedByParams: UseFindFeedByParams = inject(UseFindFeedByParams);
  private readonly useFeedKit: UseFeedKit = inject(UseFeedKit);
  private readonly userSlice: UserSlice = inject(UserSlice);

  // ? derived
  public readonly found: Signal<Nullable<FeedbackT>> = this.useFindFeedByParams.found;
  public readonly pathEdit: Signal<string> = computed(() => `/feedbacks/put/${this.found()?.id}`);

  public readonly strategy: (data: ContentFormT) => Observable<unknown> = (data: ContentFormT) =>
    this.useFeedKit.api
      .postComm(data, {
        userId: this.userSlice.user()?.id as string,
        feedbackId: this.found()?.id as string,
      })
      .pipe(
        tap((res: ResApiT<{ comment: CommentT }>) => {
          const existing: FeedbackT[] = this.useFeedKit.slice.feedbacks() as FeedbackT[];

          this.useFeedKit.slice.setFeedbacks(
            existing.map((f: FeedbackT) =>
              f.id !== this.found()?.id
                ? f
                : {
                    ...f,
                    comments: [
                      { ...res.comment, user: this.userSlice.user() as UserT, replies: [] },
                      ...(f.comments ?? []),
                    ],
                  }
            )
          );

          window.scroll({ top: 0, behavior: 'smooth' });
        })
      );

  ngOnInit(): void {
    this.useFindFeedByParams.main();
  }
}
