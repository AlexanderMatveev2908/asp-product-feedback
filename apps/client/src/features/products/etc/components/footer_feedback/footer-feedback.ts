import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { BtnVotes } from '@/common/components/btns/btn_votes/btn-votes';
import { ProductT } from '../../types';
import { NgComponentOutlet } from '@angular/common';
import { SvgT } from '@/common/types/etc';
import { SvgAdvIconComments } from '@/common/components/svgs/advanced/icon-comments/icon-comments';

@Component({
  selector: 'app-footer-feedback',
  imports: [BtnVotes, NgComponentOutlet],
  templateUrl: './footer-feedback.html',
  styleUrl: './footer-feedback.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterFeedback {
  public readonly item: InputSignal<ProductT> = input.required();

  public readonly Comment: SvgT = SvgAdvIconComments;
}
