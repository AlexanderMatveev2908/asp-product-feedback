import { LibPrs } from '@/core/lib/data_structure/prs/prs';
import { ProductT } from '@/features/products/etc/types';
import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
  Signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { FooterFeedback } from '../footer_feedback/footer-feedback';

@Component({
  selector: 'app-product-item',
  imports: [RouterLink, NgTemplateOutlet, FooterFeedback],
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

  // ? derived
  public readonly path: Signal<string> = computed(() => `products/read/${this.item()?.id}`);
}
