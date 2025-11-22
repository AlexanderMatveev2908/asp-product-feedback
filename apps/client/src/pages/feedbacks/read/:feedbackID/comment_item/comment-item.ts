import { CommentT } from '@/features/feedbacks/etc/types';
import { ChangeDetectionStrategy, Component, inject, input, InputSignal } from '@angular/core';
import { ReplyItem } from './reply_item/reply-item';
import { HeaderComment } from '@/features/feedbacks/etc/components/header_comment/header-comment';
import { ReplyForm } from '@/features/feedbacks/etc/forms/reply_form/reply-form';
import { UseReplySvc } from '@/features/feedbacks/etc/services/use_reply';

@Component({
  selector: 'app-comment-item',
  imports: [ReplyItem, HeaderComment, ReplyForm],
  templateUrl: './comment-item.html',
  styleUrl: './comment-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentItem {
  public readonly comment: InputSignal<CommentT> = input.required();
  public readonly isLast: InputSignal<boolean> = input.required();

  public readonly useReply: UseReplySvc = inject(UseReplySvc);
}
