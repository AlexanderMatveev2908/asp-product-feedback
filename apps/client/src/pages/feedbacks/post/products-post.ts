import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PageWrapper } from '@/layout/page_wrapper/page-wrapper';
import { LinkBack } from '@/common/components/links/link_back/link-back';
import { FeedbackForm } from '@/features/feedbacks/etc/forms/feedback_form/feedback-form';
import { UseFeedKit } from '@/features/feedbacks/etc/services/use_feed_kit';
import { FeedFormPostT } from '@/features/feedbacks/etc/forms/feedback_form/etc/form_mng';
import { Observable, tap } from 'rxjs';
import { ResApiT } from '@/core/store/api/etc/types';
import { FeedbackT } from '@/features/feedbacks/etc/types';
import { UseNavSvc } from '@/core/services/use_nav';

@Component({
  selector: 'app-products-post',
  imports: [PageWrapper, LinkBack, FeedbackForm],
  templateUrl: './products-post.html',
  styleUrl: './products-post.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsPost {
  private readonly useFeedKit: UseFeedKit = inject(UseFeedKit);
  private readonly useNav: UseNavSvc = inject(UseNavSvc);

  public readonly postStrategy: (data: FeedFormPostT) => Observable<unknown> = (
    data: FeedFormPostT
  ) =>
    this.useFeedKit.api.post(data).pipe(
      tap((_: ResApiT<{ feedback: FeedbackT }>) => {
        this.useFeedKit.slice.refetch();

        void this.useNav.replace('/');
      })
    );
}
