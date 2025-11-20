import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  Signal,
} from '@angular/core';
import { PageWrapper } from '@/layout/page_wrapper/page-wrapper';
import { MainDrop } from '@/common/components/drop/main_drop/main-drop';
import { Nullable, OrNone, SortValT } from '@/common/types/etc';
import { FeedbacksSlice } from '@/features/feedbacks/slice';
import { FeedbackT } from '@/features/feedbacks/etc/types';
import { HomeNoData } from './home_no_data/home-no-data';
import { NavbarHomeMobile } from '@/layout/navbar_home_mobile/navbar-home-mobile';
import { SidebarMobile } from '@/layout/sidebar_mobile/sidebar-mobile';
import { UseMetaAppDir } from '@/core/directives/use_meta_app';
import { LinkMain } from '@/common/components/links/link_main/link-main';
import { FeedbackItem } from '@/features/feedbacks/etc/components/feedback_item/feedback-item';
import { UseSearchFeedbacksCtx } from '@/features/feedbacks/etc/context/use_search_feedbacks_ctx';
import { LibSort } from '@/core/lib/data_structure/sort';
import {
  KeySortT,
  SearchFeedbacksFormT,
} from '@/features/feedbacks/etc/forms/search_feedbacks/form_mng';

@Component({
  selector: 'app-home',
  imports: [
    PageWrapper,
    MainDrop,
    HomeNoData,
    NavbarHomeMobile,
    SidebarMobile,
    UseMetaAppDir,
    LinkMain,
    FeedbackItem,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home implements OnInit {
  private readonly feedbacksSlice: FeedbacksSlice = inject(FeedbacksSlice);
  private readonly useSearchCtx: UseSearchFeedbacksCtx = inject(UseSearchFeedbacksCtx);

  public readonly isPending: Signal<boolean> = this.feedbacksSlice.isPending;
  public readonly feedbacks: Signal<Nullable<FeedbackT[]>> = this.feedbacksSlice.feedbacks;

  private filterFeedbacks(arg: FeedbackT[]): FeedbackT[] {
    const filters: OrNone<string[]> = this.useSearchCtx.formData?.()?.category;
    if (!filters || filters.includes('ALL')) return arg;

    return arg.filter((f: FeedbackT) => filters.some((str: string) => str === f.category));
  }

  private sortFiltered(arg: FeedbackT[]): FeedbackT[] {
    const data: OrNone<SearchFeedbacksFormT> = this.useSearchCtx.formData?.();
    if (!data) return arg;

    const pairs: Record<KeySortT, keyof FeedbackT> = {
      upvotesSort: 'upvotes',
      commentsSort: 'commentsCount',
    };

    for (const key in pairs) {
      const formVal: unknown = data[key as keyof typeof data];
      if (formVal)
        return LibSort.sortBy(arg, pairs[key as keyof typeof pairs], formVal as SortValT);
    }

    return arg;
  }

  // ? derived
  public readonly sorted: Signal<Nullable<FeedbackT[]>> = computed(() => {
    const data: Nullable<FeedbackT[]> = this.feedbacks();
    if (!data) return [];

    const filtered: FeedbackT[] = this.filterFeedbacks(data);
    const finalResult: FeedbackT[] = this.sortFiltered(filtered);
    return finalResult;
  });

  ngOnInit(): void {
    this.useSearchCtx.setupForm();
  }
}
