import { SvgT } from '@/common/types/etc';
import { NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { SvgStrokeIconArrowUp } from '../../svgs/stroke/icon-arrow-up/icon-arrow-up';

@Component({
  selector: 'app-btn-votes',
  imports: [NgComponentOutlet],
  templateUrl: './btn-votes.html',
  styleUrl: './btn-votes.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BtnVotes {
  public readonly upvotes: InputSignal<number> = input.required();

  public readonly Chevron: SvgT = SvgStrokeIconArrowUp;
}
