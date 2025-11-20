import { SvgT } from '@/common/types/etc';
import { NgComponentOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal,
  signal,
  WritableSignal,
} from '@angular/core';
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

  // ? local state
  public readonly isFocused: WritableSignal<boolean> = signal(false);

  public onFocus(): void {
    this.isFocused.set(true);
  }
  public onBlur(): void {
    this.isFocused.set(false);
  }

  // ? statics
  public readonly Chevron: SvgT = SvgStrokeIconArrowUp;
}
