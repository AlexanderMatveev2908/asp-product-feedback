import { ReplyT } from '@/features/feedbacks/etc/types';
import { ChangeDetectionStrategy, Component, inject, input, InputSignal } from '@angular/core';
import { HeaderComment } from '@/features/feedbacks/etc/components/header_comment/header-comment';
import { UseToggleReplyHk } from '@/core/hooks/use_toggle_reply';
import { ReplyForm } from '@/features/feedbacks/etc/forms/reply_form/reply-form';
import { UseReplySvc } from '@/features/feedbacks/etc/services/use_reply';

@Component({
  selector: 'app-reply-item',
  imports: [HeaderComment, ReplyForm],
  templateUrl: './reply-item.html',
  styleUrl: './reply-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UseToggleReplyHk],
})
export class ReplyItem {
  public readonly reply: InputSignal<ReplyT> = input.required();
  public readonly isFirst: InputSignal<boolean> = input.required();

  public readonly useReply: UseReplySvc = inject(UseReplySvc);

  public readonly useToggleReply: UseToggleReplyHk = inject(UseToggleReplyHk);
}
