import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LinkBack } from '@/common/components/links/link_back/link-back';
import { LinkMain } from '@/common/components/links/link_main/link-main';
import { UseMetaAppDir } from '@/core/directives/use_meta_app';

@Component({
  selector: 'app-products-roadmap',
  imports: [LinkBack, LinkMain, UseMetaAppDir],
  templateUrl: './products-roadmap.html',
  styleUrl: './products-roadmap.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsRoadmap {}
