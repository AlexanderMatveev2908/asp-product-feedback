import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UseBtnUpvoteDir } from '../etc/directives/use_btn_upvote';
import { BtnVotesContent } from '../etc/fragments/btn_votes_content/btn-votes-content';
import { UseHoverHk } from '@/core/hooks/use_hover';
import { UseFocusHk } from '@/core/hooks/use_focus';

@Component({
  selector: 'app-btn-votes-responsive',
  imports: [BtnVotesContent],
  templateUrl: './btn-votes-responsive.html',
  styleUrl: './btn-votes-responsive.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UseHoverHk, UseFocusHk],
})
export class BtnVotesResponsive extends UseBtnUpvoteDir {}
