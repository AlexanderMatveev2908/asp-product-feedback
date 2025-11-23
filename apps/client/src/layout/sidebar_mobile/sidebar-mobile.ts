import {
  ChangeDetectionStrategy,
  Component,
  computed,
  HostListener,
  inject,
  OnInit,
  Signal,
  ViewChild,
} from '@angular/core';
import { BlackBg } from '../black_bg/black-bg';
import { SidebarMobileSlice } from '@/features/sidebar_mobile/slice';
import { NgClass } from '@angular/common';
import { ElDomT, RefDomT } from '@/common/types/dom';
import { RouterLink } from '@angular/router';
import { UseSearchFeedbacksCtx } from '@/features/feedbacks/etc/context/use_search_feedbacks_ctx';
import { UseRoadmapCtx } from '@/features/feedbacks/etc/context/use_roadmap_ctx';
import { FeedbacksFilters } from '@/features/feedbacks/etc/components/feedbacks_filters/feedbacks-filters';

@Component({
  selector: 'app-sidebar-mobile',
  imports: [BlackBg, NgClass, RouterLink, FeedbacksFilters],
  templateUrl: './sidebar-mobile.html',
  styleUrl: './sidebar-mobile.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarMobile implements OnInit {
  private readonly sideSlice: SidebarMobileSlice = inject(SidebarMobileSlice);
  private readonly useSearchCtx: UseSearchFeedbacksCtx = inject(UseSearchFeedbacksCtx);

  public readonly useRoadCtx: UseRoadmapCtx = inject(UseRoadmapCtx);

  @ViewChild('sideRef')
  private readonly sideRef: RefDomT;

  // ? derived
  public readonly blackBgCSS: Signal<string> = computed(
    () => `z-sidebar__bg ${this.sideSlice.isOpen() ? 'fixed' : 'hidden'}`
  );
  public readonly twd: Signal<string> = computed(() =>
    this.sideSlice.isOpen() ? '-translate-x-full' : '-translate-x-0'
  );

  // ? listeners
  public readonly closeOnNav: () => void = () => this.sideSlice.setIsOpen(false);

  ngOnInit(): void {
    this.useSearchCtx.setupForm();
  }

  @HostListener('document:mousedown', ['$event'])
  public onMouseDown(e: Event): void {
    const side: ElDomT = this.sideRef?.nativeElement;
    const target: Node = e.target as Node;

    if (!side || !target) return;

    if (this.sideSlice.isOpen() && !side.contains(target)) this.sideSlice.setIsOpen(false);
  }
}
