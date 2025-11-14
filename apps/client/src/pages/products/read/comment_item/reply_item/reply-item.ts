import { ReplyT } from '@/features/products/etc/types';
import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { HeaderComment } from '@/features/products/etc/components/header_comment/header-comment';

@Component({
  selector: 'app-reply-item',
  imports: [HeaderComment],
  templateUrl: './reply-item.html',
  styleUrl: './reply-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReplyItem {
  public readonly reply: InputSignal<ReplyT> = input.required();
  public readonly isFirst: InputSignal<boolean> = input.required();
}
