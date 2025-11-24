import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UseFeedbackFooterFormDir } from '../../../directives/use_feedback_footer_form';
import { BtnMain } from '@/common/components/btns/btn__main/btn-main';
import { UseMetaAppDir } from '@/core/directives/use_meta_app';

@Component({
  selector: 'app-feedback-form-tablet-footer',
  imports: [BtnMain, UseMetaAppDir],
  templateUrl: './feedback-form-tablet-footer.html',
  styleUrl: './feedback-form-tablet-footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackFormTabletFooter extends UseFeedbackFooterFormDir {}
