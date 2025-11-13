import { LibPrs } from '@/core/lib/data_structure/prs/prs';
import { ProductT } from '@/features/products/etc/types';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
  Signal,
} from '@angular/core';

@Component({
  selector: 'app-product-item',
  imports: [],
  templateUrl: './product-item.html',
  styleUrl: './product-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductItem {
  public readonly item: InputSignal<ProductT> = input.required();

  public readonly upperCat: Signal<string> = computed(() =>
    LibPrs.firstCharUpper(this.item().category)
  );
}
