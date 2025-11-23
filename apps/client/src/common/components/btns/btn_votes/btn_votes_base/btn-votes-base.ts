import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UseBtnUpvoteDir } from '../etc/directives/use_btn_upvote';
import { UseHoverHk } from '@/core/hooks/use_hover';
import { UseFocusHk } from '@/core/hooks/use_focus';
import { NgClass, NgComponentOutlet } from '@angular/common';

@Component({
  selector: 'app-btn-votes-base',
  imports: [NgClass, NgComponentOutlet],
  templateUrl: './btn-votes-base.html',
  styleUrl: './btn-votes-base.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UseHoverHk, UseFocusHk],
})
export class BtnVotesBase extends UseBtnUpvoteDir {}
