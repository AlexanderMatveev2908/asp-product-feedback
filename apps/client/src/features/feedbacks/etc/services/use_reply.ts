import { inject, Injectable } from '@angular/core';
import { UseFeedKit } from './use_feed_kit';
import { Observable, tap } from 'rxjs';
import { ContentFormT } from '@/core/paperwork/etc/content_form_mng';
import { ArgPostReplyT } from '../../api';
import { UserSlice } from '@/features/user/slice';
import { ResApiT } from '@/core/store/api/etc/types';
import { CommentT, FeedbackT, ReplyT } from '../types';
import { Nullable, OrNone } from '@/common/types/etc';
import { ErrApp } from '@/core/lib/etc/err';
import { UserT } from '@/features/user/etc/types';

@Injectable({
  providedIn: 'root',
})
export class UseReplySvc {
  private readonly useFeedKit: UseFeedKit = inject(UseFeedKit);
  private readonly userSlice: UserSlice = inject(UserSlice);

  private findDataWorkedWith(
    existing: FeedbackT[],
    commentID: string
  ): [FeedbackT, CommentT, UserT] {
    let feedbackWorkedWith: Nullable<FeedbackT> = null;
    let commentWorkedWith: Nullable<CommentT> = null;
    let userReplied: Nullable<UserT> = null;

    for (const f of existing) {
      const currComments: OrNone<CommentT[]> = f.comments;
      if (!currComments || !currComments.length) continue;

      const foundComment: OrNone<CommentT> = currComments.find((c: CommentT) => c.id === commentID);
      if (!foundComment) continue;

      feedbackWorkedWith = f;
      commentWorkedWith = foundComment;
      userReplied = foundComment.user;
    }

    if (!feedbackWorkedWith || !commentWorkedWith || !userReplied)
      throw new ErrApp('Ops, replied to ghost data 👻');

    return [feedbackWorkedWith, commentWorkedWith, userReplied];
  }

  public readonly main: (
    data: ContentFormT,
    args: Omit<ArgPostReplyT, 'userId'>
  ) => Observable<unknown> = (data: ContentFormT, args: Omit<ArgPostReplyT, 'userId'>) =>
    this.useFeedKit.api
      .postReply(data, { ...args, userId: this.userSlice.user()?.id as string })
      .pipe(
        tap((res: ResApiT<{ reply: ReplyT }>) => {
          const existing: FeedbackT[] = this.useFeedKit.slice.feedbacks() as FeedbackT[];

          const [feedback, comment, userReplied] = this.findDataWorkedWith(
            existing,
            args.commentId
          );

          const updated: FeedbackT[] = existing.map((f: FeedbackT) =>
            f.id !== feedback.id
              ? f
              : {
                  ...f,
                  comments: f.comments!.map((c: CommentT) =>
                    c.id !== comment.id
                      ? c
                      : {
                          ...c,
                          replies: [
                            ...(c.replies ?? []),
                            {
                              ...res.reply,
                              user: this.userSlice.user() as UserT,
                              replyingTo: userReplied,
                            },
                          ],
                        }
                  ),
                }
          );

          this.useFeedKit.slice.setFeedbacks(updated);
        })
      );
}
