import { SvgFillIconArrowDown } from '@/common/components/svgs/fill/icon-arrow-down/icon-arrow-down';
import { SvgT } from '@/common/types/etc';
import { NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [NgComponentOutlet],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  public readonly Curr: SvgT = SvgFillIconArrowDown;
}
