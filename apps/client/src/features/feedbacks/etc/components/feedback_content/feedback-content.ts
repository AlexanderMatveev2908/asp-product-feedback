import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
  Signal,
} from '@angular/core';
import { FeedbackT } from '../../types';
import { ProductsLibShape } from '../../lib_shape';
import { Nullable, SvgT } from '@/common/types/etc';
import { BtnVotes } from '@/common/components/btns/btn_votes/btn-votes';
import { NgComponentOutlet } from '@angular/common';
import { SvgAdvIconComments } from '@/common/components/svgs/advanced/icon-comments/icon-comments';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-feedback-content',
  imports: [BtnVotes, NgComponentOutlet, RouterLink],
  templateUrl: './feedback-content.html',
  styleUrl: './feedback-content.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackContent {
  public readonly item: InputSignal<FeedbackT> = input.required();

  // ? statics
  public readonly Comment: SvgT = SvgAdvIconComments;

  // ? derived
  public readonly path: Signal<string> = computed(() => `/feedbacks/read/${this.item()?.id}`);

  public readonly catLabel: Signal<Nullable<string>> = computed(() =>
    ProductsLibShape.catLabelByVal(this.item().category)
  );
}
