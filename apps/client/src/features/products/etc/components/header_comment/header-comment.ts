import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
  Signal,
} from '@angular/core';
import { CommentT, ReplyT } from '../../types';

@Component({
  selector: 'app-header-comment',
  imports: [],
  templateUrl: './header-comment.html',
  styleUrl: './header-comment.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComment {
  public readonly comment: InputSignal<CommentT | ReplyT> = input.required();

  public readonly devImage: Signal<string> = computed(
    () => `/images/users/${this.comment().user.image}`
  );
}
