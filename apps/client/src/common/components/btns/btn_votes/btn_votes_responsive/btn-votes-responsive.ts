import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UseBtnUpvoteDir } from '../etc/directives/use_btn_upvote';
import { NgComponentOutlet } from '@angular/common';

@Component({
  selector: 'app-btn-votes-responsive',
  imports: [NgComponentOutlet],
  templateUrl: './btn-votes-responsive.html',
  styleUrl: './btn-votes-responsive.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BtnVotesResponsive extends UseBtnUpvoteDir {}
