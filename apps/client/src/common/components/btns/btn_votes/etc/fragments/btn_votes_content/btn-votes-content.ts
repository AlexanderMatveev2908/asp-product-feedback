import { SvgStrokeIconArrowUp } from '@/common/components/svgs/stroke/icon-arrow-up/icon-arrow-up';
import { SvgT } from '@/common/types/etc';
import { NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-btn-votes-content',
  imports: [NgComponentOutlet],
  templateUrl: './btn-votes-content.html',
  styleUrl: './btn-votes-content.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BtnVotesContent {
  public readonly upvotes: InputSignal<number> = input.required();
  public readonly isFocused: InputSignal<boolean> = input.required();
  public readonly isHover: InputSignal<boolean> = input.required();

  // ? statics
  public readonly Chevron: SvgT = SvgStrokeIconArrowUp;
}
