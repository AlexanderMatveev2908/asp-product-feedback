import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UseBtnUpvoteDir } from '../etc/directives/use_btn_upvote';
import { NgComponentOutlet } from '@angular/common';

@Component({
  selector: 'app-btn-votes-base',
  imports: [NgComponentOutlet],
  templateUrl: './btn-votes-base.html',
  styleUrl: './btn-votes-base.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BtnVotesBase extends UseBtnUpvoteDir {}
