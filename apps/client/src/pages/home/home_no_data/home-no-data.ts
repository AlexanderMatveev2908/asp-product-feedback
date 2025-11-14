import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { SvgAdvIllustrationEmpty } from '@/common/components/svgs/advanced/illustration-empty/illustration-empty';
import { SvgT } from '@/common/types/etc';
import { UseMetaAppDir } from '@/core/directives/use_meta_app';
import { LinkMain } from '@/common/components/links/link_main/link-main';

@Component({
  selector: 'app-home-no-data',
  imports: [NgComponentOutlet, UseMetaAppDir, LinkMain],
  templateUrl: './home-no-data.html',
  styleUrl: './home-no-data.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeNoData {
  // ? static
  public readonly Detective: SvgT = SvgAdvIllustrationEmpty;
}
