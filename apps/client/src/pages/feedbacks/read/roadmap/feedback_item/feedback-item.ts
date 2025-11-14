import { Nullable } from '@/common/types/etc';
import { ProductsLibShape } from '@/features/feedbacks/etc/lib_shape';
import { FeedbackT } from '@/features/feedbacks/etc/types';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
  Signal,
} from '@angular/core';
import { FooterFeedback } from '@/features/feedbacks/etc/components/footer_feedback/footer-feedback';

@Component({
  selector: 'app-feedback-item',
  imports: [FooterFeedback],
  templateUrl: './feedback-item.html',
  styleUrl: './feedback-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackItem {
  public readonly item: InputSignal<FeedbackT> = input.required();

  public readonly statusLabel: Signal<Nullable<string>> = computed(() =>
    ProductsLibShape.statusLabelByVal(this.item().status)
  );
  public readonly catLabel: Signal<Nullable<string>> = computed(() =>
    ProductsLibShape.catLabelByVal(this.item().category)
  );
}
