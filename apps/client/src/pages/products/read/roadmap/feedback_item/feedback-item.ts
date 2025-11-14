import { Nullable } from '@/common/types/etc';
import { ProductsLibShape } from '@/features/products/etc/lib_shape';
import { ProductT } from '@/features/products/etc/types';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
  Signal,
} from '@angular/core';
import { FooterFeedback } from '@/features/products/etc/components/footer_feedback/footer-feedback';

@Component({
  selector: 'app-feedback-item',
  imports: [FooterFeedback],
  templateUrl: './feedback-item.html',
  styleUrl: './feedback-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackItem {
  public readonly item: InputSignal<ProductT> = input.required();

  public readonly statusLabel: Signal<Nullable<string>> = computed(() =>
    ProductsLibShape.statusLabelByVal(this.item().status)
  );
  public readonly catLabel: Signal<Nullable<string>> = computed(() =>
    ProductsLibShape.catLabelByVal(this.item().category)
  );
}
