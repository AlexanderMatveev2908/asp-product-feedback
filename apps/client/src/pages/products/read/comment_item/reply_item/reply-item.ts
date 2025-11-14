import { ReplyT } from '@/features/products/etc/types';
import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-reply-item',
  imports: [],
  templateUrl: './reply-item.html',
  styleUrl: './reply-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReplyItem {
  public readonly reply: InputSignal<ReplyT> = input.required();
}
