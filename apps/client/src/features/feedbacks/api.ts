import { ObsResT } from '@/core/store/api/etc/types';
import { UseApiSvc } from '@/core/store/api/use_api';
import { inject, Injectable } from '@angular/core';
import { CommentT, FeedbackT, ReplyT } from './etc/types';
import { LibApiArgs } from '@/core/store/api/etc/lib/api_args';
import { FeedFormPostT, FeedFormPutT } from './etc/forms/feedback_form/etc/form_mng';
import { ContentFormT } from '../../core/paperwork/etc/content_form_mng';

interface ArgPostCommentT {
  feedbackId: string;
  userId: string;
}

export interface ArgPostReplyT extends Omit<ArgPostCommentT, 'feedbackId'> {
  replyingToId: string;
  commentId: string;
}

@Injectable({
  providedIn: 'root',
})
export class FeedbacksApiSvc {
  private readonly baseFeed: string = '/feedbacks';
  private readonly baseComm: string = '/comments';
  private readonly baseReply: string = '/replies';

  private readonly api: UseApiSvc = inject(UseApiSvc);

  public getAllFeedbacksSSR(): ObsResT<{ feedbacks: FeedbackT[] }> {
    return this.api.get(LibApiArgs.withURL(`${this.baseFeed}`).noToast());
  }
  public getAllFeedbacksCSR(): ObsResT<{ feedbacks: FeedbackT[] }> {
    return this.api.get(LibApiArgs.withURL(`${this.baseFeed}`).toastOnErr());
  }

  public likeFeed(feedbackId: string): ObsResT<void> {
    return this.api.patch(
      LibApiArgs.withURL(`${this.baseFeed}/like/${feedbackId}`)
        .toastOnFulfilled()
        .toastOkMsg('added upvote')
    );
  }

  public postFeed(data: FeedFormPostT): ObsResT<{ feedback: FeedbackT }> {
    return this.api.post(
      LibApiArgs.withURL(`${this.baseFeed}`)
        .body(data)
        .toastOnFulfilled()
        .toastOkMsg('created feedback')
    );
  }

  public putFeed(data: FeedFormPutT, feedbackId: string): ObsResT<{ feedback: FeedbackT }> {
    return this.api.put(
      LibApiArgs.withURL(`${this.baseFeed}/${feedbackId}`)
        .body(data)
        .toastOnFulfilled()
        .toastOkMsg('updated feedback')
    );
  }

  public delFeed(feedbackId: string): ObsResT<void> {
    return this.api.delete(
      LibApiArgs.withURL(`${this.baseFeed}/${feedbackId}`)
        .toastOnFulfilled()
        .toastOkMsg('deleted feedback')
    );
  }

  public postComm(
    data: ContentFormT,
    { feedbackId, userId }: ArgPostCommentT
  ): ObsResT<{ comment: CommentT }> {
    return this.api.post(
      LibApiArgs.withURL(`${this.baseComm}/${feedbackId}`)
        .body({
          userId,
          content: data.content,
        })
        .toastOnFulfilled()
        .toastOkMsg('comment posted')
    );
  }

  public postReply(
    data: ContentFormT,
    { commentId, replyingToId, userId }: ArgPostReplyT
  ): ObsResT<{ reply: ReplyT }> {
    return this.api.post(
      LibApiArgs.withURL(`${this.baseReply}/${commentId}`)
        .body({
          content: data.content,
          replyingToId,
          userId,
        })
        .toastOnFulfilled()
        .toastOkMsg('reply posted')
    );
  }
}
