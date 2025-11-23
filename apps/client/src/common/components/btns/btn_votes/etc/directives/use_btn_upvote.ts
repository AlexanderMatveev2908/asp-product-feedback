import { SvgStrokeIconArrowUp } from '@/common/components/svgs/stroke/icon-arrow-up/icon-arrow-up';
import { SvgT } from '@/common/types/etc';
import { ErrApiT } from '@/core/store/api/etc/types';
import { UseFeedKit } from '@/features/feedbacks/etc/services/use_feed_kit';
import { Directive, inject, input, InputSignal } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Directive()
export abstract class UseBtnUpvoteDir {
  private readonly useFeedKit: UseFeedKit = inject(UseFeedKit);

  public readonly upvotes: InputSignal<number> = input.required();
  public readonly feedbackId: InputSignal<string> = input.required();

  // ? listeners
  public optimisticLike(): void {
    this.useFeedKit.slice.optimisticLike(this.feedbackId());
    this.useFeedKit.api
      .likeFeed(this.feedbackId())
      .pipe(
        catchError((err: ErrApiT<void>) => {
          this.useFeedKit.slice.rollbackLike();

          return throwError(() => err);
        })
      )
      .subscribe();
  }

  // ? statics
  public readonly Chevron: SvgT = SvgStrokeIconArrowUp;
}
