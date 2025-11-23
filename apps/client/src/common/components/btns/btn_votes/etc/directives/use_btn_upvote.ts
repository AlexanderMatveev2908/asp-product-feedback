import { UseFocusHk } from '@/core/hooks/use_focus';
import { UseHoverHk } from '@/core/hooks/use_hover';
import { ErrApiT } from '@/core/store/api/etc/types';
import { UseFeedKit } from '@/features/feedbacks/etc/services/use_feed_kit';
import { Directive, inject, input, InputSignal } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Directive()
export abstract class UseBtnUpvoteDir {
  private readonly useFeedKit: UseFeedKit = inject(UseFeedKit);

  public readonly upvotes: InputSignal<number> = input.required();
  public readonly feedbackId: InputSignal<string> = input.required();

  public readonly useHover: UseHoverHk = inject(UseHoverHk);
  public readonly useFocus: UseFocusHk = inject(UseFocusHk);

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

  public mixedBlur(): void {
    this.useHover.onLeave();
    this.useFocus.onBlur();
  }
}
