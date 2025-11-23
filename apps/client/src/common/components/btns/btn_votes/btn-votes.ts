import { SvgT } from '@/common/types/etc';
import { NgComponentOutlet, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, InputSignal } from '@angular/core';
import { SvgStrokeIconArrowUp } from '../../svgs/stroke/icon-arrow-up/icon-arrow-up';
import { UseFeedKit } from '@/features/feedbacks/etc/services/use_feed_kit';
import { UseBtnFocusHk } from '@/core/hooks/use_btn_focus';
import { catchError, throwError } from 'rxjs';
import { ErrApiT } from '@/core/store/api/etc/types';
import { UseTabletDir } from '@/core/services/use_tablet';

@Component({
  selector: 'app-btn-votes',
  imports: [NgComponentOutlet, NgClass],
  templateUrl: './btn-votes.html',
  styleUrl: './btn-votes.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UseBtnFocusHk],
})
export class BtnVotes {
  private readonly useFeedKit: UseFeedKit = inject(UseFeedKit);

  public readonly useTablet: UseTabletDir = inject(UseTabletDir);

  public readonly upvotes: InputSignal<number> = input.required();
  public readonly feedbackId: InputSignal<string> = input.required();

  // ? hooks
  public readonly useBtnFocus: UseBtnFocusHk = inject(UseBtnFocusHk);

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
