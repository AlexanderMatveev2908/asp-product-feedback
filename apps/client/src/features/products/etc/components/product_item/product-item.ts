import { SvgAdvIconComments } from '@/common/components/svgs/advanced/icon-comments/icon-comments';
import { SvgStrokeIconArrowUp } from '@/common/components/svgs/stroke/icon-arrow-up/icon-arrow-up';
import { SvgT } from '@/common/types/etc';
import { LibPrs } from '@/core/lib/data_structure/prs/prs';
import { ProductT } from '@/features/products/etc/types';
import { NgComponentOutlet, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
  Signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-item',
  imports: [NgComponentOutlet, RouterLink, NgTemplateOutlet],
  templateUrl: './product-item.html',
  styleUrl: './product-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductItem {
  public readonly item: InputSignal<ProductT> = input.required();
  public readonly withLink: InputSignal<boolean> = input.required();

  public readonly upperCat: Signal<string> = computed(() =>
    LibPrs.firstCharUpper(this.item().category)
  );

  // ? statics
  public readonly Chevron: SvgT = SvgStrokeIconArrowUp;
  public readonly Comment: SvgT = SvgAdvIconComments;

  // ? derived
  public readonly path: Signal<string> = computed(() => `products/read/${this.item().id}`);
}
