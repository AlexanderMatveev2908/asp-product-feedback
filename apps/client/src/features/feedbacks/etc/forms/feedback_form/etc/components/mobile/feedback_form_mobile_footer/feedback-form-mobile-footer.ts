import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BtnMain } from '@/common/components/btns/btn__main/btn-main';
import { UseMetaAppDir } from '@/core/directives/use_meta_app';
import { UseFeedbackFooterFormDir } from '../../../directives/use_feedback_footer_form';

@Component({
  selector: 'app-feedback-form-mobile-footer',
  imports: [BtnMain, UseMetaAppDir],
  templateUrl: './feedback-form-mobile-footer.html',
  styleUrl: './feedback-form-mobile-footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackFormMobileFooter extends UseFeedbackFooterFormDir {}
