import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BtnApp } from '@/common/components/btns/btn__app/btn-app';
import { NgComponentOutlet } from '@angular/common';
import { SvgAdvIllustrationEmpty } from '@/common/components/svgs/advanced/illustration-empty/illustration-empty';
import { SvgT } from '@/common/types/etc';

@Component({
  selector: 'app-home-no-data',
  imports: [BtnApp, NgComponentOutlet],
  templateUrl: './home-no-data.html',
  styleUrl: './home-no-data.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeNoData {
  // ? static
  public readonly Detective: SvgT = SvgAdvIllustrationEmpty;
}
