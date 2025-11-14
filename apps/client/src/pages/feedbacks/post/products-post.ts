import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageWrapper } from '@/layout/page_wrapper/page-wrapper';
import { LinkBack } from '@/common/components/links/link_back/link-back';
import { FeedbackForm } from '@/features/feedbacks/etc/forms/feedback_form/feedback-form';

@Component({
  selector: 'app-products-post',
  imports: [PageWrapper, LinkBack, FeedbackForm],
  templateUrl: './products-post.html',
  styleUrl: './products-post.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsPost {}
