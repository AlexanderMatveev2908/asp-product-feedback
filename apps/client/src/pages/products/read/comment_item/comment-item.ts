import { CommentT } from '@/features/products/etc/types';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
  Signal,
} from '@angular/core';

@Component({
  selector: 'app-comment-item',
  imports: [],
  templateUrl: './comment-item.html',
  styleUrl: './comment-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentItem {
  public readonly comment: InputSignal<CommentT> = input.required();
  public readonly isLast: InputSignal<boolean> = input.required();

  public readonly devImage: Signal<string> = computed(
    () => `/images/users/${this.comment().user.image}`
  );
}
