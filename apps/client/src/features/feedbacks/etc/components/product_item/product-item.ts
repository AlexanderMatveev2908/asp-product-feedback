import { LibPrs } from '@/core/lib/data_structure/prs/prs';
import { FeedbackT } from '@/features/feedbacks/etc/types';
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
  public readonly item: InputSignal<FeedbackT> = input.required();
  public readonly withLink: InputSignal<boolean> = input.required();

  public readonly upperCat: Signal<string> = computed(() =>
    LibPrs.firstCharUpper(this.item().category)
  );

  // ? statics

  // ? derived
  public readonly path: Signal<string> = computed(() => `feedbacks/read/${this.item()?.id}`);
}
