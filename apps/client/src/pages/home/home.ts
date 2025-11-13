import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageWrapper } from '@/layout/page_wrapper/page-wrapper';
import { BtnApp } from '@/common/components/btns/btn__app/btn-app';
import { MainDrop } from '@/common/components/drop/main_drop/main-drop';
import { NgComponentOutlet, NgTemplateOutlet } from '@angular/common';
import { SvgT } from '@/common/types/etc';
import { SvgAdvIllustrationEmpty } from '@/common/components/svgs/advanced/illustration-empty/illustration-empty';

@Component({
  selector: 'app-home',
  imports: [PageWrapper, BtnApp, MainDrop, NgTemplateOutlet, NgComponentOutlet],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  public readonly Detective: SvgT = SvgAdvIllustrationEmpty;
}
