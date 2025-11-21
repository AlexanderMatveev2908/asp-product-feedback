import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { PageWrapper } from '@/layout/page_wrapper/page-wrapper';
import { LinkBack } from '@/common/components/links/link_back/link-back';
import { FeedbackForm } from '@/features/feedbacks/etc/forms/feedback_form/feedback-form';
import { UseFeedKit } from '@/features/feedbacks/etc/services/use_feed_kit';
import { EMPTY, Observable } from 'rxjs';
import { UseInjCtxHk } from '@/core/hooks/use_inj_ctx';
import { UseFindFeedByParams } from '@/core/hooks/use_find_feed_by_params';

@Component({
  selector: 'app-products-put',
  imports: [PageWrapper, LinkBack, FeedbackForm],
  templateUrl: './products-put.html',
  styleUrl: './products-put.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UseFindFeedByParams],
})
export class ProductsPut extends UseInjCtxHk implements OnInit {
  private readonly useFeedKit: UseFeedKit = inject(UseFeedKit);

  public readonly useFindFeedByParams: UseFindFeedByParams = inject(UseFindFeedByParams);

  public readonly putStrategy: (data: unknown) => Observable<unknown> = (_: unknown) => EMPTY;

  ngOnInit(): void {
    this.useFindFeedByParams.main();
  }
}
