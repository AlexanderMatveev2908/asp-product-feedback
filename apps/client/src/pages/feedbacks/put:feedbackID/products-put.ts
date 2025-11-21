import { ChangeDetectionStrategy, Component, inject, OnInit, Signal } from '@angular/core';
import { PageWrapper } from '@/layout/page_wrapper/page-wrapper';
import { LinkBack } from '@/common/components/links/link_back/link-back';
import { FeedbackForm } from '@/features/feedbacks/etc/forms/feedback_form/feedback-form';
import { UseFeedKit } from '@/features/feedbacks/etc/services/use_feed_kit';
import { Observable, tap } from 'rxjs';
import { UseInjCtxHk } from '@/core/hooks/use_inj_ctx';
import { UseFindFeedByParams } from '@/core/hooks/use_find_feed_by_params';
import { Nullable } from '@/common/types/etc';
import { FeedbackCatT, FeedbackStatusT, FeedbackT } from '@/features/feedbacks/etc/types';
import {
  FeedFormPostT,
  FeedFormPutT,
} from '@/features/feedbacks/etc/forms/feedback_form/etc/form_mng';
import { ResApiT } from '@/core/store/api/etc/types';
import { UseNavSvc } from '@/core/services/use_nav';

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
  private readonly useNav: UseNavSvc = inject(UseNavSvc);

  private readonly useFindFeedByParams: UseFindFeedByParams = inject(UseFindFeedByParams);

  public readonly found: Signal<Nullable<FeedbackT>> = this.useFindFeedByParams.found;

  public readonly putStrategy: (data: FeedFormPostT | FeedFormPutT) => Observable<unknown> = (
    data: FeedFormPostT | FeedFormPutT
  ) => {
    const castedData: FeedFormPutT = data as FeedFormPutT;

    return this.useFeedKit.api.put(castedData, this.found()?.id as string).pipe(
      tap((_: ResApiT<{ feedback: FeedbackT }>) => {
        // ! is impossible to update a feed if they do not exists
        // ! so I think is fine to assert here
        const existing: FeedbackT[] = this.useFeedKit.slice.feedbacks() as FeedbackT[];

        // | I can avoid fetching again feedbacks,
        // | if response is 200 then it means server handled update well
        this.useFeedKit.slice.setFeedbacks(
          existing.map((el: FeedbackT) =>
            el.id !== this.found()?.id
              ? el
              : {
                  ...el,
                  title: castedData.title,
                  category: castedData.category as FeedbackCatT,
                  status: castedData.status as FeedbackStatusT,
                  description: castedData.content,
                }
          )
        );

        void this.useNav.replace('/');
      })
    );
  };

  ngOnInit(): void {
    this.useFindFeedByParams.main();
  }
}
