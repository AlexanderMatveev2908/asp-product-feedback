import { SvgAdvIconComments } from '@/common/components/svgs/advanced/icon-comments/icon-comments';
import { Nullable, SvgT } from '@/common/types/etc';
import { UseNavSvc } from '@/core/services/use_nav';
import { FeedLibShape } from '@/features/feedbacks/etc/lib_shape';
import { FeedbackT } from '@/features/feedbacks/etc/types';
import { computed, Directive, inject, input, InputSignal, Signal } from '@angular/core';
import { Params } from '@angular/router';

@Directive()
export abstract class UseCardVersioningDir {
  public readonly item: InputSignal<FeedbackT> = input.required();

  private readonly useNav: UseNavSvc = inject(UseNavSvc);

  public readonly footerWithLink: Signal<boolean> = computed(() => {
    const path: Nullable<string> = this.useNav.currPath();
    if (!path) return false;

    const vars: Nullable<Params> = this.useNav.pathVariables();
    return !vars?.['feedbackID'];
  });

  // ? statics
  public readonly Comment: SvgT = SvgAdvIconComments;

  // ? derived
  public readonly pathComments: Signal<string> = computed(
    () => `/feedbacks/read/${this.item()?.id}`
  );

  public readonly catLabel: Signal<Nullable<string>> = computed(() =>
    FeedLibShape.catLabelByVal(this.item().category)
  );
}
