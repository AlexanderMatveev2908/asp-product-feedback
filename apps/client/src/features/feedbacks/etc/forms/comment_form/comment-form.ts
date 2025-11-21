import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BtnMain } from '@/common/components/btns/btn__main/btn-main';
import { UseMetaAppDir } from '@/core/directives/use_meta_app';

@Component({
  selector: 'app-comment-form',
  imports: [BtnMain, UseMetaAppDir],
  templateUrl: './comment-form.html',
  styleUrl: './comment-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentForm {}
