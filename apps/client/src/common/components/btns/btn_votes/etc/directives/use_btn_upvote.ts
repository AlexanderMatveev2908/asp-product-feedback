import { SvgStrokeIconArrowUp } from '@/common/components/svgs/stroke/icon-arrow-up/icon-arrow-up';
import { SvgT } from '@/common/types/etc';
import { UseFocusHk } from '@/core/hooks/use_focus';
import { UseHoverHk } from '@/core/hooks/use_hover';
import { ErrApiT } from '@/core/store/api/etc/types';
import { UseFeedKit } from '@/features/feedbacks/etc/services/use_feed_kit';
import { computed, Directive, inject, input, InputSignal, Signal } from '@angular/core';
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

  // ? statics
  public readonly Chevron: SvgT = SvgStrokeIconArrowUp;

  // ? derived
  public readonly twdLabel: Signal<string> = computed(() =>
    this.useFocus.isFocused() ? 'text-white' : 'text-blue__dark__0'
  );
  public readonly twdSvg: Signal<string> = computed(() =>
    this.useFocus.isFocused() ? 'text-white' : 'text-blue__prm'
  );
}
