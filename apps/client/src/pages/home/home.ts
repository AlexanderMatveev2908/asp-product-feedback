import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageWrapper } from '@/layout/page_wrapper/page-wrapper';
import { SvgT } from '@/common/types/etc';
import { NgComponentOutlet } from '@angular/common';
import { SvgStrokeIconArrowDown } from '@/common/components/svgs/stroke/icon-arrow-down/icon-arrow-down';
import { BtnApp } from '@/common/components/btns/btn__app/btn-app';

@Component({
  selector: 'app-home',
  imports: [PageWrapper, NgComponentOutlet, BtnApp],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  public readonly Chevron: SvgT = SvgStrokeIconArrowDown;
}
