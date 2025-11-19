import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { PageWrapper } from '@/layout/page_wrapper/page-wrapper';
import { MainDrop } from '@/common/components/drop/main_drop/main-drop';
import { Nullable } from '@/common/types/etc';
import { FeedbacksSlice } from '@/features/feedbacks/slice';
import { FeedbackT } from '@/features/feedbacks/etc/types';
import { HomeNoData } from './home_no_data/home-no-data';
import { NavbarHomeMobile } from '@/layout/navbar_home_mobile/navbar-home-mobile';
import { SidebarMobile } from '@/layout/sidebar_mobile/sidebar-mobile';
import { UseMetaAppDir } from '@/core/directives/use_meta_app';
import { LinkMain } from '@/common/components/links/link_main/link-main';
import { FeedbackItem } from '@/features/feedbacks/etc/components/feedback_item/feedback-item';

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
export class Home {
  private readonly productsSLice: FeedbacksSlice = inject(FeedbacksSlice);

  public readonly isPending: Signal<boolean> = this.productsSLice.isPending;
  public readonly feedbacks: Signal<Nullable<FeedbackT[]>> = this.productsSLice.feedbacks;
}
