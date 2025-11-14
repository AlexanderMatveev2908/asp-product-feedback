import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
  Signal,
} from '@angular/core';
import { CommentT } from '../../types';

@Component({
  selector: 'app-header-comment',
  imports: [],
  templateUrl: './header-comment.html',
  styleUrl: './header-comment.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComment {
  public readonly comment: InputSignal<CommentT> = input.required();

  public readonly devImage: Signal<string> = computed(
    () => `/images/users/${this.comment().user.image}`
  );
}
