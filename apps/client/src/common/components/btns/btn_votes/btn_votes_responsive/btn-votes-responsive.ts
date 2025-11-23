import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UseBtnUpvoteDir } from '../etc/directives/use_btn_upvote';
import { UseHoverHk } from '@/core/hooks/use_hover';
import { UseFocusHk } from '@/core/hooks/use_focus';
import { NgClass, NgComponentOutlet } from '@angular/common';

@Component({
  selector: 'app-btn-votes-responsive',
  imports: [NgComponentOutlet, NgClass],
  templateUrl: './btn-votes-responsive.html',
  styleUrl: './btn-votes-responsive.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UseHoverHk, UseFocusHk],
})
export class BtnVotesResponsive extends UseBtnUpvoteDir {}
