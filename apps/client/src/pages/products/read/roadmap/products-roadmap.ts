import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LinkBack } from '@/common/components/links/link_back/link-back';
import { LinkMain } from '@/common/components/links/link_main/link-main';
import { UseMetaAppDir } from '@/core/directives/use_meta_app';
import { PageWrapper } from '@/layout/page_wrapper/page-wrapper';
import { PairValLabelTypedT } from '@/common/types/forms';
import { ProductStatusT } from '@/features/products/etc/types';
import { ProductsLibShape } from '@/features/products/etc/lib_shape';

@Component({
  selector: 'app-products-roadmap',
  imports: [LinkBack, LinkMain, UseMetaAppDir, PageWrapper],
  templateUrl: './products-roadmap.html',
  styleUrl: './products-roadmap.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsRoadmap {
  public readonly statuses: PairValLabelTypedT<ProductStatusT>[] =
    ProductsLibShape.statusesFilter();
}
