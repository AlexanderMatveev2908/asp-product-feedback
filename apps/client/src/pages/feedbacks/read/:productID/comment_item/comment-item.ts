import { CommentT } from '@/features/feedbacks/etc/types';
import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { ReplyItem } from './reply_item/reply-item';
import { HeaderComment } from '@/features/feedbacks/etc/components/header_comment/header-comment';

@Component({
  selector: 'app-comment-item',
  imports: [ReplyItem, HeaderComment],
  templateUrl: './comment-item.html',
  styleUrl: './comment-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentItem {
  public readonly comment: InputSignal<CommentT> = input.required();
  public readonly isLast: InputSignal<boolean> = input.required();
}
