import { SvgAdvIconEditFeedback } from '@/common/components/svgs/advanced/icon-edit-feedback/icon-edit-feedback';
import { SvgFillIconArrowDown } from '@/common/components/svgs/fill/icon-arrow-down/icon-arrow-down';
import { SvgFillIconArrowLeft } from '@/common/components/svgs/fill/icon-arrow-left/icon-arrow-left';
import { SvgFillIconArrowUp } from '@/common/components/svgs/fill/icon-arrow-up/icon-arrow-up';
import { SvgFillIconClose } from '@/common/components/svgs/fill/icon-close/icon-close';
import { SvgFillIconComments } from '@/common/components/svgs/fill/icon-comments/icon-comments';
import { SvgFillIconHamburger } from '@/common/components/svgs/fill/icon-hamburger/icon-hamburger';
import { SvgFillIconPlus } from '@/common/components/svgs/fill/icon-plus/icon-plus';
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
  public readonly Curr: SvgT = SvgAdvIconEditFeedback;
}
