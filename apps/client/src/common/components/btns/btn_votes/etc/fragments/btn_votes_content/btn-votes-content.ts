import { SvgStrokeIconArrowUp } from '@/common/components/svgs/stroke/icon-arrow-up/icon-arrow-up';
import { SvgT } from '@/common/types/etc';
import { NgComponentOutlet, NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
  Signal,
} from '@angular/core';

@Component({
  selector: 'app-btn-votes-content',
  imports: [NgComponentOutlet, NgClass],
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

  public readonly twdLabel: Signal<string> = computed(() =>
    this.isFocused() ? 'text-white' : 'text-blue__dark__0'
  );
  public readonly twdSvg: Signal<string> = computed(() =>
    this.isFocused() ? 'text-white' : 'text-blue__prm'
  );
}
