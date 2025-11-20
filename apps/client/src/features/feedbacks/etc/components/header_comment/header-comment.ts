import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { CommentT, ReplyT } from '../../types';
import { ImgLoader } from '@/common/components/hoc/assets/img_loader/img-loader';

@Component({
  selector: 'app-header-comment',
  imports: [ImgLoader],
  templateUrl: './header-comment.html',
  styleUrl: './header-comment.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComment {
  public readonly comment: InputSignal<CommentT | ReplyT> = input.required();
}
