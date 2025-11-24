import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LinkBack } from '@/common/components/links/link_back/link-back';
import { LinkMain } from '@/common/components/links/link_main/link-main';
import { UseMetaAppDir } from '@/core/directives/use_meta_app';
import { PageWrapper } from '@/layout/page_wrapper/page-wrapper';
import { UseRoadmapCtx } from '@/features/feedbacks/etc/context/use_roadmap_ctx';
import { MobileRoadHeader } from './etc/mobile/mobile_road_header/mobile-road-header';
import { TabletRoadHeader } from './etc/tablet/tablet_road_header/tablet-road-header';
import { RoadContentMobile } from './etc/mobile/road_content_mobile/road-content-mobile.';
import { RoadContentTablet } from './etc/tablet/road_content_tablet/road-content-tablet';

@Component({
  selector: 'app-feedbacks-roadmap',
  imports: [
    LinkBack,
    LinkMain,
    UseMetaAppDir,
    PageWrapper,
    MobileRoadHeader,
    TabletRoadHeader,
    RoadContentMobile,
    RoadContentTablet,
  ],
  templateUrl: './feedbacks-roadmap.html',
  styleUrl: './feedbacks-roadmap.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbacksRoadmap {
  public readonly useRoadCtx: UseRoadmapCtx = inject(UseRoadmapCtx);
}
