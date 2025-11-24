import { SvgAdvIconComments } from '@/common/components/svgs/advanced/icon-comments/icon-comments';
import { Nullable, SvgT } from '@/common/types/etc';
import { UseNavSvc } from '@/core/services/use_nav';
import { FeedbackT } from '@/features/feedbacks/etc/types';
import { NgClass, NgComponentOutlet, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  InputSignal,
  Signal,
} from '@angular/core';
import { Params, RouterLink } from '@angular/router';

@Component({
  selector: 'app-comments-count',
  imports: [NgComponentOutlet, RouterLink, NgTemplateOutlet, NgClass],
  templateUrl: './comments-count.html',
  styleUrl: './comments-count.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentsCount {
  public readonly responsive: InputSignal<boolean> = input.required();

  // ? statics
  public readonly Comment: SvgT = SvgAdvIconComments;

  public readonly item: InputSignal<FeedbackT> = input.required();

  private readonly useNav: UseNavSvc = inject(UseNavSvc);

  public readonly footerWithLink: Signal<boolean> = computed(() => {
    const path: Nullable<string> = this.useNav.currPath();
    if (!path) return false;

    const vars: Nullable<Params> = this.useNav.pathVariables();
    return !vars?.['feedbackID'];
  });

  // ? derived
  public readonly pathComments: Signal<string> = computed(
    () => `/feedbacks/read/${this.item()?.id}`
  );
}
